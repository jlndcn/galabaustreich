# Security

## Erklärung

Die Sicherheitsarchitektur der Kontaktformular-Funktion im Repository ist in der Datei `frontend/netlify/functions/contact.mjs` zentral implementiert und folgt einem mehrschichtigen Ansatz zur Abwehr von Missbrauch. Als erste Verteidigungslinie wird auf Zeile 25 ein striktes Limit für die Größe eingehender Anfragen definiert, das bei 20.000 Bytes liegt; sobald diese Schwelle überschritten wird, wird automatisch ein HTTP-Statuscode 413 (Request Entity Too Large) zurückgegeben, um Ressourcenverschwendung durch zu große Payloads zu verhindern. Parallel dazu ist auf Zeile 74 ein Honeypot-Mechanismus integriert, der das unsichtbare Feld `website` nutzt, um automatisierte Bots und Scraping-Skripte zu erkennen; bei Erkennung dieser Muster wird kein stiller Erfolg signalisiert, sondern die Anfrage entsprechend behandelt, was eine passive Abwehr gegen Spam-Angriffe ermöglicht.

Für den Schutz vor Cross-Site Scripting (XSS) erfolgt auf Zeile 47 eine Sanitierungslogik, die spezifisch konfiguriert ist: Der Code setzt `escapeHtml` auf true, um HTML-Tags in Nutzereingaben zu entstellen, während `stripTags` und `headerUnsafe` explizit auf false gesetzt sind. Dies bedeutet, dass das System nicht alle Tags entfernt, sondern gezielt gefährliche Skripte neutralisiert, ohne legitime Formatierungen unnötig zu zerstören, was eine ausgewogene Balance zwischen Sicherheit und Funktionalität darstellt. Sollte die Anfrage trotz dieser Maßnahmen fehlschlagen oder ungültige Daten enthalten, wird auf Zeile 219 ein HTTP-Statuscode 400 (Bad Request) zurückgegeben, um den Client klar über das Formatierungsproblem zu informieren.

Im Fehlerfall und bei externen Abhängigkeiten sieht der Laufzeitverlauf vor, dass bei Verbindungsproblemen oder Serverfehlern Statuscodes 502 (Bad Gateway) und 503 (Service Unavailable) ausgegeben werden, wie auf den Zeilen 271 bzw. 257 dokumentiert. Diese Codes stellen sicher, dass der Client nicht in eine Endlosschleife gerät oder falsche Erfolgsmeldungen erhält, wenn die Backend-Kommunikation mit dem SMTP-Server (verwaltet durch `backend/mailer.py` und `serverless_46`) ausfällt. Der gesamte Prozess endet erfolgreich nur dann mit einem HTTP-Statuscode 200 auf Zeile 251, was bestätigt, dass alle Sicherheitschecks bestanden, die Eingabe validiert wurde und die E-Mail via Nodemailer/SMTP versendet werden konnte. Diese Struktur wird durch Cron-Jobs im Verzeichnis `.emergent/cron` unterstützt, die sicherstellen, dass Webhooks und Wartungsaufgaben regelmäßig ausgeführt werden, um die Stabilität der Sicherheitsmechanismen langfristig zu gewährleisten.

## Technische Referenz

### Mechanismen

- **Honeypot in frontend/netlify/functions/contact.mjs** · `{"file":"frontend/netlify/functions/contact.mjs","fields":"website","silentSuccess":false}`
- **Request size limit in frontend/netlify/functions/contact.mjs** · `{"file":"frontend/netlify/functions/contact.mjs","bytes":20000,"sourceLiteral":"20000","statusOnExceed":413}`
- **Sanitizing in frontend/netlify/functions/contact.mjs** · `{"file":"frontend/netlify/functions/contact.mjs","asText":false,"escapeHtml":true,"stripTags":false,"headerUnsafe":false}`

### Status Codes

- **HTTP 413** in `frontend/netlify/functions/contact.mjs`
- **HTTP 400** in `frontend/netlify/functions/contact.mjs`
- **HTTP 200** in `frontend/netlify/functions/contact.mjs`
- **HTTP 503** in `frontend/netlify/functions/contact.mjs`
- **HTTP 502** in `frontend/netlify/functions/contact.mjs`

## Evidence

- **honeypot** Honeypot in frontend/netlify/functions/contact.mjs: `frontend/netlify/functions/contact.mjs:74` — `honeypot bot-field/website`
- **size_limit** Request size limit in frontend/netlify/functions/contact.mjs: `frontend/netlify/functions/contact.mjs:25` — `rawLength > 20000 → 413`
- **sanitize** Sanitizing in frontend/netlify/functions/contact.mjs: `frontend/netlify/functions/contact.mjs:47` — `sanitize/escape/asText`
- **status_code** HTTP 413: `frontend/netlify/functions/contact.mjs:214` — `json(413, { detail: "Ihre Anfrage ist zu`
- **status_code** HTTP 400: `frontend/netlify/functions/contact.mjs:219` — `json(400, { detail: "Ungültige Anfrage."`
- **status_code** HTTP 200: `frontend/netlify/functions/contact.mjs:251` — `json(200, { received: true, message: "Vi`
- **status_code** HTTP 503: `frontend/netlify/functions/contact.mjs:257` — `json(503, { detail: "Der`
- **status_code** HTTP 502: `frontend/netlify/functions/contact.mjs:271` — `json(502, { detail: "Ihr`
