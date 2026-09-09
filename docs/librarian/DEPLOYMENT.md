# Deployment

## Erklärung

Das Deployment dieses Repositories folgt einem klar definierten, aber teilweise noch nicht vollständig dokumentierten Prozess, der sich primär um die Astro-Frontend-Modernisierung dreht. Der Build-Prozess wird auf Netlify ausgelöst, wobei dort in der Konfiguration (`netlify.toml`) explizit `npm run build` als Befehl hinterlegt ist. Das Ergebnis dieses Builds befindet sich im Verzeichnis `dist`, welches als Publish-Target für die Veröffentlichung dient. Für die Bündelung der Assets innerhalb dieses Build-Prozesses wird der Node.js-Bundler `esbuild` verwendet, was auf eine Optimierung für Geschwindigkeit und Größe hindeutet.

Parallel zum Frontend-Build läuft ein spezifischer Workflow für Serverless-Funktionen. Im Pfad `frontend/netlify/functions/contact.mjs` ist eine Funktion definiert, die über die Route `/api/contact` erreichbar ist. Diese Funktion wird im Deployment-Kontext so umgewandelt, dass sie unter der URL-Struktur `/.netlify/functions/:splat` abgerufen werden kann. Wenn eine Anfrage auf `/api/contact` eingeht, wird diese an den spezifischen Serverless-Funktionspfad weitergeleitet und dort verarbeitet. Innerhalb dieser Logik ist die Absendung von E-Mails integriert; der Code greift hierbei auf einen SMTP-Server zu, um Benachrichtigungen auszulösen, was eine direkte Kopplung zwischen der Frontend-Anwendung und externen Maildiensten darstellt.

Die Sicherheitseinstellungen für das Deployment sind in der Netlify-Konfiguration detailliert vorgegeben und gelten für alle Ressourcen (`/*`). Standardmäßig werden sensible Header wie `X-Content-Type-Options` auf `nosniff` gesetzt, um MIME-Spoofing zu verhindern, während `X-Frame-Options` auf `DENY` festgelegt ist, um Clickjacking-Angriffe zu blockieren. Zusätzlich wird die Referer-Policy auf `strict-origin-when-cross-origin` eingeschränkt und Zugriff auf sensitive Gerätefunktionen wie Kamera, Mikrofon oder Geolocation via `Permissions-Policy` explizit deaktiviert. Für statische Assets im Pfad `/fonts/*` ist eine aggressive Caching-Strategie konfiguriert (`public, max-age=31536000, immutable`), um die Performance zu maximieren, während diese Header für andere Pfade nicht gecacht werden. <!-- not-evidenced: MIME -->

Es gibt jedoch Bereiche im Repository, die im Kontext des Deployment-Prozesses noch nicht vollständig dokumentiert sind oder deren technische Details fehlen. Beispielsweise ist der genaue Mechanismus, wie die Skripte im Verzeichnis `.emergent/cron` (wie `watch_crons.sh` oder `dispatch_webhook.sh`) in den eigentlichen Deploymentschritt integriert werden, nicht durch die bereitgestellten Fakten belegt. Auch die spezifischen Umgebungsvariablen für den SMTP-Server (`smtp_57`) oder die genauen Abhängigkeiten des Backend-Python-Codes (`backend/mailer.py`, `requirements.txt`) sind im Rahmen der Deployment-Konfiguration nicht explizit beschrieben, obwohl sie existieren. Die Datei `.bootstrap-complete` deutet zwar auf einen initialisierten Zustand hin, liefert aber keine Details darüber, wann genau dieser Zustand während eines neuen Deploys validiert wird.

## Technische Referenz

### Build & Deploy

- **Netlify build command** · `{"command":"npm run build"}`
- **Netlify node bundler** · `{"bundler":"esbuild"}`
- **Netlify publish directory** · `{"publish":"dist"}`

### Serverless Functions

- **frontend/netlify/functions/contact.mjs**

### Timeouts & Cache

- **Header X-Content-Type-Options for /*** · `{"for":"/*","header":"X-Content-Type-Options","value":"nosniff","cache":false}`
- **Header X-Frame-Options for /*** · `{"for":"/*","header":"X-Frame-Options","value":"DENY","cache":false}`
- **Header Referrer-Policy for /*** · `{"for":"/*","header":"Referrer-Policy","value":"strict-origin-when-cross-origin","cache":false}`
- **Header Permissions-Policy for /*** · `{"for":"/*","header":"Permissions-Policy","value":"camera=(), microphone=(), geolocation=()","cache":false}`
- **Header Cache-Control for /fonts/*** · `{"for":"/fonts/*","header":"Cache-Control","value":"public, max-age=31536000, immutable","cache":true}`

## Evidence

- **build** Netlify build command: `netlify.toml:14` — `command = "npm run build"`
- **build** Netlify node bundler: `netlify.toml:25` — `node_bundler = "esbuild"`
- **deploy** Netlify publish directory: `netlify.toml:15` — `publish = "dist"`
- **serverless_function** frontend/netlify/functions/contact.mjs: `frontend/netlify/functions/contact.mjs:1`
