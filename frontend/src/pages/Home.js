import { Link } from "react-router-dom";
import { ArrowRight, Phone, Mail, MessageCircle, MapPin, ExternalLink, Plus } from "lucide-react";
import { Seo } from "@/components/Seo";
import { Reveal } from "@/components/Reveal";
import { ServiceCard } from "@/components/ServiceCard";
import { ContactForm } from "@/components/ContactForm";
import { seoPages, buildLocalBusinessJsonLd } from "@/data/seo";
import { services, keyServices, furtherServices } from "@/data/services";
import { site, googleLink, contactPrompt } from "@/data/site";

export default function Home() {
  const teaserServices = services.filter((s) => !s.key);

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
                <a
                  href={site.phone.href}
                  data-testid="home-hero-primary-cta"
                  className="inline-flex h-12 items-center gap-2 rounded-lg bg-[color:var(--brand-accent)] px-6 text-base font-semibold text-[color:var(--brand-forest)] shadow-sm transition-[background-color,box-shadow,transform] hover:bg-[color:var(--brand-accent-strong)] hover:shadow-md active:scale-[0.99]"
                >
                  <Phone className="h-4 w-4" strokeWidth={2} aria-hidden="true" />
                  Jetzt anrufen
                </a>
                <Link
                  to="/leistungen"
                  data-testid="home-hero-services-link"
                  className="inline-flex h-12 items-center gap-2 rounded-lg border border-[rgba(15,46,20,0.3)] bg-white px-6 text-base font-semibold text-[color:var(--brand-forest)] transition-colors hover:bg-[rgba(15,46,20,0.05)]"
                >
                  Leistungen ansehen
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </div>
              <p className="mt-5 text-base text-muted-foreground">
                Oder senden Sie uns eine{" "}
                <a href="#kontakt" data-testid="home-hero-form-link" className="text-link">
                  Anfrage über das Formular
                </a>
                .
              </p>
            </Reveal>
          </div>

          <div className="lg:col-span-5">
            <Reveal delay={120}>
              <div className="surface-organic relative aspect-[4/3] overflow-hidden rounded-2xl">
                <div className="absolute inset-0 flex items-center justify-center p-6 sm:p-10">
                  <img
                    src="/logo-hero.webp"
                    width="760"
                    height="514"
                    alt="Logo der Garten- und Landschaftspflege Streich mit stilisiertem Holstentor und Baum"
                    className="max-h-full w-auto max-w-[94%] object-contain"
                    decoding="async"
                  />
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Key services */}
      <section
        data-testid="home-key-services-section"
        className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16"
      >
        <Reveal className="max-w-2xl">
          <h2 className="text-3xl sm:text-4xl">Unsere gefragtesten Leistungen</h2>
          <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
            Drei Leistungen, für die uns Privatkunden, Unternehmen und
            Organisationen in und um Lübeck besonders oft anfragen.
          </p>
        </Reveal>
        <div className="mt-10 grid grid-cols-1 gap-10 md:grid-cols-3 md:gap-10">
          {keyServices.map((s, i) => (
            <Reveal key={s.id} delay={i * 80}>
              <ServiceCard service={s} variant="key" />
            </Reveal>
          ))}
        </div>
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
        <div className="mt-8 grid grid-cols-1 gap-x-12 border-t border-border sm:grid-cols-2">
          {teaserServices.map((s, i) => (
            <Reveal key={s.id} delay={(i % 2) * 60}>
              <ServiceCard service={s} variant="teaser" />
            </Reveal>
          ))}
          <Reveal delay={60}>
            <Link
              to="/leistungen#weitere-leistungen"
              data-testid="home-further-services-link"
              className="group flex items-start gap-4 border-b border-border py-5 transition-colors"
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
          </div>
          <div className="flex flex-col justify-center gap-4 lg:col-span-5">
            <Link to="/ueber-uns" data-testid="home-about-link" className="text-link text-lg">
              Mehr über Streich
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
            <Link to="/team" data-testid="home-team-link" className="text-link text-lg">
              Unser Team kennenlernen
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </Reveal>
      </section>

      {/* Contact + inquiry form */}
      <section
        id="kontakt"
        aria-labelledby="home-contact-title"
        data-testid="home-contact-section"
        className="bg-white"
      >
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-12 px-4 py-16 sm:px-6 lg:grid-cols-12 lg:gap-16 lg:px-8 lg:py-20">
          <div className="lg:col-span-5">
            <h2 id="home-contact-title" className="text-3xl sm:text-4xl">
              Kontakt
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
              {contactPrompt} Rufen Sie uns an, schreiben Sie uns per WhatsApp
              oder E-Mail – oder senden Sie uns eine kurze Anfrage über das
              Formular. Wir melden uns persönlich bei Ihnen.
            </p>

            <ul className="mt-8 space-y-4 text-lg">
              <li>
                <a
                  href={site.phone.href}
                  data-testid="home-contact-phone-link"
                  className="inline-flex items-center gap-3 font-semibold text-[color:var(--brand-forest)] transition-colors hover:text-[color:var(--brand-accent-strong)]"
                >
                  <Phone className="h-5 w-5 text-[color:var(--brand-accent-strong)]" strokeWidth={1.8} aria-hidden="true" />
                  {site.phone.display}
                </a>
              </li>
              <li>
                <a
                  href={site.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-testid="home-contact-whatsapp-link"
                  className="inline-flex items-center gap-3 font-semibold text-[color:var(--brand-forest)] transition-colors hover:text-[color:var(--brand-accent-strong)]"
                >
                  <MessageCircle className="h-5 w-5 text-[color:var(--brand-accent-strong)]" strokeWidth={1.8} aria-hidden="true" />
                  WhatsApp
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${site.email}`}
                  data-testid="home-contact-email-link"
                  className="inline-flex items-center gap-3 break-all font-semibold text-[color:var(--brand-forest)] transition-colors hover:text-[color:var(--brand-accent-strong)]"
                >
                  <Mail className="h-5 w-5 shrink-0 text-[color:var(--brand-accent-strong)]" strokeWidth={1.8} aria-hidden="true" />
                  {site.email}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="mt-1.5 h-5 w-5 shrink-0 text-[color:var(--brand-accent-strong)]" strokeWidth={1.8} aria-hidden="true" />
                <address data-testid="home-contact-address" className="not-italic text-base leading-relaxed text-muted-foreground">
                  {site.legalName}
                  <br />
                  {site.address.street}
                  <br />
                  {site.address.zip} {site.address.city}
                </address>
              </li>
            </ul>

            <a
              href={googleLink}
              target="_blank"
              rel="noopener noreferrer"
              data-testid="home-google-link"
              className="text-link mt-8 text-base"
            >
              Auf Google ansehen
              <ExternalLink className="h-4 w-4" aria-hidden="true" />
            </a>
          </div>

          <div id="anfrage" className="lg:col-span-7 lg:border-l lg:border-border lg:pl-16">
            <h3 className="text-2xl">Anfrage senden</h3>
            <div className="mt-6">
              <ContactForm prefix="home-contact-form" />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
