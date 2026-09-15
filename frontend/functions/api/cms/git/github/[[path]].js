/**
 * Git Gateway Proxy → GitHub API (Repo-scoped).
 * Path: /api/cms/git/github/*
 *
 * Auth: CMS-JWT. GitHub-Token bleibt serverseitig.
 * Env: GITHUB_TOKEN, GITHUB_REPO
 */

import { bearerToken, verifyCmsJwt } from "../../../../_utils/cmsAuth.js";

const ALLOWED =
  /^\/api\/cms\/git\/github\/((git|contents|pulls|branches|merges|statuses|compare|commits)(\/|$)|(issues\/\d+\/labels))/;

export async function onRequest(context) {
  const { request, env } = context;
  const token = bearerToken(request);
  const user = await verifyCmsJwt(env, token);
  if (!user) {
    return new Response(JSON.stringify({ error: "unauthorized" }), {
      status: 401,
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        "Cache-Control": "no-store",
      },
    });
  }

  const githubToken = String(env.GITHUB_TOKEN || "").trim();
  const repo = String(env.GITHUB_REPO || "jlndcn/galabaustreich").trim();
  if (!githubToken || !repo.includes("/")) {
    return new Response(
      JSON.stringify({ error: "CMS GitHub-Zugriff ist nicht konfiguriert." }),
      {
        status: 503,
        headers: {
          "Content-Type": "application/json; charset=utf-8",
          "Cache-Control": "no-store",
        },
      },
    );
  }

  const url = new URL(request.url);
  if (!ALLOWED.test(url.pathname)) {
    return new Response(JSON.stringify({ error: "forbidden_path" }), {
      status: 403,
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        "Cache-Control": "no-store",
      },
    });
  }

  const ghUrl = new URL(request.url);
  ghUrl.protocol = "https:";
  ghUrl.host = "api.github.com";
  ghUrl.port = "";
  ghUrl.pathname = url.pathname.replace(
    /^\/api\/cms\/git\/github\//,
    `/repos/${repo}/`,
  );

  const headers = new Headers(request.headers);
  headers.set("Authorization", `Bearer ${githubToken}`);
  headers.set("Accept", "application/vnd.github+json");
  headers.set("User-Agent", "garten-streich-cms-gateway");
  headers.delete("Host");
  headers.delete("Cookie");

  const init = {
    method: request.method,
    headers,
    redirect: "manual",
  };
  if (request.method !== "GET" && request.method !== "HEAD") {
    init.body = request.body;
  }

  const upstream = await fetch(ghUrl.toString(), init);
  const outHeaders = new Headers(upstream.headers);
  outHeaders.set("Cache-Control", "no-store");
  return new Response(upstream.body, {
    status: upstream.status,
    headers: outHeaders,
  });
}
