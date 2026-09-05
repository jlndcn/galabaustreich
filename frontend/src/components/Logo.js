import { Link } from "react-router-dom";

// Exchangeable logo slot. To swap the final logo, replace the files in /public
// (logo-header.webp / logo.png). Aspect ratio is reserved to avoid layout shift.
export const Logo = ({ className = "h-11 w-auto sm:h-14", linked = true }) => {
  const img = (
    <img
      src="/logo-header.webp"
      width="440"
      height="298"
      alt="Streich – Garten- und Landschaftspflege in und um Lübeck"
      className={className}
      decoding="async"
      fetchPriority="high"
    />
  );
  if (!linked) return img;
  return (
    <Link to="/" aria-label="Zur Startseite – Streich Garten- und Landschaftspflege" data-testid="logo-home-link">
      {img}
    </Link>
  );
};
