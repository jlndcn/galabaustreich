import { ArrowUpRight } from "lucide-react";
import { site, googleLink } from "@/data/site";
import { GoogleRating } from "@/components/GoogleRating";
import { ChannelBadge } from "@/components/BrandIcons";

const tileBase =
  "group relative flex min-h-[7.5rem] min-w-0 flex-col justify-between overflow-hidden rounded-2xl border border-border bg-[color:var(--brand-cream)] p-5 transition-[border-color,box-shadow,transform] hover:-translate-y-0.5 hover:border-[color:var(--brand-accent)] hover:shadow-[0_14px_30px_-18px_rgba(15,46,20,0.35)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--brand-accent)] active:translate-y-0";

const Arrow = ({ className = "" }) => (
  <ArrowUpRight
    className={`h-5 w-5 shrink-0 text-[color:var(--brand-leaf)] opacity-60 transition-[opacity,transform] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100 ${className}`}
    aria-hidden="true"
  />
);

// Clear, tappable contact tiles: call, WhatsApp, e-mail and Google rating.
export const ContactTiles = ({ prefix = "contact-tile", className = "" }) => (
  <div
    className={`grid grid-cols-1 gap-4 sm:grid-cols-2 ${className}`}
    data-testid={`${prefix}-grid`}
  >
    <a href={site.phone.href} className={tileBase} data-testid={`${prefix}-phone`}>
      <div className="flex items-start justify-between gap-3">
        <ChannelBadge channel="phone" />
        <Arrow />
      </div>
      <span className="mt-4 block min-w-0">
        <span className="block text-base font-semibold text-[color:var(--brand-forest)]">
          Anrufen
        </span>
        <span className="block text-lg font-bold tracking-tight text-[color:var(--brand-forest)]">
          {site.phone.display}
        </span>
      </span>
    </a>

    <a
      href={site.whatsapp}
      target="_blank"
      rel="noopener noreferrer"
      className={tileBase}
      data-testid={`${prefix}-whatsapp`}
    >
      <div className="flex items-start justify-between gap-3">
        <ChannelBadge channel="whatsapp" />
        <Arrow />
      </div>
      <span className="mt-4 block min-w-0">
        <span className="block text-base font-semibold text-[color:var(--brand-forest)]">
          WhatsApp
        </span>
        <span className="block text-base text-muted-foreground">
          Nachricht schreiben – gern mit Foto
        </span>
      </span>
    </a>

    <a
      href={`mailto:${site.email}`}
      className={tileBase}
      data-testid={`${prefix}-email`}
    >
      <div className="flex items-start justify-between gap-3">
        <ChannelBadge channel="email" />
        <Arrow />
      </div>
      <span className="mt-4 block min-w-0">
        <span className="block text-base font-semibold text-[color:var(--brand-forest)]">
          E-Mail
        </span>
        <span className="block break-all text-base text-muted-foreground">
          {site.email}
        </span>
      </span>
    </a>

    <a
      href={googleLink}
      target="_blank"
      rel="noopener noreferrer"
      className={`${tileBase} contact-tile-google`}
      data-testid={`${prefix}-google`}
    >
      <div className="flex min-w-0 items-start justify-between gap-2">
        <GoogleRating variant="block" className="min-w-0 flex-1 overflow-hidden" />
        <Arrow className="mt-0.5" />
      </div>
      <span className="mt-3 block min-w-0 text-base font-semibold leading-snug text-[color:var(--brand-forest)]">
        Google-Profil ansehen
      </span>
    </a>
  </div>
);
