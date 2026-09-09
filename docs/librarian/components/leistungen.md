# Component: leistungen

## Erklärung

Die Komponente `leistungen` liegt unter `frontend/src/pages/leistungen.astro`.

Formular-Markup ist für diese Datei nicht belegt.

Keine fetch-Aufrufe in dieser Datei belegt.

Details ohne Evidence bleiben unbewertet.

## Technische Referenz

### Zweck & Pfad

- Zweck: UI-Komponente `leistungen`
- Pfad: `frontend/src/pages/leistungen.astro`

### Imports / Dependencies

- `../layouts/BaseLayout.astro`
- `../components/ContactCTA.astro`
- `../components/Icon.astro`
- `../data/services`
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

- **component** leistungen.astro: `frontend/src/pages/leistungen.astro:1`
- **import** frontend/src/pages/leistungen.astro imports ../layouts/BaseLayout.astro: `frontend/src/pages/leistungen.astro:1` — `import BaseLayout from '../layouts/BaseLayout.astro'; import ContactCTA from '../components/Contact`
- **import** frontend/src/pages/leistungen.astro imports ../components/ContactCTA.astro: `frontend/src/pages/leistungen.astro:2` — `import ContactCTA from '../components/ContactCTA.astro'; import Icon from '../components/Icon.astro`
- **import** frontend/src/pages/leistungen.astro imports ../components/Icon.astro: `frontend/src/pages/leistungen.astro:3` — `import Icon from '../components/Icon.astro'; import { services, furtherServices } from '../data/ser`
- **import** frontend/src/pages/leistungen.astro imports ../data/services: `frontend/src/pages/leistungen.astro:4` — `import { services, furtherServices } from '../data/services'; import { seoPages } from '../data/seo`
- **import** frontend/src/pages/leistungen.astro imports ../data/seo: `frontend/src/pages/leistungen.astro:5` — `import { seoPages } from '../data/seo'; import { site } from '../data/site'; --- <BaseLayout seo={`
- **import** frontend/src/pages/leistungen.astro imports ../data/site: `frontend/src/pages/leistungen.astro:6` — `import { site } from '../data/site'; --- <BaseLayout seo={seoPages.leistungen}> <header class="c`
