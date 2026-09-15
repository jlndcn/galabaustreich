/**
 * Google Search Console – HTML-Datei-Verifikation.
 * Als Function, damit der SPA-Fallback /* → /index.html sie nicht überschreibt.
 */
export async function onRequestGet() {
  return new Response("google-site-verification: googled54d77f3c858e8f0.html\n", {
    status: 200,
    headers: {
      "Content-Type": "text/html; charset=UTF-8",
      "Cache-Control": "public, max-age=300",
      "X-Robots-Tag": "noindex",
    },
  });
}
