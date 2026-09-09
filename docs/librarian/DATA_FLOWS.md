# Data Flows

## Erklärung

Der Datenfluss für die Kontaktformular-Interaktion beginnt im Frontend, wo das Element `ContactForm` aus dem Dateipfad `frontend/src/components/ContactForm.astro` definiert ist. Dieses Astro-Komponente stellt ein Formular bereit, dessen `action`-Attribut auf den Endpunkt `/api/contact` verweist und die Methode `post` verwendet. Wenn der Nutzer das Formular absendet, wird eine HTTP-POST-Anfrage an diesen Pfad gesendet. Im Frontend-Build-Prozess (sichtbar in `frontend/dist-preview/_astro/ContactForm...`) wird dieser Aufruf technisch realisiert, wobei der Browser die Anfrage mit dem Inhaltstyp `application/json` an den Zielserver richtet.

Auf Serverseite fungiert Netlify als Reverse Proxy und leitet alle Anfragen unter `/api/*` weiter zu einer Lambda-Funktion (`/.netlify/functions/:splat`), was in der Konfigurationsdatei `netlify.toml` hinterlegt ist. Die eigentliche Implementierung dieser Logik befindet sich in der Datei `frontend/netlify/functions/contact.mjs`. Hier wird die Anfrage explizit auf die HTTP-Methode POST geprüft; alle anderen Methoden werden mit dem Statuscode 405 (Method Not Allowed) abgelehnt. Sobald die Validierung bestanden ist, initiiert die Funktion den Versand einer E-Mail über das SMTP-Protokoll. Die Kommunikation erfolgt dabei unter Verwendung der Bibliothek `nodemailer` und nutzt Umgebungsvariablen für Host, Port, Benutzername und Passwort sowie TLS-Verschlüsselung.

Der eigentliche E-Mail-Prozess verzweigt sich in zwei parallele Flüsse innerhalb derselben Funktion: Erstens wird eine Bestätigungsmail (`kind: confirmation`) versendet, zweitens eine Anfrage-Mail (`kind: inquiry`). Die Anfrage-Mail richtet sich an den Empfänger, der entweder über die Konstante `CONTACT_RECIPIENT` oder direkt über die SMTP-Benutzer-ID definiert ist. Es ist wichtig zu beachten, dass im Repository keine Logik für das Backend-Server-Skript `backend/mailer.py` (Python) in diesen spezifischen Datenfluss integriert ist; dieser Python-Pfad existiert zwar als Datei, wird aber von den beschriebenen JavaScript/Node.js-Funktionen nicht angesprochen. Der gesamte Ablauf endet damit, dass die E-Mails erfolgreich an das SMTP-System gesendet wurden, während der Frontend-Browser auf eine erfolgreiche Antwort des Netlify-Endpoints wartet.

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
