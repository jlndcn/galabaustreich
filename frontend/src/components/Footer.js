import { Link } from "react-router-dom";
import { Phone, Mail, ExternalLink } from "lucide-react";
import { Logo } from "@/components/Logo";
import { WhatsAppIcon, channelColors } from "@/components/BrandIcons";
import { site, mainNav, legalNav, googleLink } from "@/data/site";

// A distinct forest-green closing section; the original logo sits on ivory.
export const Footer = () => {
  const contactLink =
    "inline-flex items-center gap-3 text-base font-medium text-[color:var(--brand-forest)] transition-colors hover:text-[color:var(--brand-accent-strong)]";
  const navLink =
    "inline-block text-base text-[color:var(--brand-ink-soft)] transition-colors hover:text-[color:var(--brand-accent-strong)]";

  return (
    <footer data-testid="site-footer" className="site-footer">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="footer-layout">
          {/* Brand */}
          <div className="footer-brand">
            <Logo className="h-14 w-auto" priority={false} />
            <p className="text-muted-foreground">
              Von der ersten Pflanze bis zum gewachsenen Garten – persönlich,
              zuverlässig und mit einem Blick für das Schöne. In Lübeck und
              Ostholstein für Sie im Einsatz.
            </p>
          </div>

          {/* Contact */}
          <div className="footer-contact">
            <h3 className="text-lg">Kontakt</h3>
            <ul className="mt-4 space-y-3">
              <li>
                <a
                  href={site.phone.href}
                  data-testid="footer-phone-link"
                  className={contactLink}
                >
                  <Phone
                    className="h-4 w-4 shrink-0 text-[color:var(--brand-accent-strong)]"
                    strokeWidth={2}
                    aria-hidden="true"
                  />
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
                  <WhatsAppIcon
                    className="h-4 w-4 shrink-0"
                    style={{ color: channelColors.whatsapp }}
                  />
                  WhatsApp
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${site.email}`}
                  data-testid="footer-email-link"
                  className={`${contactLink} break-all`}
                >
                  <Mail
                    className="h-4 w-4 shrink-0 text-[color:var(--brand-accent-strong)]"
                    strokeWidth={2}
                    aria-hidden="true"
                  />
                  {site.email}
                </a>
              </li>
            </ul>
          </div>

          {/* Address */}
          <div className="footer-address">
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
          <div className="footer-navigation">
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
            <nav aria-label="Rechtliches">
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

        <div className="footer-bottom text-muted-foreground">
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
