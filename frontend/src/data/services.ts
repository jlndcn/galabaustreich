export interface Service {
  id: string;
  title: string;
  claim: string;
  teaser: string;
  description: string[];
  list: string[] | null;
  key: boolean;
  highlight: boolean;
  intent: string | null;
}

// Central, structured service data – single source of truth for Startseite & Leistungen.
// Texts stay faithful to the client's provided wording. Order reflects content priority.

export const services: Service[] = [
  {
    id: 'garten-gruenflaechenpflege',
    title: 'Garten- & Grünflächenpflege',
    claim: 'Damit aus Grün ein Garten wird.',
    teaser:
      'Rasen, Beete und Grünflächen – regelmäßig und fachgerecht gepflegt für ein dauerhaft schönes Erscheinungsbild.',
    description: [
      'Von der kleinen privaten Gartenoase bis zur weitläufigen Grünanlage – wir pflegen, erhalten und begleiten Außenflächen in Lübeck und Ostholstein durch die Jahreszeiten.',
      'Rasen, Beete und Grünflächen werden regelmäßig und fachgerecht gepflegt – für ein dauerhaft schönes und gepflegtes Erscheinungsbild.',
    ],
    list: null,
    key: true,
    highlight: false,
    intent: 'Gartenpflege benötigt',
  },
  {
    id: 'hecken-gehoelzpflege',
    title: 'Hecken- & Gehölzpflege',
    claim: 'In Form gebracht. Natürlich erhalten.',
    teaser:
      'Hecken, Sträucher und Gehölze – vom Formschnitt bis zum fachgerechten Rückschnitt zur richtigen Jahreszeit.',
    description: [
      'Von der jungen Hecke bis zum gewachsenen Gehölz – wir schneiden mit Blick auf Form, Gesundheit und natürlichen Wuchs.',
      'Hecken, Sträucher und Gehölze pflegen wir vom Formschnitt bis zum fachgerechten Rückschnitt zur richtigen Jahreszeit.',
    ],
    list: null,
    key: true,
    highlight: true,
    intent: 'Hecke schneiden lassen',
  },
  {
    id: 'baumfaellungen',
    title: 'Baumfällungen',
    claim: 'Manchmal braucht Neues wieder Raum.',
    teaser:
      'Baumfällungen und die dazugehörigen Arbeiten – zuverlässig und unter Berücksichtigung der örtlichen Gegebenheiten.',
    description: [
      'Wir übernehmen Baumfällungen und die dazugehörigen Arbeiten zuverlässig und unter Berücksichtigung der örtlichen Gegebenheiten.',
      'Von einzelnen Bäumen bis zu anspruchsvolleren Fällarbeiten schaffen wir fachgerecht Platz für Neues.',
    ],
    list: null,
    key: true,
    highlight: true,
    intent: 'Baum muss gefällt werden',
  },
  {
    id: 'rasenpflege',
    title: 'Rasenpflege',
    claim: 'Grün, das sich sehen lassen kann.',
    teaser:
      'Mähen, Kantenpflege, Düngung und weitere Pflegemaßnahmen – abgestimmt auf Fläche und Nutzung.',
    description: [
      'Vom regelmäßigen Mähen bis zur gezielten Pflege – für Rasenflächen, die gesund wachsen und dauerhaft gepflegt aussehen.',
      'Dazu gehören Mähen, Kantenpflege, Düngung und weitere Pflegemaßnahmen – abgestimmt auf Fläche und Nutzung.',
    ],
    list: null,
    key: false,
    highlight: false,
    intent: 'Rasen regelmäßig pflegen lassen',
  },
  {
    id: 'beet-staudenpflege',
    title: 'Beet- & Staudenpflege',
    claim: 'Wo es blüht, darf es leben.',
    teaser:
      'Pflegen, schneiden, jäten und erhalten – für gepflegte Pflanzflächen zu jeder Jahreszeit.',
    description: [
      'Vom ersten Austrieb im Frühjahr bis zum letzten Rückschnitt begleiten wir Beete und Stauden durch das Gartenjahr.',
      'Pflegen, schneiden, jäten und erhalten – für gepflegte und ansprechende Pflanzflächen zu jeder Jahreszeit.',
    ],
    list: null,
    key: false,
    highlight: false,
    intent: null,
  },
  {
    id: 'neupflanzungen',
    title: 'Neupflanzungen',
    claim: 'Heute gepflanzt. Für morgen gewachsen.',
    teaser:
      'Von Blumen und Stauden über Sträucher bis hin zu Bäumen – neues Grün für Ihren Garten.',
    description: [
      'Von Blumen und Stauden über Sträucher und Hecken bis hin zu Bäumen übernehmen wir die fachgerechte Neupflanzung und Gestaltung Ihrer Grünflächen.',
      'Neues Grün für Ihren Garten.',
    ],
    list: null,
    key: false,
    highlight: false,
    intent: null,
  },
  {
    id: 'gartenumgestaltung',
    title: 'Gartenumgestaltung',
    claim: 'Aus Bestehendem etwas Neues entstehen lassen.',
    teaser:
      'Vom einzelnen Beet bis zur Neugestaltung einzelner Gartenbereiche – aus Bestehendem etwas Neues.',
    description: [
      'Wir verändern, erneuern und ergänzen vorhandene Gartenflächen.',
      'Vom einzelnen Beet und neuen Bepflanzungen bis zur Neugestaltung einzelner Gartenbereiche gestalten wir mit Gefühl für das, was bereits gewachsen ist.',
    ],
    list: null,
    key: false,
    highlight: false,
    intent: null,
  },
  {
    id: 'saisonale-gartenarbeiten',
    title: 'Saisonale Gartenarbeiten',
    claim: 'Jede Jahreszeit hat ihre Arbeit.',
    teaser:
      'Frühjahrs- und Herbstpflege, Rückschnitte und Laubbeseitigung – im Lauf des Gartenjahres.',
    description: [
      'Vom ersten Frühjahrsschnitt bis zum letzten Herbstlaub kümmern wir uns um die Arbeiten, die im Laufe des Gartenjahres anfallen.',
    ],
    list: ['Frühjahrs- und Herbstpflege', 'Rückschnitte', 'Laubbeseitigung'],
    key: false,
    highlight: false,
    intent: null,
  },
  {
    id: 'objekt-grundstueckspflege',
    title: 'Objekt- & Grundstückspflege',
    claim: 'Gepflegt. Verlässlich. Das ganze Jahr.',
    teaser: 'Regelmäßige Pflege von Grünflächen und Außenanlagen – abgestimmt auf den Bedarf.',
    description: [
      'Regelmäßige Pflege von Grünflächen und Außenanlagen – für Privatgrundstücke, Wohnanlagen, Gewerbeobjekte und öffentliche Flächen in Lübeck und Ostholstein.',
      'Die Pflege wird auf den jeweiligen Bedarf abgestimmt.',
    ],
    list: ['Privatgrundstücke', 'Wohnanlagen', 'Gewerbeobjekte', 'Öffentliche Flächen'],
    key: false,
    highlight: false,
    intent: 'Grundstück dauerhaft pflegen lassen',
  },
  {
    id: 'winterdienst',
    title: 'Winterdienst',
    claim: 'Auch wenn das Grün Pause macht, sind wir für Sie da.',
    teaser: 'Schnee- und Eisbeseitigung sowie Streudienst auf Wegen, Zufahrten und Außenflächen.',
    description: [
      'Schnee- und Eisbeseitigung sowie Streudienst auf Wegen, Zufahrten und Außenflächen – für private, gewerbliche und öffentliche Grundstücke.',
    ],
    list: ['Wege', 'Zufahrten', 'Außenflächen'],
    key: false,
    highlight: false,
    intent: null,
  },
];

// Additionally named services (no invented details).
export const furtherServices = ['Hausmeisterdienste', 'Terrassen- & Außenflächenreinigung'];

// The three visually highlighted key services on the Startseite.
export const keyServices = services.filter((s) => s.key);
