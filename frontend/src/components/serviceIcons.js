import { Leaf, Scissors, Axe, Sprout, Flower2, Trees, Sparkles, Sun, Building2, Snowflake } from "lucide-react";

// Maps each service id to a calm, on-brand line icon.
export const serviceIcons = {
  "garten-gruenflaechenpflege": Leaf,
  "hecken-gehoelzpflege": Scissors,
  "baumfaellungen": Axe,
  "rasenpflege": Sprout,
  "beet-staudenpflege": Flower2,
  "neupflanzungen": Trees,
  "gartenumgestaltung": Sparkles,
  "saisonale-gartenarbeiten": Sun,
  "objekt-grundstueckspflege": Building2,
  "winterdienst": Snowflake,
};

export const getServiceIcon = (id) => serviceIcons[id] || Leaf;

// Short, honest descriptive labels for the (photo) placeholder surfaces per service.
export const serviceMotifs = {
  "garten-gruenflaechenpflege": "Gepflegte Gärten & Grünflächen",
  "hecken-gehoelzpflege": "Hecken & Gehölze in Form",
  "baumfaellungen": "Fachgerechte Baumarbeiten",
  "rasenpflege": "Gesunde Rasenflächen",
  "beet-staudenpflege": "Beete & Stauden",
  "neupflanzungen": "Neues Grün für den Garten",
  "gartenumgestaltung": "Gärten neu gedacht",
  "saisonale-gartenarbeiten": "Arbeiten im Gartenjahr",
  "objekt-grundstueckspflege": "Grün- & Außenanlagen",
  "winterdienst": "Winterdienst",
};

export const getServiceMotif = (id) => serviceMotifs[id] || "";
