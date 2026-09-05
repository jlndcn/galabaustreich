// Per-page SEO metadata, centrally defined.
import { site } from "@/data/site";

export const seoPages = {
  home: {
    title: "Garten- & Landschaftspflege Lübeck | Streich",
    description:
      "Garten- und Landschaftspflege Streich für Lübeck und Ostholstein: Gartenpflege, Heckenpflege, Rasenpflege, Baumfällungen und weitere Arbeiten rund um Garten und Grundstück.",
    path: "/",
  },
  leistungen: {
    title: "Gartenpflege, Baumfällung & Heckenpflege | Streich",
    description:
      "Unsere Leistungen rund um Garten und Grünflächen in Lübeck und Ostholstein: Garten- & Grünflächenpflege, Hecken- & Gehölzpflege, Baumfällungen, Rasenpflege, Winterdienst und mehr.",
    path: "/leistungen",
  },
  ueberUns: {
    title: "Garten- und Landschaftspflege Streich | Über uns",
    description:
      "Streich – regionales Einzelunternehmen für Garten- und Landschaftspflege aus Scharbeutz, tätig in Lübeck und Ostholstein. Persönlich, zuverlässig und mit einem Blick für das Schöne.",
    path: "/ueber-uns",
  },
  team: {
    title: "Unser Team | Garten- und Landschaftspflege Streich",
    description:
      "Unser Team steht für familiäre, sorgfältige Garten- und Landschaftspflege in und um Lübeck – mit fundiertem gärtnerischem und forstlichem Hintergrund.",
    path: "/team",
  },
  impressum: {
    title: "Impressum | Garten- und Landschaftspflege Streich",
    description:
      "Impressum der Garten-und Landschaftspflege B.Streich, Scharbeutz.",
    path: "/impressum",
  },
  datenschutz: {
    title: "Datenschutz | Garten- und Landschaftspflege Streich",
    description:
      "Datenschutzinformationen der Garten-und Landschaftspflege B.Streich.",
    path: "/datenschutz",
  },
  agb: {
    title: "AGB | Garten- und Landschaftspflege Streich",
    description:
      "Allgemeine Geschäftsbedingungen der Garten-und Landschaftspflege B.Streich.",
    path: "/agb",
  },
};

// JSON-LD LocalBusiness structured data (no opening hours, ratings, socials, prices – none invented).
export function buildLocalBusinessJsonLd() {
  const base = site.domain.replace(/\/$/, "");
  return {
    "@context": "https://schema.org",
    "@type": "HomeAndConstructionBusiness",
    "@id": base + "/#business",
    name: site.legalName,
    alternateName: site.displayName,
    slogan: site.brandMessage,
    description:
      "Garten- und Landschaftspflege in und um Lübeck – Gartenpflege, Heckenpflege, Baumfällungen, Rasenpflege und weitere Arbeiten rund um Garten und Grundstück.",
    url: base + "/",
    logo: base + "/logo512.png",
    image: base + "/og-image.jpg",
    telephone: site.phone.intl,
    email: site.email,
    founder: { "@type": "Person", name: site.owner },
    address: {
      "@type": "PostalAddress",
      streetAddress: site.address.street,
      postalCode: site.address.zip,
      addressLocality: site.address.city,
      addressCountry: site.address.countryCode,
    },
    areaServed: [
      { "@type": "City", name: "Lübeck" },
      { "@type": "AdministrativeArea", name: "Ostholstein" },
    ],
    knowsAbout: [
      "Gartenpflege",
      "Grünflächenpflege",
      "Heckenpflege",
      "Baumfällungen",
      "Rasenpflege",
      "Beet- und Staudenpflege",
      "Gartenumgestaltung",
      "Objekt- und Grundstückspflege",
      "Winterdienst",
    ],
  };
}
