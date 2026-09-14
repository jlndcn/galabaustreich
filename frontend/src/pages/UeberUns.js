import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Seo } from "@/components/Seo";
import { Reveal } from "@/components/Reveal";
import { Photo } from "@/components/Photo";
import { CardPlant } from "@/components/CardPlant";
import { ContactCTA } from "@/components/ContactCTA";
import { seoPages } from "@/data/seo";

const values = [
  {
    title: "Persönlich",
    text: "Bei uns sprechen Sie direkt mit den Menschen, die sich um Ihren Garten kümmern. Persönlich und ohne Umwege.",
  },
  {
    title: "Zuverlässig",
    text: "Wir stimmen die Pflege auf Ihren Garten und Ihren Bedarf ab – verlässlich durch das ganze Gartenjahr.",
  },
  {
    title: "Blick für das Schöne",
    text: "Was in Ihrem Garten gewachsen ist, liegt uns am Herzen. Damit gehen wir sorgfältig und mit einem Blick für das Schöne um.",
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

      <section className="section-shell">
        <div className="about-intro-layout aligned-split">
          <div className="aligned-copy">
            <Reveal>
              <h1 className="text-4xl leading-[1.08] sm:text-5xl lg:text-[3.4rem]">
                Garten- und Landschaftspflege mit Wurzeln in der Region
              </h1>
            </Reveal>
            <Reveal delay={120}>
              <p className="mt-8 max-w-2xl text-lg leading-relaxed text-muted-foreground sm:text-xl">
                Ob die erste Pflanze in die Erde kommt oder Ihr Garten
                regelmäßig Pflege braucht: Wir kümmern uns darum. Persönlich,
                zuverlässig und mit einem Blick für das Schöne – so arbeiten wir
                bei Streich.
              </p>
            </Reveal>
            <Reveal delay={180}>
              <p className="mt-4 max-w-2xl text-lg leading-relaxed text-muted-foreground">
                Als Einzelunternehmen von Bianca Streich sind wir in Scharbeutz
                zu Hause. Von hier aus sind wir in Lübeck und Ostholstein für
                Sie unterwegs – für Privatkunden genauso wie für Unternehmen,
                Vereine und Organisationen.
              </p>
            </Reveal>
          </div>

          {/* Genuine customer portrait, without assigning an unconfirmed identity. */}
          <Reveal delay={120} className="aligned-media">
            <Photo
              name="streich-im-rosengarten"
              alt="Eine Mitarbeiterin von Streich zwischen blühenden Rosen"
              className="about-portrait"
              priority
            />
          </Reveal>
        </div>
      </section>

      {/* Values */}
      <section className="section-shell">
        <Reveal className="max-w-2xl">
          <h2 className="text-3xl sm:text-4xl">Wofür wir stehen</h2>
        </Reveal>
        <div className="about-values">
          {values.map((v, i) => (
            <Reveal key={v.title} delay={i * 80} className="value-box">
              <CardPlant />
              <h3 className="text-2xl">{v.title}</h3>
              <p className="mt-3 text-lg leading-relaxed text-muted-foreground">
                {v.text}
              </p>
            </Reveal>
          ))}
        </div>

        {/* Two equal columns, mirroring the page grid */}
        <Reveal
          delay={120}
          className="mt-14 grid grid-cols-1 gap-x-10  sm:grid-cols-2"
        >
          <Link
            to="/leistungen"
            data-testid="about-services-link"
            className="group flex items-center justify-between gap-4 py-5 text-lg font-semibold text-[color:var(--brand-forest)] transition-colors hover:text-[color:var(--brand-accent-strong)]"
          >
            Unsere Leistungen ansehen
            <ArrowRight
              className="h-5 w-5 shrink-0 text-[color:var(--brand-accent-strong)] transition-transform group-hover:translate-x-0.5"
              aria-hidden="true"
            />
          </Link>
          <Link
            to="/team"
            data-testid="about-team-link"
            className="group flex items-center justify-between gap-4  py-5 text-lg font-semibold text-[color:var(--brand-forest)] transition-colors hover:text-[color:var(--brand-accent-strong)]"
          >
            Unser Team kennenlernen
            <ArrowRight
              className="h-5 w-5 shrink-0 text-[color:var(--brand-accent-strong)] transition-transform group-hover:translate-x-0.5"
              aria-hidden="true"
            />
          </Link>
        </Reveal>
      </section>

      {/* Genuine impressions from the working day. */}
      <section className="section-shell">
        <Reveal>
          <div className="about-impressions">
            <Photo
              name="garten-streich-arbeitskleidung"
              alt="Mitarbeiterin in grüner Arbeitskleidung mit dem Firmennamen Streich"
            />
            <Photo
              name="gartenarbeit-streich"
              alt="Ein Mitarbeiter mit Helm, Gehörschutz und Motorsense im Garten"
            />
          </div>
        </Reveal>
      </section>

      <ContactCTA prefix="about-contact-cta" />
    </div>
  );
}
