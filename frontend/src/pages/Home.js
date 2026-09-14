import { useMemo } from "react";
import { Link, useLocation } from "react-router-dom";
import { ArrowRight, Phone, MapPin } from "lucide-react";
import { Seo } from "@/components/Seo";
import { Reveal } from "@/components/Reveal";
import { ServiceCard } from "@/components/ServiceCard";
import { ContactForm } from "@/components/ContactForm";
import { ContactTiles } from "@/components/ContactTiles";
import { Photo } from "@/components/Photo";
import { Hero } from "@/components/Hero";
import { PlantVine } from "@/components/PlantVine";
import { SeasonHint } from "@/components/SeasonHint";
import { seoPages, buildLocalBusinessJsonLd } from "@/data/seo";
import { services, keyServices } from "@/data/services";
import { site, contactPrompt, googleLink } from "@/data/site";

export default function Home() {
  const location = useLocation();
  const prefill = useMemo(() => {
    const id = new URLSearchParams(location.search).get("leistung");
    const service = services.find((item) => item.id === id);
    return service ? `Anfrage zu: ${service.title}\n\n` : "";
  }, [location.search]);

  return (
    <>
      <Seo {...seoPages.home} jsonLd={buildLocalBusinessJsonLd()} />
      <Hero />
      <div className="home-content">
        <PlantVine className="home-vine-top" />
        <section
          className="section-shell"
          data-testid="home-key-services-section"
        >
          <Reveal>
            <h2>Unsere wichtigsten Leistungen</h2>
            <p className="section-intro">
              Von der regelmäßigen Pflege bis zur Neugestaltung: Wir begleiten
              Gärten, Grünflächen und Grundstücke in Lübeck und Ostholstein
              durch das ganze Gartenjahr.
            </p>
          </Reveal>
          <div className="key-service-list">
            {keyServices.map((service) => (
              <Reveal key={service.id}>
                <ServiceCard service={service} variant="key" />
              </Reveal>
            ))}
          </div>
          <Reveal className="home-mid-cta" data-testid="home-mid-cta">
            <div>
              <p className="text-xl font-semibold">
                Nicht sicher, was Ihr Garten gerade braucht?
              </p>
              <p className="mt-2 text-white/80">
                Wir schauen uns Ihre Fläche an und beraten Sie persönlich –
                unverbindlich.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link
                to="/#kontakt"
                className="hero-primary"
                data-testid="home-mid-cta-form"
              >
                Anfrage senden{" "}
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
              <a
                href={site.phone.href}
                className="hero-call"
                data-testid="home-mid-cta-call"
              >
                <Phone className="h-4 w-4" aria-hidden="true" />
                Anrufen
              </a>
            </div>
          </Reveal>
        </section>

        <section className="section-shell more-home-services">
          <Reveal>
            <h2>
              Gartenpflege und Grundstückspflege in Lübeck und Ostholstein
            </h2>
          </Reveal>
          <div className="home-services-split">
            <Reveal>
              <Photo
                name="rosenpflege-detail-streich"
                alt="Hände mit Gartenschere bei der Pflege eines Rosenstrauchs"
                className="home-detail-photo"
                sizes="(max-width: 767px) 100vw, 33vw"
              />
            </Reveal>
            <div className="compact-service-list">
              {services
                .filter((service) => !service.key)
                .map((service) => (
                  <ServiceCard key={service.id} service={service} />
                ))}
            </div>
          </div>
        </section>

        <section className="section-shell home-region">
          <PlantVine className="home-vine-region" />
          <div className="region-split">
            <Reveal>
              <h2>Mit Wurzeln in der Region</h2>
              <p className="section-intro">
                Streich ist ein Einzelunternehmen aus Scharbeutz und in Lübeck
                und Ostholstein für Sie im Einsatz – persönlich, zuverlässig und
                mit einem Blick für das Schöne. Von der ersten Pflanze bis zum
                gewachsenen Garten.
              </p>
              <Link
                to="/ueber-uns"
                data-testid="home-about-link"
                className="text-link mt-6"
              >
                Mehr über Streich{" "}
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </Reveal>
            <Reveal>
              <Photo
                name="gartenbrunnen-streich"
                alt="Wasserspiel in einem begrünten Garten"
                className="home-region-photo"
              />
            </Reveal>
          </div>
        </section>

        <section
          id="kontakt"
          aria-labelledby="home-contact-title"
          data-testid="home-contact-section"
          className="home-contact"
        >
          <div className="section-shell">
            <h2 id="home-contact-title">Kontakt – so erreichen Sie uns</h2>
            <p className="section-intro">
              {contactPrompt} Wählen Sie den Weg, der Ihnen am liebsten ist –
              wir melden uns persönlich bei Ihnen.
            </p>
            <div className="contact-grid">
              <div className="contact-information">
                <ContactTiles prefix="home-contact-tile" />
                <address
                  className="contact-address"
                  data-testid="home-contact-address"
                >
                  <a
                    href={googleLink}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <MapPin className="h-5 w-5 shrink-0" aria-hidden="true" />
                    <span>
                      {site.legalName} · {site.address.street},{" "}
                      {site.address.zip} {site.address.city}
                      <br />
                      Im Einsatz in Lübeck, Scharbeutz und ganz Ostholstein
                    </span>
                  </a>
                </address>
                <SeasonHint className="mt-8" />
              </div>
              <div id="anfrage">
                <h3 className="text-2xl">Anfrage senden</h3>
                <p className="mt-2 text-base text-muted-foreground">
                  Kurz beschreiben, worum es geht – wir kümmern uns um den Rest.
                </p>
                <div className="contact-form-wrap mt-6">
                  <ContactForm
                    prefix="home-contact-form"
                    initialMessage={prefill}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
