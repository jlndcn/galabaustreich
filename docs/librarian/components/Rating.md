# Component: Rating

## Erklärung

Die Komponente `Rating` liegt unter `frontend/src/components/Rating.astro`.

Formular-Markup ist für diese Datei nicht belegt.

Keine fetch-Aufrufe in dieser Datei belegt.

Details ohne Evidence bleiben unbewertet.

## Technische Referenz

### Zweck & Pfad

- Zweck: UI-Komponente `Rating`
- Pfad: `frontend/src/components/Rating.astro`

### Imports / Dependencies

- `../data/site`
- `./Icon.astro`

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

- **component** Rating.astro: `frontend/src/components/Rating.astro:1`
- **import** frontend/src/components/Rating.astro imports ../data/site: `frontend/src/components/Rating.astro:1` — `import { site, googleLink } from '../data/site'; import Icon from './Icon.astro'; const { rating, r`
- **import** frontend/src/components/Rating.astro imports ./Icon.astro: `frontend/src/components/Rating.astro:2` — `import Icon from './Icon.astro'; const { rating, reviewCount } = site.google; --- {rating && ( <`
