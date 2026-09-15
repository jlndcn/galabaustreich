import { Link } from "react-router-dom";
import { getServiceIcon } from "@/components/serviceIcons";
import { getDetailPathForServiceId } from "@/data/serviceDetails";

export const ServiceCard = ({ service, variant = "teaser" }) => {
  const Icon = getServiceIcon(service.id);
  const detailPath = getDetailPathForServiceId(service.id);
  const to = detailPath || `/leistungen#${service.id}`;
  return (
    <Link
      to={to}
      data-testid="service-card"
      className={`service-summary service-summary-${variant}`}
    >
      <Icon className="h-6 w-6 shrink-0" strokeWidth={1.6} aria-hidden="true" />
      <div>
        <h3>{service.title}</h3>
        <p>{service.teaser}</p>
      </div>
    </Link>
  );
};
