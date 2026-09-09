# Garten Streich – Astro-Frontend

Statische Website mit Astro, TypeScript und lokal gehostetem Figtree. Kein React-Runtime, kein Router im Browser und keine UI-Bibliothek. Inhalte stehen bereits in der HTML-Antwort.

## Entwicklung

Node.js 24 verwenden (siehe `.nvmrc`), dann:

```sh
npm ci
npm run dev
```

Lokale Entwicklung und Vorschauen sind absichtlich `noindex`. Einen Produktionsbuild erzeugt Netlify automatisch mit `CONTEXT=production`. Lokal unter PowerShell:

```powershell
$env:CONTEXT='production'
npm run build
npm run preview
```

Ausgabe: `dist/`. Auf Netlify wird ausschließlich die bestehende Function `netlify/functions/contact.mjs` serverseitig ausgeführt. Lokales Astro-Preview versendet keine Kontaktanfragen.

## Struktur

- `src/pages/`: sieben bestehende Seiten, 404 und robots.txt.
- `src/data/`: Unternehmensdaten, Navigation, Leistungen, SEO, Saisonzuordnung und Formularvalidierung.
- `src/layouts/`, `src/components/`: semantische Astro-Komponenten.
- `src/scripts/`: ausschließlich Menü, Formular und Aktualisierung des Saisonmonats.
- `src/styles/global.css`: Farben, Typografie, Layout und Interaktionszustände.
- `src/assets/`: unveränderte Logoquellen für responsive WebP-Varianten.
- `public/`: bestehende öffentliche Assets, lokale Fonts, Sitemap und Manifest.

Die Saison wird beim Build vorgerendert und bei einem abweichenden Browsermonat aktualisiert. Alle Leistungen bleiben ohne JavaScript erreichbar. Ohne JavaScript stehen Telefonnummer, E-Mail und WhatsApp sowie die Navigation zur Verfügung; der JSON-Formularversand ist dann deaktiviert.

## Prüfungen

Nach einem Produktionsbuild:

```sh
npm test
npm exec playwright install firefox webkit
npm run test:e2e
npm run test:performance
npm run test:security
node tests/verify-build.mjs
npm run format:check
npm audit
```

Für Chrome verwendet Playwright die lokal installierte Chrome-Version. Firefox und WebKit werden als Testbrowser installiert. Browserprüfungen blockieren externe Requests und fangen sämtliche Kontakt-POSTs ab. Function-Tests ersetzen Nodemailer durch einen lokalen Stub. Es werden keine E-Mails versendet.

`npm run test:e2e` startet einen lokalen statischen Testserver auf Port 4140. Vorhandene unbekannte Server auf diesem Port zuerst beenden. Der Testserver bildet die beabsichtigten statischen Routen ab; er ist kein Beweis für die Konfiguration eines bereits veröffentlichten Netlify-Deployments.

Screenshots, Logs und Lighthouse-JSON liegen unter `reports/`; der Playwright-Bericht unter `playwright-report/`. Diese erzeugten Dateien sind nicht versioniert. `tests/fixtures/baseline.json` bewahrt unverändert den Inhaltsvergleich mit CRA-Commit `8e6a511`. Die begrenzten Korrekturen an Rechtstexten sind separat in `tests/fixtures/content-corrections.ts` dokumentiert und werden beim Vergleich berücksichtigt.

`npm run format` formatiert den Astro-Quellcode und die Tests. Die Kontaktfunktion behält ihren vorhandenen Stil; Feldtypen, Längen, Steuerzeichen, einzelne E-Mail-Adressen, SMTP-Konfiguration und die maximale Anfragegröße werden zusätzlich geprüft. Benachrichtigung und optionale Eingangsbestätigung bleiben erhalten. SMTP-Zugangsdaten werden ausschließlich aus serverseitigen Environment Variables gelesen.

`npm run test:security` prüft Projektdateien einschließlich ignorierter Builds und Reports, den Git-Index und alle erreichbaren historischen Git-Blobs auf typische Secret-Muster. Lokale `.env`-Dateien und Git-Ignore-Regeln werden zusätzlich geprüft. Es werden nur Fundstellen ausgegeben. Fremde Dependencies, temporäre Browserprofile und Binärinhalte sind ausgenommen; ein heuristischer Scan kann nicht jedes denkbare Secret erkennen. Keine Secrets mit `git add -f` aufnehmen.

Für die separate lokale Vorschauprüfung unter PowerShell:

```powershell
$env:CONTEXT='deploy-preview'
npm exec astro build -- --outDir dist-preview
node tests/verify-build.mjs --preview
```

`compare-baseline.mjs` ist ein historisches Werkzeug zum Erstellen der CRA-Vergleichsdaten, kein zusätzlicher Testlauf. Die vorhandenen Daten nicht neu erzeugen. Unter `backend/` und `tests/` im Repository-Root sind keine ausführbaren Python-Testfälle vorhanden; die alte Vorschauanwendung wird nicht gestartet.

Deployment und offene Freigabepunkte: [../NETLIFY_DEPLOY.md](../NETLIFY_DEPLOY.md) und [../ABSCHLUSSBERICHT.md](../ABSCHLUSSBERICHT.md).
