import { Reveal } from "@/components/Reveal";
import { ContactActions } from "@/components/ContactActions";
import { contactPrompt, site } from "@/data/site";
import { Phone, Mail } from "lucide-react";

// Recurring contact-CTA block placed above the footer on every page.
// High-contrast dark panel for guaranteed legibility.
export const ContactCTA = ({ prefix = "contact-cta" }) => {
  const titleId = `kontakt-cta-title-${prefix}`;
  return (
    <section aria-labelledby={titleId} className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
      <Reveal className="relative overflow-hidden rounded-3xl border border-white/10 bg-[color:var(--brand-forest)] px-6 py-12 sm:px-12 sm:py-16">
        {/* soft accent glow, kept in the corner away from text for contrast */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[color:var(--brand-accent)]/15 blur-3xl"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-28 -left-20 h-64 w-64 rounded-full bg-[color:var(--brand-leaf)]/15 blur-3xl"
        />
        <div className="relative grid grid-cols-1 gap-10 lg:grid-cols-2 lg:items-center">
          <div>
            <span className="eyebrow !text-[color:var(--brand-accent)]">Kontakt</span>
            <h2
              id={titleId}
              className="mt-3 text-3xl font-semibold leading-tight text-white sm:text-4xl"
            >
              {contactPrompt}
            </h2>
            <p className="mt-4 max-w-lg leading-relaxed text-[color:var(--brand-cream)]/85">
              Erzählen Sie uns kurz, worum es geht – telefonisch, per WhatsApp
              oder per E-Mail. Wir melden uns persönlich bei Ihnen.
            </p>
            <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm font-medium text-[color:var(--brand-cream)]/90">
              <a
                href={site.phone.href}
                className="inline-flex items-center gap-2 transition-colors hover:text-[color:var(--brand-accent)]"
              >
                <Phone className="h-4 w-4" strokeWidth={1.8} aria-hidden="true" />
                {site.phone.display}
              </a>
              <a
                href={`mailto:${site.email}`}
                className="inline-flex items-center gap-2 transition-colors hover:text-[color:var(--brand-accent)]"
              >
                <Mail className="h-4 w-4" strokeWidth={1.8} aria-hidden="true" />
                {site.email}
              </a>
            </div>
          </div>
          <div className="lg:justify-self-end">
            <ContactActions prefix={prefix} tone="onDark" full />
          </div>
        </div>
      </Reveal>
    </section>
  );
};
