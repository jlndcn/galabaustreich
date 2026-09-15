/**
 * POST /api/cms/identity/logout – HttpOnly-Session beenden.
 */

import { clearSessionCookieHeader } from "../../../_utils/cmsAuth.js";

export async function onRequestPost(context) {
  return new Response(JSON.stringify({ ok: true }), {
    status: 200,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "no-store",
      "Set-Cookie": clearSessionCookieHeader(context.request),
    },
  });
}

export async function onRequestGet(context) {
  return onRequestPost(context);
}
