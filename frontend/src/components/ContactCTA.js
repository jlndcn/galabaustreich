import { Reveal } from "@/components/Reveal";
import { ContactActions } from "@/components/ContactActions";
import { contactPrompt, site } from "@/data/site";
import { Phone, Mail } from "lucide-react";

// Recurring contact-CTA block placed above the footer on every page.
export const ContactCTA = ({ prefix = "contact-cta" }) => {
  return (
    <section aria-labelledby="kontakt-cta-title" className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
      <Reveal className="surface-forest grain relative overflow-hidden rounded-3xl border border-white/10 px-6 py-10 sm:px-10 sm:py-14">
        <div className="relative grid grid-cols-1 gap-8 lg:grid-cols-2 lg:items-center">
          <div>
            <span className="eyebrow !text-[color:var(--brand-accent)]">Kontakt</span>
            <h2
              id="kontakt-cta-title"
              className="mt-3 text-3xl sm:text-4xl text-[color:var(--brand-cream)]"
            >
              {contactPrompt}
            </h2>
            <p className="mt-4 max-w-lg text-[color:var(--brand-cream)]/80">
              Erzählen Sie uns kurz, worum es geht – telefonisch, per WhatsApp oder
              per E-Mail. Wir melden uns persönlich bei Ihnen.
            </p>
            <div className="mt-6 flex flex-col gap-2 text-sm text-[color:var(--brand-cream)]/90">
              <a href={site.phone.href} className="inline-flex items-center gap-2 hover:text-[color:var(--brand-accent)]">
                <Phone className="h-4 w-4" strokeWidth={1.8} aria-hidden="true" />
                {site.phone.display}
              </a>
              <a href={`mailto:${site.email}`} className="inline-flex items-center gap-2 hover:text-[color:var(--brand-accent)]">
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
