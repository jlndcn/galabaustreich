import { Link } from "react-router-dom";
import { ArrowRight, User, MapPin, Leaf, Briefcase } from "lucide-react";
import { Seo } from "@/components/Seo";
import { Reveal } from "@/components/Reveal";
import { BrandSurface } from "@/components/BrandSurface";
import { ContactCTA } from "@/components/ContactCTA";
import { seoPages } from "@/data/seo";
import { site } from "@/data/site";
import { TreePine } from "lucide-react";

const serif = { fontFamily: "'Cormorant Garamond', ui-serif, Georgia, serif" };

const facts = [
  { icon: User, label: "Inhaberin", value: "Bianca Streich" },
  { icon: Briefcase, label: "Rechtsform", value: "Einzelunternehmen" },
  { icon: MapPin, label: "Standort", value: "Scharbeutz" },
  { icon: Leaf, label: "Tätig in", value: "Lübeck & Ostholstein" },
];

const values = [
  { title: "Persönlich", text: "Ein direkter Ansprechpartner, der Ihren Garten kennt – ohne anonyme Strukturen." },
  { title: "Zuverlässig", text: "Verlässliche Pflege über das ganze Gartenjahr, auf Ihren Bedarf abgestimmt." },
  { title: "Blick für das Schöne", text: "Wir arbeiten mit Gefühl für das, was bereits gewachsen ist." },
];

export default function UeberUns() {
  return (
    <div data-testid="about-page">
      <Seo
        title={seoPages.ueberUns.title}
        description={seoPages.ueberUns.description}
        path={seoPages.ueberUns.path}
      />

      <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-center lg:gap-12">
          <div className="lg:col-span-7">
            <Reveal>
              <span className="eyebrow">Über Streich</span>
              <h1 className="mt-4 text-4xl leading-[1.05] sm:text-5xl lg:text-6xl">
                Garten- und Landschaftspflege mit Wurzeln in der Region
              </h1>
            </Reveal>
            <Reveal delay={120}>
              <p className="mt-6 max-w-xl text-base leading-relaxed text-foreground/80 sm:text-lg">
                Von der ersten Pflanze bis zum gewachsenen Garten. Von der
                regelmäßigen Pflege bis zur Neugestaltung. Streich steht für
                Garten- und Landschaftspflege mit Wurzeln in der Region –
                persönlich, zuverlässig und mit einem Blick für das Schöne.
              </p>
            </Reveal>
            <Reveal delay={180}>
              <p className="mt-4 max-w-xl leading-relaxed text-foreground/75">
                Als Einzelunternehmen von Bianca Streich sind wir von Scharbeutz
                aus in Lübeck und Ostholstein für Sie im Einsatz – für
                Privatkunden ebenso wie für Unternehmen, Vereine und
                Organisationen.
              </p>
            </Reveal>
          </div>
          <div className="lg:col-span-5">
            <Reveal delay={120}>
              <div className="surface-organic grain relative aspect-[4/3] overflow-hidden rounded-3xl border border-border">
                <div className="absolute inset-0 flex items-center justify-center p-8">
                  <img
                    src="/logo-hero.webp"
                    width="760"
                    height="514"
                    alt="Logo der Garten- und Landschaftspflege Streich"
                    className="max-h-full w-auto max-w-[92%] object-contain"
                    decoding="async"
                  />
                </div>
              </div>
            </Reveal>
          </div>
        </div>

        {/* Facts */}
        <Reveal delay={120} className="mt-14 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {facts.map((f) => (
            <div key={f.label} className="rounded-2xl border border-border bg-white p-5">
              <f.icon className="h-5 w-5 text-[color:var(--brand-accent-strong)]" strokeWidth={1.7} aria-hidden="true" />
              <p className="eyebrow mt-3">{f.label}</p>
              <p className="mt-1 font-medium text-[color:var(--brand-forest)]">{f.value}</p>
            </div>
          ))}
        </Reveal>
      </section>

      {/* Values */}
      <section className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
        <Reveal className="max-w-2xl">
          <span className="eyebrow">Wofür wir stehen</span>
          <h2 className="mt-3 text-3xl sm:text-4xl">Persönlich, zuverlässig, gepflegt</h2>
        </Reveal>
        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
          {values.map((v, i) => (
            <Reveal key={v.title} delay={i * 80}>
              <div className="h-full rounded-2xl border border-border bg-white p-6 sm:p-7">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[color:var(--accent)]">
                  <TreePine className="h-5 w-5 text-[color:var(--brand-forest)]" strokeWidth={1.7} aria-hidden="true" />
                </span>
                <h3 className="mt-5 text-2xl">{v.title}</h3>
                <p className="mt-2 leading-relaxed text-foreground/75">{v.text}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={120} className="mt-10 flex flex-col gap-3 sm:flex-row">
          <Link to="/leistungen" className="link-underline text-sm">
            Unsere Leistungen ansehen
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
          <Link to="/team" className="link-underline text-sm">
            Unser Team kennenlernen
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </Reveal>
      </section>

      <div className="mt-8">
        <ContactCTA prefix="about-contact-cta" />
      </div>
    </div>
  );
}
