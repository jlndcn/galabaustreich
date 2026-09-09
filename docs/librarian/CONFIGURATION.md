# Configuration

## Erklärung

Die Konfiguration dieses Repositories ist stark auf die Plattform Netlify ausgelegt und definiert das Laufzeitverhalten primär über die Datei `netlify.toml`. Hier werden sicherheitsrelevante HTTP-Header für alle Ressourcen (`/*`) zentral gesteuert: Der Header `X-Content-Type-Options` wird auf `nosniff` gesetzt, um MIME-Type-Spoofing zu verhindern, während `X-Frame-Options` mit dem Wert `DENY` das Einbetten der Seite in anderen Frames blockiert. Zusätzlich regelt `Referrer-Policy` den Datenfluss von Referern mit `strict-origin-when-cross-origin`, und die `Permissions-Policy` schränkt sensible Browser-APIs wie Kamera, Mikrofon und Geolocation explizit ein (`camera=(), microphone=(), geolocation=()`). Für statische Assets unter `/fonts/*` wird eine aggressive Caching-Strategie angewendet (`Cache-Control: public, max-age=31536000, immutable`), um die Performance zu optimieren, während diese Dateien nicht zwischengespeichert werden sollen, wenn sie sich ändern. <!-- not-evidenced: MIME -->

Die Routing-Logik ist in derselben Konfigurationsdatei definiert und leitet alle Anfragen unter `/api/*` an Netlify Functions weiter (`/.netlify/functions/:splat`) mit einem Statuscode 200. Alle anderen nicht explizit abgedeckten Pfade werden standardmäßig auf eine statische Fehlerseite `404.html` umgeleitet (Status 404). Diese Umleitung ist entscheidend für die Handhabung von Formular-Submissions, da POST-Anfragen an `/api/contact` hier landen und im Backend verarbeitet werden. Die eigentliche E-Mail-Funktionalität wird durch eine Serverless-Funktion (`contact.mjs`) realisiert, die auf SMTP zugreift. Die dafür notwendigen Umgebungsvariablen wie `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASSWORD` sowie das Ziel-Adressat `CONTACT_TO` werden nicht im Code festgelegt, sondern müssen extern bereitgestellt werden, da sie in den Fakten als Referenzen auf die Funktionsdatei erscheinen, aber keine konkreten Werte enthalten.

Im Frontend wird der Build-Prozess durch `frontend/astro.config.mjs` beeinflusst, wo die Variable `CONTEXT` gelesen wird, um das Verhalten des Astro-Frameworks anzupassen. Diese Konfiguration ist eng mit dem Deployment-Kontext verknüpft, da auch andere Dateien wie `robots.txt.ts` und `BaseLayout.astro` auf den gleichen `CONTEXT`-Wert zugreifen. Für Testzwecke existiert eine separate Sphäre von Umgebungsvariablen in `playwright.config.ts` und `tests/server.mjs`, die Pfadwurzeln (`BASELINE_ROOT`, `TEST_ROOT`) und Portnummern definieren, um Baseline-Vergleiche und Server-Tests zu steuern. Auch hier wird auf SMTP-Konfigurationen zurückgegriffen, was darauf hindeutet, dass Tests die E-Mail-Funktion simulieren oder validieren müssen.

Neben den direkten Konfigurationsdateien gibt es eine Reihe von Systemdateien im Verzeichnis `.emergent`, die das Cron-Job-Management und die Infrastruktur-Zustände steuern. Dateien wie `watch_crons.sh` und `dispatch_webhook.sh` deuten auf einen automatisierten Workflow hin, der Webhooks auslöst oder Cron-Jobs überwacht, wobei der Zustand durch Marker wie `.bootstrap-complete` verwaltet wird. Im Backend (Python) liegen die Logik für den Mailer in `backend/mailer.py` und `backend/server.py`, während Abhängigkeiten in `requirements.txt` und Testkonfigurationen in `pytest.ini` definiert sind. Die Entwicklungsumgebung wird durch `.npmrc`, `.nvmrc` und `.prettierrc.json` im Frontend-Verzeichnis standardisiert, was die Reproduzierbarkeit der Umgebung sicherstellt.

## Technische Referenz

### Config-Fakten

- **Header X-Content-Type-Options for /*** · `{"for":"/*","header":"X-Content-Type-Options","value":"nosniff","cache":false}`
- **Header X-Frame-Options for /*** · `{"for":"/*","header":"X-Frame-Options","value":"DENY","cache":false}`
- **Header Referrer-Policy for /*** · `{"for":"/*","header":"Referrer-Policy","value":"strict-origin-when-cross-origin","cache":false}`
- **Header Permissions-Policy for /*** · `{"for":"/*","header":"Permissions-Policy","value":"camera=(), microphone=(), geolocation=()","cache":false}`
- **Header Cache-Control for /fonts/*** · `{"for":"/fonts/*","header":"Cache-Control","value":"public, max-age=31536000, immutable","cache":true}`

### Environment Variables

- **CONTEXT**
- **SMTP_HOST**
- **SMTP_PORT**
- **SMTP_USER**
- **SMTP_PASSWORD**
- **CONTACT_TO**
- **CI**
- **CONTEXT**
- **CONTEXT**
- **BASELINE_ROOT**
- **BASELINE_SOURCE**
- **TEST_ROOT**
- **PORT**
- **TEST_BASELINE**
- **SMTP_PORT**
- **SMTP_PORT**
- **CONTACT_TO**
- **CONTACT_TO**
- **SMTP_PORT**
- **SMTP_PORT**

### Redirects / Rewrites

- **/* → /404.html (404)**
- **/api/* → /.netlify/functions/:splat (200)**

### Inkonsistenzen / getrennte Quellen

_Nicht dokumentiert — keine belegten Einträge._

## Evidence

- **config** Header X-Content-Type-Options for /*: `netlify.toml:46` — `X-Content-Type-Options = "nosniff" for /*`
- **config** Header X-Frame-Options for /*: `netlify.toml:47` — `X-Frame-Options = "DENY" for /*`
- **config** Header Referrer-Policy for /*: `netlify.toml:48` — `Referrer-Policy = "strict-origin-when-cross-origin" for /*`
- **config** Header Permissions-Policy for /*: `netlify.toml:49` — `Permissions-Policy = "camera=(), microphone=(), geolocation=()" for /*`
- **config** Header Cache-Control for /fonts/*: `netlify.toml:54` — `Cache-Control = "public, max-age=31536000, immutable" for /fonts/*`
- **env_var** CONTEXT: `frontend/astro.config.mjs:12` — `process.env.CONTEXT`
- **env_var** SMTP_HOST: `frontend/netlify/functions/contact.mjs:99` — `process.env.SMTP_HOST`
- **env_var** SMTP_PORT: `frontend/netlify/functions/contact.mjs:100` — `process.env.SMTP_PORT`
- **env_var** SMTP_USER: `frontend/netlify/functions/contact.mjs:101` — `process.env.SMTP_USER`
- **env_var** SMTP_PASSWORD: `frontend/netlify/functions/contact.mjs:102` — `process.env.SMTP_PASSWORD`
- **env_var** CONTACT_TO: `frontend/netlify/functions/contact.mjs:103` — `process.env.CONTACT_TO`
- **env_var** CI: `frontend/playwright.config.ts:26` — `process.env.CI`
- **env_var** CONTEXT: `frontend/src/layouts/BaseLayout.astro:13` — `process.env.CONTEXT`
- **env_var** CONTEXT: `frontend/src/pages/robots.txt.ts:2` — `process.env.CONTEXT`
- **env_var** BASELINE_ROOT: `frontend/tests/compare-baseline.mjs:8` — `process.env.BASELINE_ROOT`
- **env_var** BASELINE_SOURCE: `frontend/tests/compare-baseline.mjs:9` — `process.env.BASELINE_SOURCE`
- **env_var** TEST_ROOT: `frontend/tests/server.mjs:6` — `process.env.TEST_ROOT`
- **env_var** PORT: `frontend/tests/server.mjs:7` — `process.env.PORT`
- **env_var** TEST_BASELINE: `frontend/tests/server.mjs:8` — `process.env.TEST_BASELINE`
- **env_var** SMTP_PORT: `frontend/tests/unit/function.test.mjs:115` — `process.env.SMTP_PORT`
- **env_var** SMTP_PORT: `frontend/tests/unit/function.test.mjs:118` — `process.env.SMTP_PORT`
- **env_var** CONTACT_TO: `frontend/tests/unit/function.test.mjs:119` — `process.env.CONTACT_TO`
- **env_var** CONTACT_TO: `frontend/tests/unit/function.test.mjs:121` — `process.env.CONTACT_TO`
- **env_var** SMTP_PORT: `frontend/tests/unit/function.test.mjs:139` — `process.env.SMTP_PORT`
- **env_var** SMTP_PORT: `frontend/tests/unit/function.test.mjs:147` — `process.env.SMTP_PORT`
- **redirect** /* → /404.html (404): `netlify.toml:39` — `[[redirects]] from = "/*" to = "/404.html" status = 404`
- **rewrite** /api/* → /.netlify/functions/:splat (200): `netlify.toml:28` — `[[redirects]] from = "/api/*" to = "/.netlify/functions/:splat" status = 200`
