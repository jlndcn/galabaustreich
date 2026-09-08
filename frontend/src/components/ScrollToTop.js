import { useEffect } from "react";
import { useLocation } from "react-router-dom";

// Scrolls to top on route change, but honours in-page anchor (#) navigation.
// `key` is included so repeated clicks on the same anchor link scroll again.
export const ScrollToTop = () => {
  const { pathname, hash, key } = useLocation();
  useEffect(() => {
    if (hash) {
      const el = document.getElementById(hash.replace("#", ""));
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
        return;
      }
    }
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [pathname, hash, key]);
  return null;
};
