import { Link } from "react-router-dom";
import { ArrowRight, Phone, Sprout, Users } from "lucide-react";
import { Seo } from "@/components/Seo";
import { Reveal } from "@/components/Reveal";
import { ServiceCard } from "@/components/ServiceCard";
import { ContactCTA } from "@/components/ContactCTA";
import { seoPages, buildLocalBusinessJsonLd } from "@/data/seo";
import { services, keyServices } from "@/data/services";
import { site } from "@/data/site";

const serif = { fontFamily: "'Cormorant Garamond', ui-serif, Georgia, serif" };

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
        <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-10 px-4 py-14 sm:px-6 lg:grid-cols-12 lg:gap-12 lg:px-8 lg:py-20">
          <div className="lg:col-span-6">
            <Reveal>
              <h1 className="text-4xl leading-[1.05] sm:text-5xl lg:text-6xl">
                Garten- und Landschaftspflege in und um Lübeck
              </h1>
            </Reveal>
            <Reveal delay={140}>
              <p className="mt-6 max-w-xl text-base leading-relaxed text-foreground/80 sm:text-lg">
                Von der ersten Pflanze bis zum gewachsenen Garten. Von der
                regelmäßigen Pflege bis zur Neugestaltung. Streich steht für
                Garten- und Landschaftspflege mit Wurzeln in der Region –
                persönlich, zuverlässig und mit einem Blick für das Schöne.
              </p>
            </Reveal>
            <Reveal delay={200}>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <a
                  href={site.phone.href}
                  data-testid="home-hero-primary-cta"
                  className="inline-flex h-12 items-center gap-2 rounded-xl bg-[color:var(--brand-accent)] px-6 text-sm font-semibold text-[color:var(--brand-forest)] shadow-sm transition-[background-color,box-shadow,transform] hover:bg-[color:var(--brand-accent-strong)] hover:shadow-md active:scale-[0.99]"
                >
                  <Phone className="h-4 w-4" strokeWidth={2} aria-hidden="true" />
                  Jetzt Kontakt aufnehmen
                </a>
                <Link
                  to="/leistungen"
                  className="inline-flex h-12 items-center gap-2 rounded-xl border border-border bg-white px-6 text-sm font-semibold text-[color:var(--brand-forest)] transition-colors hover:bg-[rgba(15,46,20,0.05)]"
                >
                  Leistungen entdecken
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </div>
            </Reveal>
          </div>

          <div className="lg:col-span-6">
            <Reveal delay={120} className="relative">
              <div className="surface-organic grain relative aspect-[5/4] overflow-hidden rounded-3xl border border-border sm:aspect-[4/3]">
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
        className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8 lg:py-12"
      >
        <Reveal className="max-w-2xl">
          <h2 className="text-3xl sm:text-4xl">
            Unsere gefragtesten Leistungen
          </h2>
          <p className="mt-4 text-foreground/75">
            Drei Leistungen, für die uns Privatkunden, Unternehmen und
            Organisationen in und um Lübeck besonders oft anfragen.
          </p>
        </Reveal>
        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
          {keyServices.map((s, i) => (
            <Reveal key={s.id} delay={i * 80}>
              <ServiceCard service={s} variant="key" />
            </Reveal>
          ))}
        </div>
      </section>

      {/* Further services teaser */}
      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <Reveal className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <span className="eyebrow">Weitere Leistungen</span>
            <h2 className="mt-3 text-3xl sm:text-4xl">
              Alles rund um Garten, Grünflächen und Grundstück
            </h2>
          </div>
          <Link to="/leistungen" className="link-underline shrink-0 text-sm">
            Alle Leistungen entdecken
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </Reveal>
        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {teaserServices.map((s, i) => (
            <Reveal key={s.id} delay={(i % 3) * 70}>
              <ServiceCard service={s} variant="teaser" />
            </Reveal>
          ))}
        </div>
      </section>

      {/* Region / trust strip */}
      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <Reveal className="overflow-hidden rounded-3xl border border-border bg-white shadow-[0_1px_0_rgba(15,46,20,0.04)]">
          <div className="grid grid-cols-1 lg:grid-cols-5">
            <div className="relative p-8 sm:p-12 lg:col-span-3">
              <span className="eyebrow">Mit Wurzeln in der Region</span>
              <p style={serif} className="mt-5 text-3xl leading-tight text-[color:var(--brand-forest)] sm:text-4xl">
                „Von der ersten Pflanze bis zum gewachsenen Garten.“
              </p>
              <p className="mt-5 max-w-lg leading-relaxed text-foreground/70">
                Streich ist ein Einzelunternehmen aus Scharbeutz und in Lübeck
                und Ostholstein für Sie im Einsatz – persönlich, zuverlässig und
                mit einem Blick für das Schöne.
              </p>
            </div>
            <div className="flex flex-col justify-center gap-3 border-t border-border bg-[color:var(--brand-cream)] p-6 sm:p-8 lg:col-span-2 lg:border-l lg:border-t-0">
              <Link
                to="/ueber-uns"
                className="group flex items-center gap-4 rounded-2xl border border-border bg-white px-5 py-4 transition-[transform,box-shadow] hover:-translate-y-0.5 hover:shadow-[0_12px_30px_rgba(15,46,20,0.10)]"
              >
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[color:var(--accent)]">
                  <Sprout className="h-5 w-5 text-[color:var(--brand-forest)]" strokeWidth={1.7} aria-hidden="true" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block font-semibold text-[color:var(--brand-forest)]">Über Streich</span>
                  <span className="block text-xs text-foreground/60">Wer hinter Streich steht</span>
                </span>
                <ArrowRight className="h-4 w-4 shrink-0 text-[color:var(--brand-leaf)] transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
              </Link>
              <Link
                to="/team"
                className="group flex items-center gap-4 rounded-2xl border border-border bg-white px-5 py-4 transition-[transform,box-shadow] hover:-translate-y-0.5 hover:shadow-[0_12px_30px_rgba(15,46,20,0.10)]"
              >
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[color:var(--accent)]">
                  <Users className="h-5 w-5 text-[color:var(--brand-forest)]" strokeWidth={1.7} aria-hidden="true" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block font-semibold text-[color:var(--brand-forest)]">Unser Team</span>
                  <span className="block text-xs text-foreground/60">Familiär &amp; fachlich versiert</span>
                </span>
                <ArrowRight className="h-4 w-4 shrink-0 text-[color:var(--brand-leaf)] transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </Reveal>
      </section>

      <div className="pb-4">
        <ContactCTA prefix="home-contact-cta" />
      </div>
    </>
  );
}
