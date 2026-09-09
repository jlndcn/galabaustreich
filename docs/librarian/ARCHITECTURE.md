# Architecture

## Erklärung

Das Repository ist als hybride Architektur aufgebaut, die eine Astro-basierte Frontend-Schicht mit einer separaten Python-Backend-Infrastruktur verbindet. Die Benutzeroberfläche wird primär durch Astro-Dateien im Pfad `frontend/src` definiert, wobei statische Routen wie die Startseite (`index.astro`) oder rechtliche Seiten (z. B. `agb.astro`, `datenschutz.astro`) direkt vom Build-Prozess generiert werden. Für dynamische Interaktionen und Formulare wird auf Serverless-Funktionen zurückgegriffen, die im Verzeichnis `frontend/netlify/functions` liegen; ein konkretes Beispiel hierfür ist der Kontakt-Handler in `contact.mjs`, der spezifisch für HTTP-POST-Anfragen konfiguriert ist und andere Methoden mit einem 405-Fehler ablehnt. Diese Funktionen werden über eine Rewrite-Regel in der Konfiguration (`netlify.toml`) so umgeleitet, dass alle Anfragen unter `/api/*` auf die Netlify-Funktionen-Routing-Schnittstelle `/.netlify/functions/:splat` weitergeleitet werden, was eine saubere Trennung von statischen Inhalten und API-Logik ermöglicht.

Die Datenverarbeitung im Hintergrund erfolgt durch ein Python-Backend, das in `backend/server.py` definiert ist und über die Datei `backend/mailer.py` E-Mail-Funktionalität bereitstellt. Wenn ein Nutzer das Kontaktformular (`ContactForm.astro`) ausfüllt, wird der POST-Antrag an den Endpunkt `/api/contact` gesendet; dieser Aufruf löst im Serverless-Kontext eine Logik aus, die wiederum eine E-Mail über SMTP versendet. Die Struktur des Frontends ist modular aufgebaut und nutzt wiederverwendbare Komponenten wie `Header`, `Footer`, `ContactCTA` oder `FloatingWhatsApp`, die in der `frontend/src/components`-Ordnerstruktur organisiert sind. Zusätzlich existiert ein Layout-System mit Basis-Layouts (`BaseLayout`) sowie speziellen rechtlichen Layouts (`LegalLayout`), die sicherstellen, dass alle statischen Seiten konsistent gestaltet werden. Für nicht gefundene Ressourcen steht eine eigene 404-Seite bereit, und die Robot-Datei wird separat als `robots.txt.ts` verwaltet.

Im Verzeichnis `.emergent` finden sich Metadaten und Skripte zur Automatisierung von Cron-Jobs, darunter Shell-Skripte zum Dispatchen von Webhooks (`dispatch_webhook.sh`) und Watchern für Zeitpläne (`watch_crons.sh`). Diese Infrastruktur deutet auf eine Erweiterung hin, bei der Hintergrundprozesse oder externe Integrationen über Webhooks gesteuert werden können. Die Entwicklungsumgebung ist klar getrennt: Das Frontend nutzt Node.js/npm (erkennbar an `.npmrc` und `astro.config.mjs`), während das Backend Python mit pytest für Tests (`pytest.ini`) und spezifischen Abhängigkeiten (`requirements.txt`) verwendet. Diese Trennung der Laufzeitumgebungen innerhalb eines einzigen Repositories erfordert eine sorgfältige Konfiguration, um sicherzustellen, dass die Astro-Builds und die Python-Server unabhängig voneinander, aber koordiniert bereitgestellt werden können.

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
