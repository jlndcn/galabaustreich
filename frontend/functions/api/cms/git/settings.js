/**
 * GET /api/cms/git/settings
 */

export async function onRequestGet() {
  return new Response(JSON.stringify({ github_enabled: true }), {
    status: 200,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "no-store",
    },
  });
}
