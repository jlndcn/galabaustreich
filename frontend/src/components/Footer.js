import { Link } from "react-router-dom";
import { Phone, Mail, MessageCircle, ExternalLink } from "lucide-react";
import { site, mainNav, legalNav, googleLink } from "@/data/site";

// Clear, readable footer: plain columns, no boxes, no decorative labels.
export const Footer = () => {
  const year = new Date().getFullYear();

  const contactLink =
    "inline-flex items-center gap-3 text-base text-white/90 transition-colors hover:text-[color:var(--brand-accent)]";
  const navLink =
    "inline-block text-base text-white/80 transition-colors hover:text-[color:var(--brand-accent)]";

  return (
    <footer
      data-testid="site-footer"
      className="border-t border-white/15 bg-[color:var(--brand-forest)] text-white"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 py-16 sm:grid-cols-2 lg:grid-cols-12 lg:py-20">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-4">
            <p className="text-3xl font-bold tracking-tight text-white">Streich</p>
            <p className="mt-1 text-base text-white/70">
              Garten- und Landschaftspflege
            </p>
            <p className="mt-5 max-w-sm text-base leading-relaxed text-white/75">
              Von der ersten Pflanze bis zum gewachsenen Garten – persönlich,
              zuverlässig und mit einem Blick für das Schöne. In Lübeck und
              Ostholstein für Sie im Einsatz.
            </p>
          </div>

          {/* Contact */}
          <div className="lg:col-span-3">
            <h3 className="text-lg text-white">Kontakt</h3>
            <ul className="mt-4 space-y-3">
              <li>
                <a href={site.phone.href} data-testid="footer-phone-link" className={contactLink}>
                  <Phone className="h-4 w-4 shrink-0 text-[color:var(--brand-accent)]" strokeWidth={1.9} aria-hidden="true" />
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
                  <MessageCircle className="h-4 w-4 shrink-0 text-[color:var(--brand-accent)]" strokeWidth={1.9} aria-hidden="true" />
                  WhatsApp
                </a>
              </li>
              <li>
                <a href={`mailto:${site.email}`} data-testid="footer-email-link" className={`${contactLink} break-all`}>
                  <Mail className="h-4 w-4 shrink-0 text-[color:var(--brand-accent)]" strokeWidth={1.9} aria-hidden="true" />
                  {site.email}
                </a>
              </li>
            </ul>
          </div>

          {/* Address */}
          <div className="lg:col-span-3">
            <h3 className="text-lg text-white">Anschrift</h3>
            <address
              data-testid="footer-address-text"
              className="mt-4 not-italic text-base leading-relaxed text-white/80"
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
              className="mt-4 inline-flex items-center gap-2 text-base font-semibold text-white underline decoration-[color:var(--brand-accent)] decoration-2 underline-offset-4 transition-colors hover:text-[color:var(--brand-accent)]"
            >
              Auf Google ansehen
              <ExternalLink className="h-4 w-4" aria-hidden="true" />
            </a>
          </div>

          {/* Navigation */}
          <div className="lg:col-span-2">
            <nav aria-label="Seiten">
              <h3 className="text-lg text-white">Seiten</h3>
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
              <h3 className="text-lg text-white">Rechtliches</h3>
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

        <div className="flex flex-col gap-2 border-t border-white/15 py-6 text-sm text-white/60 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {site.legalName}
          </p>
          <p>Garten- und Landschaftspflege in und um Lübeck</p>
        </div>
      </div>
    </footer>
  );
};
