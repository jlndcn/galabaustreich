import { Link } from "react-router-dom";
import { getServiceIcon } from "@/components/serviceIcons";

const serif = { fontFamily: "'Cormorant Garamond', ui-serif, Georgia, serif" };

export const ServiceCard = ({ service, variant = "teaser" }) => {
  const Icon = getServiceIcon(service.id);
  const to = `/leistungen#${service.id}`;

  if (variant === "key") {
    return (
      <Link
        to={to}
        data-testid="service-card"
        className="group flex h-full flex-col rounded-2xl border border-border bg-white p-6 transition-[box-shadow,transform] hover:-translate-y-0.5 hover:shadow-[0_16px_40px_rgba(15,46,20,0.12)] sm:p-7"
      >
        <div className="flex items-center justify-between">
          <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-[color:var(--accent)]">
            <Icon className="h-6 w-6 text-[color:var(--brand-forest)]" strokeWidth={1.7} aria-hidden="true" />
          </span>
          {service.highlight && (
            <span className="eyebrow rounded-full bg-[rgba(15,187,130,0.12)] px-3 py-1 !text-[color:var(--brand-accent-strong)]">
              Schwerpunkt
            </span>
          )}
        </div>
        <h3 className="mt-5 text-2xl">{service.title}</h3>
        <p style={serif} className="mt-1 text-lg italic text-[color:var(--brand-leaf)]">
          {service.claim}
        </p>
        <p className="mt-3 flex-1 text-sm leading-relaxed text-foreground/75">{service.teaser}</p>
      </Link>
    );
  }

  return (
    <Link
      to={to}
      data-testid="service-card"
      className="group flex items-start gap-4 rounded-2xl border border-border bg-white p-5 transition-[box-shadow,transform] hover:-translate-y-0.5 hover:shadow-[0_12px_30px_rgba(15,46,20,0.10)]"
    >
      <span className="mt-0.5 flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[color:var(--accent)]">
        <Icon className="h-5 w-5 text-[color:var(--brand-forest)]" strokeWidth={1.7} aria-hidden="true" />
      </span>
      <div>
        <h3 className="text-xl leading-tight">{service.title}</h3>
        <p className="mt-1 text-sm leading-relaxed text-foreground/70">{service.teaser}</p>
      </div>
    </Link>
  );
};
