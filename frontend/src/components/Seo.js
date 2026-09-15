import { useEffect } from "react";
import { site } from "@/data/site";
import { canonicalOrigin, canonicalUrl, isProductionHost } from "@/lib/seoUrl";

function upsert(selector, create, attrs) {
  let el = document.head.querySelector(selector);
  if (!el) {
    el = create();
    document.head.appendChild(el);
  }
  Object.entries(attrs).forEach(([k, v]) => el.setAttribute(k, v));
  return el;
}

function metaName(name, content) {
  upsert(
    `meta[name="${name}"]`,
    () => {
      const m = document.createElement("meta");
      m.setAttribute("name", name);
      return m;
    },
    { content },
  );
}

function metaProp(property, content) {
  upsert(
    `meta[property="${property}"]`,
    () => {
      const m = document.createElement("meta");
      m.setAttribute("property", property);
      return m;
    },
    { content },
  );
}

function linkRel(rel, href) {
  upsert(
    `link[rel="${rel}"]`,
    () => {
      const l = document.createElement("link");
      l.setAttribute("rel", rel);
      return l;
    },
    { href },
  );
}

// SEO head manager – works reliably with React 19 by imperatively syncing <head>.
// Only the production host (www.garten-streich.de) is indexable.
export function Seo({
  title,
  description,
  path = "/",
  jsonLd = null,
  noIndex = false,
}) {
  useEffect(() => {
    const origin = canonicalOrigin();
    const url = canonicalUrl(path);
    const ogImage = `${origin}/og-image.jpg`;

    if (title) document.title = title;
    if (description) metaName("description", description);

    const host = typeof window !== "undefined" ? window.location.hostname : "";
    const indexable = !noIndex && isProductionHost(host);
    metaName("robots", indexable ? "index,follow" : "noindex,nofollow");

    linkRel("canonical", url);

    metaProp("og:type", "website");
    metaProp("og:site_name", site.legalName);
    metaProp("og:locale", "de_DE");
    if (title) metaProp("og:title", title);
    if (description) metaProp("og:description", description);
    metaProp("og:url", url);
    metaProp("og:image", ogImage);

    metaName("twitter:card", "summary_large_image");
    if (title) metaName("twitter:title", title);
    if (description) metaName("twitter:description", description);
    metaName("twitter:image", ogImage);

    const existing = document.getElementById("ld-json-main");
    if (jsonLd) {
      const json = JSON.stringify(jsonLd);
      if (existing) {
        existing.textContent = json;
      } else {
        const s = document.createElement("script");
        s.type = "application/ld+json";
        s.id = "ld-json-main";
        s.textContent = json;
        document.head.appendChild(s);
      }
    } else if (existing) {
      existing.remove();
    }
  }, [title, description, path, jsonLd, noIndex]);

  return null;
}
