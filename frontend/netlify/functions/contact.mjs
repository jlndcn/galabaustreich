// Netlify Function: serverseitiger Kontaktformular-Versand ueber den STRATO-SMTP-Server.
// Erreichbar unter /api/contact (Redirect in netlify.toml) bzw. /.netlify/functions/contact.
//
// Konfiguration ausschliesslich ueber Environment Variables (in Netlify hinterlegt):
//   SMTP_HOST, SMTP_PORT (465 = SSL/TLS), SMTP_USER, SMTP_PASSWORD, CONTACT_TO
// Es werden keine Secrets im Code gespeichert und keine internen Details an den Browser gegeben.

import nodemailer from "nodemailer";

const LIMITS = {
  name: 120,
  phone: 40,
  email: 160,
  location: 160,
  message: 4000,
  page: 200,
  website: 300,
};

const COMPANY = "Garten Streich Website";
const COMPANY_LEGAL = "Garten-und Landschaftspflege B.Streich";
const COMPANY_PHONE = "0177 3216077";
const COMPANY_ADDRESS = "Dorfstraße 12, 23684 Scharbeutz";

const json = (status, body) =>
  new Response(JSON.stringify(body), {
    status,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "no-store",
      "X-Content-Type-Options": "nosniff",
    },
  });

const clean = (value, max) => {
  if (value === undefined || value === null) return "";
  const s = String(value).replace(/\r\n?/g, "\n").trim();
  return s.length > max ? s.slice(0, max) : s;
};

// Header-Injection verhindern: keine Zeilenumbrueche in Header-Werten.
const headerSafe = (s) => s.replace(/[\r\n]+/g, " ").trim();

const EMAIL_RE = /^[^\s@<>,;:"\\()[\]\x00-\x1f\x7f]+@[^\s@<>,;:"\\()[\]\x00-\x1f\x7f]+\.[^\s@<>,;:"\\()[\]\x00-\x1f\x7f]{2,}$/;
const PHONE_RE = /^[+0-9][0-9\s()/.-]{4,}$/;

const escapeHtml = (s) =>
  s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

function validate(input) {
  for (const [key, max] of Object.entries(LIMITS)) {
    const value = input[key];
    if (value === undefined || value === null) continue;
    if (typeof value !== "string" || value.length > max) {
      return { error: "Bitte prüfen Sie die Angaben und die zulässigen Feldlängen." };
    }
    const invalidControls = key === "message" ? /[\x00-\x08\x0b\x0c\x0e-\x1f\x7f]/ : /[\x00-\x1f\x7f]/;
    if (invalidControls.test(value)) {
      return { error: "Bitte entfernen Sie ungültige Steuerzeichen aus Ihren Angaben." };
    }
  }
  const data = {
    name: clean(input.name, LIMITS.name),
    phone: clean(input.phone, LIMITS.phone),
    email: clean(input.email, LIMITS.email).toLowerCase(),
    location: clean(input.location, LIMITS.location),
    message: clean(input.message, LIMITS.message),
    page: clean(input.page, LIMITS.page),
    consent: input.consent === true || input.consent === "true",
    honeypot: clean(input.website, 300),
  };

  if (data.name.length < 2) {
    return { error: "Bitte geben Sie Ihren Namen an." };
  }
  if (!data.phone && !data.email) {
    return { error: "Bitte geben Sie eine Telefonnummer oder eine E-Mail-Adresse an." };
  }
  if (data.email && !EMAIL_RE.test(data.email)) {
    return { error: "Bitte geben Sie eine gültige E-Mail-Adresse an." };
  }
  if (data.phone && !PHONE_RE.test(data.phone)) {
    return { error: "Bitte geben Sie eine gültige Telefonnummer an." };
  }
  if (data.message.length < 10) {
    return { error: "Bitte beschreiben Sie kurz Ihr Anliegen (mindestens 10 Zeichen)." };
  }
  if (!data.consent) {
    return { error: "Bitte bestätigen Sie den Hinweis zum Datenschutz." };
  }
  return { data };
}

function smtpConfig() {
  const host = (process.env.SMTP_HOST || "").trim();
  const port = Number(process.env.SMTP_PORT || "465");
  const user = (process.env.SMTP_USER || "").trim();
  const pass = process.env.SMTP_PASSWORD || "";
  const to = (process.env.CONTACT_TO || user).trim();
  const configured = Boolean(host && user && pass && EMAIL_RE.test(user) && EMAIL_RE.test(to)
    && Number.isInteger(port) && port > 0 && port <= 65535);
  return { host, port, user, pass, to, configured };
}

function createTransport(cfg) {
  return nodemailer.createTransport({
    host: cfg.host,
    port: cfg.port,
    secure: cfg.port === 465, // SSL/TLS ab Verbindungsaufbau (STRATO: 465)
    requireTLS: cfg.port !== 465, // sonst STARTTLS erzwingen
    auth: { user: cfg.user, pass: cfg.pass },
    connectionTimeout: 15000,
    greetingTimeout: 15000,
    socketTimeout: 20000,
  });
}

const fmt = (v) => (v ? v : "–");

function notificationMail(cfg, d, receivedAt) {
  const text = [
    "Neue Anfrage über das Kontaktformular auf garten-streich.de",
    "",
    `Name:      ${fmt(d.name)}`,
    `Telefon:   ${fmt(d.phone)}`,
    `E-Mail:    ${fmt(d.email)}`,
    `Ort:       ${fmt(d.location)}`,
    `Gesendet:  ${receivedAt}`,
    `Seite:     ${fmt(d.page)}`,
    "",
    "Anliegen:",
    d.message,
    "",
    "—",
    "Diese E-Mail wurde automatisch von der Website erzeugt.",
    d.email
      ? "Antworten Sie einfach auf diese E-Mail, um den Absender zu erreichen."
      : "Der Absender hat keine E-Mail-Adresse angegeben – bitte telefonisch melden.",
  ].join("\n");

  const row = (k, v) =>
    `<tr><td style="padding:6px 12px 6px 0;color:#3a463f;white-space:nowrap;vertical-align:top">${k}</td><td style="padding:6px 0;color:#141c17">${escapeHtml(fmt(v))}</td></tr>`;
  const html = `<!doctype html><html lang="de"><body style="font-family:Arial,Helvetica,sans-serif;font-size:15px;line-height:1.5;color:#141c17">
<h2 style="margin:0 0 12px;color:#0f2e14">Neue Anfrage über garten-streich.de</h2>
<table style="border-collapse:collapse">${row("Name", d.name)}${row("Telefon", d.phone)}${row("E-Mail", d.email)}${row("Ort", d.location)}${row("Gesendet", receivedAt)}${row("Seite", d.page)}</table>
<h3 style="margin:20px 0 6px;color:#0f2e14">Anliegen</h3>
<p style="white-space:pre-wrap;margin:0">${escapeHtml(d.message)}</p>
<hr style="border:0;border-top:1px solid #d8d3c6;margin:20px 0">
<p style="color:#3a463f;font-size:13px;margin:0">Diese E-Mail wurde automatisch von der Website erzeugt.${
    d.email ? " Antworten Sie einfach auf diese E-Mail, um den Absender zu erreichen." : ""
  }</p>
</body></html>`;

  const mail = {
    from: { name: COMPANY, address: cfg.user },
    to: cfg.to,
    subject: "Neue Anfrage über garten-streich.de",
    text,
    html,
  };
  if (d.email) {
    mail.replyTo = { name: headerSafe(d.name), address: d.email };
  }
  return mail;
}

function confirmationMail(cfg, d) {
  const text = [
    `Guten Tag ${d.name},`,
    "",
    "vielen Dank für Ihre Anfrage über unsere Website. Wir haben Ihre Nachricht erhalten und melden uns persönlich bei Ihnen.",
    "",
    "Ihre Angaben:",
    `Telefon:  ${fmt(d.phone)}`,
    `E-Mail:   ${fmt(d.email)}`,
    `Ort:      ${fmt(d.location)}`,
    "",
    "Ihr Anliegen:",
    d.message,
    "",
    `Wenn es eilt, erreichen Sie uns telefonisch unter ${COMPANY_PHONE}.`,
    "",
    "Mit freundlichen Grüßen",
    COMPANY_LEGAL,
    COMPANY_ADDRESS,
    "",
    "Hinweis: Dies ist eine automatische Eingangsbestätigung. Sie können auf diese E-Mail antworten.",
  ].join("\n");

  return {
    from: { name: COMPANY, address: cfg.user },
    to: d.email,
    replyTo: cfg.to,
    subject: `Ihre Anfrage bei ${COMPANY_LEGAL}`,
    text,
  };
}

export default async (request) => {
  if (request.method !== "POST") {
    return new Response(JSON.stringify({ detail: "Methode nicht erlaubt." }), {
      status: 405,
      headers: { Allow: "POST", "Content-Type": "application/json; charset=utf-8" },
    });
  }

  // Read with a byte limit even when Content-Length is absent or incorrect.
  const maxBytes = 32768;
  if (Number(request.headers.get("content-length")) > maxBytes) {
    return json(413, { detail: "Ihre Anfrage ist zu groß. Bitte kürzen Sie Ihre Angaben." });
  }
  let payload;
  try {
    const reader = request.body?.getReader();
    if (!reader) return json(400, { detail: "Ungültige Anfrage." });
    const chunks = [];
    let bytes = 0;
    try {
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        bytes += value.byteLength;
        if (bytes > maxBytes) {
          await reader.cancel();
          return json(413, { detail: "Ihre Anfrage ist zu groß. Bitte kürzen Sie Ihre Angaben." });
        }
        chunks.push(value);
      }
    } finally {
      reader.releaseLock();
    }
    payload = JSON.parse(Buffer.concat(chunks).toString("utf8"));
  } catch {
    return json(400, { detail: "Ungültige Anfrage." });
  }
  if (!payload || typeof payload !== "object" || Array.isArray(payload)) {
    return json(400, { detail: "Ungültige Anfrage." });
  }

  const { data, error } = validate(payload);
  if (error) {
    return json(400, { detail: error });
  }

  // Honeypot ausgefüllt -> nicht versenden, aber unauffällig "ok" antworten.
  if (data.honeypot) {
    return json(200, { received: true, message: "Vielen Dank für Ihre Anfrage." });
  }

  const cfg = smtpConfig();
  if (!cfg.configured) {
    console.error("contact: SMTP ist nicht konfiguriert (SMTP_HOST/SMTP_USER/SMTP_PASSWORD/CONTACT_TO).");
    return json(503, {
      detail:
        "Der Versand ist derzeit nicht möglich. Bitte rufen Sie uns an oder schreiben Sie uns per E-Mail.",
    });
  }

  const receivedAt = new Date().toLocaleString("de-DE", { timeZone: "Europe/Berlin" });
  const transport = createTransport(cfg);

  try {
    await transport.sendMail(notificationMail(cfg, data, receivedAt));
  } catch (err) {
    // Keine internen Details / Zugangsdaten an den Browser.
    console.error("contact: Versand der Benachrichtigung fehlgeschlagen:", err && err.code ? err.code : "error");
    return json(502, {
      detail:
        "Ihre Anfrage konnte gerade nicht gesendet werden. Bitte versuchen Sie es später erneut oder rufen Sie uns an.",
    });
  }

  // Eingangsbestätigung an den Kunden (nur wenn E-Mail-Adresse angegeben); Fehler hier sind nicht kritisch.
  if (data.email) {
    try {
      await transport.sendMail(confirmationMail(cfg, data));
    } catch (err) {
      console.error("contact: Eingangsbestätigung konnte nicht gesendet werden:", err && err.code ? err.code : "error");
    }
  }

  return json(200, {
    received: true,
    message: "Vielen Dank für Ihre Anfrage. Wir melden uns persönlich bei Ihnen.",
  });
};
