import { Link } from "react-router-dom";
import { ArrowRight, Check } from "lucide-react";
import { Seo } from "@/components/Seo";
import { Reveal } from "@/components/Reveal";
import { ContactCTA } from "@/components/ContactCTA";
import { seoPages } from "@/data/seo";

const qualifications = [
  "Forstwirt",
  "Zierpflanzengärtner",
  "Altgeselle",
  "Erfahrung aus der Baumschule",
];

const values = [
  {
    title: "Familiär",
    text: "Wir arbeiten familiär und nah – man kennt sich, und das merkt man in jedem Auftrag.",
  },
  {
    title: "Fachlich fundiert",
    text: "Gärtnerisches und forstliches Wissen kommt bei uns direkt in Ihrem Garten zusammen.",
  },
  {
    title: "Sorgfältig",
    text: "Wir gehen sorgfältig mit dem um, was gewachsen ist – für ein gepflegtes Ergebnis.",
  },
];

export default function Team() {
  return (
    <div data-testid="team-page">
      <Seo
        title={seoPages.team.title}
        description={seoPages.team.description}
        path={seoPages.team.path}
      />

      <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
        <Reveal className="max-w-3xl">
          <h1 className="text-4xl leading-[1.08] sm:text-5xl lg:text-[3.4rem]">Unser Team</h1>
          <p className="mt-6 text-lg leading-relaxed text-muted-foreground sm:text-xl">
            Bei Streich geht es familiär zu. Hinter der Garten- und
            Landschaftspflege in und um Lübeck steht ein eingespieltes Team, in
            dem gärtnerisches und forstliches Können zusammenkommen – mit einem
            gemeinsamen Anspruch an sorgfältige, gepflegte Arbeit.
          </p>
        </Reveal>
      </section>

      {/* Values */}
      <section className="mx-auto max-w-6xl px-4 py-4 sm:px-6 lg:px-8 lg:py-8">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
          {values.map((v, i) => (
            <Reveal key={v.title} delay={i * 80} className="border-t-2 border-[color:var(--brand-forest)] pt-6">
              <h2 className="text-2xl">{v.title}</h2>
              <p className="mt-3 text-lg leading-relaxed text-muted-foreground">{v.text}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Qualifications */}
      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <Reveal className="grid grid-cols-1 gap-8 border-t border-border pt-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-6">
            <h2 className="text-3xl sm:text-4xl">Fachlicher Hintergrund im Team</h2>
            <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
              Zum fachlichen Hintergrund unseres Teams gehören unter anderem:
            </p>
            <p className="mt-6 text-base text-muted-foreground">
              Sie möchten wissen, wie wir Ihren Garten pflegen können?{" "}
              <Link to="/leistungen" data-testid="team-services-link" className="text-link text-base">
                Unsere Leistungen ansehen
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </p>
          </div>
          <ul data-testid="team-qualifications" className="lg:col-span-6 lg:pt-2">
            {qualifications.map((q) => (
              <li
                key={q}
                className="flex items-center gap-3 border-b border-border py-3.5 text-lg font-medium text-[color:var(--brand-forest)] first:border-t"
              >
                <Check
                  className="h-5 w-5 shrink-0 text-[color:var(--brand-accent-strong)]"
                  strokeWidth={2.3}
                  aria-hidden="true"
                />
                {q}
              </li>
            ))}
          </ul>
        </Reveal>
      </section>

      <ContactCTA prefix="team-contact-cta" />
    </div>
  );
}
