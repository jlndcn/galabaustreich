import { Link } from "react-router-dom";
import { MapPin, Phone, Mail, MessageCircle } from "lucide-react";
import { site, mainNav, legalNav } from "@/data/site";

const serif = { fontFamily: "'Cormorant Garamond', ui-serif, Georgia, serif" };

export const Footer = () => {
  const year = new Date().getFullYear();
  const pageLinks = mainNav.filter((n) => n.path !== "/");

  return (
    <footer
      data-testid="site-footer"
      className="mt-24 bg-[color:var(--brand-forest)] text-[color:var(--brand-cream)]"
    >
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div className="sm:col-span-2 lg:col-span-1">
            <div
              style={serif}
              className="text-3xl font-semibold leading-none tracking-[0.14em] text-[color:var(--brand-cream)]"
            >
              STREICH
            </div>
            <p className="eyebrow mt-3 !text-[color:var(--brand-accent)]">
              Garten- &amp; Landschaftspflege
            </p>
            <p className="mt-1 text-sm text-[color:var(--brand-cream)]/70">
              in und um Lübeck
            </p>
            <address
              data-testid="footer-address-text"
              className="mt-5 flex items-start gap-2 not-italic text-sm text-[color:var(--brand-cream)]/80"
            >
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[color:var(--brand-accent)]" strokeWidth={1.8} aria-hidden="true" />
              <span>
                {site.legalName}
                <br />
                {site.address.street}
                <br />
                {site.address.zip} {site.address.city}
              </span>
            </address>
          </div>

          <div>
            <h2 className="text-lg text-[color:var(--brand-cream)]">Kontakt</h2>
            <ul className="mt-4 space-y-3 text-sm text-[color:var(--brand-cream)]/80">
              <li>
                <a
                  href={site.phone.href}
                  data-testid="footer-phone-link"
                  className="inline-flex items-center gap-2 transition-colors hover:text-[color:var(--brand-accent)]"
                >
                  <Phone className="h-4 w-4" strokeWidth={1.8} aria-hidden="true" />
                  {site.phone.display}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${site.email}`}
                  data-testid="footer-email-link"
                  className="inline-flex items-center gap-2 transition-colors hover:text-[color:var(--brand-accent)]"
                >
                  <Mail className="h-4 w-4" strokeWidth={1.8} aria-hidden="true" />
                  {site.email}
                </a>
              </li>
              <li>
                <a
                  href={site.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-testid="footer-whatsapp-link"
                  className="inline-flex items-center gap-2 transition-colors hover:text-[color:var(--brand-accent)]"
                >
                  <MessageCircle className="h-4 w-4" strokeWidth={1.8} aria-hidden="true" />
                  WhatsApp
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-lg text-[color:var(--brand-cream)]">Seiten</h2>
            <ul className="mt-4 space-y-2 text-sm text-[color:var(--brand-cream)]/80">
              {pageLinks.map((n) => (
                <li key={n.path}>
                  <Link to={n.path} className="transition-colors hover:text-[color:var(--brand-accent)]">
                    {n.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-lg text-[color:var(--brand-cream)]">Rechtliches</h2>
            <ul className="mt-4 space-y-2 text-sm text-[color:var(--brand-cream)]/80">
              {legalNav.map((n) => (
                <li key={n.path}>
                  <Link to={n.path} className="transition-colors hover:text-[color:var(--brand-accent)]">
                    {n.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-2 border-t border-white/10 pt-6 text-xs text-[color:var(--brand-cream)]/60 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {site.legalName}
          </p>
          <p>Garten- und Landschaftspflege in und um Lübeck</p>
        </div>
      </div>
    </footer>
  );
};
