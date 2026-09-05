// Typische Arbeiten im Gartenjahr (allgemeine gärtnerische Praxis in Norddeutschland).
// Keine Firmenversprechen – nur eine Orientierung, wann welche Leistungen üblicherweise anstehen.
// Zuordnung: Monat (1–12) -> Service-IDs aus services.js (Reihenfolge = Relevanz) + kurzer Hinweis.
// Rechtlicher Hintergrund: Starke Rückschnitte und Fällungen an Hecken/Gehölzen sind nach § 39 Abs. 5
// BNatSchG vom 1. März bis 30. September nicht erlaubt; schonende Form- und Pflegeschnitte bleiben möglich.

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

export const seasonByMonth = {
  1: {
    ids: ["winterdienst", "baumfaellungen", "hecken-gehoelzpflege"],
    note: "Fäll- und Rückschnittsaison für Bäume und Gehölze, dazu Winterdienst",
  },
  2: {
    ids: ["baumfaellungen", "hecken-gehoelzpflege", "winterdienst"],
    note: "Letzte Wochen für Fällungen und starke Rückschnitte vor der Schonzeit ab 1. März",
  },
  3: {
    ids: ["saisonale-gartenarbeiten", "beet-staudenpflege", "neupflanzungen"],
    note: "Frühjahrspflege, Staudenrückschnitt – die Pflanzzeit beginnt",
  },
  4: {
    ids: ["rasenpflege", "neupflanzungen", "beet-staudenpflege"],
    note: "Rasen vertikutieren und düngen, Frühjahrspflanzungen",
  },
  5: {
    ids: ["rasenpflege", "garten-gruenflaechenpflege", "beet-staudenpflege"],
    note: "Das Wachstum startet – Zeit für regelmäßige Pflege",
  },
  6: {
    ids: ["hecken-gehoelzpflege", "rasenpflege", "garten-gruenflaechenpflege"],
    note: "Schonender Formschnitt an Hecken, regelmäßiges Mähen",
  },
  7: {
    ids: ["garten-gruenflaechenpflege", "rasenpflege", "objekt-grundstueckspflege"],
    note: "Sommerpflege für Gärten, Rasen und Außenanlagen",
  },
  8: {
    ids: ["hecken-gehoelzpflege", "garten-gruenflaechenpflege", "rasenpflege"],
    note: "Zweiter Formschnitt an Hecken, Sommerpflege",
  },
  9: {
    ids: ["rasenpflege", "neupflanzungen", "beet-staudenpflege"],
    note: "Herbstdüngung und Nachsaat – die beste Pflanzzeit beginnt",
  },
  10: {
    ids: ["saisonale-gartenarbeiten", "hecken-gehoelzpflege", "neupflanzungen", "baumfaellungen"],
    note: "Laub und Herbstpflege; Rückschnitte und Fällungen sind ab 1. Oktober wieder möglich",
  },
  11: {
    ids: ["saisonale-gartenarbeiten", "baumfaellungen", "winterdienst"],
    note: "Laubbeseitigung, Fällsaison – und Zeit, den Winterdienst zu planen",
  },
  12: {
    ids: ["winterdienst", "baumfaellungen", "hecken-gehoelzpflege"],
    note: "Winterdienst sowie Fäll- und Rückschnittsaison",
  },
};

export function getSeason(date = new Date()) {
  const month = date.getMonth() + 1;
  const entry = seasonByMonth[month] || { ids: [], note: "" };
  return { month, monthName: monthNames[month - 1], ...entry };
}
