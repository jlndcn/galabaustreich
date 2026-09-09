# Component: team

## Erklärung

Die Komponente `team` liegt unter `frontend/src/pages/team.astro`.

Formular-Markup ist für diese Datei nicht belegt.

Keine fetch-Aufrufe in dieser Datei belegt.

Details ohne Evidence bleiben unbewertet.

## Technische Referenz

### Zweck & Pfad

- Zweck: UI-Komponente `team`
- Pfad: `frontend/src/pages/team.astro`

### Imports / Dependencies

- `../layouts/BaseLayout.astro`
- `../components/ContactCTA.astro`
- `../components/Icon.astro`
- `../data/seo`

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

- **component** team.astro: `frontend/src/pages/team.astro:1`
- **import** frontend/src/pages/team.astro imports ../layouts/BaseLayout.astro: `frontend/src/pages/team.astro:1` — `import BaseLayout from '../layouts/BaseLayout.astro'; import ContactCTA from '../components/Contact`
- **import** frontend/src/pages/team.astro imports ../components/ContactCTA.astro: `frontend/src/pages/team.astro:2` — `import ContactCTA from '../components/ContactCTA.astro'; import Icon from '../components/Icon.astro`
- **import** frontend/src/pages/team.astro imports ../components/Icon.astro: `frontend/src/pages/team.astro:3` — `import Icon from '../components/Icon.astro'; import { seoPages } from '../data/seo'; const values =`
- **import** frontend/src/pages/team.astro imports ../data/seo: `frontend/src/pages/team.astro:4` — `import { seoPages } from '../data/seo'; const values = [ { title: 'Familiär', text: 'Wir`
