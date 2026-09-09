# Component: Footer

## Erklärung

Die Komponente `Footer` liegt unter `frontend/src/components/Footer.astro`.

Formular-Markup ist für diese Datei nicht belegt.

Keine fetch-Aufrufe in dieser Datei belegt.

Details ohne Evidence bleiben unbewertet.

## Technische Referenz

### Zweck & Pfad

- Zweck: UI-Komponente `Footer`
- Pfad: `frontend/src/components/Footer.astro`

### Imports / Dependencies

- `../data/site`
- `./Logo.astro`
- `./Rating.astro`
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

- **component** Footer.astro: `frontend/src/components/Footer.astro:1`
- **import** frontend/src/components/Footer.astro imports ../data/site: `frontend/src/components/Footer.astro:1` — `import { mainNav, legalNav, site, googleLink } from '../data/site'; import Logo from './Logo.astro'`
- **import** frontend/src/components/Footer.astro imports ./Logo.astro: `frontend/src/components/Footer.astro:2` — `import Logo from './Logo.astro'; import Rating from './Rating.astro'; import Icon from './Icon.astr`
- **import** frontend/src/components/Footer.astro imports ./Rating.astro: `frontend/src/components/Footer.astro:3` — `import Rating from './Rating.astro'; import Icon from './Icon.astro'; --- <footer class="site-foot`
- **import** frontend/src/components/Footer.astro imports ./Icon.astro: `frontend/src/components/Footer.astro:4` — `import Icon from './Icon.astro'; --- <footer class="site-footer" data-testid="site-footer"> <div`
