# Component: BaseLayout

## Erklärung

Die Komponente `BaseLayout` liegt unter `frontend/src/layouts/BaseLayout.astro`.

Formular-Markup ist für diese Datei nicht belegt.

Keine fetch-Aufrufe in dieser Datei belegt.

Details ohne Evidence bleiben unbewertet.

## Technische Referenz

### Zweck & Pfad

- Zweck: UI-Komponente `BaseLayout`
- Pfad: `frontend/src/layouts/BaseLayout.astro`

### Imports / Dependencies

- `../components/Header.astro`
- `../components/Footer.astro`
- `../components/FloatingWhatsApp.astro`
- `../data/site`

### Inputs / Props

- **seo** optional=false
- **title** optional=false
- **description** optional=false
- **path** optional=false

### Forms

_Nicht dokumentiert — keine belegten Einträge._

### Form Fields

_Nicht dokumentiert — keine belegten Einträge._

### Outputs / Side Effects / HTTP

_Nicht dokumentiert — keine belegten Einträge._

### Runtime / Fehler / Security

_Nicht dokumentiert — keine belegten Einträge._

## Evidence

- **component** BaseLayout.astro: `frontend/src/layouts/BaseLayout.astro:1`
- **import** frontend/src/layouts/BaseLayout.astro imports ../components/Header.astro: `frontend/src/layouts/BaseLayout.astro:1` — `import '../styles/global.css'; import Header from '../components/Header.astro'; import Footer from`
- **import** frontend/src/layouts/BaseLayout.astro imports ../components/Footer.astro: `frontend/src/layouts/BaseLayout.astro:3` — `import Footer from '../components/Footer.astro'; import FloatingWhatsApp from '../components/Floati`
- **import** frontend/src/layouts/BaseLayout.astro imports ../components/FloatingWhatsApp.astro: `frontend/src/layouts/BaseLayout.astro:4` — `import FloatingWhatsApp from '../components/FloatingWhatsApp.astro'; import { site } from '../data/`
- **import** frontend/src/layouts/BaseLayout.astro imports ../data/site: `frontend/src/layouts/BaseLayout.astro:5` — `import { site } from '../data/site'; interface Props { seo: { title: string; description: string;`
- **prop** frontend/src/layouts/BaseLayout.astro prop seo: `frontend/src/layouts/BaseLayout.astro:7` — `seo:`
- **prop** frontend/src/layouts/BaseLayout.astro prop title: `frontend/src/layouts/BaseLayout.astro:7` — `title:`
- **prop** frontend/src/layouts/BaseLayout.astro prop description: `frontend/src/layouts/BaseLayout.astro:8` — `description:`
- **prop** frontend/src/layouts/BaseLayout.astro prop path: `frontend/src/layouts/BaseLayout.astro:8` — `path:`
