# Component: Logo

## Erklärung

Die Komponente `Logo` liegt unter `frontend/src/components/Logo.astro`.

Formular-Markup ist für diese Datei nicht belegt.

Keine fetch-Aufrufe in dieser Datei belegt.

Details ohne Evidence bleiben unbewertet.

## Technische Referenz

### Zweck & Pfad

- Zweck: UI-Komponente `Logo`
- Pfad: `frontend/src/components/Logo.astro`

### Imports / Dependencies

- `astro:assets`
- `../assets/logo-header.webp`
- `../assets/logo-hero.webp`

### Inputs / Props

- **large** optional=true
- **linked** optional=true
- **priority** optional=true

### Forms

_Nicht dokumentiert — keine belegten Einträge._

### Form Fields

_Nicht dokumentiert — keine belegten Einträge._

### Outputs / Side Effects / HTTP

_Nicht dokumentiert — keine belegten Einträge._

### Runtime / Fehler / Security

_Nicht dokumentiert — keine belegten Einträge._

## Evidence

- **component** Logo.astro: `frontend/src/components/Logo.astro:1`
- **import** frontend/src/components/Logo.astro imports astro:assets: `frontend/src/components/Logo.astro:1` — `import { getImage } from 'astro:assets'; import headerLogo from '../assets/logo-header.webp'; impor`
- **import** frontend/src/components/Logo.astro imports ../assets/logo-header.webp: `frontend/src/components/Logo.astro:2` — `import headerLogo from '../assets/logo-header.webp'; import heroLogo from '../assets/logo-hero.webp`
- **import** frontend/src/components/Logo.astro imports ../assets/logo-hero.webp: `frontend/src/components/Logo.astro:3` — `import heroLogo from '../assets/logo-hero.webp'; interface Props { large?: boolean; linked?: bo`
- **prop** frontend/src/components/Logo.astro prop large: `frontend/src/components/Logo.astro:5` — `large?:`
- **prop** frontend/src/components/Logo.astro prop linked: `frontend/src/components/Logo.astro:6` — `linked?:`
- **prop** frontend/src/components/Logo.astro prop priority: `frontend/src/components/Logo.astro:7` — `priority?:`
