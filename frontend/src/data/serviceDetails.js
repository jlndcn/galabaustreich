/**
 * Leistungs-Detailseiten – Inhalte aus CMS (src/content/service-details.json).
 * URL: /leistungen/:slug
 */

import data from "@/content/service-details.json";

function normalizePage(page) {
  const slug = String(page.slug || "").trim();
  const related = Array.isArray(page.related)
    ? page.related.map((s) => String(s).trim()).filter(Boolean)
    : [];
  const sections = Array.isArray(page.sections)
    ? page.sections.map((section) => ({
        heading: section.heading || "",
        paragraphs: Array.isArray(section.paragraphs)
          ? section.paragraphs.filter(Boolean)
          : [],
      }))
    : [];
  const seo = page.seo || {};
  return {
    ...page,
    slug,
    related,
    sections,
    scope: Array.isArray(page.scope) ? page.scope.filter(Boolean) : [],
    seo: {
      title: seo.title || "",
      description: seo.description || "",
      path: seo.path || (slug ? `/leistungen/${slug}` : "/leistungen"),
    },
  };
}

const pages = (data.pages || []).map(normalizePage);

export const serviceDetails = Object.fromEntries(
  pages.filter((p) => p.slug).map((p) => [p.slug, p]),
);

/** Katalog-ID → Detail-Slug (Karten, Saisonhinweise) */
export const serviceIdToDetailSlug = Object.fromEntries(
  pages
    .filter((p) => p.serviceId && p.slug)
    .map((p) => [p.serviceId, p.slug]),
);

export const serviceDetailList = pages;

export function getServiceDetail(slug) {
  return serviceDetails[slug] || null;
}

export function getDetailPathForServiceId(serviceId) {
  const slug = serviceIdToDetailSlug[serviceId];
  return slug ? `/leistungen/${slug}` : null;
}
