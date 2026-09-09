export function GET() {
  const production = process.env.CONTEXT === 'production';
  return new Response(
    `User-agent: *\n${production ? 'Allow: /' : 'Disallow: /'}\n\nSitemap: https://garten-streich.de/sitemap.xml\n`,
    { headers: { 'Content-Type': 'text/plain; charset=utf-8' } },
  );
}
