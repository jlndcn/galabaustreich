import { useMemo } from "react";
import { Link, useLocation } from "react-router-dom";
import { ArrowRight, Phone, MapPin } from "lucide-react";
import { Seo } from "@/components/Seo";
import { Reveal } from "@/components/Reveal";
import { ServiceCard } from "@/components/ServiceCard";
import { ContactTiles } from "@/components/ContactTiles";
import { Photo } from "@/components/Photo";
import { Hero } from "@/components/Hero";
import { SeasonHint } from "@/components/SeasonHint";
import { seoPages, buildLocalBusinessJsonLd } from "@/data/seo";
import { services, keyServices } from "@/data/services";
import { site, contactPrompt, googleLink } from "@/data/site";
import { homeContent } from "@/data/home";
import { getMediaSlot } from "@/data/media";

export default function Home() {
  const location = useLocation();
  const prefill = useMemo(() => {
    const id = new URLSearchParams(location.search).get("leistung");
    const service = services.find((item) => item.id === id);
    return service ? `Anfrage zu: ${service.title}\n\n` : "";
  }, [location.search]);

  const detail = getMediaSlot("home-detail");
  const region = getMediaSlot("home-region");
  const copy = homeContent;

  return (
    <>
      <Seo {...seoPages.home} jsonLd={buildLocalBusinessJsonLd()} />
      <Hero initialMessage={prefill} />
      <div className="home-content">
        <section
          className="section-shell"
          data-testid="home-key-services-section"
        >
          <Reveal>
            <h2>{copy.keyServices.title}</h2>
            <p className="section-intro">{copy.keyServices.intro}</p>
          </Reveal>
          <div className="key-service-list">
            {keyServices.map((service) => (
              <Reveal key={service.id}>
                <ServiceCard service={service} variant="key" />
              </Reveal>
            ))}
          </div>
        </section>
        <section className="home-mid-cta" data-testid="home-mid-cta">
          <Reveal className="section-shell home-mid-cta-inner">
            <div>
              <p className="text-xl font-semibold">{copy.midCta.title}</p>
              <p className="mt-2 text-white/80">{copy.midCta.text}</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link
                to="/#kontakt"
                className="hero-primary"
                data-testid="home-mid-cta-form"
              >
                {copy.midCta.formCta}{" "}
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
              <a
                href={site.phone.href}
                className="hero-call"
                data-testid="home-mid-cta-call"
              >
                <Phone className="h-4 w-4" aria-hidden="true" />
                {copy.midCta.callCta}
              </a>
            </div>
          </Reveal>
        </section>

        <section className="section-shell more-home-services">
          <Reveal>
            <h2>{copy.moreServices.title}</h2>
          </Reveal>
          <div className="home-services-split aligned-split">
            <Reveal className="aligned-media">
              <Photo
                name={detail.photoKey}
                src={detail.src}
                alt={detail.alt}
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
          <div className="region-split aligned-split">
            <Reveal className="aligned-copy">
              <h2>{copy.region.title}</h2>
              <p className="section-intro">{copy.region.intro}</p>
              <Link
                to="/ueber-uns"
                data-testid="home-about-link"
                className="text-link mt-6"
              >
                {copy.region.linkLabel}{" "}
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </Reveal>
            <Reveal className="aligned-media">
              <Photo
                name={region.photoKey}
                src={region.src}
                alt={region.alt}
                className="home-region-photo"
              />
            </Reveal>
          </div>
        </section>

        <section
          id="kontaktinformationen"
          aria-labelledby="home-contact-title"
          data-testid="home-contact-section"
          className="home-contact"
        >
          <div className="section-shell">
            <h2 id="home-contact-title">{copy.contact.title}</h2>
            <p className="section-intro">
              {contactPrompt} {copy.contact.introSuffix}
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
                      {copy.contact.areaLine}
                    </span>
                  </a>
                </address>
              </div>
              <SeasonHint />
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
