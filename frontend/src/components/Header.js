import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Menu, Phone, ArrowRight } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
  SheetTitle,
} from "@/components/ui/sheet";
import { Logo } from "@/components/Logo";
import { ContactActions } from "@/components/ContactActions";
import { GoogleRating } from "@/components/GoogleRating";
import { WhatsAppIcon, channelColors } from "@/components/BrandIcons";
import { mainNav, legalNav, site } from "@/data/site";

// Redesigned navbar: white bar, logo left, pill navigation, phone + WhatsApp + primary CTA right.
export const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const pill = ({ isActive }) =>
    `inline-flex h-11 items-center rounded-full px-5 text-base font-semibold transition-[background-color,color,box-shadow] ${
      isActive
        ? "bg-white text-[color:var(--brand-forest)] shadow-[0_1px_2px_rgba(15,46,20,0.12)]"
        : "text-[color:var(--brand-ink-soft)] hover:bg-white/70 hover:text-[color:var(--brand-forest)]"
    }`;

  return (
    <header
      data-testid="site-header"
      className={`sticky top-0 z-50 border-b bg-white transition-[box-shadow,border-color] ${
        scrolled
          ? "border-border shadow-[0_6px_24px_-16px_rgba(15,46,20,0.35)]"
          : "border-transparent"
      }`}
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div
          className={`flex items-center justify-between gap-4 transition-[height] ${
            scrolled ? "h-[72px] lg:h-[84px]" : "h-[80px] lg:h-[108px]"
          }`}
        >
          <Logo
            className={`w-auto transition-[height] ${
              scrolled ? "h-14 lg:h-16" : "h-16 lg:h-[88px]"
            }`}
          />

          {/* Desktop navigation */}
          <nav
            aria-label="Hauptnavigation"
            className="hidden items-center gap-1 rounded-full bg-[color:var(--brand-cream)] p-1 lg:flex"
          >
            {mainNav.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.path === "/"}
                className={pill}
                data-testid={`nav-${item.path === "/" ? "home" : item.path.replace("/", "")}`}
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          {/* Desktop actions */}
          <div className="hidden items-center gap-2 lg:flex">
            <a
              href={site.phone.href}
              data-testid="header-phone-link"
              className="header-phone"
              aria-label={`Anrufen: ${site.phone.display}`}
            >
              <span className="header-phone-icon">
                <Phone
                  className="h-5 w-5"
                  strokeWidth={2.2}
                  aria-hidden="true"
                />
              </span>
              <span className="header-phone-number" aria-hidden="true">
                {site.phone.display}
              </span>
            </a>
            <a
              href={site.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp schreiben"
              title="WhatsApp"
              data-testid="header-whatsapp-button"
              className="inline-flex h-11 w-11 items-center justify-center rounded-full text-white shadow-sm transition-[transform,filter] hover:scale-105 hover:brightness-95"
              style={{ backgroundColor: channelColors.whatsapp }}
            >
              <WhatsAppIcon className="h-6 w-6" />
            </a>
            <Link
              to="/#kontakt"
              data-testid="header-cta-button"
              className="inline-flex h-11 items-center gap-2 rounded-full bg-[color:var(--brand-accent)] px-5 text-[15px] font-semibold text-[color:var(--brand-forest)] shadow-sm transition-[background-color,box-shadow,transform] hover:bg-[color:var(--brand-accent-strong)] hover:shadow-md active:scale-[0.99]"
            >
              Anfrage senden
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>

          {/* Mobile actions */}
          <div className="flex items-center gap-2 lg:hidden">
            <a
              href={site.phone.href}
              aria-label="Anrufen"
              data-testid="header-call-button-mobile"
              className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-[color:var(--brand-accent)] text-[color:var(--brand-forest)]"
            >
              <Phone className="h-5 w-5" strokeWidth={2} aria-hidden="true" />
            </a>
            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger asChild>
                <button
                  type="button"
                  aria-label="Menü öffnen"
                  data-testid="header-mobile-menu-button"
                  className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-border bg-white text-[color:var(--brand-forest)]"
                >
                  <Menu className="h-5 w-5" aria-hidden="true" />
                </button>
              </SheetTrigger>
              <SheetContent
                side="right"
                className="w-[88%] max-w-sm bg-white p-0"
              >
                <div className="flex h-full flex-col">
                  <div className="border-b border-border px-6 pb-5 pt-6">
                    <SheetTitle className="sr-only">Navigation</SheetTitle>
                    <Logo
                      linked={false}
                      className="h-14 w-auto"
                      priority={false}
                    />
                  </div>
                  <nav
                    aria-label="Mobile Navigation"
                    className="flex flex-col px-4 py-4"
                  >
                    {mainNav.map((item) => (
                      <SheetClose asChild key={item.path}>
                        <NavLink
                          to={item.path}
                          end={item.path === "/"}
                          className={({ isActive }) =>
                            `flex min-h-[50px] items-center rounded-xl px-4 text-lg font-semibold transition-colors ${
                              isActive
                                ? "bg-[color:var(--brand-cream)] text-[color:var(--brand-forest)]"
                                : "text-[color:var(--brand-ink-soft)] hover:bg-[color:var(--brand-cream)]"
                            }`
                          }
                          data-testid={`mobile-nav-${item.path === "/" ? "home" : item.path.replace("/", "")}`}
                        >
                          {item.label}
                        </NavLink>
                      </SheetClose>
                    ))}
                    <SheetClose asChild>
                      <Link
                        to="/#kontakt"
                        data-testid="mobile-nav-cta"
                        className="mt-3 inline-flex h-12 items-center justify-center gap-2 rounded-full bg-[color:var(--brand-accent)] px-5 text-base font-semibold text-[color:var(--brand-forest)]"
                      >
                        Anfrage senden
                        <ArrowRight className="h-4 w-4" aria-hidden="true" />
                      </Link>
                    </SheetClose>
                  </nav>
                  <div className="mt-auto border-t border-border px-6 py-6">
                    <ContactActions prefix="mobile-menu" tone="onLight" full />
                    <GoogleRating variant="inline" className="mt-5" />
                    <div className="mt-5 flex flex-wrap gap-x-4 gap-y-1 text-sm text-[color:var(--brand-ink-soft)]">
                      {legalNav.map((l) => (
                        <SheetClose asChild key={l.path}>
                          <Link
                            to={l.path}
                            className="hover:text-[color:var(--brand-forest)]"
                          >
                            {l.label}
                          </Link>
                        </SheetClose>
                      ))}
                    </div>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
};
