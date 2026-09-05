import { Link } from "react-router-dom";
import { Check } from "lucide-react";
import { Seo } from "@/components/Seo";
import { Reveal } from "@/components/Reveal";
import { BrandSurface } from "@/components/BrandSurface";
import { ContactCTA } from "@/components/ContactCTA";
import { seoPages } from "@/data/seo";
import { services, furtherServices } from "@/data/services";
import { getServiceIcon, getServiceMotif } from "@/components/serviceIcons";

const serif = { fontFamily: "'Cormorant Garamond', ui-serif, Georgia, serif" };

function ServiceSection({ service, index }) {
  const Icon = getServiceIcon(service.id);
  const motif = getServiceMotif(service.id);
  const flip = index % 2 === 1;
  const num = String(index + 1).padStart(2, "0");

  return (
    <section id={service.id} data-testid="service-section" className="scroll-mt-28">
      <Reveal>
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:items-center lg:gap-12">
          <div className={flip ? "lg:order-2" : ""}>
            <BrandSurface
              ratioClass="aspect-[4/3]"
              variant={service.highlight ? "forest" : "organic"}
              icon={Icon}
              label={motif}
            />
          </div>
          <div className={flip ? "lg:order-1" : ""}>
            <div className="flex items-center gap-3">
              <span className="eyebrow">{num}</span>
              {service.highlight && (
                <span className="eyebrow rounded-full bg-[rgba(15,187,130,0.12)] px-3 py-1 !text-[color:var(--brand-accent-strong)]">
                  Schwerpunkt
                </span>
              )}
            </div>
            <h2 className="mt-3 text-3xl sm:text-4xl">{service.title}</h2>
            <p style={serif} className="mt-2 text-xl italic text-[color:var(--brand-leaf)]">
              {service.claim}
            </p>
            <div className="mt-5 space-y-4 text-foreground/80">
              {service.description.map((para, i) => (
                <p key={i} className="leading-relaxed">
                  {para}
                </p>
              ))}
            </div>
            {service.list && (
              <ul className="mt-5 flex flex-wrap gap-2">
                {service.list.map((item) => (
                  <li
                    key={item}
                    className="inline-flex items-center gap-1.5 rounded-full border border-border bg-white px-3 py-1 text-sm text-[color:var(--brand-forest)]"
                  >
                    <Check className="h-3.5 w-3.5 text-[color:var(--brand-accent-strong)]" strokeWidth={2.4} aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </Reveal>
    </section>
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
      <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
        <Reveal className="max-w-3xl">
          <span className="eyebrow">Leistungen</span>
          <h1 className="mt-4 text-4xl leading-[1.05] sm:text-5xl lg:text-6xl">
            Unsere Leistungen rund um Garten und Grünflächen
          </h1>
          <p className="mt-6 text-base leading-relaxed text-foreground/80 sm:text-lg">
            Von der regelmäßigen Pflege bis zur Neugestaltung: Wir begleiten
            Gärten, Grünflächen und Grundstücke in Lübeck und Ostholstein durch
            das ganze Gartenjahr – abgestimmt auf Ihre Fläche und Ihren Bedarf.
          </p>
        </Reveal>

        {/* Quick jump */}
        <Reveal delay={120} className="mt-8 flex flex-wrap gap-2">
          {services.map((s) => (
            <a
              key={s.id}
              href={`#${s.id}`}
              className="inline-flex items-center rounded-full border border-border bg-white px-4 py-2 text-sm text-foreground/75 transition-colors hover:border-[color:var(--brand-accent)] hover:text-[color:var(--brand-forest)]"
            >
              {s.title}
            </a>
          ))}
        </Reveal>
      </section>

      {/* First three services */}
      <div className="mx-auto max-w-6xl space-y-16 px-4 sm:px-6 lg:space-y-24 lg:px-8">
        {services.slice(0, 3).map((s, i) => (
          <ServiceSection key={s.id} service={s} index={i} />
        ))}
      </div>

      <div className="my-16 lg:my-24">
        <ContactCTA prefix="services-mid-cta" />
      </div>

      {/* Remaining services */}
      <div className="mx-auto max-w-6xl space-y-16 px-4 sm:px-6 lg:space-y-24 lg:px-8">
        {services.slice(3).map((s, i) => (
          <ServiceSection key={s.id} service={s} index={i + 3} />
        ))}
      </div>

      {/* Weitere Leistungen */}
      <section className="mx-auto max-w-6xl px-4 pt-16 sm:px-6 lg:px-8 lg:pt-24">
        <Reveal className="rounded-3xl border border-border bg-white p-8 sm:p-12">
          <span className="eyebrow">Weitere Leistungen</span>
          <h2 className="mt-3 text-2xl sm:text-3xl">Darüber hinaus für Sie da</h2>
          <p className="mt-4 max-w-2xl text-foreground/75">
            Zusätzlich zu unseren Garten- und Landschaftsleistungen bieten wir an:
          </p>
          <ul className="mt-6 flex flex-wrap gap-3">
            {furtherServices.map((item) => (
              <li
                key={item}
                className="inline-flex items-center gap-2 rounded-full border border-border bg-[color:var(--brand-cream)] px-4 py-2 text-sm font-medium text-[color:var(--brand-forest)]"
              >
                <Check className="h-4 w-4 text-[color:var(--brand-accent-strong)]" strokeWidth={2.2} aria-hidden="true" />
                {item}
              </li>
            ))}
          </ul>
          <p className="mt-6 text-sm text-foreground/60">
            Sie haben eine Frage zu einer bestimmten Leistung?{" "}
            <Link to="/ueber-uns" className="link-underline text-sm">
              Mehr über Streich erfahren
            </Link>
          </p>
        </Reveal>
      </section>

      <div className="mt-16 lg:mt-24">
        <ContactCTA prefix="services-contact-cta" />
      </div>
    </div>
  );
}
