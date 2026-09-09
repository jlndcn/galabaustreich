# Veröffentlichung auf Netlify

## Build und Routing

Die Konfiguration im Repository-Root ist verbindlich:

- Base: `frontend`; Build: `npm run build`; Publish: `dist`.
- Node.js 24; Installation mit dem versionierten npm-Lockfile.
- Statische Astro-Seiten ohne laufenden Astro-Server und ohne SPA-Fallback.
- `/api/*` wird weiterhin zur jeweiligen Netlify Function weitergeleitet.
- Die bestehenden URLs bleiben ohne abschließenden Slash. Pretty URLs sind deaktiviert; Netlify bedient beispielsweise `/leistungen` aus `leistungen.html`.
- Keine Regeln verwenden, die ausschließlich den abschließenden Slash ändern: Netlify normalisiert die Pfade vor dem Regelvergleich. Der lokale Testserver bestätigt kein CDN-Weiterleitungsverhalten. Varianten mit Slash und `.html` nach dem Deployment auf Erreichbarkeit, Canonical und Schleifen prüfen.
- Nicht vorhandene Dateien liefern `404.html` mit HTTP 404.
- Sicherheitsheader bleiben erhalten; Dateien in `/_astro/` und Fonts erhalten langfristige Cache-Header.

Netlify setzt `CONTEXT` selbst. Nur `production` erzeugt indexierbare Seiten und offene robots.txt. Deploy Previews, Branch Deploys und lokale Standardbuilds erhalten `noindex,nofollow`, gesperrte robots.txt und einen zusätzlichen `X-Robots-Tag` über die erzeugte `_headers`-Datei. Die 404-Seite bleibt immer noindex und hat keinen irreführenden Startseiten-Canonical.

Die Function liegt weiterhin unter `frontend/netlify/functions/contact.mjs`. Benachrichtigung, optionale Eingangsbestätigung und Honeypot sind erhalten; die serverseitige Eingabeprüfung wurde gehärtet. Die Website benötigt weder das frühere FastAPI-Backend noch MongoDB oder Emergent. Es wird kein Netlify Forms verwendet.

## Produktionsvariablen

Nur in Netlify hinterlegen; keine Zugangsdaten ins Repository schreiben.

| Variable | Bestehende Konfiguration |
| --- | --- |
| SMTP_HOST | smtp.strato.de |
| SMTP_PORT | 465 |
| SMTP_USER | info@garten-streich.de |
| SMTP_PASSWORD | Bestehendes, ausschließlich serverseitiges Secret |
| CONTACT_TO | info@garten-streich.de |

Die Variablen müssen im Scope **Functions** für den Produktionskontext verfügbar sein. SMTP-Passwort und andere Secrets ausschließlich in Netlify setzen, niemals in `netlify.toml`, Quellcode oder Git. Nach Änderungen an Function-Variablen ist ein neues Deployment erforderlich. Port 465 verwendet TLS ab Verbindungsaufbau; andere gültige Ports erzwingen STARTTLS. `CONTACT_TO` erwartet genau eine E-Mail-Adresse und fällt bei fehlendem Wert auf `SMTP_USER` zurück. `REACT_APP_BACKEND_URL` wird nicht mehr verwendet. Vorschauen erhalten keine echten SMTP-Zugangsdaten; ohne vollständige Konfiguration antwortet das Formular mit 503 und erhält den Entwurf.

## Vor der Veröffentlichung

1. Den Abschlussbericht prüfen und die Veröffentlichung ausdrücklich freigeben.
2. Freigegebenen Stand auf dem gewünschten Netlify-Branch bauen; Build-Log, Function-Bundling und die oben genannten Variablen kontrollieren.
3. In einer freigegebenen Vorschau Direktaufrufe aller sieben URLs, Weiterleitungen und einen unbekannten Pfad mit tatsächlichem HTTP 404 prüfen. Ebenfalls `_astro`-Caching, robots.txt, Canonicals und Noindex-Verhalten kontrollieren.
4. Rechtstexte und betriebliche Angaben freigeben lassen, insbesondere AGB-Konditionen, Löschfristen und tatsächlich bestehende Auftragsverarbeitungsverträge. Veraltete ODR-Verweise, Dienstleisteranschriften und die unbelegte Behauptung einer Versandbegrenzung wurden lokal korrigiert. Honeypot und serverseitige Validierung sind vorhanden. Eine zusätzliche CDN-seitige Rate-Limit-Regel ist nicht konfiguriert oder zugesagt; gegebenenfalls im Netlify-Konto abstimmen und an beiden Function-Zugängen prüfen.
5. Ein echter SMTP-Eingangstest ist noch offen. Er darf erst gesondert autorisiert und mit abgestimmten Testempfängern erfolgen. In dieser Migration wurden ausschließlich abgefangene Requests und simulierte Transports verwendet.
6. Domain und HTTPS sowie die Indexierbarkeit nach dem Produktionsdeploy kontrollieren. Echte Geräte ergänzen die automatisierten Browserprüfungen.
7. `garten-streich.de` als primäre Domain bestätigen, HTTP/HTTPS und www-Weiterleitung prüfen; Vorschau- und `netlify.app`-URLs dürfen keine indexierbaren Duplikate erzeugen. Function-Fehler dürfen keine Zugangsdaten oder Anfrageinhalte in Antworten oder Logs offenlegen.

Die vorhandenen Texte zu künftig ergänzten Projektfotos und Teamporträts wurden erhalten. Für die fotografisch vollständige Endfassung sind freigegebene echte Unternehmensfotos erforderlich.

## Rückkehr zum vorherigen Stand

Bei einem Deploymentproblem kann in Netlify das vorherige erfolgreiche Deployment wieder aktiviert werden. Der ursprüngliche CRA-Stand liegt im Git-Verlauf bei `8e6a511`; der bisherige Arbeitszweig wurde durch die Migration im separaten Worktree nicht verändert.

Quellen: [Netlify Request Chain](https://docs.netlify.com/resources/troubleshooting/request-chain/), [Redirect-Optionen](https://docs.netlify.com/manage/routing/redirects/redirect-options/), [Astro-Bilder](https://docs.astro.build/en/guides/images/), [EU-Mitteilung zur ODR-Plattform](https://consumer-redress.ec.europa.eu/site-relocation_en).
