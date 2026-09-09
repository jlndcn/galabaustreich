# Component: impressum

## Erklärung

Die Komponente `impressum` liegt unter `frontend/src/pages/impressum.astro`.

Formular-Markup ist für diese Datei nicht belegt.

Keine fetch-Aufrufe in dieser Datei belegt.

Details ohne Evidence bleiben unbewertet.

## Technische Referenz

### Zweck & Pfad

- Zweck: UI-Komponente `impressum`
- Pfad: `frontend/src/pages/impressum.astro`

### Imports / Dependencies

- `../layouts/BaseLayout.astro`
- `../layouts/LegalLayout.astro`
- `../components/LegalSection.astro`
- `../components/Icon.astro`
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

- **component** impressum.astro: `frontend/src/pages/impressum.astro:1`
- **import** frontend/src/pages/impressum.astro imports ../layouts/BaseLayout.astro: `frontend/src/pages/impressum.astro:1` — `import BaseLayout from '../layouts/BaseLayout.astro'; import LegalLayout from '../layouts/LegalLayo`
- **import** frontend/src/pages/impressum.astro imports ../layouts/LegalLayout.astro: `frontend/src/pages/impressum.astro:2` — `import LegalLayout from '../layouts/LegalLayout.astro'; import LegalSection from '../components/Leg`
- **import** frontend/src/pages/impressum.astro imports ../components/LegalSection.astro: `frontend/src/pages/impressum.astro:3` — `import LegalSection from '../components/LegalSection.astro'; import Icon from '../components/Icon.a`
- **import** frontend/src/pages/impressum.astro imports ../components/Icon.astro: `frontend/src/pages/impressum.astro:4` — `import Icon from '../components/Icon.astro'; import { seoPages } from '../data/seo'; import { site,`
- **import** frontend/src/pages/impressum.astro imports ../data/seo: `frontend/src/pages/impressum.astro:5` — `import { seoPages } from '../data/seo'; import { site, googleLink } from '../data/site'; --- <Base`
- **import** frontend/src/pages/impressum.astro imports ../data/site: `frontend/src/pages/impressum.astro:6` — `import { site, googleLink } from '../data/site'; --- <BaseLayout seo={seoPages.impressum}> <Lega`
