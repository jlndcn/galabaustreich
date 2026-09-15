/**
 * Apex → www (301), damit https://www.garten-streich.de die einzige kanonische Host-Adresse ist.
 */
const APEX = "garten-streich.de";
const CANONICAL_HOST = "www.garten-streich.de";

export async function onRequest(context) {
  const url = new URL(context.request.url);
  const host = url.hostname.toLowerCase();

  if (host === APEX) {
    url.hostname = CANONICAL_HOST;
    url.protocol = "https:";
    return Response.redirect(url.toString(), 301);
  }

  return context.next();
}
