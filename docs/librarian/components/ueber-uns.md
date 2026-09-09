# Component: ueber-uns

## Erklärung

Die Komponente `ueber-uns` liegt unter `frontend/src/pages/ueber-uns.astro`.

Formular-Markup ist für diese Datei nicht belegt.

Keine fetch-Aufrufe in dieser Datei belegt.

Details ohne Evidence bleiben unbewertet.

## Technische Referenz

### Zweck & Pfad

- Zweck: UI-Komponente `ueber-uns`
- Pfad: `frontend/src/pages/ueber-uns.astro`

### Imports / Dependencies

- `../layouts/BaseLayout.astro`
- `../components/ContactCTA.astro`
- `../components/Icon.astro`
- `../components/Logo.astro`
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

- **component** ueber-uns.astro: `frontend/src/pages/ueber-uns.astro:1`
- **import** frontend/src/pages/ueber-uns.astro imports ../layouts/BaseLayout.astro: `frontend/src/pages/ueber-uns.astro:1` — `import BaseLayout from '../layouts/BaseLayout.astro'; import ContactCTA from '../components/Contact`
- **import** frontend/src/pages/ueber-uns.astro imports ../components/ContactCTA.astro: `frontend/src/pages/ueber-uns.astro:2` — `import ContactCTA from '../components/ContactCTA.astro'; import Icon from '../components/Icon.astro`
- **import** frontend/src/pages/ueber-uns.astro imports ../components/Icon.astro: `frontend/src/pages/ueber-uns.astro:3` — `import Icon from '../components/Icon.astro'; import Logo from '../components/Logo.astro'; import {`
- **import** frontend/src/pages/ueber-uns.astro imports ../components/Logo.astro: `frontend/src/pages/ueber-uns.astro:4` — `import Logo from '../components/Logo.astro'; import { seoPages } from '../data/seo'; const values =`
- **import** frontend/src/pages/ueber-uns.astro imports ../data/seo: `frontend/src/pages/ueber-uns.astro:5` — `import { seoPages } from '../data/seo'; const values = [ { title: 'Persönlich', text: 'Ei`
