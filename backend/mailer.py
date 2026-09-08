"""
SMTP mailer for contact-form notifications (FastAPI backend, used in the preview environment).
The production site on Netlify uses the equivalent Netlify Function (frontend/netlify/functions/contact.mjs).

Configuration via environment variables (backend/.env) – same names as in Netlify:
  SMTP_HOST      e.g. smtp.strato.de
  SMTP_PORT      465 (SSL/TLS, default) or 587 (STARTTLS)
  SMTP_USER      login of the mailbox (info@garten-streich.de)
  SMTP_PASSWORD  mailbox password (never in source code)
  CONTACT_TO     recipient of notifications (defaults to SMTP_USER)
  SMTP_SECURITY  optional: "auto" (default: 465 -> SSL, otherwise STARTTLS) | "ssl" | "starttls" | "none"

If SMTP_HOST / SMTP_USER / SMTP_PASSWORD are missing, sending is disabled and
inquiries are only stored in the database.
"""
from __future__ import annotations

import asyncio
import logging
import os
import smtplib
import ssl
from email.message import EmailMessage
from email.utils import formataddr, formatdate, make_msgid
from typing import Optional

logger = logging.getLogger(__name__)

SENDER_NAME = "Garten Streich Website"
COMPANY_LEGAL = "Garten-und Landschaftspflege B.Streich"
COMPANY_PHONE = "0177 3216077"
COMPANY_ADDRESS = "Dorfstraße 12, 23684 Scharbeutz"
NOTIFICATION_SUBJECT = "Neue Anfrage über garten-streich.de"


def _header_safe(value: str) -> str:
    return " ".join(str(value).replace("\r", " ").replace("\n", " ").split())


def smtp_settings() -> dict:
    host = (os.environ.get("SMTP_HOST") or "").strip()
    user = (os.environ.get("SMTP_USER") or "").strip()
    password = os.environ.get("SMTP_PASSWORD") or ""
    port_raw = (os.environ.get("SMTP_PORT") or "465").strip()
    try:
        port = int(port_raw)
    except ValueError:
        port = 465
    security = (os.environ.get("SMTP_SECURITY") or "auto").strip().lower()
    if security == "auto":
        security = "ssl" if port == 465 else "starttls"
    # From is always the company mailbox (SMTP_USER); the visitor's address is only used as Reply-To.
    mail_from = user
    mail_to = (os.environ.get("CONTACT_TO") or os.environ.get("MAIL_TO") or user).strip()
    return {
        "host": host,
        "port": port,
        "user": user,
        "password": password,
        "security": security,
        "mail_from": mail_from,
        "mail_to": mail_to,
        "configured": bool(host and user and password and mail_to),
    }


def mail_status() -> dict:
    """Non-sensitive status for the admin endpoint."""
    s = smtp_settings()
    return {
        "configured": s["configured"],
        "host": s["host"] or None,
        "port": s["port"],
        "security": s["security"],
        "mail_from": s["mail_from"] or None,
        "mail_to": s["mail_to"] or None,
    }


def _send_sync(msg: EmailMessage, settings: dict) -> None:
    context = ssl.create_default_context()
    timeout = 20
    if settings["security"] == "ssl":
        with smtplib.SMTP_SSL(settings["host"], settings["port"], timeout=timeout, context=context) as server:
            server.login(settings["user"], settings["password"])
            server.send_message(msg)
        return

    with smtplib.SMTP(settings["host"], settings["port"], timeout=timeout) as server:
        server.ehlo()
        if settings["security"] != "none":
            server.starttls(context=context)
            server.ehlo()
        server.login(settings["user"], settings["password"])
        server.send_message(msg)


async def send_mail(
    *,
    to: str,
    subject: str,
    body: str,
    reply_to: Optional[str] = None,
    reply_to_name: Optional[str] = None,
) -> bool:
    """Send a plain-text e-mail. Returns True on success, False otherwise (never raises)."""
    settings = smtp_settings()
    if not settings["configured"]:
        logger.info("SMTP nicht konfiguriert – E-Mail '%s' wird nicht versendet.", subject)
        return False

    msg = EmailMessage()
    msg["From"] = formataddr((SENDER_NAME, settings["mail_from"]))
    msg["To"] = to
    msg["Subject"] = _header_safe(subject)
    msg["Date"] = formatdate(localtime=True)
    msg["Message-ID"] = make_msgid(domain=settings["mail_from"].split("@")[-1] or None)
    if reply_to:
        msg["Reply-To"] = formataddr((_header_safe(reply_to_name or ""), reply_to)) if reply_to_name else reply_to
    msg.set_content(body, charset="utf-8")

    try:
        await asyncio.to_thread(_send_sync, msg, settings)
        logger.info("E-Mail versendet: '%s' -> %s", subject, to)
        return True
    except Exception as exc:  # noqa: BLE001 – log (without secrets) and continue, inquiry is stored anyway
        logger.error("E-Mail-Versand fehlgeschlagen ('%s' -> %s): %s", subject, to, exc.__class__.__name__)
        return False


def _fmt(value: Optional[str]) -> str:
    return value if value else "–"


def build_notification(doc: dict) -> tuple[str, str]:
    """Internal notification about a new inquiry (subject, body)."""
    body = (
        "Neue Anfrage über das Kontaktformular auf garten-streich.de\n"
        "\n"
        f"Name:      {_fmt(doc.get('name'))}\n"
        f"Telefon:   {_fmt(doc.get('phone'))}\n"
        f"E-Mail:    {_fmt(doc.get('email'))}\n"
        f"Ort:       {_fmt(doc.get('location'))}\n"
        f"Gesendet:  {_fmt(doc.get('created_at'))} (UTC)\n"
        f"Seite:     {_fmt(doc.get('page'))}\n"
        "\n"
        "Anliegen:\n"
        f"{doc.get('message', '')}\n"
        "\n"
        "—\n"
        f"Anfrage-ID: {doc.get('id', '')}\n"
        "Diese E-Mail wurde automatisch von der Website erzeugt. "
        + (
            "Antworten Sie einfach auf diese E-Mail, um den Absender zu erreichen."
            if doc.get("email")
            else "Der Absender hat keine E-Mail-Adresse angegeben – bitte telefonisch melden."
        )
    )
    return NOTIFICATION_SUBJECT, body


def build_confirmation(doc: dict) -> tuple[str, str]:
    """Short receipt for the customer (subject, body). No promises on response times."""
    subject = f"Ihre Anfrage bei {COMPANY_LEGAL}"
    body = (
        f"Guten Tag {doc.get('name', '')},\n"
        "\n"
        "vielen Dank für Ihre Anfrage über unsere Website. Wir haben Ihre Nachricht erhalten "
        "und melden uns persönlich bei Ihnen.\n"
        "\n"
        "Ihre Angaben:\n"
        f"Telefon:  {_fmt(doc.get('phone'))}\n"
        f"E-Mail:   {_fmt(doc.get('email'))}\n"
        f"Ort:      {_fmt(doc.get('location'))}\n"
        "\n"
        "Ihr Anliegen:\n"
        f"{doc.get('message', '')}\n"
        "\n"
        f"Wenn es eilt, erreichen Sie uns telefonisch unter {COMPANY_PHONE}.\n"
        "\n"
        "Mit freundlichen Grüßen\n"
        f"{COMPANY_LEGAL}\n"
        f"{COMPANY_ADDRESS}\n"
        "\n"
        "Hinweis: Dies ist eine automatische Eingangsbestätigung. Sie können auf diese E-Mail antworten."
    )
    return subject, body
