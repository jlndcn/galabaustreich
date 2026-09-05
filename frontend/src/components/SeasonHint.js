import { Link } from "react-router-dom";
import { CalendarDays } from "lucide-react";
import { getSeason } from "@/data/seasons";
import { services } from "@/data/services";

// Subtle hint in the contact area: which works are typically in season this month.
export const SeasonHint = ({ date = new Date(), className = "" }) => {
  const season = getSeason(date);
  const items = season.ids
    .map((id) => services.find((s) => s.id === id))
    .filter(Boolean);

  if (items.length === 0) return null;

  return (
    <aside
      data-testid="season-hint"
      aria-label={`Typische Arbeiten im ${season.monthName}`}
      className={`border-l-2 border-[color:var(--brand-accent)] pl-5 ${className}`}
    >
      <p className="inline-flex items-center gap-2 text-base font-semibold text-[color:var(--brand-forest)]">
        <CalendarDays className="h-4 w-4 text-[color:var(--brand-accent-strong)]" strokeWidth={2} aria-hidden="true" />
        Gerade Saison im {season.monthName}
      </p>
      <p data-testid="season-hint-note" className="mt-1 text-base leading-relaxed text-muted-foreground">
        {season.note}.
      </p>
      <ul className="mt-2 flex flex-wrap gap-x-5 gap-y-1">
        {items.map((s) => (
          <li key={s.id}>
            <Link
              to={`/leistungen#${s.id}`}
              data-testid="season-hint-link"
              className="text-link text-base"
            >
              {s.title}
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
};
