# Architecture

## Erklärung

Die Systemarchitektur dieses Repositories basiert auf einer modernen, serverlosen Frontend-Architektur mit Astro als Framework und Netlify als Hosting-Plattform. Das Frontend wird primär durch eine Sammlung von Astro-Komponenten definiert, die in spezifischen Verzeichnissen organisiert sind. Die Layouts bilden das strukturelle Gerüst der Anwendung: `BaseLayout` dient als universeller Ausgangspunkt für den Großteil der Seiten, während `LegalLayout` speziell für rechtliche Dokumente wie AGB (`agb.astro`), Datenschutz (`datenschutz.astro`) und Impressum (`impressum.astro`) verwendet wird. Für die Darstellung von Inhalten stehen zahlreiche wiederverwendbare Komponenten zur Verfügung, darunter `Header`, `Footer`, `Logo`, `Icon` sowie domänenspezifische Elemente wie `ContactCTA`, `ContactForm`, `FloatingWhatsApp`, `SeasonalServices` und `LegalSection`. Die Routenstruktur ist klar getrennt: Standardseiten wie die Startseite (`index.astro`) oder das Team (`team.astro`) nutzen das Basis-Layout, während rechtliche Seiten das spezielle Legal-Layout vererben. Auch statische Dateien wie `robots.txt.ts` sind als Astro-Seiten integriert, um Suchmaschinen-Kompatibilität sicherzustellen.

Die Backend-Kommunikation und API-Logik laufen vollständig serverlos über Netlify Functions. Ein zentraler Mechanismus ist die globale Rewrite-Regel in `netlify.toml`, die alle Anfragen unter `/api/*` auf die generische Funktion `/.netlify/functions/:splat` weiterleitet, was eine zentrale Verwaltung von API-Endpunkten ermöglicht. Der spezifische Endpunkt für Kontaktanfragen ist `/api/contact`. Dieser wird durch die Datei `frontend/netlify/functions/contact.mjs` implementiert. Die Architektur erzwingt hier eine strikte Methodentrennung: Das Serverless-Funktionsskript erlaubt explizit nur HTTP-POST-Anfragen und lehnt alle anderen Methoden mit dem Statuscode 405 ab, was auf einer Guard-Logik innerhalb der Funktion basiert.

Der Datenfluss bei Kontaktanfragen ist klar definiert und verbindet Frontend, Backend-Logik und externe Dienste. Wenn ein Nutzer das Formular `ContactForm` ausfüllt, wird die Anfrage als POST an `/api/contact` gesendet. Im Hintergrund verarbeitet die Serverless-Funktion diese Eingabe und leitet sie weiter an einen Python-basierten Mailer (`backend/mailer.py`). Dieser Backend-Teil ist für sich genommen eine separate Komponente mit eigenen Abhängigkeiten (`requirements.txt`) und Testkonfigurationen (`pytest.ini`). Die eigentliche E-Mail-Versendung erfolgt über SMTP, gesteuert durch den `backend/mailer.py` Code. Zusätzlich existiert im Repository eine eigene Cron-Job-Infrastruktur unter `.emergent/cron`, die Webhooks überwacht und auslöst (`.emergent/cron/watch_crons.sh`, `.emergent/cron/dispatch_webhook.sh`). Diese Infrastruktur ist jedoch aktuell noch nicht direkt mit dem Kontaktformular-Workflow verknüpft, sondern stellt eine separate Automatisierungsebene dar. Die Architektur trennt somit die reine Frontend-Darstellung (Astro), die API-Routing-Schicht (Netlify Functions) und die E-Mail-Versandlogik (Python Backend) klar voneinander, wobei der Kontaktweg als einzige aktive Schnittstelle zwischen Frontend und externem Mail-System dokumentiert ist.

## Technische Referenz

### Komponenten

- **ContactCTA.astro** (`frontend/src/components/ContactCTA.astro`) → [components/ContactCTA.md](./components/ContactCTA.md)
- **ContactForm.astro** (`frontend/src/components/ContactForm.astro`) → [components/ContactForm.md](./components/ContactForm.md)
- **FloatingWhatsApp.astro** (`frontend/src/components/FloatingWhatsApp.astro`) → [components/FloatingWhatsApp.md](./components/FloatingWhatsApp.md)
- **Footer.astro** (`frontend/src/components/Footer.astro`) → [components/Footer.md](./components/Footer.md)
- **Header.astro** (`frontend/src/components/Header.astro`) → [components/Header.md](./components/Header.md)
- **Icon.astro** (`frontend/src/components/Icon.astro`) → [components/Icon.md](./components/Icon.md)
- **LegalSection.astro** (`frontend/src/components/LegalSection.astro`) → [components/LegalSection.md](./components/LegalSection.md)
- **Logo.astro** (`frontend/src/components/Logo.astro`) → [components/Logo.md](./components/Logo.md)
- **Rating.astro** (`frontend/src/components/Rating.astro`) → [components/Rating.md](./components/Rating.md)
- **SeasonalServices.astro** (`frontend/src/components/SeasonalServices.astro`) → [components/SeasonalServices.md](./components/SeasonalServices.md)
- **BaseLayout.astro** (`frontend/src/layouts/BaseLayout.astro`) → [components/BaseLayout.md](./components/BaseLayout.md)
- **LegalLayout.astro** (`frontend/src/layouts/LegalLayout.astro`) → [components/LegalLayout.md](./components/LegalLayout.md)
- **404.astro** (`frontend/src/pages/404.astro`) → [components/404.md](./components/404.md)
- **agb.astro** (`frontend/src/pages/agb.astro`) → [components/agb.md](./components/agb.md)
- **datenschutz.astro** (`frontend/src/pages/datenschutz.astro`) → [components/datenschutz.md](./components/datenschutz.md)
- **impressum.astro** (`frontend/src/pages/impressum.astro`) → [components/impressum.md](./components/impressum.md)
- **index.astro** (`frontend/src/pages/index.astro`) → [components/index.md](./components/index.md)
- **leistungen.astro** (`frontend/src/pages/leistungen.astro`) → [components/leistungen.md](./components/leistungen.md)
- **team.astro** (`frontend/src/pages/team.astro`) → [components/team.md](./components/team.md)
- **ueber-uns.astro** (`frontend/src/pages/ueber-uns.astro`) → [components/ueber-uns.md](./components/ueber-uns.md)

### Routes / Pages

- **frontend/src/pages/404.astro** ← `frontend/src/pages/404.astro`
- **/frontend/src/pages/404** ← `frontend/src/pages/404.astro`
- **frontend/src/pages/agb.astro** ← `frontend/src/pages/agb.astro`
- **/frontend/src/pages/agb** ← `frontend/src/pages/agb.astro`
- **frontend/src/pages/datenschutz.astro** ← `frontend/src/pages/datenschutz.astro`
- **/frontend/src/pages/datenschutz** ← `frontend/src/pages/datenschutz.astro`
- **frontend/src/pages/impressum.astro** ← `frontend/src/pages/impressum.astro`
- **/frontend/src/pages/impressum** ← `frontend/src/pages/impressum.astro`
- **frontend/src/pages/index.astro** ← `frontend/src/pages/index.astro`
- **/frontend/src/pages/** ← `frontend/src/pages/index.astro`
- **frontend/src/pages/leistungen.astro** ← `frontend/src/pages/leistungen.astro`
- **/frontend/src/pages/leistungen** ← `frontend/src/pages/leistungen.astro`
- **frontend/src/pages/robots.txt.ts** ← `frontend/src/pages/robots.txt.ts`
- **frontend/src/pages/team.astro** ← `frontend/src/pages/team.astro`
- **/frontend/src/pages/team** ← `frontend/src/pages/team.astro`
- **frontend/src/pages/ueber-uns.astro** ← `frontend/src/pages/ueber-uns.astro`
- **/frontend/src/pages/ueber-uns** ← `frontend/src/pages/ueber-uns.astro`

### Belegte Beziehungen

- `rewrite_897` —rewrites_to→ `/.netlify/functions/:splat` (/api/* 200 /.netlify/functions/:splat)
- `srcfile_9` —posts_to→ `/api/contact` (GET)
- `srcfile_15` —sends_mail→ `smtp_57`
- `form_88` —posts_to→ `/api/contact`
- `srcfile_446` —posts_to→ `/api/contact` (POST)
- `serverless_46` —sends_mail→ `smtp_57` (contact.ts → Nodemailer/SMTP)

## Evidence

- **component** ContactCTA.astro: `frontend/src/components/ContactCTA.astro:1`
- **component** ContactForm.astro: `frontend/src/components/ContactForm.astro:1`
- **component** FloatingWhatsApp.astro: `frontend/src/components/FloatingWhatsApp.astro:1`
- **component** Footer.astro: `frontend/src/components/Footer.astro:1`
- **component** Header.astro: `frontend/src/components/Header.astro:1`
- **component** Icon.astro: `frontend/src/components/Icon.astro:1`
- **component** LegalSection.astro: `frontend/src/components/LegalSection.astro:1`
- **component** Logo.astro: `frontend/src/components/Logo.astro:1`
- **component** Rating.astro: `frontend/src/components/Rating.astro:1`
- **component** SeasonalServices.astro: `frontend/src/components/SeasonalServices.astro:1`
- **component** BaseLayout.astro: `frontend/src/layouts/BaseLayout.astro:1`
- **component** LegalLayout.astro: `frontend/src/layouts/LegalLayout.astro:1`
- **component** 404.astro: `frontend/src/pages/404.astro:1`
- **component** agb.astro: `frontend/src/pages/agb.astro:1`
- **component** datenschutz.astro: `frontend/src/pages/datenschutz.astro:1`
- **component** impressum.astro: `frontend/src/pages/impressum.astro:1`
- **component** index.astro: `frontend/src/pages/index.astro:1`
- **component** leistungen.astro: `frontend/src/pages/leistungen.astro:1`
- **component** team.astro: `frontend/src/pages/team.astro:1`
- **component** ueber-uns.astro: `frontend/src/pages/ueber-uns.astro:1`
- **route** frontend/src/pages/404.astro: `frontend/src/pages/404.astro:1`
- **route** /frontend/src/pages/404: `frontend/src/pages/404.astro:1`
- **route** frontend/src/pages/agb.astro: `frontend/src/pages/agb.astro:1`
- **route** /frontend/src/pages/agb: `frontend/src/pages/agb.astro:1`
- **route** frontend/src/pages/datenschutz.astro: `frontend/src/pages/datenschutz.astro:1`
- **route** /frontend/src/pages/datenschutz: `frontend/src/pages/datenschutz.astro:1`
- **route** frontend/src/pages/impressum.astro: `frontend/src/pages/impressum.astro:1`
- **route** /frontend/src/pages/impressum: `frontend/src/pages/impressum.astro:1`
- **route** frontend/src/pages/index.astro: `frontend/src/pages/index.astro:1`
- **route** /frontend/src/pages/: `frontend/src/pages/index.astro:1`
- **route** frontend/src/pages/leistungen.astro: `frontend/src/pages/leistungen.astro:1`
- **route** /frontend/src/pages/leistungen: `frontend/src/pages/leistungen.astro:1`
- **route** frontend/src/pages/robots.txt.ts: `frontend/src/pages/robots.txt.ts:1`
- **route** frontend/src/pages/team.astro: `frontend/src/pages/team.astro:1`
- **route** /frontend/src/pages/team: `frontend/src/pages/team.astro:1`
- **route** frontend/src/pages/ueber-uns.astro: `frontend/src/pages/ueber-uns.astro:1`
- **route** /frontend/src/pages/ueber-uns: `frontend/src/pages/ueber-uns.astro:1`
- **serverless_function** frontend/netlify/functions/contact.mjs: `frontend/netlify/functions/contact.mjs:1`
