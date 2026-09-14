import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Seo } from "@/components/Seo";
import { Reveal } from "@/components/Reveal";
import { Photo } from "@/components/Photo";
import { ContactCTA } from "@/components/ContactCTA";
import { seoPages } from "@/data/seo";

const values = [
  {
    title: "Familiär",
    text: "Bei uns kennt man sich und packt gemeinsam an. Dieses familiäre Miteinander gehört für uns einfach dazu.",
  },
  {
    title: "Fachlich fundiert",
    text: "Gärtnerisches und forstliches Wissen bringen wir gemeinsam mit in Ihren Garten. Jeder trägt sein Können zur Arbeit bei.",
  },
  {
    title: "Sorgfältig",
    text: "Wir schauen genau hin und gehen behutsam mit dem um, was gewachsen ist. Denn ein gepflegter Garten steckt auch in den kleinen Details.",
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

      <section className="section-shell team-intro">
        <Reveal>
          <h1 className="text-4xl leading-[1.08] sm:text-5xl lg:text-[3.4rem]">
            Unser Team
          </h1>
        </Reveal>
        <Reveal delay={100}>
          <p className="mt-6 text-lg leading-relaxed text-muted-foreground sm:text-xl">
            Bei Streich geht es familiär zu: Man kennt sich, hilft sich und
            packt gemeinsam an. In unserem Team kommen gärtnerisches und
            forstliches Können zusammen. Was uns verbindet? Wir kümmern uns gern
            um Ihren Garten und legen Wert auf sorgfältige, gepflegte Arbeit.
          </p>
        </Reveal>
      </section>

      {/* Full group photograph; qualifications are not assigned to individuals. */}
      <section className="section-shell">
        <Reveal>
          <Photo
            name="team-streich"
            alt="Das Team von Streich gemeinsam im Garten mit Gartengeräten"
            className="team-wide-photo"
            sizes="(max-width: 1280px) 100vw, 1280px"
            priority
          />
        </Reveal>
      </section>

      {/* Values – stacked */}
      <section className="section-shell team-values-layout">
        <Reveal className="team-detail-photo">
          <Photo
            name="rose-in-haenden-streich"
            alt="Hände halten eine rote Rosenblüte vor einer Backsteinwand"
            sizes="(max-width: 767px) 100vw, 45vw"
          />
          <p>Mit einem Blick für das Schöne.</p>
        </Reveal>
        <div className="team-values">
          {values.map((v, i) => (
            <Reveal key={v.title} delay={i * 80} className="team-value">
              <span className="team-value-number" aria-hidden="true">
                0{i + 1}
              </span>
              <h2 className="text-2xl">{v.title}</h2>
              <p className="mt-3 text-lg leading-relaxed text-muted-foreground">
                {v.text}
              </p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Background */}
      <section className="section-shell">
        <Reveal className="team-background">
          <h2 className="text-3xl sm:text-4xl">
            Fachlicher Hintergrund im Team
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
            In unserem Team kommen forstliche und gärtnerische Ausbildung sowie
            Erfahrung aus der Baumschule zusammen – vom Forstwirt über den
            Zierpflanzengärtner bis zum Altgesellen.
          </p>
          <ul
            className="team-qualifications"
            aria-label="Fachlicher Hintergrund"
          >
            {[
              "Forstwirt",
              "Zierpflanzengärtner",
              "Baumschule",
              "Altgeselle",
            ].map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <p className="mt-6 text-base text-muted-foreground">
            Sie möchten wissen, wie wir Ihren Garten pflegen können?{" "}
            <Link
              to="/leistungen"
              data-testid="team-services-link"
              className="text-link text-base"
            >
              Unsere Leistungen ansehen
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </p>
        </Reveal>
      </section>

      <ContactCTA prefix="team-contact-cta" />
    </div>
  );
}
