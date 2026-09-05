// Central company / brand configuration (single source of truth for NAP data).
// The canonical domain is configurable here – change it once when the final domain is confirmed.

export const PRODUCTION_HOST = "garten-streich.de";

const addressQuery = encodeURIComponent(
  "Garten-und Landschaftspflege B.Streich, Dorfstraße 12, 23684 Scharbeutz"
);

export const site = {
  displayName: "Garten- und Landschaftspflege Streich",
  legalName: "Garten-und Landschaftspflege B.Streich",
  brand: "Streich",
  owner: "Bianca Streich",
  legalForm: "Einzelunternehmen",
  industry: "Garten- & Landschaftspflege",
  vatId: "DE415720615",
  brandMessage: "Garten- und Landschaftspflege in und um Lübeck",

  address: {
    street: "Dorfstraße 12",
    zip: "23684",
    city: "Scharbeutz",
    country: "Deutschland",
    countryCode: "DE",
  },

  // One consistent phone display format across the whole site (NAP consistency).
  phone: {
    display: "0177 3216077",
    href: "tel:01773216077",
    intl: "+491773216077",
  },

  email: "info@garten-streich.de",

  // WhatsApp deep link (no bot, no prefilled AI text) – country code without leading 0.
  whatsapp: "https://wa.me/491773216077",

  // Google-Unternehmensprofil.
  // profileUrl: Sobald die endgültige Profil-/Kurz-URL des Google-Unternehmensprofils vorliegt
  // (z. B. https://g.page/... oder https://maps.app.goo.gl/...), hier eintragen.
  // Bis dahin verweist der Google-Link auf die Google-Maps-Suche nach Firmenname und Anschrift.
  google: {
    profileUrl: null,
    mapsUrl: `https://www.google.com/maps/search/?api=1&query=${addressQuery}`,
  },

  // Local SEO – confirmed service areas only.
  areaServed: ["Lübeck", "Ostholstein"],

  // Canonical base URL (no trailing slash). Configurable – preferred final domain.
  domain: "https://garten-streich.de",
};

// Public Google link (profile if configured, otherwise Maps search for name + address).
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

// Recurring contact-CTA copy (kept close to the client's language, no aggressive sales tone).
export const contactPrompt =
  "Sie möchten Unterstützung bei der Pflege Ihres Gartens oder Grundstücks?";
