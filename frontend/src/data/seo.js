// Per-page SEO metadata – editable via Decap CMS (src/content/seo.json).
import seoContent from "@/content/seo.json";
import { site, googleLink } from "@/data/site";

export const seoPages = seoContent;

// JSON-LD LocalBusiness structured data (no opening hours, ratings, socials, prices – none invented).
export function buildLocalBusinessJsonLd() {
  const base = site.domain.replace(/\/$/, "");
  const data = {
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
    hasMap: googleLink,
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
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer service",
      telephone: site.phone.intl,
      email: site.email,
      availableLanguage: "de",
      areaServed: "DE",
    },
  };
  if (site.google.profileUrl) {
    data.sameAs = [site.google.profileUrl];
  }
  return data;
}
