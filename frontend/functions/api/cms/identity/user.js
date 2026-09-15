/**
 * GET /api/cms/identity/user – Session prüfen (Cookie bevorzugt).
 */

import {
  clearSessionCookieHeader,
  cmsAuthFromRequest,
  identityUser,
} from "../../../_utils/cmsAuth.js";

const json = (status, body, extraHeaders = {}) =>
  new Response(JSON.stringify(body), {
    status,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "no-store",
      ...extraHeaders,
    },
  });

export async function onRequestGet(context) {
  const auth = await cmsAuthFromRequest(context.env, context.request);
  if (!auth) {
    return json(401, { msg: "unauthorized" }, {
      "Set-Cookie": clearSessionCookieHeader(context.request),
    });
  }
  return json(200, identityUser(auth.user.email));
}
