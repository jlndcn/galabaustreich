# Deployment

## Erklärung

Der Deployment-Prozess für dieses Repository ist in der Datei `netlify.toml` zentral konfiguriert und folgt einem klar definierten Workflow, der auf dem Branch `feat/astro-modernisierung` basiert. Sobald eine Änderung im Hauptverzeichnis oder im Frontend-Verzeichnis vorgenommen wird, initiiert Netlify automatisch den Build-Prozess. Als Build-Befehl wird dabei `npm run build` ausgeführt, was durch den in `netlify.toml` hinterlegten Bundler `esbuild` unterstützt wird. Das Ergebnis dieses Builds ist der Inhalt des Verzeichnisses `dist`, welches als Publish-Verzeichnis auf dem Netlify-Edge-Netzwerk bereitgestellt wird.

Neben der reinen Bereitstellung von Dateien werden spezifische Sicherheitseinstellungen und Caching-Strategien direkt in der Konfiguration definiert. Für alle Ressourcen unter dem Pfad `/` werden standardmäßig die HTTP-Header `X-Content-Type-Options` mit dem Wert `nosniff`, `X-Frame-Options` mit `DENY` sowie `Referrer-Policy` auf `strict-origin-when-cross-origin` gesetzt, um Cross-Site-Scripting und andere Angriffe zu verhindern. Zusätzlich wird die Nutzung von Sensoren wie Kamera, Mikrofon und Geolocation durch den Header `Permissions-Policy` explizit blockiert. Für statische Assets unter `/fonts/*` ist eine aggressive Caching-Strategie aktiviert: Diese Dateien werden mit dem Header `Cache-Control: public, max-age=31536000, immutable` versehen und können daher vom Client-Cache für ein Jahr unverändert gespeichert werden.

Für dynamische Anfragen wird eine Serverless-Architektur genutzt, die über den Pfad `/api/*` abgerufen werden kann. Konkret ist die Funktion `frontend/netlify/functions/contact.mjs` konfiguriert, die auf der Route `/api/contact` aufrufbar ist. Wenn ein Formular (z. B. vom Typ `form_88`) an diese Route gesendet wird, verarbeitet die Funktion den POST-Ansatz und leitet im Hintergrund eine E-Mail über SMTP aus, wobei die Logik in `backend/mailer.py` und der Server-Code in `backend/server.py` liegt.

Im Hintergrund des Repositories finden sich zudem Mechanismen für Wartungsaufgaben, die nicht direkt im Deployment-Pfad liegen, aber Teil der Infrastruktur sind. Dies umfasst Skripte wie `.emergent/cron/watch_crons.sh`, die Cron-Jobs überwachen, sowie Konfigurationsdateien wie `.emergent/emergent.yml` und Hash-Dateien zur Verifikation von Änderungen in `.emergent/cron/applied.hash`. Diese Elemente deuten auf eine separate Orchestrierung von Hintergrundprozessen hin, die unabhängig vom eigentlichen Frontend-Deployment ablaufen.

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
