import { useEffect, useState } from "react";
import { site } from "@/data/site";
import { useLocation } from "react-router-dom";
import { WhatsAppIcon } from "@/components/BrandIcons";

export const FloatingWhatsApp = () => {
  const [footerVisible, setFooterVisible] = useState(false);
  const [contentUnderButton, setContentUnderButton] = useState(false);
  const { pathname } = useLocation();
  useEffect(() => {
    const footer = document.querySelector('[data-testid="site-footer"]');
    if (!footer || typeof IntersectionObserver === "undefined") return;
    const observer = new IntersectionObserver(([entry]) =>
      setFooterVisible(entry.isIntersecting),
    );
    observer.observe(footer);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") return;
    let observer;
    const observeCorner = () => {
      observer?.disconnect();
      setContentUnderButton(false);
      if (window.innerWidth > 700) return;
      const overlaps = new Set();
      // Keep text and form controls readable behind the floating contact button.
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) overlaps.add(entry.target);
            else overlaps.delete(entry.target);
          });
          setContentUnderButton(overlaps.size > 0);
        },
        {
          rootMargin: `-${Math.max(0, window.innerHeight - 84)}px 0px 0px -${Math.max(0, window.innerWidth - 84)}px`,
        },
      );
      document
        .querySelectorAll(
          "main h1, main h2, main h3, main p, main li, main a, main address, #anfrage",
        )
        .forEach((element) => observer.observe(element));
    };
    observeCorner();
    window.addEventListener("resize", observeCorner);
    return () => {
      observer?.disconnect();
      window.removeEventListener("resize", observeCorner);
    };
  }, [pathname]);
  const hidden = footerVisible || contentUnderButton;
  if (
    ["/datenschutz", "/impressum", "/agb"].includes(pathname.replace(/\/$/, ""))
  )
    return null;
  return (
    <a
      href={site.whatsapp}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Per WhatsApp schreiben"
      title="Per WhatsApp schreiben"
      data-testid="floating-whatsapp-button"
      aria-hidden={hidden || undefined}
      tabIndex={hidden ? -1 : undefined}
      className={`floating-whatsapp ${hidden ? "is-hidden" : ""}`}
    >
      <WhatsAppIcon className="h-7 w-7" />
    </a>
  );
};
