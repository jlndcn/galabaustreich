import { Star, ExternalLink } from "lucide-react";
import { site, googleLink } from "@/data/site";

const formatRating = (value) =>
  value.toLocaleString("de-DE", {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  });

// Five stars, filled according to the rating (supports half steps).
export const Stars = ({ rating, size = "h-5 w-5", className = "" }) => (
  <span
    className={`inline-flex max-w-full flex-wrap items-center gap-0.5 ${className}`}
    role="img"
    aria-label={`${formatRating(rating)} von 5 Sternen`}
    data-testid="google-rating-stars"
  >
    {[1, 2, 3, 4, 5].map((i) => {
      const fill = Math.max(0, Math.min(1, rating - (i - 1)));
      return (
        <span
          key={i}
          className={`relative inline-block shrink-0 ${size}`}
          aria-hidden="true"
        >
          <Star
            className={`${size} text-[#d8d3c6]`}
            strokeWidth={1.5}
            fill="currentColor"
          />
          {fill > 0 && (
            <span
              className="absolute inset-0 overflow-hidden"
              style={{ width: `${fill * 100}%` }}
            >
              <Star
                className={`${size} text-[#f2b01e]`}
                strokeWidth={1.5}
                fill="currentColor"
              />
            </span>
          )}
        </span>
      );
    })}
  </span>
);

// Google rating (manually maintained in site.js) as stars with a link to the Google profile.
// variant: "inline" (one line) | "block" (stacked, for tiles)
export const GoogleRating = ({
  variant = "inline",
  className = "",
  linked = true,
}) => {
  const { rating, reviewCount } = site.google;
  if (!rating) return null;

  const label = `${formatRating(rating)} von 5 · ${reviewCount} ${
    reviewCount === 1 ? "Bewertung" : "Bewertungen"
  } auf Google`;

  if (variant === "block") {
    return (
      <div
        className={`min-w-0 max-w-full overflow-hidden ${className}`}
        data-testid="google-rating"
      >
        <Stars rating={rating} size="h-4 w-4" />
        <p
          className="mt-2 text-lg font-bold leading-none tracking-tight text-[color:var(--brand-forest)]"
          data-testid="google-rating-value"
        >
          {formatRating(rating)}
        </p>
        <p
          className="mt-1.5 text-sm leading-snug text-muted-foreground"
          data-testid="google-rating-count"
        >
          {reviewCount}{" "}
          {reviewCount === 1 ? "Bewertung" : "Bewertungen"} auf Google
        </p>
      </div>
    );
  }

  const content = (
    <>
      <Stars rating={rating} size="h-4 w-4" />
      <span className="text-sm font-semibold text-[color:var(--brand-forest)]">
        {label}
      </span>
      {linked && (
        <ExternalLink
          className="h-3.5 w-3.5 text-muted-foreground"
          aria-hidden="true"
        />
      )}
    </>
  );

  if (!linked) {
    return (
      <div
        className={`inline-flex flex-wrap items-center gap-2 ${className}`}
        data-testid="google-rating"
      >
        {content}
      </div>
    );
  }

  return (
    <a
      href={googleLink}
      target="_blank"
      rel="noopener noreferrer"
      data-testid="google-rating"
      className={`inline-flex flex-wrap items-center gap-2 transition-opacity hover:opacity-80 ${className}`}
    >
      {content}
    </a>
  );
};
