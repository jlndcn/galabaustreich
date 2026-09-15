import { Link, Navigate, useParams } from "react-router-dom";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import { Seo } from "@/components/Seo";
import { Reveal } from "@/components/Reveal";
import { Photo } from "@/components/Photo";
import { ContactCTA } from "@/components/ContactCTA";
import { serviceImages } from "@/data/serviceImages";
import {
  getServiceDetail,
  serviceDetails,
} from "@/data/serviceDetails";
import { canonicalOrigin } from "@/lib/seoUrl";
import { site } from "@/data/site";

function buildServiceJsonLd(detail) {
  const origin = canonicalOrigin();
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: detail.navTitle,
    description: detail.seo.description,
    url: origin + detail.seo.path,
    provider: {
      "@type": "HomeAndConstructionBusiness",
      "@id": origin + "/#business",
      name: site.legalName,
      url: origin + "/",
      telephone: site.phone.intl,
      address: {
        "@type": "PostalAddress",
        streetAddress: site.address.street,
        postalCode: site.address.zip,
        addressLocality: site.address.city,
        addressCountry: site.address.countryCode,
      },
    },
    areaServed: [
      { "@type": "City", name: "Lübeck" },
      { "@type": "AdministrativeArea", name: "Ostholstein" },
    ],
  };
}

export default function LeistungDetail() {
  const { slug } = useParams();
  const detail = getServiceDetail(slug);

  if (!detail) {
    return <Navigate to="/leistungen" replace />;
  }

  const image = serviceImages[detail.serviceId] || {};
  const related = detail.related
    .map((relatedSlug) => serviceDetails[relatedSlug])
    .filter(Boolean);

  return (
    <div data-testid="service-detail-page" className="services-page">
      <Seo
        title={detail.seo.title}
        description={detail.seo.description}
        path={detail.seo.path}
        jsonLd={buildServiceJsonLd(detail)}
      />

      <section className="section-shell services-intro">
        <Reveal>
          <p className="service-claim" style={{ marginTop: 0 }}>
            {detail.claim}
          </p>
          <h1 className="text-4xl leading-[1.08] sm:text-5xl lg:text-[3.2rem]">
            {detail.h1}
          </h1>
        </Reveal>
        <Reveal delay={80}>
          <p className="section-intro mt-6 max-w-3xl">{detail.intro}</p>
        </Reveal>
        <Reveal delay={120} className="mt-6">
          <Link
            to="/leistungen"
            className="inline-flex items-center gap-2 text-[color:var(--brand-forest)] underline-offset-4 hover:underline"
            data-testid="service-detail-back"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            Alle Leistungen
          </Link>
        </Reveal>
      </section>

      <div className="section-shell">
        <Reveal className="service-figure" as="figure">
          <Photo
            name={image.name}
            alt={image.alt || detail.navTitle}
            className="service-photo"
            sizes="(max-width: 1023px) 100vw, 960px"
            priority
          />
        </Reveal>

        {detail.sections.map((section) => (
          <section key={section.heading} className="service-detail">
            <Reveal>
              <h2>{section.heading}</h2>
            </Reveal>
            <div className="service-copy">
              {section.paragraphs.map((paragraph) => (
                <p key={paragraph.slice(0, 24)}>{paragraph}</p>
              ))}
            </div>
          </section>
        ))}

        <section className="service-detail">
          <Reveal>
            <h2>Typische Arbeiten</h2>
          </Reveal>
          <ul className="service-details-list">
            {detail.scope.map((item) => (
              <li key={item}>
                <Check className="h-4 w-4" aria-hidden="true" />
                {item}
              </li>
            ))}
          </ul>
        </section>

        {related.length > 0 && (
          <section className="service-detail">
            <Reveal>
              <h2>Verwandte Leistungen</h2>
            </Reveal>
            <ul className="mt-6 space-y-3">
              {related.map((item) => (
                <li key={item.slug}>
                  <Link
                    to={`/leistungen/${item.slug}`}
                    className="inline-flex items-center gap-2 text-lg text-[color:var(--brand-forest)] underline-offset-4 hover:underline"
                  >
                    {item.navTitle}
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </Link>
                </li>
              ))}
            </ul>
            <p className="mt-8">
              <Link
                to="/leistungen"
                className="inline-flex items-center gap-2 text-[color:var(--brand-ink-soft)] underline-offset-4 hover:underline"
              >
                Zur Leistungsübersicht
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </p>
          </section>
        )}
      </div>

      <ContactCTA prefix={`service-${detail.slug}`} />
    </div>
  );
}
