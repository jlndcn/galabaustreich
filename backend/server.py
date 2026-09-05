from fastapi import FastAPI, APIRouter, HTTPException, Request, Header, Query
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
import secrets
import time
from collections import defaultdict, deque
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict, EmailStr, field_validator
from typing import List, Optional
import uuid
from datetime import datetime, timezone


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Create the main app without a prefix
app = FastAPI()

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)


# ---------------------------------------------------------------------------
# Models
# ---------------------------------------------------------------------------
class StatusCheck(BaseModel):
    model_config = ConfigDict(extra="ignore")  # Ignore MongoDB's _id field

    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))


class StatusCheckCreate(BaseModel):
    client_name: str


def _blank_to_none(value):
    if value is None:
        return None
    if isinstance(value, str) and value.strip() == "":
        return None
    return value


class ContactRequestCreate(BaseModel):
    """Payload of the lean inquiry form (Anfrageformular)."""
    model_config = ConfigDict(str_strip_whitespace=True)

    name: str = Field(min_length=2, max_length=120)
    phone: Optional[str] = Field(default=None, max_length=40)
    email: Optional[EmailStr] = None
    location: Optional[str] = Field(default=None, max_length=160)
    message: str = Field(min_length=10, max_length=4000)
    consent: bool = False
    page: Optional[str] = Field(default=None, max_length=200)
    # Honeypot field – must stay empty for real visitors.
    website: Optional[str] = Field(default=None, max_length=300)

    @field_validator("phone", "email", "location", "page", "website", mode="before")
    @classmethod
    def blank_strings_to_none(cls, value):
        return _blank_to_none(value)


class ContactRequest(BaseModel):
    model_config = ConfigDict(extra="ignore")

    id: str
    name: str
    phone: Optional[str] = None
    email: Optional[str] = None
    location: Optional[str] = None
    message: str
    page: Optional[str] = None
    status: str = "new"
    created_at: str


class ContactResponse(BaseModel):
    id: str
    received: bool = True
    message: str = "Vielen Dank für Ihre Anfrage. Wir melden uns persönlich bei Ihnen."


# ---------------------------------------------------------------------------
# Simple in-memory rate limiting for the contact form (per client IP)
# ---------------------------------------------------------------------------
RATE_LIMIT_MAX = int(os.environ.get("CONTACT_RATE_LIMIT_MAX", "5"))
RATE_LIMIT_WINDOW_SECONDS = int(os.environ.get("CONTACT_RATE_LIMIT_WINDOW", "3600"))
_rate_buckets: dict[str, deque] = defaultdict(deque)


def _client_ip(request: Request) -> str:
    forwarded = request.headers.get("x-forwarded-for")
    if forwarded:
        return forwarded.split(",")[0].strip()
    return request.client.host if request.client else "unknown"


def _is_rate_limited(ip: str) -> bool:
    now = time.time()
    bucket = _rate_buckets[ip]
    while bucket and now - bucket[0] > RATE_LIMIT_WINDOW_SECONDS:
        bucket.popleft()
    if len(bucket) >= RATE_LIMIT_MAX:
        return True
    bucket.append(now)
    return False


# ---------------------------------------------------------------------------
# Routes
# ---------------------------------------------------------------------------
@api_router.get("/")
async def root():
    return {"message": "Hello World"}


@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    status_dict = input.model_dump()
    status_obj = StatusCheck(**status_dict)

    # Convert to dict and serialize datetime to ISO string for MongoDB
    doc = status_obj.model_dump()
    doc['timestamp'] = doc['timestamp'].isoformat()

    _ = await db.status_checks.insert_one(doc)
    return status_obj


@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    # Exclude MongoDB's _id field from the query results
    status_checks = await db.status_checks.find({}, {"_id": 0}).to_list(1000)

    # Convert ISO string timestamps back to datetime objects
    for check in status_checks:
        if isinstance(check['timestamp'], str):
            check['timestamp'] = datetime.fromisoformat(check['timestamp'])

    return status_checks


@api_router.post("/contact", response_model=ContactResponse, status_code=201)
async def create_contact_request(payload: ContactRequestCreate, request: Request):
    """Store an inquiry from the website contact form."""
    # Honeypot filled -> silently accept without storing (do not tip off bots).
    if payload.website:
        logger.info("Kontaktformular: Honeypot ausgelöst, Anfrage verworfen.")
        return ContactResponse(id=str(uuid.uuid4()))

    if not payload.consent:
        raise HTTPException(
            status_code=400,
            detail="Bitte bestätigen Sie den Hinweis zum Datenschutz.",
        )

    if not payload.phone and not payload.email:
        raise HTTPException(
            status_code=400,
            detail="Bitte geben Sie eine Telefonnummer oder eine E-Mail-Adresse an.",
        )

    if _is_rate_limited(_client_ip(request)):
        raise HTTPException(
            status_code=429,
            detail="Zu viele Anfragen. Bitte versuchen Sie es später erneut oder rufen Sie uns an.",
        )

    doc = {
        "id": str(uuid.uuid4()),
        "name": payload.name,
        "phone": payload.phone,
        "email": str(payload.email) if payload.email else None,
        "location": payload.location,
        "message": payload.message,
        "page": payload.page,
        "status": "new",
        "created_at": datetime.now(timezone.utc).isoformat(),
    }
    await db.contact_requests.insert_one(doc)
    logger.info("Neue Kontaktanfrage gespeichert: %s", doc["id"])
    return ContactResponse(id=doc["id"])


@api_router.get("/contact", response_model=List[ContactRequest])
async def list_contact_requests(
    x_admin_token: Optional[str] = Header(default=None),
    limit: int = Query(default=100, ge=1, le=500),
):
    """Protected listing of stored inquiries (requires X-Admin-Token header)."""
    expected = os.environ.get("CONTACT_ADMIN_TOKEN")
    if not expected:
        raise HTTPException(status_code=503, detail="Admin-Zugriff ist nicht konfiguriert.")
    if not x_admin_token or not secrets.compare_digest(x_admin_token, expected):
        raise HTTPException(status_code=401, detail="Nicht autorisiert.")

    docs = (
        await db.contact_requests.find({}, {"_id": 0})
        .sort("created_at", -1)
        .to_list(limit)
    )
    return docs


# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
