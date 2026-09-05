import { Link } from "react-router-dom";
import { ArrowRight, Heart, Sprout, ShieldCheck, Check } from "lucide-react";
import { Seo } from "@/components/Seo";
import { Reveal } from "@/components/Reveal";
import { BrandSurface } from "@/components/BrandSurface";
import { ContactCTA } from "@/components/ContactCTA";
import { seoPages } from "@/data/seo";
import { Leaf, TreePine, Scissors } from "lucide-react";

const qualifications = [
  "Forstwirt",
  "Zierpflanzengärtner",
  "Altgeselle",
  "Erfahrung aus der Baumschule",
];

const values = [
  { icon: Heart, title: "Familiär", text: "Wir arbeiten familiär und nah – man kennt sich, und das merkt man in jedem Auftrag." },
  { icon: Sprout, title: "Fachlich fundiert", text: "Gärtnerisches und forstliches Wissen kommt bei uns direkt in Ihrem Garten zusammen." },
  { icon: ShieldCheck, title: "Sorgfältig", text: "Wir gehen sorgfältig mit dem um, was gewachsen ist – für ein gepflegtes Ergebnis." },
];

const emblems = [
  { icon: TreePine, label: "Forstliches Wissen" },
  { icon: Leaf, label: "Gärtnerisches Können" },
  { icon: Scissors, label: "Handwerkliche Sorgfalt" },
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
          <span className="eyebrow">Team</span>
          <h1 className="mt-4 text-4xl leading-[1.05] sm:text-5xl lg:text-6xl">
            Unser Team
          </h1>
          <p className="mt-6 text-base leading-relaxed text-foreground/80 sm:text-lg">
            Bei Streich geht es familiär zu. Hinter der Garten- und
            Landschaftspflege in und um Lübeck steht ein eingespieltes Team, in
            dem gärtnerisches und forstliches Können zusammenkommen – mit einem
            gemeinsamen Anspruch an sorgfältige, gepflegte Arbeit.
          </p>
        </Reveal>

        {/* Emblem surfaces (no photos yet) */}
        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-3">
          {emblems.map((e, i) => (
            <Reveal key={e.label} delay={i * 80}>
              <BrandSurface ratioClass="aspect-[4/3]" variant="organic" icon={e.icon} label={e.label} />
            </Reveal>
          ))}
        </div>
      </section>

      {/* Values */}
      <section className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {values.map((v, i) => (
            <Reveal key={v.title} delay={i * 80}>
              <div className="h-full rounded-2xl border border-border bg-white p-6 sm:p-7">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[color:var(--accent)]">
                  <v.icon className="h-5 w-5 text-[color:var(--brand-forest)]" strokeWidth={1.7} aria-hidden="true" />
                </span>
                <h3 className="mt-5 text-2xl">{v.title}</h3>
                <p className="mt-2 leading-relaxed text-foreground/75">{v.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Qualifications */}
      <section className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        <Reveal className="rounded-3xl border border-border bg-white p-8 sm:p-12">
          <span className="eyebrow">Fachlicher Hintergrund</span>
          <h2 className="mt-3 text-2xl sm:text-3xl">Qualifikationen im Team</h2>
          <p className="mt-4 max-w-2xl text-foreground/75">
            Zum fachlichen Hintergrund unseres Teams gehören unter anderem:
          </p>
          <ul className="mt-6 flex flex-wrap gap-3">
            {qualifications.map((q) => (
              <li
                key={q}
                className="inline-flex items-center gap-2 rounded-full border border-border bg-[color:var(--brand-cream)] px-4 py-2 text-sm font-medium text-[color:var(--brand-forest)]"
              >
                <Check className="h-4 w-4 text-[color:var(--brand-accent-strong)]" strokeWidth={2.2} aria-hidden="true" />
                {q}
              </li>
            ))}
          </ul>
          <p className="mt-6 text-sm text-foreground/60">
            Sie möchten wissen, wie wir Ihren Garten pflegen können?{" "}
            <Link to="/leistungen" className="link-underline text-sm">
              Unsere Leistungen entdecken
            </Link>
          </p>
        </Reveal>
      </section>

      <div className="mt-8">
        <ContactCTA prefix="team-contact-cta" />
      </div>
    </div>
  );
}
