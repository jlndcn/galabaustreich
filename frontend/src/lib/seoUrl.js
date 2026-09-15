/**
 * Canonical production URL helpers.
 * PRODUCTION_HOST is the hostname only (www.garten-streich.de) – never prefix "www." again.
 */

import { site, PRODUCTION_HOST } from "@/data/site";

export function canonicalOrigin() {
  const raw = String(site.domain || "").replace(/\/$/, "");
  if (raw.includes("://www.")) return raw;
  if (raw.includes("://garten-streich.de")) {
    return raw.replace("://garten-streich.de", "://www.garten-streich.de");
  }
  return `https://${PRODUCTION_HOST}`;
}

export function canonicalUrl(path = "/") {
  const origin = canonicalOrigin();
  if (!path || path === "/") return `${origin}/`;
  return `${origin}${path.startsWith("/") ? path : `/${path}`}`;
}

export function isProductionHost(hostname) {
  const host =
    hostname ??
    (typeof window !== "undefined" ? window.location.hostname : "");
  return host === PRODUCTION_HOST;
}
