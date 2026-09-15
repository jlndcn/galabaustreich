/**
 * Öffentliche Routen-Middleware.
 * Google-Verifikationsdatei ohne Auth an der Domain-Root ausliefern
 * (vor SPA-Fallback / Pretty-URL-HTML-Redirects).
 */
export async function onRequest(context) {
  const url = new URL(context.request.url);

  if (url.pathname === "/googled54d77f3c858e8f0.html") {
    return new Response(
      "google-site-verification: googled54d77f3c858e8f0.html\n",
      {
        status: 200,
        headers: {
          "Content-Type": "text/html; charset=UTF-8",
          "Cache-Control": "public, max-age=0, must-revalidate",
        },
      },
    );
  }

  return context.next();
}
