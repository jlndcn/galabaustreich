import { Phone, MessageCircle, Mail } from "lucide-react";
import { site } from "@/data/site";

// Three primary contact actions (tel / WhatsApp / mail). No forms, no bot.
// tone: "onLight" (default page background) | "onDark" (forest surface)
export const ContactActions = ({
  prefix = "contact",
  tone = "onLight",
  className = "",
  full = false,
}) => {
  const base =
    "inline-flex items-center justify-center gap-2 rounded-xl h-12 px-5 text-sm font-semibold transition-[background-color,box-shadow,transform] active:scale-[0.99] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--brand-accent)] focus-visible:ring-offset-2";

  const primary =
    "bg-[color:var(--brand-accent)] text-[color:var(--brand-forest)] shadow-sm hover:bg-[color:var(--brand-accent-strong)] hover:shadow-md";

  const secondary =
    tone === "onDark"
      ? "border border-white/25 bg-white/5 text-[color:var(--brand-cream)] hover:bg-white/12"
      : "border border-border bg-white text-[color:var(--brand-forest)] hover:bg-[rgba(15,46,20,0.05)]";

  const grow = full ? "flex-1 min-w-[9rem]" : "";

  return (
    <div className={`flex flex-wrap gap-3 ${className}`}>
      <a
        href={site.phone.href}
        className={`${base} ${primary} ${grow}`}
        data-testid={`${prefix}-call-button`}
      >
        <Phone className="h-4 w-4" strokeWidth={2} aria-hidden="true" />
        Anrufen
      </a>
      <a
        href={site.whatsapp}
        target="_blank"
        rel="noopener noreferrer"
        className={`${base} ${secondary} ${grow}`}
        data-testid={`${prefix}-whatsapp-button`}
      >
        <MessageCircle className="h-4 w-4" strokeWidth={2} aria-hidden="true" />
        WhatsApp
      </a>
      <a
        href={`mailto:${site.email}`}
        className={`${base} ${secondary} ${grow}`}
        data-testid={`${prefix}-email-button`}
      >
        <Mail className="h-4 w-4" strokeWidth={2} aria-hidden="true" />
        E-Mail
      </a>
    </div>
  );
};
