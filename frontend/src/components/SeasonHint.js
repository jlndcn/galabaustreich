import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { CalendarDays } from "lucide-react";
import { getSeason } from "@/data/seasons";
import { services } from "@/data/services";
import { getDetailPathForServiceId } from "@/data/serviceDetails";

// Subtle hint in the contact area: which works are typically in season this month.
export const SeasonHint = ({ date, className = "" }) => {
  const [currentSeason, setCurrentSeason] = useState(() => getSeason());
  useEffect(() => {
    if (date) return;
    const refresh = () => {
      const next = getSeason();
      setCurrentSeason((previous) =>
        previous.month === next.month ? previous : next,
      );
    };
    // Also update tabs left open across a month boundary, in the business timezone.
    const timer = window.setInterval(refresh, 60000);
    document.addEventListener("visibilitychange", refresh);
    window.addEventListener("focus", refresh);
    return () => {
      window.clearInterval(timer);
      document.removeEventListener("visibilitychange", refresh);
      window.removeEventListener("focus", refresh);
    };
  }, [date]);
  const season = date ? getSeason(date) : currentSeason;
  const items = season.ids
    .map((id) => services.find((s) => s.id === id))
    .filter(Boolean);

  if (items.length === 0) return null;

  return (
    <aside
      data-testid="season-hint"
      aria-label={`Typische Arbeiten im ${season.monthName}`}
      className={`season-box ${className}`}
    >
      <div>
        <h3 className="season-title">
          <CalendarDays
            className="h-4 w-4 text-[color:var(--brand-accent-strong)]"
            strokeWidth={2}
            aria-hidden="true"
          />
          Gerade Saison im {season.monthName}
        </h3>
        <p
          data-testid="season-hint-note"
          className="mt-1 text-base leading-relaxed text-muted-foreground"
        >
          {season.note}.
        </p>
      </div>
      <ul className="season-services">
        {items.map((s) => (
          <li key={s.id}>
            <Link
              to={getDetailPathForServiceId(s.id) || `/leistungen#${s.id}`}
              data-testid="season-hint-link"
              className="text-link text-base"
            >
              {s.title}
            </Link>
            <p>{s.teaser}</p>
          </li>
        ))}
      </ul>
    </aside>
  );
};
