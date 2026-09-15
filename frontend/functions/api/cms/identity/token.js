/**
 * POST /api/cms/identity/token – Passwort-Login für Decap (GoTrue-ähnlich).
 */

import {
  authenticateUser,
  bearerToken,
  cmsAuthConfigured,
  identityUser,
  signCmsJwt,
  verifyCmsJwt,
} from "../../../_utils/cmsAuth.js";

const json = (status, body) =>
  new Response(JSON.stringify(body), {
    status,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "no-store",
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
    return json(400, {
      error: "invalid_grant",
      error_description: "E-Mail oder Passwort ist falsch.",
    });
  }

  const access_token = await signCmsJwt(env, user.email);
  return json(200, {
    access_token,
    token_type: "bearer",
    expires_in: 60 * 60 * 12,
    refresh_token: access_token,
    user: identityUser(user.email),
  });
}

export async function onRequestGet(context) {
  const token = bearerToken(context.request);
  const user = await verifyCmsJwt(context.env, token);
  if (!user) return json(401, { error: "unauthorized" });
  return json(200, identityUser(user.email));
}
