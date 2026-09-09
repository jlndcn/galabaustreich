# Data Flows

## Erklärung

Der Datenfluss im Repository beginnt auf der Frontend-Seite, wo das Formular-Element in `frontend/src/components/ContactForm.astro` definiert ist und sein `action`-Attribut explizit auf `/api/contact` verweist. Wenn ein Nutzer das Formular absendet, wird eine HTTP-POST-Anfrage an diesen Pfad gerichtet; diese Anfrage wird intern von der Datei `frontend/netlify/functions/contact.mjs` verarbeitet, die als Implementierung für den Endpunkt `/api/contact` dient. Wichtig ist hierbei die Konfiguration in `netlify.toml`, die sicherstellt, dass alle Requests unter `/api/*` automatisch an die Serverless-Funktion `/.netlify/functions/:splat` weitergeleitet werden, wobei diese Weiterleitung mit einem HTTP-Statuscode 200 bestätigt wird. Die Logik innerhalb der Funktion `contact.mjs` greift auf Umgebungsvariablen wie `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER` und `SMTP_PASSWORD` zu, um eine Verbindung zum E-Mail-Server herzustellen, wobei die TLS-Verschlüsselung aktiviert ist.

Sobald die Anfrage validiert wurde (die Funktion erlaubt nur POST-Anfragen und lehnt andere Methoden mit Status 405 ab), initiiert der Code den Versand einer E-Mail vom Typ „inquiry". Diese Nachricht wird an den Empfänger gesendet, dessen Adresse entweder aus der Konfiguration `CONTACT_RECIPIENT` oder direkt aus der Umgebungsvariable `SMTP_USER` stammt. Parallel dazu wird eine Bestätigungsmail des Typs „confirmation" generiert und versendet. Der gesamte E-Mail-Versandprozess nutzt die Bibliothek `nodemailer`, um die SMTP-Kommunikation zu handhaben, wobei die Datenflüsse hier klar vom Frontend-Code über die Serverless-Funktion zum externen SMTP-Server fließen.

Neben diesem direkten Benutzerinteraktionspfad existiert im Repository eine separate Infrastruktur für Cron-Jobs unter `.emergent/cron`. Diese Verzeichnisstruktur enthält Skripte wie `watch_crons.sh` und `dispatch_webhook.sh`, die in einer Konfigurationsdatei `webhook-crons` definiert sind. Obwohl diese Dateien als Quellen für automatisierte Aufgaben identifiziert wurden, ist im vorliegenden Kontext nicht dokumentiert, ob oder wie diese Cron-Jobs mit dem oben beschriebenen Kontaktformular-Fluss interagieren; sie stehen isoliert als Quelle für Webhook-Auslöser bereit. Ebenso finden sich Backend-Komponenten wie `backend/mailer.py` und `backend/server.py`, die jedoch im aktuellen Datenfluss-Diagramm nicht mit den spezifischen Endpunkten oder Funktionen des Frontend-Branches verknüpft sind, sodass ihre Rolle hier als nicht belegt gilt.

## Technische Referenz

### Extrahierte Flüsse

- /api/* 200 /.netlify/functions/:splat: rewrite_897 → /.netlify/functions/:splat · `netlify.toml:28`
- GET: srcfile_9 → /api/contact · `frontend/dist-preview/_astro/ContactForm.astro_astro_type_script_index_0_lang.BidsZuqT.js:1`
- sends_mail: srcfile_15 → smtp_57 · `frontend/netlify/functions/contact.mjs`
- posts_to: form_88 → /api/contact · `frontend/src/components/ContactForm.astro:17`
- POST: srcfile_446 → /api/contact · `frontend/src/scripts/contact.ts:56`
- contact.ts → Nodemailer/SMTP: serverless_46 → smtp_57 · `frontend/netlify/functions/contact.mjs:1`, `frontend/netlify/functions/contact.mjs:5`

### HTTP-Aufrufe

- **GET /api/contact** in `frontend/dist-preview/_astro/ContactForm.astro_astro_type_script_index_0_lang.BidsZuqT.js`
- **POST /api/contact** in `frontend/src/scripts/contact.ts`

### Mail / SMTP

- **SMTP usage in frontend/netlify/functions/contact.mjs** · `{"file":"frontend/netlify/functions/contact.mjs","hostEnv":"SMTP_HOST","portEnv":"SMTP_PORT","userEnv":"SMTP_USER","passwordEnv":"SMTP_PASSWORD","recipientEnv":null,"tls":true,"tlsMinVersion":null,"library":"nodemailer"}`
- **Inquiry mail in frontend/netlify/functions/contact.mjs** · `{"file":"frontend/netlify/functions/contact.mjs","kind":"inquiry","to":"CONTACT_RECIPIENT/SMTP_USER"}`
- **Confirmation mail in frontend/netlify/functions/contact.mjs** · `{"file":"frontend/netlify/functions/contact.mjs","kind":"confirmation"}`

## Evidence

- **http_call** GET /api/contact: `frontend/dist-preview/_astro/ContactForm.astro_astro_type_script_index_0_lang.BidsZuqT.js:1` — `fetch(`/api/contact`,{method:`POST`,headers:{"Content-Type":`application/json`},body:JSON.stringify({name:c.name.trim(),phone:c.phone.trim()`
- **http_call** POST /api/contact: `frontend/src/scripts/contact.ts:56` — `fetch('/api/contact', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({`
- **smtp** SMTP usage in frontend/netlify/functions/contact.mjs: `frontend/netlify/functions/contact.mjs:5` — `nodemailer/SMTP`
- **mail** Inquiry mail in frontend/netlify/functions/contact.mjs: `frontend/netlify/functions/contact.mjs:267` — `inquiry sendMail`
- **mail** Confirmation mail in frontend/netlify/functions/contact.mjs: `frontend/netlify/functions/contact.mjs:198` — `confirmation sendMail`
- **endpoint** HTTP method guard POST in frontend/netlify/functions/contact.mjs: `frontend/netlify/functions/contact.mjs:204` — `method !== "POST") { return new Response(JSON.stringify({ detail: "Methode`
- **endpoint** /api/contact: `frontend/dist-preview/_astro/ContactForm.astro_astro_type_script_index_0_lang.BidsZuqT.js:1` — `fetch(`/api/contact`,{method:`POST`,headers:{"Content-Type":`application/json`},body:JSON.stringify({name:c.name.trim(),phone:c.phone.trim()`; `frontend/netlify/functions/contact.mjs:1`
