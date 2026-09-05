import { Link } from "react-router-dom";
import { Phone, Mail, ArrowRight } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { ContactActions } from "@/components/ContactActions";
import { contactPrompt, site } from "@/data/site";

// Recurring contact block above the footer (Leistungen, Über uns, Team).
// Calm full-width band, high contrast, no decorative boxes.
export const ContactCTA = ({ prefix = "contact-cta" }) => {
  const titleId = `kontakt-cta-title-${prefix}`;
  return (
    <section
      aria-labelledby={titleId}
      data-testid={`${prefix}-section`}
      className="bg-[color:var(--brand-forest)] text-white"
    >
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <Reveal className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <h2
              id={titleId}
              className="text-3xl leading-tight text-white sm:text-4xl"
            >
              {contactPrompt}
            </h2>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-white/80">
              Rufen Sie uns an, schreiben Sie uns per WhatsApp oder E-Mail –
              oder nutzen Sie unser kurzes Anfrageformular. Wir melden uns
              persönlich bei Ihnen.
            </p>
            <div className="mt-8">
              <ContactActions prefix={prefix} tone="onDark" />
            </div>
          </div>

          <div className="lg:col-span-5 lg:border-l lg:border-white/15 lg:pl-12">
            <h3 className="text-lg text-white">Direkt erreichbar</h3>
            <ul className="mt-4 space-y-3 text-lg">
              <li>
                <a
                  href={site.phone.href}
                  data-testid={`${prefix}-phone-link`}
                  className="inline-flex items-center gap-3 text-white transition-colors hover:text-[color:var(--brand-accent)]"
                >
                  <Phone className="h-5 w-5 text-[color:var(--brand-accent)]" strokeWidth={1.8} aria-hidden="true" />
                  {site.phone.display}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${site.email}`}
                  data-testid={`${prefix}-email-link`}
                  className="inline-flex items-center gap-3 break-all text-white transition-colors hover:text-[color:var(--brand-accent)]"
                >
                  <Mail className="h-5 w-5 shrink-0 text-[color:var(--brand-accent)]" strokeWidth={1.8} aria-hidden="true" />
                  {site.email}
                </a>
              </li>
            </ul>
            <address className="mt-6 not-italic text-base leading-relaxed text-white/75">
              {site.legalName}
              <br />
              {site.address.street}, {site.address.zip} {site.address.city}
            </address>
            <Link
              to="/#kontakt"
              data-testid={`${prefix}-form-link`}
              className="mt-6 inline-flex items-center gap-2 font-semibold text-white underline decoration-[color:var(--brand-accent)] decoration-2 underline-offset-4 transition-colors hover:text-[color:var(--brand-accent)]"
            >
              Zum Anfrageformular
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
};
