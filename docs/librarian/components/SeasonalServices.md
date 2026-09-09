# Component: SeasonalServices

## Erklärung

Die Komponente `SeasonalServices` liegt unter `frontend/src/components/SeasonalServices.astro`.

Formular-Markup ist für diese Datei nicht belegt.

Keine fetch-Aufrufe in dieser Datei belegt.

Details ohne Evidence bleiben unbewertet.

## Technische Referenz

### Zweck & Pfad

- Zweck: UI-Komponente `SeasonalServices`
- Pfad: `frontend/src/components/SeasonalServices.astro`

### Imports / Dependencies

- `../data/services`
- `../data/seasons`
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

- **component** SeasonalServices.astro: `frontend/src/components/SeasonalServices.astro:1`
- **import** frontend/src/components/SeasonalServices.astro imports ../data/services: `frontend/src/components/SeasonalServices.astro:1` — `import { services } from '../data/services'; import { getSeasonalTop } from '../data/seasons'; impo`
- **import** frontend/src/components/SeasonalServices.astro imports ../data/seasons: `frontend/src/components/SeasonalServices.astro:2` — `import { getSeasonalTop } from '../data/seasons'; import Icon from './Icon.astro'; const { season,`
- **import** frontend/src/components/SeasonalServices.astro imports ./Icon.astro: `frontend/src/components/SeasonalServices.astro:3` — `import Icon from './Icon.astro'; const { season, services: top } = getSeasonalTop(services); --- <`
