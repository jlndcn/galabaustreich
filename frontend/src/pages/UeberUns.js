import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Seo } from "@/components/Seo";
import { Reveal } from "@/components/Reveal";
import { ContactCTA } from "@/components/ContactCTA";
import { seoPages } from "@/data/seo";

const facts = [
  { label: "Inhaberin", value: "Bianca Streich" },
  { label: "Rechtsform", value: "Einzelunternehmen" },
  { label: "Standort", value: "Scharbeutz" },
  { label: "Tätig in", value: "Lübeck und Ostholstein" },
];

const values = [
  {
    title: "Persönlich",
    text: "Ein direkter Ansprechpartner, der Ihren Garten kennt – ohne anonyme Strukturen.",
  },
  {
    title: "Zuverlässig",
    text: "Verlässliche Pflege über das ganze Gartenjahr, auf Ihren Bedarf abgestimmt.",
  },
  {
    title: "Blick für das Schöne",
    text: "Wir arbeiten mit Gefühl für das, was bereits gewachsen ist.",
  },
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
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <Reveal>
              <h1 className="text-4xl leading-[1.08] sm:text-5xl lg:text-[3.4rem]">
                Garten- und Landschaftspflege mit Wurzeln in der Region
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
              <p className="mt-4 max-w-2xl text-lg leading-relaxed text-muted-foreground">
                Als Einzelunternehmen von Bianca Streich sind wir von Scharbeutz
                aus in Lübeck und Ostholstein für Sie im Einsatz – für
                Privatkunden ebenso wie für Unternehmen, Vereine und
                Organisationen.
              </p>
            </Reveal>
          </div>

          <div className="lg:col-span-5 lg:pt-3">
            <Reveal delay={120}>
              <h2 className="text-lg">Auf einen Blick</h2>
              <dl data-testid="about-facts" className="mt-3 border-t border-border">
                {facts.map((f) => (
                  <div
                    key={f.label}
                    className="grid grid-cols-[7.5rem_1fr] gap-4 border-b border-border py-4"
                  >
                    <dt className="text-base text-muted-foreground">{f.label}</dt>
                    <dd className="text-base font-semibold text-[color:var(--brand-forest)]">
                      {f.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
        <Reveal className="max-w-2xl">
          <h2 className="text-3xl sm:text-4xl">Wofür wir stehen</h2>
        </Reveal>
        <div className="mt-10 grid grid-cols-1 gap-10 md:grid-cols-3">
          {values.map((v, i) => (
            <Reveal key={v.title} delay={i * 80} className="border-t-2 border-[color:var(--brand-forest)] pt-6">
              <h3 className="text-2xl">{v.title}</h3>
              <p className="mt-3 text-lg leading-relaxed text-muted-foreground">{v.text}</p>
            </Reveal>
          ))}
        </div>

        <Reveal delay={120} className="mt-14 flex flex-col gap-4 sm:flex-row sm:gap-10">
          <Link to="/leistungen" data-testid="about-services-link" className="text-link text-lg">
            Unsere Leistungen ansehen
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
          <Link to="/team" data-testid="about-team-link" className="text-link text-lg">
            Unser Team kennenlernen
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </Reveal>
      </section>

      <div className="mt-16">
        <ContactCTA prefix="about-contact-cta" />
      </div>
    </div>
  );
}
