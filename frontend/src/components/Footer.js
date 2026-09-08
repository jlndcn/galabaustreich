import { Link } from "react-router-dom";
import { Phone, Mail, ExternalLink, ArrowRight } from "lucide-react";
import { Logo } from "@/components/Logo";
import { GoogleRating } from "@/components/GoogleRating";
import { WhatsAppIcon, channelColors } from "@/components/BrandIcons";
import { site, mainNav, legalNav, googleLink } from "@/data/site";

// Light footer so the (dark-green) logo is shown as-is. Plain columns, clear links.
export const Footer = () => {
  const year = new Date().getFullYear();

  const contactLink =
    "inline-flex items-center gap-3 text-base font-medium text-[color:var(--brand-forest)] transition-colors hover:text-[color:var(--brand-accent-strong)]";
  const navLink =
    "inline-block text-base text-[color:var(--brand-ink-soft)] transition-colors hover:text-[color:var(--brand-accent-strong)]";

  return (
    <footer data-testid="site-footer" className="border-t border-border bg-[color:var(--brand-cream)]">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 py-16 sm:grid-cols-2 lg:grid-cols-12 lg:py-20">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-4">
            <Logo className="h-24 w-auto" priority={false} />
            <p className="mt-5 max-w-sm text-base leading-relaxed text-muted-foreground">
              Von der ersten Pflanze bis zum gewachsenen Garten – persönlich,
              zuverlässig und mit einem Blick für das Schöne. In Lübeck und
              Ostholstein für Sie im Einsatz.
            </p>
            <GoogleRating variant="inline" className="mt-5" />
            <Link
              to="/#kontakt"
              data-testid="footer-cta-link"
              className="mt-6 inline-flex h-11 items-center gap-2 rounded-full bg-[color:var(--brand-accent)] px-5 text-[15px] font-semibold text-[color:var(--brand-forest)] transition-colors hover:bg-[color:var(--brand-accent-strong)]"
            >
              Anfrage senden
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>

          {/* Contact */}
          <div className="lg:col-span-3">
            <h3 className="text-lg">Kontakt</h3>
            <ul className="mt-4 space-y-3">
              <li>
                <a href={site.phone.href} data-testid="footer-phone-link" className={contactLink}>
                  <Phone className="h-4 w-4 shrink-0 text-[color:var(--brand-accent-strong)]" strokeWidth={2} aria-hidden="true" />
                  {site.phone.display}
                </a>
              </li>
              <li>
                <a
                  href={site.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-testid="footer-whatsapp-link"
                  className={contactLink}
                >
                  <WhatsAppIcon className="h-4 w-4 shrink-0" style={{ color: channelColors.whatsapp }} />
                  WhatsApp
                </a>
              </li>
              <li>
                <a href={`mailto:${site.email}`} data-testid="footer-email-link" className={`${contactLink} break-all`}>
                  <Mail className="h-4 w-4 shrink-0 text-[color:var(--brand-accent-strong)]" strokeWidth={2} aria-hidden="true" />
                  {site.email}
                </a>
              </li>
            </ul>
          </div>

          {/* Address */}
          <div className="lg:col-span-3">
            <h3 className="text-lg">Anschrift</h3>
            <address
              data-testid="footer-address-text"
              className="mt-4 not-italic text-base leading-relaxed text-[color:var(--brand-ink-soft)]"
            >
              {site.legalName}
              <br />
              {site.address.street}
              <br />
              {site.address.zip} {site.address.city}
            </address>
            <a
              href={googleLink}
              target="_blank"
              rel="noopener noreferrer"
              data-testid="footer-google-link"
              className="text-link mt-4 text-base"
            >
              Auf Google ansehen
              <ExternalLink className="h-4 w-4" aria-hidden="true" />
            </a>
          </div>

          {/* Navigation */}
          <div className="lg:col-span-2">
            <nav aria-label="Seiten">
              <h3 className="text-lg">Seiten</h3>
              <ul className="mt-4 space-y-2.5">
                {mainNav.map((n) => (
                  <li key={n.path}>
                    <Link to={n.path} className={navLink}>
                      {n.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
            <nav aria-label="Rechtliches" className="mt-8">
              <h3 className="text-lg">Rechtliches</h3>
              <ul className="mt-4 space-y-2.5">
                {legalNav.map((n) => (
                  <li key={n.path}>
                    <Link to={n.path} className={navLink}>
                      {n.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>

        <div className="flex flex-col gap-2 border-t border-border py-6 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {site.legalName} · Garten- und Landschaftspflege in und um Lübeck
          </p>
          <p data-testid="footer-madeby">
            Made and hosted by{" "}
            <a
              href={site.madeBy.url}
              target="_blank"
              rel="noopener noreferrer"
              data-testid="footer-madeby-link"
              className="font-semibold text-[color:var(--brand-forest)] underline decoration-[color:var(--brand-accent)] decoration-2 underline-offset-4 transition-colors hover:text-[color:var(--brand-accent-strong)]"
            >
              {site.madeBy.label}
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};
