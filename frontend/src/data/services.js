// Service catalogue – content from src/content/services.json (Decap CMS).

import data from "@/content/services.json";

function normalizeService(service) {
  const list = Array.isArray(service.list) ? service.list.filter(Boolean) : [];
  const intent = (service.intent || "").trim();
  return {
    ...service,
    list: list.length ? list : null,
    intent: intent || null,
  };
}

export const services = (data.services || []).map(normalizeService);

export const furtherServices = data.furtherServices || [];

export const keyServices = services.filter((s) => s.key);
