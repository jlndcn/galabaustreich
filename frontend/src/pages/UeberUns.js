import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Seo } from "@/components/Seo";
import { Reveal } from "@/components/Reveal";
import { Photo } from "@/components/Photo";
import { CardPlant } from "@/components/CardPlant";
import { ContactCTA } from "@/components/ContactCTA";
import { seoPages } from "@/data/seo";
import { aboutContent } from "@/data/pages";
import { getMediaSlot } from "@/data/media";

export default function UeberUns() {
  const { title, intro, valuesHeading, values } = aboutContent;
  const portrait = getMediaSlot("about-portrait");
  const impression1 = getMediaSlot("about-impression-1");
  const impression2 = getMediaSlot("about-impression-2");

  return (
    <div data-testid="about-page" className="page-floral">
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
                {title}
              </h1>
            </Reveal>
            <Reveal delay={120}>
              <p className="mt-8 max-w-2xl text-lg leading-relaxed text-muted-foreground sm:text-xl">
                {intro[0]}
              </p>
            </Reveal>
            <Reveal delay={180}>
              <p className="mt-4 max-w-2xl text-lg leading-relaxed text-muted-foreground">
                {intro[1]}
              </p>
            </Reveal>
          </div>

          <Reveal delay={120} className="aligned-media">
            <Photo
              name={portrait.photoKey}
              src={portrait.src}
              alt={portrait.alt}
              className="about-portrait"
              priority
            />
          </Reveal>
        </div>
      </section>

      <section className="section-shell">
        <Reveal className="max-w-2xl">
          <h2 className="text-3xl sm:text-4xl">{valuesHeading}</h2>
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

      <section className="section-shell">
        <Reveal>
          <div className="about-impressions">
            <Photo
              name={impression1.photoKey}
              src={impression1.src}
              alt={impression1.alt}
            />
            <Photo
              name={impression2.photoKey}
              src={impression2.src}
              alt={impression2.alt}
            />
          </div>
        </Reveal>
      </section>

      <ContactCTA prefix="about-contact-cta" />
    </div>
  );
}
