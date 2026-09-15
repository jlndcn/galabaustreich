import { Link } from "react-router-dom";
import { ArrowLeft, ArrowRight, Phone } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { ContactForm } from "@/components/ContactForm";
import { Photo } from "@/components/Photo";
import { GoogleRating } from "@/components/GoogleRating";
import { site } from "@/data/site";
import { homeContent } from "@/data/home";
import { getMediaSlot } from "@/data/media";
import { useEffect, useRef } from "react";

export function Hero({ initialMessage = "" }) {
  const formTitle = useRef(null);
  const trigger = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();
  const formOpen = ["#kontakt", "#anfrage"].includes(location.hash);
  const wasOpen = useRef(false);
  const copy = homeContent.hero;
  const media = getMediaSlot("home-hero");

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      if (formOpen) formTitle.current?.focus({ preventScroll: true });
      else if (wasOpen.current) trigger.current?.focus({ preventScroll: true });
      wasOpen.current = formOpen;
    });
    return () => cancelAnimationFrame(frame);
  }, [formOpen, location.key]);

  const closeForm = () =>
    navigate({ pathname: "/", search: location.search }, { replace: true });

  return (
    <section
      id="kontakt"
      className={`home-hero${formOpen ? " is-form-open" : ""}`}
      aria-labelledby={formOpen ? "hero-form-title" : "home-title"}
      onKeyDown={(event) => {
        if (formOpen && event.key === "Escape") closeForm();
      }}
    >
      <Photo
        name={media.photoKey}
        src={media.src}
        alt={media.alt}
        className="hero-photo"
        sizes="100vw"
        priority
        mobile={media.useMobileVariant}
      />
      <div className="hero-shade" aria-hidden="true" />
      <div className="hero-content mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        <div
          className="hero-copy"
          inert={formOpen}
          aria-hidden={formOpen || undefined}
        >
          <h1 id="home-title">{copy.title}</h1>
          <p className="hero-intro">{copy.intro}</p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link
              ref={trigger}
              to={{ pathname: "/", search: location.search, hash: "#kontakt" }}
              className="hero-primary"
              data-testid="home-hero-primary-cta"
              aria-controls="anfrage"
              aria-expanded={formOpen}
            >
              {copy.primaryCta}{" "}
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
            <a
              href={site.phone.href}
              className="hero-call"
              data-testid="home-hero-call-cta"
            >
              <Phone className="h-4 w-4" aria-hidden="true" />
              {site.phone.display}
            </a>
          </div>
          <div className="hero-links mt-6 flex flex-wrap items-center gap-x-8 gap-y-3">
            <GoogleRating variant="inline" />
          </div>
        </div>
        <div
          id="anfrage"
          className="hero-inquiry"
          inert={!formOpen}
          aria-hidden={!formOpen || undefined}
        >
          <button
            type="button"
            className="hero-back"
            onClick={closeForm}
            data-testid="hero-form-back"
          >
            <ArrowLeft size={16} aria-hidden="true" /> {copy.backLabel}
          </button>
          <h2 id="hero-form-title" ref={formTitle} tabIndex={-1}>
            {copy.formTitle}
          </h2>
          <p className="hero-form-intro">{copy.formIntro}</p>
          <ContactForm
            prefix="home-contact-form"
            initialMessage={initialMessage}
          />
        </div>
      </div>
    </section>
  );
}
