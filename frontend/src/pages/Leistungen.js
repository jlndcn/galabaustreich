import { Check } from "lucide-react";
import { Seo } from "@/components/Seo";
import { Reveal } from "@/components/Reveal";
import { Photo } from "@/components/Photo";
import { ServicesOverview } from "@/components/ServicesOverview";
import { serviceImages } from "@/data/serviceImages";
import { seoPages } from "@/data/seo";
import { services, furtherServices } from "@/data/services";

function ServiceSection({ service }) {
  return (
    <section
      id={service.id}
      data-testid="service-section"
      className="service-detail"
    >
      <Reveal>
        <h2>{service.title}</h2>
        <p className="service-claim">{service.claim}</p>
      </Reveal>
      <Reveal className="service-figure" as="figure">
        <Photo
          {...serviceImages[service.id]}
          className="service-photo"
          sizes="(max-width: 1023px) 100vw, 800px"
        />
        <figcaption>KI Optimiert</figcaption>
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
    </div>
  );
}
