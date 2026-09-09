# Security

## Erklärung

Die Sicherheitsarchitektur in diesem Repository konzentriert sich primär auf die Validierung und Filterung von Eingabedaten an der Schnittstelle zur Kontaktformular-Funktion, implementiert im Dateipfad `frontend/netlify/functions/contact.mjs`. Als erfahrener Entwickler musst du verstehen, dass hier eine mehrstufige Verteidigungslinie aufgebaut ist, um das Backend vor Missbrauch zu schützen. Der erste Schutzmechanismus ist die Begrenzung der Anfragegröße; jede POST-Anfrage an den Endpunkt `/api/contact` wird auf maximal 20.000 Bytes geprüft. Wird diese Schwelle überschritten, wird sofort ein HTTP-Statuscode 413 (Request Entity Too Large) zurückgegeben, was verhindert, dass das System durch extrem große Payloads überlastet oder zum Absturz gebracht wird.

Parallel dazu erfolgt eine strikte Sanitierung der Nutzereingaben, um Cross-Site Scripting (XSS)-Angriffe abzuwehren. Im Code an Zeile 47 wird explizit `escapeHtml` auf `true` gesetzt, während das Entfernen von Tags (`stripTags`) deaktiviert ist und die Prüfung unsicherer Header (`headerUnsafe`) ebenfalls ausbleibt. Dies bedeutet, dass HTML-Tags nicht entfernt werden, aber alle darin enthaltenen Skripte oder gefährlichen Entitäten vor der Verarbeitung sicherheitstechnisch neutralisiert werden. Sollte ein Angreifer versuchen, diese Logik zu umgehen oder ungültige Daten zu senden, reagiert die Funktion mit einem HTTP-Statuscode 400 (Bad Request), was eine klare Signalisierung für fehlerhafte oder nicht konforme Eingaben darstellt.

Zusätzlich zum Schutz vor direkten Angriffen ist ein Honeypot integriert, der sich in den Feldern des Formulars befindet, um automatisierte Bots zu erkennen und abzuwehren. Wenn ein Skript versucht, das unsichtbare Feld `website` auszufüllen, wird dies erkannt; die Logik an Zeile 74 sorgt dafür, dass bei diesem Vorfall kein stiller Erfolg (`silentSuccess: false`) zurückgegeben wird, sondern der Prozess unterbrochen oder als verdächtig markiert wird. Im Falle von Systemfehlern oder Verbindungsproblemen im Backend reagiert die Funktion robust mit Statuscodes 502 (Bad Gateway) und 503 (Service Unavailable), was sicherstellt, dass Fehlerzustände transparent kommuniziert werden, ohne dass sensible Daten ausgesetzt werden.

Im Hintergrund wird das gesäuberte Formular-Datenset an den Endpunkt `/api/contact` gesendet, wo es weiterverarbeitet wird. Die erfolgreiche Verarbeitung führt schließlich zum Aufruf einer Mail-Funktion, die über `backend/mailer.py` und `backend/server.py` realisiert ist und eine E-Mail via SMTP versendet. Dieser gesamte Ablauf zeigt ein Design-Bild, bei dem Sicherheit nicht als nachträglicher Gedanke, sondern als integraler Bestandteil der Datenfluss-Logik verankert ist: Von der Größe der Anfrage über die Entschärfung von Inhalten bis hin zur Erkennung automatisierter Angriffe wird jede Ebene des Requests geprüft, bevor eine E-Mail an den Empfänger gesendet wird.

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
