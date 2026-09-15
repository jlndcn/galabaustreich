// Typische Arbeiten im Gartenjahr – Daten in src/content/seasons.json (Decap CMS).
// Rechtlicher Hintergrund: Starke Rückschnitte und Fällungen an Hecken/Gehölzen sind nach § 39 Abs. 5
// BNatSchG vom 1. März bis 30. September nicht erlaubt; schonende Form- und Pflegeschnitte bleiben möglich.

import seasonsData from "@/content/seasons.json";

export const monthNames = [
  "Januar",
  "Februar",
  "März",
  "April",
  "Mai",
  "Juni",
  "Juli",
  "August",
  "September",
  "Oktober",
  "November",
  "Dezember",
];

export const seasonByMonth = Object.fromEntries(
  (seasonsData.months || []).map((entry) => [
    entry.month,
    { ids: entry.ids || [], note: entry.note || "" },
  ]),
);

export function getSeason(date = new Date()) {
  const month = Number(
    new Intl.DateTimeFormat("de-DE", {
      month: "numeric",
      timeZone: "Europe/Berlin",
    }).format(date),
  );
  const entry = seasonByMonth[month] || { ids: [], note: "" };
  const seasonName = ["Winter", "Frühling", "Sommer", "Herbst"][
    Math.floor((month % 12) / 3)
  ];
  return { month, monthName: monthNames[month - 1], seasonName, ...entry };
}

export function getSeasonalTop(allServices, n = 3, date = new Date()) {
  const season = getSeason(date);
  const picked = season.ids
    .map((id) => allServices.find((s) => s.id === id))
    .filter(Boolean)
    .slice(0, n);
  if (picked.length < n) {
    for (const s of allServices) {
      if (picked.length >= n) break;
      if (s.key && !picked.includes(s)) picked.push(s);
    }
  }
  return { season, services: picked };
}
