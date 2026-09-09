# API / Endpoint: /api/contact

## Erklärung

Die API-Route `/api/contact` ist eine Serverless-Funktion, die im Repository unter `frontend/netlify/functions/contact.mjs` implementiert ist und ausschließlich über HTTP-POST-Anfragen erreichbar ist; andere Methoden werden mit einem 405-Fehler abgewiesen. Der Endpunkt erwartet ein JSON-Objekt als Payload, da Form-Daten oder Base64-Codierungen nicht unterstützt werden. Die Eingabevalidierung greift auf eine Konstante `LIMITS` zurück, die maximale Längen für die Felder definiert: der Name darf 120 Zeichen, die Telefonnummer 40 Zeichen, die E-Mail-Adresse 160 Zeichen, der Standort 160 Zeichen, die Webseite 300 Zeichen und die Nachricht selbst bis zu 4000 Zeichen umfassen; zudem ist ein Feld namens `page` mit einem Limit von 200 Zeichen vorhanden. Um Bots abzufangen, wird das Feld `website` als Honeypot genutzt: Wenn dieses Feld in der Anfrage vorkommt, führt die Funktion keinen erfolgreichen Workflow durch und gibt stattdessen einen Fehler zurück, was auf automatisierte Submissions hindeutet.

Bevor die Daten verarbeitet werden, unterliegt der gesamte Payload einer Sanitierungslogik, bei der HTML-Tags entfernt und Sonderzeichen entgegengesetzt werden, um XSS-Angriffe zu verhindern; dabei wird jedoch nicht explizit als Text behandelt, sondern die Logik ist auf strukturierte JSON-Daten ausgelegt. Sollte die Gesamtgröße des Requests den Schwellenwert von 20.000 Bytes überschreiten, wird sofort ein HTTP-Statuscode 413 (Payload Too Large) zurückgegeben. Bei ungültigen Datenformaten oder fehlenden erforderlichen Feldern erfolgt eine Ablehnung mit Status 400, während bei Systemfehlern im Hintergrund oder Verbindungsproblemen zu den externen Diensten die Codes 502 (Bad Gateway) bzw. 503 (Service Unavailable) zurückgesendet werden.

Im Erfolgsfall wird der Kontakt über das SMTP-Protokoll versendet, wobei die Konfiguration aus Umgebungsvariablen wie `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER` und `SMTP_PASSWORD` gelesen wird; die Kommunikation erfolgt verschlüsselt via TLS. Das System sendet zwei verschiedene E-Mails: eine Bestätigungsnachricht an den Absender (Inquiry) und eine weitere Nachricht, die an den Empfänger (`CONTACT_TO`) oder den SMTP-Benutzer gerichtet ist. Die Implementierung nutzt die Bibliothek `nodemailer` für diesen Zweck. Im Testumfeld werden spezifische Umgebungsvariablen wie `CI`, `CONTEXT` und `BASELINE_ROOT` genutzt, um die Funktionalität zu validieren, wobei die Tests sicherstellen, dass die SMTP-Port-Konfiguration korrekt übernommen wird.

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
