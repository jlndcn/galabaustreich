import { Link } from "react-router-dom";
import { ArrowRight, Check } from "lucide-react";
import { Seo } from "@/components/Seo";
import { Reveal } from "@/components/Reveal";
import { Photo } from "@/components/Photo";
import { ServicesOverview } from "@/components/ServicesOverview";
import { ContactCTA } from "@/components/ContactCTA";
import { serviceImages } from "@/data/serviceImages";
import { seoPages } from "@/data/seo";
import { services, furtherServices } from "@/data/services";
import { getDetailPathForServiceId } from "@/data/serviceDetails";

function ServiceSection({ service }) {
  const detailPath = getDetailPathForServiceId(service.id);
  const extraDetail =
    service.id === "garten-gruenflaechenpflege"
      ? { path: "/leistungen/gruenflaechenpflege", label: "Grünflächenpflege" }
      : null;

  return (
    <section
      id={service.id}
      data-testid="service-section"
      className="service-detail"
    >
      <Reveal>
        <h2>
          {detailPath ? (
            <Link
              to={detailPath}
              className="text-inherit no-underline hover:underline underline-offset-4"
            >
              {service.title}
            </Link>
          ) : (
            service.title
          )}
        </h2>
        <p className="service-claim">{service.claim}</p>
      </Reveal>
      <Reveal className="service-figure" as="figure">
        <Photo
          {...serviceImages[service.id]}
          className="service-photo"
          sizes="(max-width: 1023px) 100vw, 800px"
        />
      </Reveal>
      <div className="service-copy">
        {service.description.map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}
      </div>
      {service.list && (
        <ul className="service-details-list">
          {service.list.map((item) => (
            <li key={item}>
              <Check className="h-4 w-4" aria-hidden="true" />
              {item}
            </li>
          ))}
        </ul>
      )}
      {(detailPath || extraDetail) && (
        <div className="mt-6 flex flex-wrap gap-x-6 gap-y-3">
          {detailPath && (
            <Link
              to={detailPath}
              className="inline-flex items-center gap-2 font-medium text-[color:var(--brand-forest)] underline-offset-4 hover:underline"
              data-testid={`service-detail-link-${service.id}`}
            >
              Mehr zur Leistung
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          )}
          {extraDetail && (
            <Link
              to={extraDetail.path}
              className="inline-flex items-center gap-2 font-medium text-[color:var(--brand-forest)] underline-offset-4 hover:underline"
            >
              {extraDetail.label} im Detail
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          )}
        </div>
      )}
    </section>
  );
}

export default function Leistungen() {
  return (
    <div data-testid="services-page" className="services-page">
      <Seo {...seoPages.leistungen} />
      <section className="section-shell services-intro">
        <h1>Unsere Leistungen rund um Garten und Grünflächen</h1>
        <p className="section-intro">
          Von der regelmäßigen Pflege bis zur Neugestaltung: Wir begleiten
          Gärten, Grünflächen und Grundstücke in Lübeck und Ostholstein durch
          das ganze Gartenjahr – abgestimmt auf Ihre Fläche und Ihren Bedarf.
        </p>
      </section>
      <div className="section-shell services-layout">
        <aside className="services-sidebar">
          <ServicesOverview />
        </aside>
        <div>
          {services.map((service) => (
            <ServiceSection key={service.id} service={service} />
          ))}
          <section
            id="weitere-leistungen"
            data-testid="further-services-section"
            className="service-detail"
          >
            <h2>Weitere Leistungen</h2>
            <p className="section-intro">
              Zusätzlich zu unseren Garten- und Landschaftsleistungen bieten wir
              an:
            </p>
            <ul className="service-details-list">
              {furtherServices.map((item) => (
                <li key={item}>
                  <Check className="h-4 w-4" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
          </section>
        </div>
      </div>
      <ContactCTA prefix="services-contact" />
    </div>
  );
}
