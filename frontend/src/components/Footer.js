import { Link } from "react-router-dom";
import { Phone, Mail, MessageCircle, ArrowUpRight } from "lucide-react";
import { site, mainNav, legalNav } from "@/data/site";

const serif = { fontFamily: "'Cormorant Garamond', ui-serif, Georgia, serif" };

export const Footer = () => {
  const year = new Date().getFullYear();
  const pageLinks = mainNav.filter((n) => n.path !== "/");

  const contactRow =
    "group -mx-3 flex items-center gap-3 rounded-xl px-3 py-2.5 transition-colors hover:bg-white/5";
  const contactIcon =
    "flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[color:var(--brand-accent)]/15 text-[color:var(--brand-accent)]";

  return (
    <footer
      data-testid="site-footer"
      className="relative mt-24 overflow-hidden bg-[color:var(--brand-forest)] text-[color:var(--brand-cream)]"
    >
      {/* top hairline + ambient glow */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-[color:var(--brand-accent)]/50 to-transparent" />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 left-1/2 h-80 w-[46rem] -translate-x-1/2 rounded-full bg-[color:var(--brand-accent)]/10 blur-[110px]"
      />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Brand + direct contact card */}
        <div className="grid grid-cols-1 gap-10 border-b border-white/10 py-14 lg:grid-cols-12 lg:items-center lg:py-16">
          <div className="lg:col-span-7">
            <div
              style={serif}
              className="text-5xl font-semibold leading-none tracking-[0.12em] sm:text-6xl"
            >
              STREICH
            </div>
            <p className="eyebrow mt-4 !text-[color:var(--brand-accent)]">
              Garten- &amp; Landschaftspflege · in und um Lübeck
            </p>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-[color:var(--brand-cream)]/70">
              Von der ersten Pflanze bis zum gewachsenen Garten – persönlich,
              zuverlässig und mit einem Blick für das Schöne.
            </p>
          </div>

          <div className="lg:col-span-5">
            <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5 backdrop-blur-sm sm:p-6">
              <p className="eyebrow !text-[color:var(--brand-cream)]/60">Direkt erreichbar</p>
              <div className="mt-3">
                <a href={site.phone.href} data-testid="footer-phone-link" className={contactRow}>
                  <span className={contactIcon}>
                    <Phone className="h-4 w-4" strokeWidth={1.9} aria-hidden="true" />
                  </span>
                  <span className="text-base font-medium">{site.phone.display}</span>
                </a>
                <a href={`mailto:${site.email}`} data-testid="footer-email-link" className={contactRow}>
                  <span className={contactIcon}>
                    <Mail className="h-4 w-4" strokeWidth={1.9} aria-hidden="true" />
                  </span>
                  <span className="text-sm font-medium">{site.email}</span>
                </a>
                <a
                  href={site.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-testid="footer-whatsapp-link"
                  className={contactRow}
                >
                  <span className={contactIcon}>
                    <MessageCircle className="h-4 w-4" strokeWidth={1.9} aria-hidden="true" />
                  </span>
                  <span className="flex-1 text-sm font-medium">WhatsApp</span>
                  <ArrowUpRight className="h-4 w-4 text-[color:var(--brand-cream)]/40" aria-hidden="true" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Address + navigation */}
        <div className="grid grid-cols-1 gap-10 py-12 sm:grid-cols-2 lg:grid-cols-4">
          <div className="sm:col-span-2">
            <p className="eyebrow !text-[color:var(--brand-accent)]">Anschrift</p>
            <address
              data-testid="footer-address-text"
              className="mt-4 not-italic text-sm leading-relaxed text-[color:var(--brand-cream)]/75"
            >
              {site.legalName}
              <br />
              {site.address.street}
              <br />
              {site.address.zip} {site.address.city}
            </address>
          </div>

          <nav aria-label="Seiten">
            <p className="eyebrow !text-[color:var(--brand-cream)]/60">Seiten</p>
            <ul className="mt-4 space-y-2.5 text-sm text-[color:var(--brand-cream)]/75">
              {pageLinks.map((n) => (
                <li key={n.path}>
                  <Link
                    to={n.path}
                    className="inline-block transition-colors hover:text-[color:var(--brand-accent)]"
                  >
                    {n.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Rechtliches">
            <p className="eyebrow !text-[color:var(--brand-cream)]/60">Rechtliches</p>
            <ul className="mt-4 space-y-2.5 text-sm text-[color:var(--brand-cream)]/75">
              {legalNav.map((n) => (
                <li key={n.path}>
                  <Link
                    to={n.path}
                    className="inline-block transition-colors hover:text-[color:var(--brand-accent)]"
                  >
                    {n.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col gap-2 border-t border-white/10 py-6 text-xs text-[color:var(--brand-cream)]/55 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {site.legalName}
          </p>
          <p>Garten- und Landschaftspflege in und um Lübeck</p>
        </div>
      </div>
    </footer>
  );
};
