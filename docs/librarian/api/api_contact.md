# API / Endpoint: /api/contact

## Erklärung

Die API-Route `/api/contact` ist eine Serverless-Funktion, die im Repository unter `frontend/netlify/functions/contact.mjs` implementiert ist und ausschließlich über HTTP POST-Anfragen bedient wird; andere Methoden werden mit einem 405-Status abgelehnt. Der Endpunkt erwartet ein JSON-Objekt als Payload, da Form-Daten oder Base64-Codierung nicht unterstützt sind. Bevor die Logik ausgeführt wird, greift eine Größenbeschränkung von maximal 20.000 Bytes auf der Request-Ebene; überschreitet das eingehende Paket diese Grenze, wird sofort ein HTTP 413 (Payload Too Large) zurückgegeben. Die Validierung der einzelnen Felder erfolgt anhand definierter Längenlimits: `name` darf maximal 120 Zeichen, `phone` 40 Zeichen, `email` 160 Zeichen, `location` 160 Zeichen, `message` 4000 Zeichen, `page` 200 Zeichen und `website` 300 Zeichen enthalten. Besonders zu beachten ist das Feld `website`, das als Honeypot fungiert; wenn dieses Feld ausgefüllt wird, führt dies nicht zu einem stillen Erfolg, sondern löst eine Fehlerbehandlung aus, um Bots zu erkennen. Zusätzlich wird der gesamte Textinhalt aller Felder entgegengesetzt (HTML-Escape), wobei jedoch keine Tags gestrippt werden, was bedeutet, dass die Eingabe als roher Text behandelt und nur für die Anzeige sicher gemacht wird, ohne strukturelle Änderungen am Inhalt vorzunehmen.

Bei erfolgreicher Validierung und Einhaltung der Limits wird eine E-Mail-Versandroutine ausgelöst, die auf dem SMTP-Protokoll basiert und die Bibliothek `nodemailer` nutzt. Die Verbindung zum Mailserver erfolgt über TLS mit einer minimalen Versionsspezifikation, wobei die Konfigurationswerte für Host, Port, Benutzername und Passwort aus den Umgebungsvariablen `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER` und `SMTP_PASSWORD` gelesen werden. Das System sendet zwei verschiedene E-Mails: eine Bestätigungsmail an den Absender sowie eine Anfrage-Mail an den Empfänger, der durch die Variable `CONTACT_TO` (oder im Code als `CONTACT_RECIPIENT/SMTP_USER`) definiert ist. Sollte der SMTP-Server nicht erreichbar sein oder ein Timeout auftreten, wird ein HTTP 503 (Service Unavailable) zurückgegeben; bei Verbindungsfehlern oder falschen Serverantworten erfolgt die Rückgabe eines HTTP 502 (Bad Gateway). Ein ungültiges JSON oder fehlende Pflichtfelder führen zu einem HTTP 400 (Bad Request). Im Falle einer erfolgreichen Verarbeitung und des abgeschlossenen E-Mail-Versands wird ein HTTP 200 zurückgesendet, was dem Frontend signalisiert, dass die Kontaktaufnahme erfolgreich war.

## Technische Referenz

### Route & Implementierung

- Route: `/api/contact`
- Implementierung: `frontend/netlify/functions/contact.mjs`
- Aufrufer: siehe HTTP-/Form-Facts
- Rewrite: nicht dokumentiert

### HTTP-Methode & Statuscodes

- HTTP 413
- HTTP 400
- HTTP 200
- HTTP 503
- HTTP 502

### Request-Felder / Validierung / Limits

- **LIMITS** · `{"file":"frontend/netlify/functions/contact.mjs","name":"LIMITS","value":"{"}`
- **COMPANY** · `{"file":"frontend/netlify/functions/contact.mjs","name":"COMPANY","value":"\"Garten Streich Website\""}`
- **COMPANY_LEGAL** · `{"file":"frontend/netlify/functions/contact.mjs","name":"COMPANY_LEGAL","value":"\"Garten-und Landschaftspflege B.Streich\""}`
- **COMPANY_PHONE** · `{"file":"frontend/netlify/functions/contact.mjs","name":"COMPANY_PHONE","value":"\"0177 3216077\""}`
- **COMPANY_ADDRESS** · `{"file":"frontend/netlify/functions/contact.mjs","name":"COMPANY_ADDRESS","value":"\"Dorfstraße 12, 23684 Scharbeutz\""}`
- **EMAIL_RE** · `{"file":"frontend/netlify/functions/contact.mjs","name":"EMAIL_RE","value":"/^[^\\s@<>,"}`
- **PHONE_RE** · `{"file":"frontend/netlify/functions/contact.mjs","name":"PHONE_RE","value":"/^[+0-9][0-9\\s()/.-]{4,}$/"}`
- **LIMITS.name** · `{"file":"frontend/netlify/functions/contact.mjs","field":"name","maxLength":120,"source":"LIMITS"}`
- **LIMITS.phone** · `{"file":"frontend/netlify/functions/contact.mjs","field":"phone","maxLength":40,"source":"LIMITS"}`
- **LIMITS.email** · `{"file":"frontend/netlify/functions/contact.mjs","field":"email","maxLength":160,"source":"LIMITS"}`
- **LIMITS.location** · `{"file":"frontend/netlify/functions/contact.mjs","field":"location","maxLength":160,"source":"LIMITS"}`
- **LIMITS.message** · `{"file":"frontend/netlify/functions/contact.mjs","field":"message","maxLength":4000,"source":"LIMITS"}`
- **LIMITS.page** · `{"file":"frontend/netlify/functions/contact.mjs","field":"page","maxLength":200,"source":"LIMITS"}`
- **LIMITS.website** · `{"file":"frontend/netlify/functions/contact.mjs","field":"website","maxLength":300,"source":"LIMITS"}`
- **Honeypot in frontend/netlify/functions/contact.mjs** · `{"file":"frontend/netlify/functions/contact.mjs","fields":"website","silentSuccess":false}`
- **Request size limit in frontend/netlify/functions/contact.mjs** · `{"file":"frontend/netlify/functions/contact.mjs","bytes":20000,"sourceLiteral":"20000","statusOnExceed":413}`
- **Sanitizing in frontend/netlify/functions/contact.mjs** · `{"file":"frontend/netlify/functions/contact.mjs","asText":false,"escapeHtml":true,"stripTags":false,"headerUnsafe":false}`
- **Request parsing in frontend/netlify/functions/contact.mjs** · `{"file":"frontend/netlify/functions/contact.mjs","json":true,"form":false,"base64":false}`

### Environment / SMTP / Mail

- **SMTP_HOST** · `{"name":"SMTP_HOST","file":"frontend/netlify/functions/contact.mjs"}`
- **SMTP_PORT** · `{"name":"SMTP_PORT","file":"frontend/netlify/functions/contact.mjs"}`
- **SMTP_USER** · `{"name":"SMTP_USER","file":"frontend/netlify/functions/contact.mjs"}`
- **SMTP_PASSWORD** · `{"name":"SMTP_PASSWORD","file":"frontend/netlify/functions/contact.mjs"}`
- **CONTACT_TO** · `{"name":"CONTACT_TO","file":"frontend/netlify/functions/contact.mjs"}`
- **SMTP usage in frontend/netlify/functions/contact.mjs** · `{"file":"frontend/netlify/functions/contact.mjs","hostEnv":"SMTP_HOST","portEnv":"SMTP_PORT","userEnv":"SMTP_USER","passwordEnv":"SMTP_PASSWORD","recipientEnv":null,"tls":true,"tlsMinVersion":null,"library":"nodemailer"}`
- **Inquiry mail in frontend/netlify/functions/contact.mjs** · `{"file":"frontend/netlify/functions/contact.mjs","kind":"inquiry","to":"CONTACT_RECIPIENT/SMTP_USER"}`
- **Confirmation mail in frontend/netlify/functions/contact.mjs** · `{"file":"frontend/netlify/functions/contact.mjs","kind":"confirmation"}`

### Datenfluss

- /api/* 200 /.netlify/functions/:splat: `rewrite_897` → `/.netlify/functions/:splat`
- GET: `srcfile_9` → `/api/contact`
- sends_mail: `srcfile_15` → `smtp_57`
- posts_to: `form_88` → `/api/contact`
- POST: `srcfile_446` → `/api/contact`
- contact.ts → Nodemailer/SMTP: `serverless_46` → `smtp_57`

## Evidence

- **endpoint** /api/contact: `frontend/dist-preview/_astro/ContactForm.astro_astro_type_script_index_0_lang.BidsZuqT.js:1` — `fetch(`/api/contact`,{method:`POST`,headers:{"Content-Type":`application/json`},body:JSON.stringify({name:c.name.trim(),phone:c.phone.trim()`; `frontend/netlify/functions/contact.mjs:1`
- **file** frontend/netlify/functions/contact.mjs: `frontend/netlify/functions/contact.mjs:1`
- **file** frontend/src/data/contact.ts: `frontend/src/data/contact.ts:1`
- **file** frontend/src/scripts/contact.ts: `frontend/src/scripts/contact.ts:1`
- **file** frontend/tests/unit/contact.test.ts: `frontend/tests/unit/contact.test.ts:1`
- **http_call** GET /api/contact: `frontend/dist-preview/_astro/ContactForm.astro_astro_type_script_index_0_lang.BidsZuqT.js:1` — `fetch(`/api/contact`,{method:`POST`,headers:{"Content-Type":`application/json`},body:JSON.stringify({name:c.name.trim(),phone:c.phone.trim()`
- **file** frontend/netlify/functions/contact.mjs: `frontend/netlify/functions/contact.mjs:1`
- **function** validate: `frontend/netlify/functions/contact.mjs:52` — `function validate(input) { for (const [key, max] of Object.entries(LIMITS))`
- **function** smtpConfig: `frontend/netlify/functions/contact.mjs:96` — `function smtpConfig() { const host = (process.env.SMTP_HOST || "").trim();`
- **function** createTransport: `frontend/netlify/functions/contact.mjs:107` — `function createTransport(cfg) { return nodemailer.createTransport({ h`
- **function** notificationMail: `frontend/netlify/functions/contact.mjs:122` — `function notificationMail(cfg, d, receivedAt) { const text = [ "Neue`
- **function** confirmationMail: `frontend/netlify/functions/contact.mjs:169` — `function confirmationMail(cfg, d) { const text = [ `Guten Tag ${d.nam`
- **constant** LIMITS: `frontend/netlify/functions/contact.mjs:8` — `const LIMITS = { name: 120, phone: 40, email: 160, location: 160, message: 4000,`
- **constant** COMPANY: `frontend/netlify/functions/contact.mjs:18` — `const COMPANY = "Garten Streich Website"; const COMPANY_LEGAL = "Garten-und Landschaftspflege B.`
- **constant** COMPANY_LEGAL: `frontend/netlify/functions/contact.mjs:20` — `const COMPANY_LEGAL = "Garten-und Landschaftspflege B.Streich"; const COMPANY_PHONE = "0177 321607`
- **constant** COMPANY_PHONE: `frontend/netlify/functions/contact.mjs:21` — `const COMPANY_PHONE = "0177 3216077"; const COMPANY_ADDRESS = "Dorfstraße 12, 23684 Scharbeutz";`
- **constant** COMPANY_ADDRESS: `frontend/netlify/functions/contact.mjs:22` — `const COMPANY_ADDRESS = "Dorfstraße 12, 23684 Scharbeutz"; const json = (status, body) => new`
- **constant** EMAIL_RE: `frontend/netlify/functions/contact.mjs:42` — `const EMAIL_RE = /^[^\s@<>,;:"\\()[\]\x00-\x1f\x7f]+@[^\s@<>,;:"\\()[\]\x00-\x1f\x7f]+\.[^\s@<>,;`
- **constant** PHONE_RE: `frontend/netlify/functions/contact.mjs:44` — `const PHONE_RE = /^[+0-9][0-9\s()/.-]{4,}$/; const escapeHtml = (s) => s .replace(/&/g,`
- **env_var** SMTP_HOST: `frontend/netlify/functions/contact.mjs:99` — `process.env.SMTP_HOST`
- **env_var** SMTP_PORT: `frontend/netlify/functions/contact.mjs:100` — `process.env.SMTP_PORT`
- **env_var** SMTP_USER: `frontend/netlify/functions/contact.mjs:101` — `process.env.SMTP_USER`
- **env_var** SMTP_PASSWORD: `frontend/netlify/functions/contact.mjs:102` — `process.env.SMTP_PASSWORD`
- **env_var** CONTACT_TO: `frontend/netlify/functions/contact.mjs:103` — `process.env.CONTACT_TO`
- **status_code** HTTP 413: `frontend/netlify/functions/contact.mjs:214` — `json(413, { detail: "Ihre Anfrage ist zu`
- **status_code** HTTP 400: `frontend/netlify/functions/contact.mjs:219` — `json(400, { detail: "Ungültige Anfrage."`
- **status_code** HTTP 200: `frontend/netlify/functions/contact.mjs:251` — `json(200, { received: true, message: "Vi`
- **status_code** HTTP 503: `frontend/netlify/functions/contact.mjs:257` — `json(503, { detail: "Der`
- **status_code** HTTP 502: `frontend/netlify/functions/contact.mjs:271` — `json(502, { detail: "Ihr`
- **serverless_function** frontend/netlify/functions/contact.mjs: `frontend/netlify/functions/contact.mjs:1`
- **request_field** LIMITS.name: `frontend/netlify/functions/contact.mjs:10` — `name: 120`
- **request_field** LIMITS.phone: `frontend/netlify/functions/contact.mjs:11` — `phone: 40`
- **request_field** LIMITS.email: `frontend/netlify/functions/contact.mjs:12` — `email: 160`
- **request_field** LIMITS.location: `frontend/netlify/functions/contact.mjs:13` — `location: 160`
- **request_field** LIMITS.message: `frontend/netlify/functions/contact.mjs:14` — `message: 4000`
- **request_field** LIMITS.page: `frontend/netlify/functions/contact.mjs:15` — `page: 200`
- **request_field** LIMITS.website: `frontend/netlify/functions/contact.mjs:15` — `website: 300`
- **honeypot** Honeypot in frontend/netlify/functions/contact.mjs: `frontend/netlify/functions/contact.mjs:74` — `honeypot bot-field/website`
- **size_limit** Request size limit in frontend/netlify/functions/contact.mjs: `frontend/netlify/functions/contact.mjs:25` — `rawLength > 20000 → 413`
- **sanitize** Sanitizing in frontend/netlify/functions/contact.mjs: `frontend/netlify/functions/contact.mjs:47` — `sanitize/escape/asText`
