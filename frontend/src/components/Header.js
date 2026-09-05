import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Menu, Phone, MessageCircle, Mail } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger, SheetClose } from "@/components/ui/sheet";
import { Logo } from "@/components/Logo";
import { ContactActions } from "@/components/ContactActions";
import { mainNav, legalNav, site } from "@/data/site";

export const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navLinkClass = ({ isActive }) =>
    `relative py-2 text-sm font-medium transition-colors after:absolute after:left-0 after:-bottom-0.5 after:h-0.5 after:bg-[color:var(--brand-accent)] after:transition-all ${
      isActive
        ? "text-[color:var(--brand-forest)] after:w-full"
        : "text-foreground/70 hover:text-[color:var(--brand-forest)] after:w-0 hover:after:w-full"
    }`;

  const iconBtn =
    "inline-flex h-11 w-11 items-center justify-center rounded-xl border border-border bg-white text-[color:var(--brand-forest)] transition-colors hover:bg-[rgba(15,46,20,0.05)]";

  return (
    <header
      className={`sticky top-0 z-50 transition-[background-color,box-shadow] ${
        scrolled
          ? "bg-[color:var(--brand-cream)]/95 shadow-[0_1px_0_rgba(15,46,20,0.10)] backdrop-blur"
          : "bg-[color:var(--brand-cream)]"
      }`}
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div
          className={`flex items-center justify-between gap-4 transition-all ${
            scrolled ? "h-16" : "h-16 sm:h-20"
          }`}
        >
          <Logo />

          <nav aria-label="Hauptnavigation" className="hidden items-center gap-8 lg:flex">
            {mainNav.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.path === "/"}
                className={navLinkClass}
                data-testid={`nav-${item.path === "/" ? "home" : item.path.replace("/", "")}`}
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          <div className="hidden items-center gap-2 lg:flex">
            <a
              href={site.phone.href}
              className="inline-flex h-11 items-center gap-2 rounded-xl bg-[color:var(--brand-accent)] px-5 text-sm font-semibold text-[color:var(--brand-forest)] shadow-sm transition-colors hover:bg-[color:var(--brand-accent-strong)]"
              data-testid="header-call-button"
            >
              <Phone className="h-4 w-4" strokeWidth={2} aria-hidden="true" /> Anrufen
            </a>
            <a
              href={site.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
              className={iconBtn}
              data-testid="header-whatsapp-button"
            >
              <MessageCircle className="h-5 w-5" strokeWidth={1.8} aria-hidden="true" />
            </a>
            <a
              href={`mailto:${site.email}`}
              aria-label="E-Mail"
              className={iconBtn}
              data-testid="header-email-button"
            >
              <Mail className="h-5 w-5" strokeWidth={1.8} aria-hidden="true" />
            </a>
          </div>

          <div className="flex items-center gap-2 lg:hidden">
            <a
              href={site.phone.href}
              aria-label="Anrufen"
              className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-[color:var(--brand-accent)] text-[color:var(--brand-forest)]"
              data-testid="header-call-button-mobile"
            >
              <Phone className="h-5 w-5" strokeWidth={2} aria-hidden="true" />
            </a>
            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger asChild>
                <button
                  type="button"
                  aria-label="Menü öffnen"
                  className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-border bg-white text-[color:var(--brand-forest)]"
                  data-testid="header-mobile-menu-button"
                >
                  <Menu className="h-5 w-5" aria-hidden="true" />
                </button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[86%] max-w-sm bg-[color:var(--brand-cream)] p-0">
                <div className="flex h-full flex-col">
                  <div className="border-b border-border px-6 pb-4 pt-6">
                    <Logo linked={false} className="h-12 w-auto" />
                  </div>
                  <nav aria-label="Mobile Navigation" className="flex flex-col px-4 py-3">
                    {mainNav.map((item) => (
                      <SheetClose asChild key={item.path}>
                        <NavLink
                          to={item.path}
                          end={item.path === "/"}
                          className={({ isActive }) =>
                            `flex min-h-[48px] items-center rounded-lg px-3 text-base font-medium transition-colors ${
                              isActive
                                ? "bg-[rgba(15,46,20,0.06)] text-[color:var(--brand-forest)]"
                                : "text-foreground/80 hover:bg-[rgba(15,46,20,0.04)]"
                            }`
                          }
                          data-testid={`mobile-nav-${item.path === "/" ? "home" : item.path.replace("/", "")}`}
                        >
                          {item.label}
                        </NavLink>
                      </SheetClose>
                    ))}
                  </nav>
                  <div className="mt-auto border-t border-border px-6 py-6">
                    <ContactActions prefix="mobile-menu" tone="onLight" full />
                    <div className="mt-5 flex flex-wrap gap-x-4 gap-y-1 text-xs text-foreground/60">
                      {legalNav.map((l) => (
                        <SheetClose asChild key={l.path}>
                          <Link to={l.path} className="hover:text-[color:var(--brand-forest)]">
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
