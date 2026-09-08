import { useEffect, useState } from "react";
import { site } from "@/data/site";
import { WhatsAppIcon, channelColors } from "@/components/BrandIcons";

// Floating WhatsApp button (all pages): only the official WhatsApp logo as a round button,
// no glow. Calm entrance animation, transform-only hover/press feedback, stable fixed size.
export const FloatingWhatsApp = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const t = window.setTimeout(() => setMounted(true), 400);
    return () => window.clearTimeout(t);
  }, []);

  return (
    <a
      href={site.whatsapp}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Per WhatsApp schreiben"
      title="Per WhatsApp schreiben"
      data-testid="floating-whatsapp-button"
      style={{ backgroundColor: channelColors.whatsapp }}
      className={`fixed bottom-4 right-4 z-40 inline-flex h-14 w-14 items-center justify-center rounded-full text-white shadow-[0_6px_16px_-6px_rgba(20,28,23,0.35)] transition-[transform,opacity] duration-300 ease-out will-change-transform hover:scale-105 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--brand-forest)] focus-visible:ring-offset-2 motion-reduce:transition-none sm:bottom-6 sm:right-6 ${
        mounted ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0 motion-reduce:translate-y-0 motion-reduce:opacity-100"
      }`}
    >
      <WhatsAppIcon className="h-8 w-8" />
    </a>
  );
};
