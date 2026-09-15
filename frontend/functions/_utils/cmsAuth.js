/**
 * CMS-Auth Hilfen (Passwort-Login für Redaktion, ohne GitHub-Konto).
 * Env: CMS_EMAIL, CMS_PASSWORD, CMS_JWT_SECRET
 * Optional: CMS_USERS = [{"email":"...","password":"..."}, ...]
 */

const textEncoder = new TextEncoder();

/** Session lifetime (HttpOnly cookie). */
export const CMS_SESSION_TTL_SEC = 60 * 60 * 4; // 4 Stunden

export const CMS_COOKIE_NAME = "cms_session";

function b64url(bytes) {
  let bin = "";
  const arr = bytes instanceof Uint8Array ? bytes : new Uint8Array(bytes);
  for (let i = 0; i < arr.length; i++) bin += String.fromCharCode(arr[i]);
  return btoa(bin).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/g, "");
}

function b64urlJson(obj) {
  return b64url(textEncoder.encode(JSON.stringify(obj)));
}

async function hmacKey(secret) {
  return crypto.subtle.importKey(
    "raw",
    textEncoder.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign", "verify"],
  );
}

function timingSafeEqual(a, b) {
  const aa = textEncoder.encode(String(a));
  const bb = textEncoder.encode(String(b));
  if (aa.length !== bb.length) return false;
  let diff = 0;
  for (let i = 0; i < aa.length; i++) diff |= aa[i] ^ bb[i];
  return diff === 0;
}

export function getCmsUsers(env) {
  const raw = String(env.CMS_USERS || "").trim();
  if (raw) {
    try {
      const list = JSON.parse(raw);
      if (Array.isArray(list)) {
        return list
          .map((u) => ({
            email: String(u.email || "")
              .trim()
              .toLowerCase(),
            password: String(u.password || ""),
          }))
          .filter((u) => u.email && u.password);
      }
    } catch {
      /* fall through */
    }
  }
  const email = String(env.CMS_EMAIL || "")
    .trim()
    .toLowerCase();
  const password = String(env.CMS_PASSWORD || "");
  if (email && password) return [{ email, password }];
  return [];
}

export function cmsAuthConfigured(env) {
  return Boolean(
    String(env.CMS_JWT_SECRET || "").trim() && getCmsUsers(env).length,
  );
}

export function authenticateUser(env, email, password) {
  const needle = String(email || "")
    .trim()
    .toLowerCase();
  const pass = String(password || "");
  for (const user of getCmsUsers(env)) {
    if (user.email === needle && timingSafeEqual(user.password, pass)) {
      return { email: user.email };
    }
  }
  return null;
}

export async function signCmsJwt(
  env,
  email,
  ttlSeconds = CMS_SESSION_TTL_SEC,
) {
  const secret = String(env.CMS_JWT_SECRET || "").trim();
  if (!secret) throw new Error("CMS_JWT_SECRET missing");
  const header = b64urlJson({ alg: "HS256", typ: "JWT" });
  const now = Math.floor(Date.now() / 1000);
  const payload = b64urlJson({
    sub: email,
    email,
    app: "garten-streich-cms",
    iat: now,
    exp: now + ttlSeconds,
  });
  const data = `${header}.${payload}`;
  const key = await hmacKey(secret);
  const sig = await crypto.subtle.sign("HMAC", key, textEncoder.encode(data));
  return `${data}.${b64url(new Uint8Array(sig))}`;
}

export async function verifyCmsJwt(env, token) {
  const secret = String(env.CMS_JWT_SECRET || "").trim();
  if (!secret || !token) return null;
  const parts = String(token).split(".");
  if (parts.length !== 3) return null;
  const [header, payload, signature] = parts;
  const data = `${header}.${payload}`;
  const key = await hmacKey(secret);
  const sigBytes = Uint8Array.from(
    atob(signature.replace(/-/g, "+").replace(/_/g, "/")),
    (c) => c.charCodeAt(0),
  );
  const ok = await crypto.subtle.verify(
    "HMAC",
    key,
    sigBytes,
    textEncoder.encode(data),
  );
  if (!ok) return null;
  try {
    const json = JSON.parse(
      atob(payload.replace(/-/g, "+").replace(/_/g, "/")),
    );
    if (!json.exp || json.exp < Math.floor(Date.now() / 1000)) return null;
    if (json.app !== "garten-streich-cms") return null;
    const email = String(json.email || json.sub || "")
      .trim()
      .toLowerCase();
    if (!email) return null;
    return { email };
  } catch {
    return null;
  }
}

export function bearerToken(request) {
  const h = request.headers.get("Authorization") || "";
  const m = h.match(/^Bearer\s+(.+)$/i);
  return m ? m[1].trim() : "";
}

export function cookieToken(request) {
  const raw = request.headers.get("Cookie") || "";
  const parts = raw.split(/;\s*/);
  for (const part of parts) {
    const eq = part.indexOf("=");
    if (eq === -1) continue;
    if (part.slice(0, eq) === CMS_COOKIE_NAME) {
      try {
        return decodeURIComponent(part.slice(eq + 1));
      } catch {
        return part.slice(eq + 1);
      }
    }
  }
  return "";
}

/** Prefer HttpOnly cookie; Bearer only as fallback (in-memory Decap session). */
export async function cmsAuthFromRequest(env, request) {
  const fromCookie = cookieToken(request);
  if (fromCookie) {
    const user = await verifyCmsJwt(env, fromCookie);
    if (user) return { user, via: "cookie" };
  }
  const fromBearer = bearerToken(request);
  if (fromBearer && fromBearer !== "cookie") {
    const user = await verifyCmsJwt(env, fromBearer);
    if (user) return { user, via: "bearer" };
  }
  return null;
}

export function isSecureRequest(request) {
  const url = new URL(request.url);
  if (url.protocol === "https:") return true;
  const proto = (request.headers.get("X-Forwarded-Proto") || "").toLowerCase();
  return proto === "https";
}

export function sessionCookieHeader(token, request) {
  const secure = isSecureRequest(request);
  return [
    `${CMS_COOKIE_NAME}=${encodeURIComponent(token)}`,
    "Path=/",
    "HttpOnly",
    "SameSite=Strict",
    `Max-Age=${CMS_SESSION_TTL_SEC}`,
    secure ? "Secure" : "",
  ]
    .filter(Boolean)
    .join("; ");
}

export function clearSessionCookieHeader(request) {
  const secure = isSecureRequest(request);
  return [
    `${CMS_COOKIE_NAME}=`,
    "Path=/",
    "HttpOnly",
    "SameSite=Strict",
    "Max-Age=0",
    secure ? "Secure" : "",
  ]
    .filter(Boolean)
    .join("; ");
}

export function identityUser(email) {
  return {
    id: "cms-" + b64url(textEncoder.encode(email)).slice(0, 22),
    email,
    user_metadata: { full_name: email },
    app_metadata: { provider: "email" },
  };
}

export function clientIp(request) {
  return (
    request.headers.get("CF-Connecting-IP") ||
    request.headers.get("True-Client-IP") ||
    "unknown"
  );
}
