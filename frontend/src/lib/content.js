/**
 * Shared content helpers for CMS JSON/Markdown.
 * Placeholders: {{legalName}}, {{owner}}, {{street}}, {{zip}}, {{city}},
 * {{country}}, {{legalForm}}, {{phone}}, {{phoneHref}}, {{email}}, {{vatId}},
 * {{googleLink}}, {{domain}}, {{paymentDays}}, {{noticePeriod}},
 * {{cancellationLeadDays}}, {{estimateDeviationPercent}}
 */

import { site, googleLink } from "@/data/site";
import terms from "@/content/legal/terms.json";

export function contentVars(extra = {}) {
  return {
    legalName: site.legalName,
    owner: site.owner,
    street: site.address.street,
    zip: site.address.zip,
    city: site.address.city,
    country: site.address.country,
    legalForm: site.legalForm,
    phone: site.phone.display,
    phoneHref: site.phone.href,
    email: site.email,
    vatId: site.vatId,
    googleLink,
    domain: site.domain,
    paymentDays: String(terms.paymentDays),
    noticePeriod: terms.noticePeriod,
    cancellationLeadDays: String(terms.cancellationLeadDays),
    estimateDeviationPercent: String(terms.estimateDeviationPercent),
    ...extra,
  };
}

export function applyPlaceholders(text, vars = contentVars()) {
  if (!text) return "";
  return String(text).replace(/\{\{(\w+)\}\}/g, (_, key) =>
    vars[key] != null ? String(vars[key]) : "",
  );
}

/** Minimal YAML frontmatter parser (key: value / key: "quoted"). */
export function parseFrontmatter(raw) {
  const source = String(raw).replace(/^\uFEFF/, "");
  const match = source.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
  if (!match) return { data: {}, body: source.trim() };
  const data = {};
  match[1].split(/\r?\n/).forEach((line) => {
    const idx = line.indexOf(":");
    if (idx === -1) return;
    const key = line.slice(0, idx).trim();
    let value = line.slice(idx + 1).trim();
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    } else if (/^\d+(\.\d+)?$/.test(value)) {
      value = Number(value);
    } else if (value === "true" || value === "false") {
      value = value === "true";
    }
    data[key] = value;
  });
  return { data, body: match[2].trim() };
}
