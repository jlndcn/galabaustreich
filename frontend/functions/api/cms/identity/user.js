/**
 * GET /api/cms/identity/user
 */

import {
  bearerToken,
  identityUser,
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

export async function onRequestGet(context) {
  const token = bearerToken(context.request);
  const user = await verifyCmsJwt(context.env, token);
  if (!user) return json(401, { msg: "unauthorized" });
  return json(200, identityUser(user.email));
}
