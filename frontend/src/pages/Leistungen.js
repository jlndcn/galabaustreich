import { Check, Phone, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Seo } from "@/components/Seo";
import { Reveal } from "@/components/Reveal";
import { ContactCTA } from "@/components/ContactCTA";
import { seoPages } from "@/data/seo";
import { services, furtherServices } from "@/data/services";
import { site } from "@/data/site";

function ServiceSection({ service }) {
  return (
    <section
      id={service.id}
      data-testid="service-section"
      className="scroll-mt-28 py-10 first:pt-0 lg:py-12"
    >
      <Reveal>
        <h2 className="text-3xl sm:text-4xl">{service.title}</h2>
        <p className="mt-3 text-xl font-medium text-[color:var(--brand-leaf)]">
          {service.claim}
        </p>
        <div className="mt-5 max-w-3xl space-y-4 text-lg leading-relaxed text-muted-foreground">
          {service.description.map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </div>
        {service.list && (
          <ul className="mt-6 grid max-w-2xl grid-cols-1 gap-2 sm:grid-cols-2">
            {service.list.map((item) => (
              <li
                key={item}
                className="flex items-center gap-2.5 text-base text-[color:var(--brand-ink)]"
              >
                <Check
                  className="h-4 w-4 shrink-0 text-[color:var(--brand-accent-strong)]"
                  strokeWidth={2.4}
                  aria-hidden="true"
                />
                {item}
              </li>
            ))}
          </ul>
        )}
      </Reveal>
    </section>
  );
}

// Short contact hint placed between the service sections (plain text, no box).
function InlineContact() {
  return (
    <aside
      data-testid="services-inline-contact"
      className="my-4 border-l-2 border-[color:var(--brand-accent)] pl-5 lg:my-6"
    >
      <p className="text-lg font-semibold text-[color:var(--brand-forest)]">
        Sie haben eine Frage zu einer Leistung?
      </p>
      <p className="mt-1 text-base text-muted-foreground">
        Rufen Sie uns an oder senden Sie uns eine kurze Anfrage – wir beraten
        Sie persönlich.
      </p>
      <div className="mt-3 flex flex-wrap gap-x-8 gap-y-2">
        <a href={site.phone.href} className="text-link text-base">
          <Phone className="h-4 w-4" strokeWidth={2} aria-hidden="true" />
          {site.phone.display}
        </a>
        <Link to="/#kontakt" className="text-link text-base">
          Zum Anfrageformular
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Link>
      </div>
    </aside>
  );
}

export default function Leistungen() {
  return (
    <div data-testid="services-page">
      <Seo
        title={seoPages.leistungen.title}
        description={seoPages.leistungen.description}
        path={seoPages.leistungen.path}
      />

      {/* Intro */}
      <section className="mx-auto max-w-6xl px-4 pb-10 pt-14 sm:px-6 lg:px-8 lg:pb-14 lg:pt-20">
        <Reveal className="max-w-3xl">
          <h1 className="text-4xl leading-[1.08] sm:text-5xl lg:text-[3.4rem]">
            Unsere Leistungen rund um Garten und Grünflächen
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-muted-foreground sm:text-xl">
            Von der regelmäßigen Pflege bis zur Neugestaltung: Wir begleiten
            Gärten, Grünflächen und Grundstücke in Lübeck und Ostholstein durch
            das ganze Gartenjahr – abgestimmt auf Ihre Fläche und Ihren Bedarf.
          </p>
        </Reveal>
      </section>

      {/* Overview + sections */}
      <div className="mx-auto max-w-6xl px-4 pb-16 sm:px-6 lg:px-8 lg:pb-24">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
          <aside className="lg:col-span-4 xl:col-span-3">
            <nav
              aria-label="Leistungsübersicht"
              data-testid="services-overview-nav"
              className="lg:sticky lg:top-28"
            >
              <h2 className="text-lg">Übersicht</h2>
              <ul className="mt-3 border-t border-border">
                {services.map((s) => (
                  <li key={s.id} className="border-b border-border">
                    <a
                      href={`#${s.id}`}
                      data-testid="service-jump-link"
                      className="flex items-baseline py-2.5 text-base text-[color:var(--brand-ink-soft)] transition-colors hover:text-[color:var(--brand-accent-strong)]"
                    >
                      {s.title}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </aside>

          <div className="lg:col-span-8 xl:col-span-9">
            <div className="divide-y divide-border">
              {services.slice(0, 3).map((s) => (
                <ServiceSection key={s.id} service={s} />
              ))}
            </div>

            <InlineContact />

            <div className="divide-y divide-border border-t border-border">
              {services.slice(3).map((s) => (
                <ServiceSection key={s.id} service={s} />
              ))}
            </div>

            {/* Weitere Leistungen */}
            <section
              id="weitere-leistungen"
              data-testid="further-services-section"
              className="border-t border-border pt-10 lg:pt-12"
            >
              <Reveal>
                <h2 className="text-3xl sm:text-4xl">Weitere Leistungen</h2>
                <p className="mt-4 max-w-2xl text-lg leading-relaxed text-muted-foreground">
                  Zusätzlich zu unseren Garten- und Landschaftsleistungen bieten wir an:
                </p>
                <ul className="mt-5 space-y-2">
                  {furtherServices.map((item) => (
                    <li
                      key={item}
                      className="flex items-center gap-2.5 text-lg font-medium text-[color:var(--brand-forest)]"
                    >
                      <Check
                        className="h-4 w-4 shrink-0 text-[color:var(--brand-accent-strong)]"
                        strokeWidth={2.4}
                        aria-hidden="true"
                      />
                      {item}
                    </li>
                  ))}
                </ul>
                <p className="mt-6 text-base text-muted-foreground">
                  Sie möchten wissen, wer hinter Streich steht?{" "}
                  <Link to="/ueber-uns" className="text-link text-base">
                    Mehr über Streich erfahren
                  </Link>
                </p>
              </Reveal>
            </section>
          </div>
        </div>
      </div>

      <ContactCTA prefix="services-contact-cta" />
    </div>
  );
}
