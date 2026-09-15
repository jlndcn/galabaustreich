import { useEffect, useLayoutEffect, useRef } from "react";
import { useLocation, useNavigationType } from "react-router-dom";

/**
 * Scroll handling with history awareness:
 * - POP (Browser Back/Forward): restore saved position for that history entry
 * - PUSH/REPLACE: honour hash targets, otherwise scroll to top
 * - Save position in useLayoutEffect cleanup (runs before the next route scrolls to top)
 * - Direct entry to a detail URL has no saved position → no false restore
 */
export function ScrollManager() {
  const location = useLocation();
  const navigationType = useNavigationType();
  const positions = useRef(new Map());

  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
  }, []);

  useLayoutEffect(() => {
    const key = location.key;
    const map = positions.current;

    const onScroll = () => {
      map.set(key, window.scrollY);
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      // Must run in layout cleanup so we capture Y before the next route resets scroll.
      map.set(key, window.scrollY);
      window.removeEventListener("scroll", onScroll);
    };
  }, [location.key]);

  useLayoutEffect(() => {
    const key = location.key;

    if (navigationType === "POP") {
      const saved = positions.current.get(key);
      if (typeof saved === "number") {
        window.scrollTo({ top: saved, left: 0, behavior: "auto" });
        return;
      }
    }

    if (location.hash) {
      const id = location.hash.replace(/^#/, "");
      const el = document.getElementById(id);
      if (el) {
        const reduced = window.matchMedia(
          "(prefers-reduced-motion: reduce)",
        ).matches;
        el.scrollIntoView({
          behavior: reduced ? "auto" : "smooth",
          block: "start",
        });
        return;
      }
    }

    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [location.pathname, location.hash, location.key, navigationType]);

  return null;
}
