/**
 * POST /api/cms/identity/token – Passwort-Login für Decap (GoTrue-ähnlich).
 * Session: HttpOnly Cookie + kurze Antwort. Brute-Force: IP-Rate-Limit.
 */

import {
  authenticateUser,
  clientIp,
  cmsAuthConfigured,
  cmsAuthFromRequest,
  CMS_SESSION_TTL_SEC,
  clearSessionCookieHeader,
  identityUser,
  sessionCookieHeader,
  signCmsJwt,
} from "../../../_utils/cmsAuth.js";
import {
  assertLoginAllowed,
  clearLoginFailures,
  recordLoginFailure,
} from "../../../_utils/cmsRateLimit.js";

const json = (status, body, extraHeaders = {}) =>
  new Response(JSON.stringify(body), {
    status,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "no-store",
      ...extraHeaders,
    },
  });

async function parseBody(request) {
  const type = (request.headers.get("content-type") || "").toLowerCase();
  if (type.includes("application/json")) return request.json();
  const text = await request.text();
  const params = new URLSearchParams(text);
  const out = {};
  for (const [k, v] of params.entries()) out[k] = v;
  return out;
}

export async function onRequestPost(context) {
  const { request, env } = context;
  if (!cmsAuthConfigured(env)) {
    return json(503, {
      error: "configuration_error",
      error_description: "CMS-Login ist nicht konfiguriert.",
    });
  }

  const ip = clientIp(request);
  const gate = await assertLoginAllowed(ip);
  if (!gate.ok) {
    return json(
      429,
      {
        error: "too_many_attempts",
        error_description:
          "Zu viele Fehlversuche. Bitte später erneut versuchen.",
      },
      { "Retry-After": String(gate.retryAfter || 900) },
    );
  }

  let body;
  try {
    body = await parseBody(request);
  } catch {
    return json(400, {
      error: "invalid_request",
      error_description: "Ungültige Anfrage.",
    });
  }

  if (String(body.grant_type || "password") !== "password") {
    return json(400, {
      error: "unsupported_grant_type",
      error_description: "Nur Passwort-Login wird unterstützt.",
    });
  }

  const user = authenticateUser(
    env,
    body.username || body.email || "",
    body.password || "",
  );
  if (!user) {
    const fail = await recordLoginFailure(ip);
    if (fail.blocked) {
      return json(
        429,
        {
          error: "too_many_attempts",
          error_description:
            "Zu viele Fehlversuche. Bitte später erneut versuchen.",
        },
        { "Retry-After": String(fail.retryAfter || 900) },
      );
    }
    return json(400, {
      error: "invalid_grant",
      error_description: "E-Mail oder Passwort ist falsch.",
    });
  }

  await clearLoginFailures(ip);
  const access_token = await signCmsJwt(env, user.email);
  const headers = {
    "Set-Cookie": sessionCookieHeader(access_token, request),
  };

  // access_token nur für Decap-Kompatibilität (Browser behält ihn nur im RAM).
  // Persistenz läuft über HttpOnly-Cookie.
  return json(
    200,
    {
      access_token,
      token_type: "bearer",
      expires_in: CMS_SESSION_TTL_SEC,
      refresh_token: access_token,
      user: identityUser(user.email),
    },
    headers,
  );
}

export async function onRequestGet(context) {
  const auth = await cmsAuthFromRequest(context.env, context.request);
  if (!auth) {
    return json(401, { error: "unauthorized" }, {
      "Set-Cookie": clearSessionCookieHeader(context.request),
    });
  }
  return json(200, identityUser(auth.user.email));
}
