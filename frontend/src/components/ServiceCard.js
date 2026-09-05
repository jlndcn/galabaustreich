import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { getServiceIcon } from "@/components/serviceIcons";

// Clear, readable service entries – no boxed tiles. Two variants:
// "key"    = column block for the three most requested services
// "teaser" = compact list row for all further services
export const ServiceCard = ({ service, variant = "teaser" }) => {
  const Icon = getServiceIcon(service.id);
  const to = `/leistungen#${service.id}`;

  if (variant === "key") {
    return (
      <Link
        to={to}
        data-testid="service-card"
        className="group block h-full border-t-2 border-[color:var(--brand-forest)] pt-6 transition-colors hover:border-[color:var(--brand-accent)]"
      >
        <Icon
          className="h-7 w-7 text-[color:var(--brand-leaf)]"
          strokeWidth={1.6}
          aria-hidden="true"
        />
        <h3 className="mt-4 text-2xl group-hover:text-[color:var(--brand-accent-strong)]">
          {service.title}
        </h3>
        <p className="mt-2 text-base font-medium text-[color:var(--brand-leaf)]">
          {service.claim}
        </p>
        <p className="mt-3 text-base leading-relaxed text-muted-foreground">
          {service.teaser}
        </p>
      </Link>
    );
  }

  return (
    <Link
      to={to}
      data-testid="service-card"
      className="group flex items-start gap-4 border-b border-border py-5 transition-colors hover:text-[color:var(--brand-accent-strong)]"
    >
      <Icon
        className="mt-1 h-5 w-5 shrink-0 text-[color:var(--brand-leaf)]"
        strokeWidth={1.7}
        aria-hidden="true"
      />
      <div className="min-w-0 flex-1">
        <h3 className="text-xl leading-snug group-hover:text-[color:var(--brand-accent-strong)]">
          {service.title}
        </h3>
        <p className="mt-1 text-base leading-relaxed text-muted-foreground">
          {service.teaser}
        </p>
      </div>
      <ArrowRight
        className="mt-1.5 h-4 w-4 shrink-0 text-[color:var(--brand-leaf)] opacity-0 transition-opacity group-hover:opacity-100"
        aria-hidden="true"
      />
    </Link>
  );
};
