import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const selector =
  'button:not([role="checkbox"]):not([disabled]), a[class*="rounded-full"], .hero-primary, .hero-call';

export function useMagneticButtons() {
  const { pathname } = useLocation();
  useEffect(() => {
    const preference = window.matchMedia(
      "(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)",
    );
    let active;
    let bounds;
    let frame = 0;
    let x = 0;
    let y = 0;
    const reset = () => {
      cancelAnimationFrame(frame);
      frame = 0;
      if (active) {
        active.style.removeProperty("--magnet-x");
        active.style.removeProperty("--magnet-y");
        active.classList.remove("magnetic-hover");
      }
      active = null;
    };
    const move = (event) => {
      if (!preference.matches || event.pointerType !== "mouse") return;
      const button = event.target.closest(selector);
      if (!button) {
        reset();
        return;
      }
      if (active !== button) {
        reset();
        active = button;
        bounds = active.getBoundingClientRect();
        active.classList.add("magnetic-hover");
      }
      x = Math.max(
        -5,
        Math.min(5, (event.clientX - bounds.left - bounds.width / 2) * 0.12),
      );
      y = Math.max(
        -4,
        Math.min(4, (event.clientY - bounds.top - bounds.height / 2) * 0.12),
      );
      if (!frame)
        frame = requestAnimationFrame(() => {
          frame = 0;
          active?.style.setProperty("--magnet-x", `${x}px`);
          active?.style.setProperty("--magnet-y", `${y}px`);
        });
    };
    const leave = (event) => {
      if (active && !active.contains(event.relatedTarget)) reset();
    };
    document.addEventListener("pointermove", move, { passive: true });
    document.addEventListener("pointerout", leave);
    document.addEventListener("keydown", reset);
    window.addEventListener("scroll", reset, { passive: true });
    window.addEventListener("blur", reset);
    preference.addEventListener("change", reset);
    return () => {
      reset();
      document.removeEventListener("pointermove", move);
      document.removeEventListener("pointerout", leave);
      document.removeEventListener("keydown", reset);
      window.removeEventListener("scroll", reset);
      window.removeEventListener("blur", reset);
      preference.removeEventListener("change", reset);
    };
  }, [pathname]);
}
