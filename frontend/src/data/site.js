// Central company / brand configuration (single source of truth for NAP data).
// The canonical domain is configurable here – change it once when the final domain is confirmed.

export const PRODUCTION_HOST = "garten-streich.de";

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

  // Local SEO – confirmed service areas only.
  areaServed: ["Lübeck", "Ostholstein"],

  // Canonical base URL (no trailing slash). Configurable – preferred final domain.
  domain: "https://garten-streich.de",
};

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
