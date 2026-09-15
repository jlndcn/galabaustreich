// Central company / brand configuration.
// Editable content lives in src/content/site.json (Decap CMS). Navigation structure stays here.

import siteContent from "@/content/site.json";

export const PRODUCTION_HOST = "www.garten-streich.de";

function digitsOnly(value) {
  return String(value || "").replace(/\D/g, "");
}

/** Derive clickable tel / intl numbers from the displayed phone if CMS left them empty. */
function normalizePhone(phone = {}) {
  const display = phone.display || "";
  const digits = digitsOnly(display);
  const href = phone.href || (digits ? `tel:${digits}` : "");
  const intl =
    phone.intl ||
    (digits
      ? digits.startsWith("0")
        ? `+49${digits.slice(1)}`
        : digits.startsWith("49")
          ? `+${digits}`
          : `+${digits}`
      : "");
  return { display, href, intl };
}

const addressQuery = encodeURIComponent(
  `${siteContent.legalName}, ${siteContent.address.street}, ${siteContent.address.zip} ${siteContent.address.city}`,
);

const mapsFallback = `https://www.google.com/maps/search/?api=1&query=${addressQuery}`;

export const site = {
  ...siteContent,
  phone: normalizePhone(siteContent.phone),
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
