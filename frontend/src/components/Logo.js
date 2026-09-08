import { Link } from "react-router-dom";

// Brand logo (transparent WebP derived from the client's final logo file).
// Intrinsic ratio 4:3 (480x360) is declared to avoid layout shift.
export const Logo = ({ className = "h-12 w-auto sm:h-14", linked = true, priority = true }) => {
  const img = (
    <img
      src="/logo-header.webp"
      width="480"
      height="360"
      alt="Garten- und Landschaftspflege Streich – in und um Lübeck"
      className={className}
      decoding="async"
      fetchPriority={priority ? "high" : "auto"}
      loading={priority ? "eager" : "lazy"}
    />
  );
  if (!linked) return img;
  return (
    <Link
      to="/"
      aria-label="Zur Startseite – Garten- und Landschaftspflege Streich"
      data-testid="logo-home-link"
      className="inline-flex shrink-0 items-center"
    >
      {img}
    </Link>
  );
};
