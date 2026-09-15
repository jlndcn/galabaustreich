// Service image mapping – editable via Decap CMS (src/content/service-images.json).

import data from "@/content/service-images.json";

export const serviceImages = Object.fromEntries(
  (data.items || []).map((item) => [
    item.id,
    { name: item.name, alt: item.alt },
  ]),
);
