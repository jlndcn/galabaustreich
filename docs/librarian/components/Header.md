# Component: Header

## Erklärung

Die Komponente `Header` liegt unter `frontend/src/components/Header.astro`.

Formular-Markup ist für diese Datei nicht belegt.

Keine fetch-Aufrufe in dieser Datei belegt.

Details ohne Evidence bleiben unbewertet.

## Technische Referenz

### Zweck & Pfad

- Zweck: UI-Komponente `Header`
- Pfad: `frontend/src/components/Header.astro`

### Imports / Dependencies

- `./Logo.astro`
- `./Icon.astro`
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

- **component** Header.astro: `frontend/src/components/Header.astro:1`
- **import** frontend/src/components/Header.astro imports ./Logo.astro: `frontend/src/components/Header.astro:1` — `import Logo from './Logo.astro'; import Icon from './Icon.astro'; import { mainNav, legalNav, site`
- **import** frontend/src/components/Header.astro imports ./Icon.astro: `frontend/src/components/Header.astro:2` — `import Icon from './Icon.astro'; import { mainNav, legalNav, site } from '../data/site'; const path`
- **import** frontend/src/components/Header.astro imports ../data/site: `frontend/src/components/Header.astro:3` — `import { mainNav, legalNav, site } from '../data/site'; const pathname = Astro.url.pathname.replace`
