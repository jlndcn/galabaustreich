// Central company / brand configuration.
// Editable content lives in src/content/site.json (Decap CMS). Navigation structure stays here.

import siteContent from "@/content/site.json";

export const PRODUCTION_HOST = "www.garten-streich.de";

const addressQuery = encodeURIComponent(
  `${siteContent.legalName}, ${siteContent.address.street}, ${siteContent.address.zip} ${siteContent.address.city}`,
);

const mapsFallback = `https://www.google.com/maps/search/?api=1&query=${addressQuery}`;

export const site = {
  ...siteContent,
  google: {
    ...siteContent.google,
    mapsUrl: siteContent.google.mapsUrl || mapsFallback,
    // CMS stores numbers; keep null-safe display helpers consistent.
    rating:
      siteContent.google.rating === null || siteContent.google.rating === ""
        ? null
        : Number(siteContent.google.rating),
    reviewCount: Number(siteContent.google.reviewCount) || 0,
  },
};

export const googleLink = site.google.profileUrl || site.google.mapsUrl;

export const mainNav = [
  { label: "Startseite", path: "/" },
  { label: "Leistungen", path: "/leistungen" },
  { label: "Über uns", path: "/ueber-uns" },
  { label: "Team", path: "/team" },
];

export const legalNav = [
  { label: "Impressum", path: "/impressum" },
  { label: "Datenschutz", path: "/datenschutz" },
  { label: "AGB", path: "/agb" },
];

export const contactPrompt = siteContent.contactPrompt;
