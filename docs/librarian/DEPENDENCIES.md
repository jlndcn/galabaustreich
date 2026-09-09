# Dependencies

## Erklärung

Abhängigkeiten stammen aus `package.json`; tatsächliche Nutzung zeigt sich in Import-Facts.

Keine Dependencies belegt.

Beobachtete Imports (Auszug): `frontend/astro.config.mjs` → `astro/config`; `frontend/astro.config.mjs` → `node:fs/promises`; `frontend/netlify/functions/contact.mjs` → `nodemailer`; `frontend/playwright.config.ts` → `@playwright/test`; `frontend/src/components/ContactCTA.astro` → `../data/site`; `frontend/src/components/ContactCTA.astro` → `./Icon.astro`; `frontend/src/components/ContactForm.astro` → `../data/site`; `frontend/src/components/ContactForm.astro` → `./Icon.astro`; `frontend/src/components/FloatingWhatsApp.astro` → `../data/site`; `frontend/src/components/FloatingWhatsApp.astro` → `./Icon.astro`; `frontend/src/components/Footer.astro` → `../data/site`; `frontend/src/components/Footer.astro` → `./Logo.astro`.

## Technische Referenz

### Deklarierte Dependencies

_Nicht dokumentiert — keine belegten Einträge._

### Observed imports (usage)

- `frontend/astro.config.mjs` imports `astro/config`
- `frontend/astro.config.mjs` imports `node:fs/promises`
- `frontend/netlify/functions/contact.mjs` imports `nodemailer`
- `frontend/playwright.config.ts` imports `@playwright/test`
- `frontend/src/components/ContactCTA.astro` imports `../data/site`
- `frontend/src/components/ContactCTA.astro` imports `./Icon.astro`
- `frontend/src/components/ContactForm.astro` imports `../data/site`
- `frontend/src/components/ContactForm.astro` imports `./Icon.astro`
- `frontend/src/components/FloatingWhatsApp.astro` imports `../data/site`
- `frontend/src/components/FloatingWhatsApp.astro` imports `./Icon.astro`
- `frontend/src/components/Footer.astro` imports `../data/site`
- `frontend/src/components/Footer.astro` imports `./Logo.astro`
- `frontend/src/components/Footer.astro` imports `./Rating.astro`
- `frontend/src/components/Footer.astro` imports `./Icon.astro`
- `frontend/src/components/Header.astro` imports `./Logo.astro`
- `frontend/src/components/Header.astro` imports `./Icon.astro`
- `frontend/src/components/Header.astro` imports `../data/site`
- `frontend/src/components/Logo.astro` imports `astro:assets`
- `frontend/src/components/Logo.astro` imports `../assets/logo-header.webp`
- `frontend/src/components/Logo.astro` imports `../assets/logo-hero.webp`
- `frontend/src/components/Rating.astro` imports `../data/site`
- `frontend/src/components/Rating.astro` imports `./Icon.astro`
- `frontend/src/components/SeasonalServices.astro` imports `../data/services`
- `frontend/src/components/SeasonalServices.astro` imports `../data/seasons`
- `frontend/src/components/SeasonalServices.astro` imports `./Icon.astro`
- `frontend/src/data/seasons.ts` imports `./services.ts`
- `frontend/src/data/seo.ts` imports `./site.ts`
- `frontend/src/layouts/BaseLayout.astro` imports `../components/Header.astro`
- `frontend/src/layouts/BaseLayout.astro` imports `../components/Footer.astro`
- `frontend/src/layouts/BaseLayout.astro` imports `../components/FloatingWhatsApp.astro`
- `frontend/src/layouts/BaseLayout.astro` imports `../data/site`
- `frontend/src/pages/404.astro` imports `../layouts/BaseLayout.astro`
- `frontend/src/pages/404.astro` imports `../components/Icon.astro`
- `frontend/src/pages/agb.astro` imports `../layouts/BaseLayout.astro`
- `frontend/src/pages/agb.astro` imports `../layouts/LegalLayout.astro`
- `frontend/src/pages/agb.astro` imports `../components/LegalSection.astro`
- `frontend/src/pages/agb.astro` imports `../data/seo`
- `frontend/src/pages/agb.astro` imports `../data/site`
- `frontend/src/pages/datenschutz.astro` imports `../layouts/BaseLayout.astro`
- `frontend/src/pages/datenschutz.astro` imports `../layouts/LegalLayout.astro`
- `frontend/src/pages/datenschutz.astro` imports `../components/LegalSection.astro`
- `frontend/src/pages/datenschutz.astro` imports `../data/seo`
- `frontend/src/pages/datenschutz.astro` imports `../data/site`
- `frontend/src/pages/impressum.astro` imports `../layouts/BaseLayout.astro`
- `frontend/src/pages/impressum.astro` imports `../layouts/LegalLayout.astro`
- `frontend/src/pages/impressum.astro` imports `../components/LegalSection.astro`
- `frontend/src/pages/impressum.astro` imports `../components/Icon.astro`
- `frontend/src/pages/impressum.astro` imports `../data/seo`
- `frontend/src/pages/impressum.astro` imports `../data/site`
- `frontend/src/pages/index.astro` imports `../layouts/BaseLayout.astro`
- `frontend/src/pages/index.astro` imports `../components/Logo.astro`
- `frontend/src/pages/index.astro` imports `../components/Icon.astro`
- `frontend/src/pages/index.astro` imports `../components/Rating.astro`
- `frontend/src/pages/index.astro` imports `../components/SeasonalServices.astro`
- `frontend/src/pages/index.astro` imports `../components/ContactForm.astro`
- `frontend/src/pages/index.astro` imports `../data/site`
- `frontend/src/pages/index.astro` imports `../data/seo`
- `frontend/src/pages/index.astro` imports `../data/seasons`
- `frontend/src/pages/index.astro` imports `../data/services`
- `frontend/src/pages/leistungen.astro` imports `../layouts/BaseLayout.astro`
- `frontend/src/pages/leistungen.astro` imports `../components/ContactCTA.astro`
- `frontend/src/pages/leistungen.astro` imports `../components/Icon.astro`
- `frontend/src/pages/leistungen.astro` imports `../data/services`
- `frontend/src/pages/leistungen.astro` imports `../data/seo`
- `frontend/src/pages/leistungen.astro` imports `../data/site`
- `frontend/src/pages/team.astro` imports `../layouts/BaseLayout.astro`
- `frontend/src/pages/team.astro` imports `../components/ContactCTA.astro`
- `frontend/src/pages/team.astro` imports `../components/Icon.astro`
- `frontend/src/pages/team.astro` imports `../data/seo`
- `frontend/src/pages/ueber-uns.astro` imports `../layouts/BaseLayout.astro`
- `frontend/src/pages/ueber-uns.astro` imports `../components/ContactCTA.astro`
- `frontend/src/pages/ueber-uns.astro` imports `../components/Icon.astro`
- `frontend/src/pages/ueber-uns.astro` imports `../components/Logo.astro`
- `frontend/src/pages/ueber-uns.astro` imports `../data/seo`
- `frontend/src/scripts/contact.ts` imports `../data/contact`
- `frontend/src/scripts/season.ts` imports `../data/seasons`
- `frontend/tests/compare-baseline.mjs` imports `node:fs/promises`
- `frontend/tests/compare-baseline.mjs` imports `node:path`
- `frontend/tests/compare-baseline.mjs` imports `node:child_process`
- `frontend/tests/compare-baseline.mjs` imports `node:crypto`
- `frontend/tests/compare-baseline.mjs` imports `@playwright/test`
- `frontend/tests/e2e/site.spec.ts` imports `@playwright/test`
- `frontend/tests/e2e/site.spec.ts` imports `@axe-core/playwright`
- `frontend/tests/e2e/site.spec.ts` imports `../../src/data/services`
- `frontend/tests/e2e/site.spec.ts` imports `../../src/data/seasons`
- `frontend/tests/e2e/site.spec.ts` imports `../../src/data/seo`
- `frontend/tests/e2e/site.spec.ts` imports `../fixtures/baseline.json`
- `frontend/tests/e2e/site.spec.ts` imports `../fixtures/content-corrections`
- `frontend/tests/performance.mjs` imports `node:fs/promises`
- `frontend/tests/performance.mjs` imports `node:path`
- `frontend/tests/performance.mjs` imports `node:zlib`
- `frontend/tests/performance.mjs` imports `node:child_process`
- `frontend/tests/performance.mjs` imports `lighthouse`
- `frontend/tests/performance.mjs` imports `chrome-launcher`
- `frontend/tests/performance.mjs` imports `lighthouse/core/config/desktop-config.js`
- `frontend/tests/security-check.mjs` imports `node:fs`
- `frontend/tests/security-check.mjs` imports `node:path`
- `frontend/tests/security-check.mjs` imports `node:child_process`
- `frontend/tests/server.mjs` imports `node:http`
- `frontend/tests/server.mjs` imports `node:fs/promises`
- `frontend/tests/server.mjs` imports `node:path`
- `frontend/tests/server.mjs` imports `node:zlib`
- `frontend/tests/unit/contact.test.ts` imports `node:test`
- `frontend/tests/unit/contact.test.ts` imports `node:assert/strict`
- `frontend/tests/unit/contact.test.ts` imports `../../src/data/contact.ts`
- `frontend/tests/unit/function.test.mjs` imports `node:test`
- `frontend/tests/unit/function.test.mjs` imports `node:assert/strict`
- `frontend/tests/unit/function.test.mjs` imports `nodemailer`
- `frontend/tests/unit/function.test.mjs` imports `../../netlify/functions/contact.mjs`
- `frontend/tests/unit/parity.test.ts` imports `node:test`
- `frontend/tests/unit/parity.test.ts` imports `node:assert/strict`
- `frontend/tests/unit/parity.test.ts` imports `node:fs`
- `frontend/tests/unit/parity.test.ts` imports `../../src/data/site.ts`
- `frontend/tests/unit/parity.test.ts` imports `../../src/data/services.ts`
- `frontend/tests/unit/parity.test.ts` imports `../../src/data/seo.ts`
- `frontend/tests/unit/parity.test.ts` imports `../../src/data/seasons.ts`
- `frontend/tests/unit/seasons.test.ts` imports `node:test`
- `frontend/tests/unit/seasons.test.ts` imports `node:assert/strict`
- `frontend/tests/unit/seasons.test.ts` imports `../../src/data/seasons.ts`
- `frontend/tests/unit/seasons.test.ts` imports `../../src/data/services.ts`
- `frontend/tests/verify-build.mjs` imports `node:fs/promises`
- `frontend/tests/verify-build.mjs` imports `node:path`
- `frontend/tests/verify-build.mjs` imports `node:assert/strict`
- `frontend/tests/verify-build.mjs` imports `node:zlib`
- `frontend/tests/verify-build.mjs` imports `node:crypto`
- `frontend/tests/verify-build.mjs` imports `../src/data/site.ts`
- `frontend/tests/verify-build.mjs` imports `../src/data/seo.ts`
- `frontend/tests/visual-review.mjs` imports `node:fs/promises`
- `frontend/tests/visual-review.mjs` imports `node:child_process`
- `frontend/tests/visual-review.mjs` imports `@playwright/test`

## Evidence

- **import** frontend/astro.config.mjs imports astro/config: `frontend/astro.config.mjs:1` — `import { defineConfig } from 'astro/config'; import { writeFile } from 'node:fs/promises'; export d`
- **import** frontend/astro.config.mjs imports node:fs/promises: `frontend/astro.config.mjs:1` — `import { writeFile } from 'node:fs/promises'; export default defineConfig({ integrations: [`
- **import** frontend/netlify/functions/contact.mjs imports nodemailer: `frontend/netlify/functions/contact.mjs:6` — `import nodemailer from "nodemailer"; const LIMITS = { name: 120, phone: 40, email: 16`
- **import** frontend/playwright.config.ts imports @playwright/test: `frontend/playwright.config.ts:1` — `import { defineConfig } from '@playwright/test'; export default defineConfig({ testDir: './tests/e`
- **import** frontend/src/components/ContactCTA.astro imports ../data/site: `frontend/src/components/ContactCTA.astro:1` — `import { site, contactPrompt } from '../data/site'; import Icon from './Icon.astro'; --- <section`
- **import** frontend/src/components/ContactCTA.astro imports ./Icon.astro: `frontend/src/components/ContactCTA.astro:2` — `import Icon from './Icon.astro'; --- <section class="contact-band" aria-labelledby="contact-band-t`
- **import** frontend/src/components/ContactForm.astro imports ../data/site: `frontend/src/components/ContactForm.astro:1` — `import { site } from '../data/site'; import Icon from './Icon.astro'; --- <div id="anfrage" class=`
- **import** frontend/src/components/ContactForm.astro imports ./Icon.astro: `frontend/src/components/ContactForm.astro:2` — `import Icon from './Icon.astro'; --- <div id="anfrage" class="inquiry-panel" aria-labelledby="inqu`
- **import** frontend/src/components/FloatingWhatsApp.astro imports ../data/site: `frontend/src/components/FloatingWhatsApp.astro:1` — `import { site } from '../data/site'; import Icon from './Icon.astro'; --- <a class="floating-wha`
- **import** frontend/src/components/FloatingWhatsApp.astro imports ./Icon.astro: `frontend/src/components/FloatingWhatsApp.astro:2` — `import Icon from './Icon.astro'; --- <a class="floating-whatsapp" href={site.whatsapp} targe`
- **import** frontend/src/components/Footer.astro imports ../data/site: `frontend/src/components/Footer.astro:1` — `import { mainNav, legalNav, site, googleLink } from '../data/site'; import Logo from './Logo.astro'`
- **import** frontend/src/components/Footer.astro imports ./Logo.astro: `frontend/src/components/Footer.astro:2` — `import Logo from './Logo.astro'; import Rating from './Rating.astro'; import Icon from './Icon.astr`
- **import** frontend/src/components/Footer.astro imports ./Rating.astro: `frontend/src/components/Footer.astro:3` — `import Rating from './Rating.astro'; import Icon from './Icon.astro'; --- <footer class="site-foot`
- **import** frontend/src/components/Footer.astro imports ./Icon.astro: `frontend/src/components/Footer.astro:4` — `import Icon from './Icon.astro'; --- <footer class="site-footer" data-testid="site-footer"> <div`
- **import** frontend/src/components/Header.astro imports ./Logo.astro: `frontend/src/components/Header.astro:1` — `import Logo from './Logo.astro'; import Icon from './Icon.astro'; import { mainNav, legalNav, site`
- **import** frontend/src/components/Header.astro imports ./Icon.astro: `frontend/src/components/Header.astro:2` — `import Icon from './Icon.astro'; import { mainNav, legalNav, site } from '../data/site'; const path`
- **import** frontend/src/components/Header.astro imports ../data/site: `frontend/src/components/Header.astro:3` — `import { mainNav, legalNav, site } from '../data/site'; const pathname = Astro.url.pathname.replace`
- **import** frontend/src/components/Logo.astro imports astro:assets: `frontend/src/components/Logo.astro:1` — `import { getImage } from 'astro:assets'; import headerLogo from '../assets/logo-header.webp'; impor`
- **import** frontend/src/components/Logo.astro imports ../assets/logo-header.webp: `frontend/src/components/Logo.astro:2` — `import headerLogo from '../assets/logo-header.webp'; import heroLogo from '../assets/logo-hero.webp`
- **import** frontend/src/components/Logo.astro imports ../assets/logo-hero.webp: `frontend/src/components/Logo.astro:3` — `import heroLogo from '../assets/logo-hero.webp'; interface Props { large?: boolean; linked?: bo`
- **import** frontend/src/components/Rating.astro imports ../data/site: `frontend/src/components/Rating.astro:1` — `import { site, googleLink } from '../data/site'; import Icon from './Icon.astro'; const { rating, r`
- **import** frontend/src/components/Rating.astro imports ./Icon.astro: `frontend/src/components/Rating.astro:2` — `import Icon from './Icon.astro'; const { rating, reviewCount } = site.google; --- {rating && ( <`
- **import** frontend/src/components/SeasonalServices.astro imports ../data/services: `frontend/src/components/SeasonalServices.astro:1` — `import { services } from '../data/services'; import { getSeasonalTop } from '../data/seasons'; impo`
- **import** frontend/src/components/SeasonalServices.astro imports ../data/seasons: `frontend/src/components/SeasonalServices.astro:2` — `import { getSeasonalTop } from '../data/seasons'; import Icon from './Icon.astro'; const { season,`
- **import** frontend/src/components/SeasonalServices.astro imports ./Icon.astro: `frontend/src/components/SeasonalServices.astro:3` — `import Icon from './Icon.astro'; const { season, services: top } = getSeasonalTop(services); --- <`
- **import** frontend/src/data/seasons.ts imports ./services.ts: `frontend/src/data/seasons.ts:1` — `import type { Service } from './services.ts'; // Typische Arbeiten im Gartenjahr (allgemeine gärtne`
- **import** frontend/src/data/seo.ts imports ./site.ts: `frontend/src/data/seo.ts:1` — `import { site, googleLink } from './site.ts'; export const seoPages = { home: { title: 'Gart`
- **import** frontend/src/layouts/BaseLayout.astro imports ../components/Header.astro: `frontend/src/layouts/BaseLayout.astro:1` — `import '../styles/global.css'; import Header from '../components/Header.astro'; import Footer from`
- **import** frontend/src/layouts/BaseLayout.astro imports ../components/Footer.astro: `frontend/src/layouts/BaseLayout.astro:3` — `import Footer from '../components/Footer.astro'; import FloatingWhatsApp from '../components/Floati`
- **import** frontend/src/layouts/BaseLayout.astro imports ../components/FloatingWhatsApp.astro: `frontend/src/layouts/BaseLayout.astro:4` — `import FloatingWhatsApp from '../components/FloatingWhatsApp.astro'; import { site } from '../data/`
