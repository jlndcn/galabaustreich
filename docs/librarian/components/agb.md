# Component: agb

## Erklärung

Die Komponente `agb` liegt unter `frontend/src/pages/agb.astro`.

Formular-Markup ist für diese Datei nicht belegt.

Keine fetch-Aufrufe in dieser Datei belegt.

Details ohne Evidence bleiben unbewertet.

## Technische Referenz

### Zweck & Pfad

- Zweck: UI-Komponente `agb`
- Pfad: `frontend/src/pages/agb.astro`

### Imports / Dependencies

- `../layouts/BaseLayout.astro`
- `../layouts/LegalLayout.astro`
- `../components/LegalSection.astro`
- `../data/seo`
- `../data/site`

### Inputs / Props

_Nicht dokumentiert — keine belegten Einträge._

### Forms

_Nicht dokumentiert — keine belegten Einträge._

### Form Fields

_Nicht dokumentiert — keine belegten Einträge._

### Outputs / Side Effects / HTTP

_Nicht dokumentiert — keine belegten Einträge._

### Runtime / Fehler / Security

_Nicht dokumentiert — keine belegten Einträge._

## Evidence

- **component** agb.astro: `frontend/src/pages/agb.astro:1`
- **import** frontend/src/pages/agb.astro imports ../layouts/BaseLayout.astro: `frontend/src/pages/agb.astro:1` — `import BaseLayout from '../layouts/BaseLayout.astro'; import LegalLayout from '../layouts/LegalLayo`
- **import** frontend/src/pages/agb.astro imports ../layouts/LegalLayout.astro: `frontend/src/pages/agb.astro:2` — `import LegalLayout from '../layouts/LegalLayout.astro'; import LegalSection from '../components/Leg`
- **import** frontend/src/pages/agb.astro imports ../components/LegalSection.astro: `frontend/src/pages/agb.astro:3` — `import LegalSection from '../components/LegalSection.astro'; import { seoPages } from '../data/seo'`
- **import** frontend/src/pages/agb.astro imports ../data/seo: `frontend/src/pages/agb.astro:4` — `import { seoPages } from '../data/seo'; import { site } from '../data/site'; const terms = { paym`
- **import** frontend/src/pages/agb.astro imports ../data/site: `frontend/src/pages/agb.astro:5` — `import { site } from '../data/site'; const terms = { paymentDays: 14, noticePeriod: 'vier Woche`
