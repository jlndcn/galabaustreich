import { useMemo } from "react";
import { Link, useLocation } from "react-router-dom";
import { ArrowRight, Phone, Plus, MapPin } from "lucide-react";
import { Seo } from "@/components/Seo";
import { Reveal } from "@/components/Reveal";
import { ServiceCard } from "@/components/ServiceCard";
import { ContactForm } from "@/components/ContactForm";
import { ContactTiles } from "@/components/ContactTiles";
import { PhotoPlaceholder } from "@/components/PhotoPlaceholder";
import { SeasonHint } from "@/components/SeasonHint";
import { GoogleRating } from "@/components/GoogleRating";
import { seoPages, buildLocalBusinessJsonLd } from "@/data/seo";
import { services, furtherServices } from "@/data/services";
import { getSeasonalTop } from "@/data/seasons";
import { site, contactPrompt } from "@/data/site";

const primaryBtn =
  "inline-flex h-12 items-center gap-2 rounded-full bg-[color:var(--brand-accent)] px-6 text-base font-semibold text-[color:var(--brand-forest)] shadow-sm transition-[background-color,box-shadow,transform] hover:bg-[color:var(--brand-accent-strong)] hover:shadow-md active:scale-[0.99]";
const secondaryBtn =
  "inline-flex h-12 items-center gap-2 rounded-full border border-[rgba(15,46,20,0.3)] bg-white px-6 text-base font-semibold text-[color:var(--brand-forest)] transition-colors hover:bg-[rgba(15,46,20,0.05)]";

export default function Home() {
  const location = useLocation();

  // The three services most in demand right now (season-aware), the rest as compact list.
  const { season, services: topServices } = useMemo(() => getSeasonalTop(services, 3), []);
  const teaserServices = services.filter((s) => !topServices.includes(s));

  // Optional prefill when arriving from a service ("Diese Leistung anfragen").
  const prefill = useMemo(() => {
    const id = new URLSearchParams(location.search).get("leistung");
    const svc = id ? services.find((s) => s.id === id) : null;
    return svc ? `Anfrage zu: ${svc.title}\n\n` : "";
  }, [location.search]);

  return (
    <>
      <Seo
        title={seoPages.home.title}
        description={seoPages.home.description}
        path={seoPages.home.path}
        jsonLd={buildLocalBusinessJsonLd()}
      />

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-10 px-4 py-14 sm:px-6 lg:grid-cols-12 lg:gap-14 lg:px-8 lg:py-20">
          <div className="lg:col-span-7">
            <Reveal>
              <h1 className="text-4xl leading-[1.08] sm:text-5xl lg:text-[3.4rem]">
                Garten- und Landschaftspflege in und um Lübeck
              </h1>
            </Reveal>
            <Reveal delay={120}>
              <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground sm:text-xl">
                Von der ersten Pflanze bis zum gewachsenen Garten. Von der
                regelmäßigen Pflege bis zur Neugestaltung. Streich steht für
                Garten- und Landschaftspflege mit Wurzeln in der Region –
                persönlich, zuverlässig und mit einem Blick für das Schöne.
              </p>
            </Reveal>
            <Reveal delay={180}>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <Link to="/#kontakt" data-testid="home-hero-primary-cta" className={primaryBtn}>
                  Anfrage senden
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
                <a href={site.phone.href} data-testid="home-hero-call-cta" className={secondaryBtn}>
                  <Phone className="h-4 w-4" strokeWidth={2} aria-hidden="true" />
                  {site.phone.display}
                </a>
              </div>
              <div className="mt-6 flex flex-wrap items-center gap-x-8 gap-y-3">
                <Link to="/leistungen" data-testid="home-hero-services-link" className="text-link text-base">
                  Alle Leistungen ansehen
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
                <GoogleRating variant="inline" />
              </div>
            </Reveal>
          </div>

          <div className="lg:col-span-5">
            <Reveal delay={120}>
              <div className="surface-organic relative aspect-[4/3] overflow-hidden rounded-2xl">
                <div className="absolute inset-0 flex items-center justify-center p-6 sm:p-10">
                  <img
                    src="/logo-hero.webp"
                    width="1080"
                    height="809"
                    alt="Logo der Garten- und Landschaftspflege Streich mit Holstentor und Bäumen"
                    className="max-h-full w-auto max-w-[92%] object-contain"
                    decoding="async"
                  />
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Seasonal top services */}
      <section
        data-testid="home-key-services-section"
        className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16"
      >
        <Reveal className="max-w-3xl">
          <h2 className="text-3xl sm:text-4xl">
            Unsere gefragtesten Leistungen im{" "}
            <span data-testid="home-season-month">{season.monthName}</span>
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
            Passend zur Jahreszeit: Diese drei Arbeiten stehen im {season.monthName} in
            den meisten Gärten und auf den meisten Grundstücken in Lübeck und
            Ostholstein an. <span data-testid="home-season-note">{season.note}.</span>
          </p>
        </Reveal>
        <div className="mt-10 grid grid-cols-1 gap-10 md:grid-cols-3 md:gap-10">
          {topServices.map((s, i) => (
            <Reveal key={s.id} delay={i * 80}>
              <ServiceCard service={s} variant="key" />
            </Reveal>
          ))}
        </div>

        {/* CTA */}
        <Reveal delay={120}>
          <div
            data-testid="home-mid-cta"
            className="mt-12 flex flex-col gap-5 rounded-2xl bg-[color:var(--brand-forest)] px-6 py-7 text-white sm:px-8 lg:flex-row lg:items-center lg:justify-between"
          >
            <div>
              <p className="text-xl font-semibold text-white">
                Nicht sicher, was Ihr Garten gerade braucht?
              </p>
              <p className="mt-1 text-base text-white/80">
                Wir schauen uns Ihre Fläche an und beraten Sie persönlich – unverbindlich.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link to="/#kontakt" data-testid="home-mid-cta-form" className={primaryBtn}>
                Anfrage senden
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
              <a
                href={site.phone.href}
                data-testid="home-mid-cta-call"
                className="inline-flex h-12 items-center gap-2 rounded-full border border-white/30 px-6 text-base font-semibold text-white transition-colors hover:bg-white/10"
              >
                <Phone className="h-4 w-4" strokeWidth={2} aria-hidden="true" />
                Anrufen
              </a>
            </div>
          </div>
        </Reveal>
      </section>

      {/* Further services */}
      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <Reveal className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <h2 className="max-w-2xl text-3xl sm:text-4xl">
            Alles rund um Garten, Grünflächen und Grundstück
          </h2>
          <Link to="/leistungen" data-testid="home-all-services-link" className="text-link shrink-0 text-base">
            Alle Leistungen ansehen
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </Reveal>
        <div className="mt-8 grid grid-cols-1 gap-x-12 border-t border-border sm:grid-cols-2 sm:auto-rows-fr">
          {teaserServices.map((s, i) => (
            <Reveal key={s.id} delay={(i % 2) * 60} className="h-full">
              <ServiceCard service={s} variant="teaser" />
            </Reveal>
          ))}
          <Reveal delay={60} className="h-full">
            <Link
              to="/leistungen#weitere-leistungen"
              data-testid="home-further-services-link"
              className="group flex h-full items-start gap-4 border-b border-border py-5 transition-colors"
            >
              <Plus
                className="mt-1 h-5 w-5 shrink-0 text-[color:var(--brand-leaf)]"
                strokeWidth={1.7}
                aria-hidden="true"
              />
              <div className="min-w-0 flex-1">
                <h3 className="text-xl leading-snug group-hover:text-[color:var(--brand-accent-strong)]">
                  Weitere Leistungen
                </h3>
                <p className="mt-1 text-base leading-relaxed text-muted-foreground">
                  {furtherServices.join(" · ")}
                </p>
              </div>
              <ArrowRight
                className="mt-1.5 h-4 w-4 shrink-0 text-[color:var(--brand-leaf)] opacity-0 transition-opacity group-hover:opacity-100"
                aria-hidden="true"
              />
            </Link>
          </Reveal>
        </div>
      </section>

      {/* Region */}
      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <Reveal className="grid grid-cols-1 gap-8 border-t border-border pt-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <h2 className="text-3xl sm:text-4xl">Mit Wurzeln in der Region</h2>
            <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
              Streich ist ein Einzelunternehmen aus Scharbeutz und in Lübeck
              und Ostholstein für Sie im Einsatz – persönlich, zuverlässig und
              mit einem Blick für das Schöne. Von der ersten Pflanze bis zum
              gewachsenen Garten.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:gap-8">
              <Link to="/ueber-uns" data-testid="home-about-link" className="text-link text-lg">
                Mehr über Streich
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
              <Link to="/team" data-testid="home-team-link" className="text-link text-lg">
                Unser Team kennenlernen
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
          </div>
          <div className="lg:col-span-5">
            <PhotoPlaceholder
              label="Streich im Einsatz"
              hint="Team / Fahrzeug bei der Arbeit in einem Garten der Region"
              spec="Querformat · min. 1600×1200 px"
            />
          </div>
        </Reveal>
      </section>

      {/* Einblicke / impressions – strategic photo slots */}
      <section
        data-testid="home-gallery-section"
        className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16"
      >
        <Reveal className="max-w-3xl">
          <h2 className="text-3xl sm:text-4xl">Einblicke in unsere Arbeit</h2>
          <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
            An dieser Stelle zeigen wir künftig echte Aufnahmen aus Gärten und
            von Projekten in Lübeck und Ostholstein – von gepflegten Flächen bis
            zu neu gestalteten Gartenbereichen.
          </p>
        </Reveal>
        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <Reveal>
            <PhotoPlaceholder
              label="Projekt-Foto"
              hint="z. B. gepflegter Garten oder Grünfläche"
            />
          </Reveal>
          <Reveal delay={80}>
            <PhotoPlaceholder
              label="Detailaufnahme"
              hint="z. B. Heckenschnitt, Beet oder Rasenkante"
            />
          </Reveal>
          <Reveal delay={160}>
            <PhotoPlaceholder
              label="Vorher / Nachher"
              hint="z. B. Umgestaltung eines Gartenbereichs"
            />
          </Reveal>
        </div>
      </section>

      {/* Contact: tiles + inquiry form */}
      <section
        id="kontakt"
        aria-labelledby="home-contact-title"
        data-testid="home-contact-section"
        className="bg-white"
      >
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
          <div className="max-w-3xl">
            <h2 id="home-contact-title" className="text-3xl sm:text-4xl">
              Kontakt – so erreichen Sie uns
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
              {contactPrompt} Wählen Sie den Weg, der Ihnen am liebsten ist –
              wir melden uns persönlich bei Ihnen.
            </p>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-6">
              <ContactTiles prefix="home-contact-tile" />

              <div className="mt-6 flex items-start gap-3">
                <MapPin className="mt-1.5 h-5 w-5 shrink-0 text-[color:var(--brand-accent-strong)]" strokeWidth={1.8} aria-hidden="true" />
                <address data-testid="home-contact-address" className="not-italic text-base leading-relaxed text-muted-foreground">
                  {site.legalName} · {site.address.street}, {site.address.zip} {site.address.city}
                  <br />
                  Im Einsatz in Lübeck, Scharbeutz und ganz Ostholstein
                </address>
              </div>

              <SeasonHint className="mt-12" />
            </div>

            <div id="anfrage" className="lg:col-span-6 lg:border-l lg:border-border lg:pl-16">
              <h3 className="text-2xl">Anfrage senden</h3>
              <p className="mt-2 text-base text-muted-foreground">
                Kurz beschreiben, worum es geht – wir kümmern uns um den Rest.
              </p>
              <div className="mt-6">
                <ContactForm prefix="home-contact-form" initialMessage={prefill} />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
