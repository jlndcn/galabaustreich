# Configuration

## Erklärung

Die Konfiguration in diesem Repository ist stark durch die Nutzung von Netlify und spezifischen Astro-Plugins geprägt, wobei Sicherheitsrichtlinien und Routing-Logik zentral gesteuert werden. Im Kern der Deployment-Konfiguration befindet sich die Datei `netlify.toml`, welche die HTTP-Antworten für alle Requests (`/*`) standardisiert absichert. Dort sind explizit die Header `X-Content-Type-Options` mit dem Wert `nosniff`, `X-Frame-Options` auf `DENY` sowie `Referrer-Policy` auf `strict-origin-when-cross-origin` definiert, um Cross-Site-Scripting und andere Angriffe zu verhindern. Zusätzlich wird die Nutzung sensibler APIs wie Kamera, Mikrofon und Geolokation über den Header `Permissions-Policy` blockiert (`camera=(), microphone=(), geolocation=()`). Für statische Assets, insbesondere Schriftarten unter dem Pfad `/fonts/*`, ist eine aggressive Caching-Strategie konfiguriert: Der Header `Cache-Control` erlaubt ein öffentliches Caching mit einer Gültigkeitsdauer von einem Jahr (`max-age=31536000`) und der Kennzeichnung als unveränderlich (`immutable`), was die Performance bei wiederholten Ladevorgängen optimiert.

Das Routing wird in derselben `netlify.toml` durch Rewrite-Regeln und Redirects definiert. Alle Anfragen unter `/api/*` werden transparent an die Serverless-Funktionen weitergeleitet, wobei der Pfadteil hinter dem Slash als Parameter für die Funktion `/.netlify/functions/:splat` genutzt wird und eine Statuscode 200 zurückgibt. Fehlt ein passender Treffer im Frontend oder in den Funktionen, leitet das System standardmäßig auf `/404.html` weiter, was durch einen Redirect mit dem Status 404 realisiert wird. Diese Struktur ermöglicht es, die API-Endpunkte dynamisch zu erweitern, ohne dass diese im Frontend-Code explizit als statische Pfade gehärtet werden müssen.

Die Umgebungsvariablen sind nicht zentral in einer `.env`-Datei gespeichert, sondern werden kontextspezifisch direkt in den jeweiligen Dateien referenziert oder generiert. Im Frontend wird die Variable `CONTEXT` sowohl im Astro-Konfigurationsfile (`frontend/astro.config.mjs`) als auch in Layouts und der `robots.txt` gelesen, um Build-Zeiten oder Deployment-Stadien zu steuern. Für die E-Mail-Funktionalität werden die SMTP-Parameter wie Host, Port, Benutzername und Passwort sowie das Ziel-E-Mail-Adressat (`CONTACT_TO`) direkt im Code der Funktion `frontend/netlify/functions/contact.mjs` definiert. Diese Werte fließen in den Serverless-Funktionen ein, um über Nodemailer E-Mails zu versenden. Parallel dazu werden für die Testumgebung spezifische Variablen wie `CI`, `BASELINE_ROOT`, `TEST_ROOT` und `PORT` in den Playwright- und Testserver-Konfigurationen (`playwright.config.ts`, `tests/server.mjs`) gesetzt, um die Automatisierungstests an die jeweilige Laufzeit anzupassen.

Im Backend finden sich Python-basierte Komponenten wie der Mailer (`backend/mailer.py`) und der Server (`backend/server.py`), deren Abhängigkeiten in `requirements.txt` und Testkonfigurationen (`pytest.ini`) festgelegt sind. Die Cron-Jobs zur automatisierten Webhook-Auslösung sind im Verzeichnis `.emergent/cron` organisiert, wo Skripte wie `watch_crons.sh` und `dispatch_webhook.sh` die Ausführung steuern. Diese Struktur trennt die produktive Konfiguration von den Testdaten und Automatisierungsskripten klar voneinander, wobei sensible Daten wie SMTP-Passwörter nur dort definiert sind, wo sie benötigt werden, und nicht global im Repository verteilt sind.

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
