import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Seo } from "@/components/Seo";
import { Reveal } from "@/components/Reveal";
import { Photo } from "@/components/Photo";
import { ContactCTA } from "@/components/ContactCTA";
import { CrayonTulips } from "@/components/CrayonTulips";
import { seoPages } from "@/data/seo";
import { teamContent } from "@/data/pages";
import { getMediaSlot } from "@/data/media";

export default function Team() {
  const { hero, background } = teamContent;
  const heroMedia = getMediaSlot("team-hero");
  const backgroundMedia = getMediaSlot("team-background");

  return (
    <div data-testid="team-page">
      <Seo
        title={seoPages.team.title}
        description={seoPages.team.description}
        path={seoPages.team.path}
      />

      <section className="team-hero" aria-labelledby="team-heading">
        <h1 id="team-heading" className="sr-only">
          Unser Team
        </h1>
        <Photo
          name={heroMedia.photoKey}
          src={heroMedia.src}
          alt={heroMedia.alt}
          className="team-hero-photo"
          sizes="100vw"
          priority
        />
        <div className="team-hero-shade" aria-hidden="true" />
        <div className="section-shell team-hero-content">
          <p className="team-hero-copy">{hero}</p>
        </div>
      </section>

      <section className="team-info-band">
        <div className="section-shell team-background-layout aligned-split">
          <Reveal className="team-background aligned-copy">
            <h2 className="text-3xl sm:text-4xl">{background.title}</h2>
            <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
              {background.text}
            </p>
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
            <p className="team-photo-caption">{background.caption}</p>
            <div className="team-crayon-tulips" aria-hidden="true">
              <CrayonTulips />
            </div>
          </Reveal>
          <Reveal className="aligned-media">
            <Photo
              name={backgroundMedia.photoKey}
              src={backgroundMedia.src}
              alt={backgroundMedia.alt}
              sizes="(max-width: 767px) 100vw, 45vw"
            />
          </Reveal>
        </div>
      </section>

      <ContactCTA prefix="team-contact-cta" />
    </div>
  );
}
