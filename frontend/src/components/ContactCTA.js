import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { ContactActions } from "@/components/ContactActions";
import { ChannelBadge } from "@/components/BrandIcons";
import { contactPrompt, site } from "@/data/site";

// Recurring contact block above the footer (Leistungen, Über uns, Team).
// Calm full-width band; each contact channel is colour-coded (phone / WhatsApp / e-mail).
export const ContactCTA = ({ prefix = "contact-cta" }) => {
  const titleId = `kontakt-cta-title-${prefix}`;
  const rowLink =
    "inline-flex items-center gap-3 text-lg text-white transition-colors hover:text-[color:var(--brand-accent)]";
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
              {site.contactCtaBody}
            </p>
            <div className="mt-8">
              <ContactActions prefix={prefix} tone="onDark" />
            </div>
          </div>

          <div className="lg:col-span-5 lg:border-l lg:border-white/15 lg:pl-12">
            <h3 className="text-lg text-white">{site.contactCtaAsideTitle}</h3>
            <ul className="mt-4 space-y-3">
              <li>
                <a href={site.phone.href} data-testid={`${prefix}-phone-link`} className={rowLink}>
                  <ChannelBadge channel="phone" size="h-9 w-9" iconSize="h-4 w-4" onDark />
                  {site.phone.display}
                </a>
              </li>
              <li>
                <a
                  href={site.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-testid={`${prefix}-whatsapp-link`}
                  className={rowLink}
                >
                  <ChannelBadge channel="whatsapp" size="h-9 w-9" iconSize="h-4 w-4" />
                  WhatsApp
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${site.email}`}
                  data-testid={`${prefix}-email-link`}
                  className={`${rowLink} break-all`}
                >
                  <ChannelBadge channel="email" size="h-9 w-9" iconSize="h-4 w-4" />
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
              className="mt-6 inline-flex h-11 items-center gap-2 rounded-full bg-[color:var(--brand-accent)] px-5 text-[15px] font-semibold text-[color:var(--brand-forest)] shadow-sm transition-[background-color,box-shadow] hover:bg-[color:var(--brand-accent-strong)] hover:shadow-md"
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
