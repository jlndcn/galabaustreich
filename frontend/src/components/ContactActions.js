import { site } from "@/data/site";
import { ChannelBadge } from "@/components/BrandIcons";

// Three primary contact actions (tel / WhatsApp / mail) – each channel with its own, clearly distinct colour badge.
// tone: "onLight" (default page background) | "onDark" (forest surface)
export const ContactActions = ({
  prefix = "contact",
  tone = "onLight",
  className = "",
  full = false,
}) => {
  const base =
    "inline-flex h-12 items-center gap-3 rounded-full pl-1.5 pr-5 text-[15px] font-semibold transition-[background-color,box-shadow,transform] active:scale-[0.99] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--brand-accent)] focus-visible:ring-offset-2";

  const surface =
    tone === "onDark"
      ? "bg-white text-[color:var(--brand-forest)] shadow-sm hover:bg-[color:var(--brand-cream)] hover:shadow-md focus-visible:ring-offset-[color:var(--brand-forest)]"
      : "border border-border bg-white text-[color:var(--brand-forest)] hover:border-[color:var(--brand-accent)] hover:shadow-sm";

  const grow = full ? "flex-1 min-w-[9rem] justify-start" : "";
  const badge = { size: "h-9 w-9", iconSize: "h-4 w-4" };

  return (
    <div className={`flex flex-wrap gap-3 ${className}`}>
      <a
        href={site.phone.href}
        className={`${base} ${surface} ${grow}`}
        data-testid={`${prefix}-call-button`}
      >
        <ChannelBadge channel="phone" {...badge} />
        Anrufen
      </a>
      <a
        href={site.whatsapp}
        target="_blank"
        rel="noopener noreferrer"
        className={`${base} ${surface} ${grow}`}
        data-testid={`${prefix}-whatsapp-button`}
      >
        <ChannelBadge channel="whatsapp" {...badge} />
        WhatsApp
      </a>
      <a
        href={`mailto:${site.email}`}
        className={`${base} ${surface} ${grow}`}
        data-testid={`${prefix}-email-button`}
      >
        <ChannelBadge channel="email" {...badge} />
        E-Mail
      </a>
    </div>
  );
};
