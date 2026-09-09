# Component: index

## Erklärung

Die Komponente `index` liegt unter `frontend/src/pages/index.astro`.

Formular-Markup ist für diese Datei nicht belegt.

Keine fetch-Aufrufe in dieser Datei belegt.

Details ohne Evidence bleiben unbewertet.

## Technische Referenz

### Zweck & Pfad

- Zweck: UI-Komponente `index`
- Pfad: `frontend/src/pages/index.astro`

### Imports / Dependencies

- `../layouts/BaseLayout.astro`
- `../components/Logo.astro`
- `../components/Icon.astro`
- `../components/Rating.astro`
- `../components/SeasonalServices.astro`
- `../components/ContactForm.astro`
- `../data/site`
- `../data/seo`
- `../data/seasons`
- `../data/services`

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

- **component** index.astro: `frontend/src/pages/index.astro:1`
- **import** frontend/src/pages/index.astro imports ../layouts/BaseLayout.astro: `frontend/src/pages/index.astro:1` — `import BaseLayout from '../layouts/BaseLayout.astro'; import Logo from '../components/Logo.astro';`
- **import** frontend/src/pages/index.astro imports ../components/Logo.astro: `frontend/src/pages/index.astro:2` — `import Logo from '../components/Logo.astro'; import Icon from '../components/Icon.astro'; import Ra`
- **import** frontend/src/pages/index.astro imports ../components/Icon.astro: `frontend/src/pages/index.astro:3` — `import Icon from '../components/Icon.astro'; import Rating from '../components/Rating.astro'; impor`
- **import** frontend/src/pages/index.astro imports ../components/Rating.astro: `frontend/src/pages/index.astro:4` — `import Rating from '../components/Rating.astro'; import SeasonalServices from '../components/Season`
- **import** frontend/src/pages/index.astro imports ../components/SeasonalServices.astro: `frontend/src/pages/index.astro:5` — `import SeasonalServices from '../components/SeasonalServices.astro'; import ContactForm from '../co`
- **import** frontend/src/pages/index.astro imports ../components/ContactForm.astro: `frontend/src/pages/index.astro:6` — `import ContactForm from '../components/ContactForm.astro'; import { site, contactPrompt } from '../`
- **import** frontend/src/pages/index.astro imports ../data/site: `frontend/src/pages/index.astro:7` — `import { site, contactPrompt } from '../data/site'; import { seoPages, buildLocalBusinessJsonLd } f`
- **import** frontend/src/pages/index.astro imports ../data/seo: `frontend/src/pages/index.astro:8` — `import { seoPages, buildLocalBusinessJsonLd } from '../data/seo'; import { getSeason } from '../dat`
- **import** frontend/src/pages/index.astro imports ../data/seasons: `frontend/src/pages/index.astro:9` — `import { getSeason } from '../data/seasons'; import { services } from '../data/services'; const sea`
- **import** frontend/src/pages/index.astro imports ../data/services: `frontend/src/pages/index.astro:10` — `import { services } from '../data/services'; const season = getSeason(); --- <BaseLayout seo={seoP`
