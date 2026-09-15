/**
 * Cloudflare Pages Function: POST /api/contact
 * Path: frontend/functions/api/contact.js → /api/contact
 *
 * SMTP über worker-mailer (cloudflare:sockets). Nodemailer ist in der
 * Workers-/Pages-Runtime nicht zuverlässig (Node net/tls).
 *
 * Env (context.env): SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASSWORD, CONTACT_TO
 */

import { WorkerMailer } from "worker-mailer";

const LIMITS = {
  name: 120,
  phone: 40,
  email: 160,
  location: 160,
  message: 4000,
  page: 200,
};

const COMPANY = "Garten Streich Website";
const COMPANY_LEGAL = "Garten-und Landschaftspflege B.Streich";
const COMPANY_PHONE = "0177 3216077";
const COMPANY_ADDRESS = "Dorfstraße 12, 23684 Scharbeutz";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE_RE = /^[+0-9][0-9\s()/.-]{4,}$/;

const json = (status, body, extraHeaders = {}) =>
  new Response(JSON.stringify(body), {
    status,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "no-store",
      "X-Content-Type-Options": "nosniff",
      ...extraHeaders,
    },
  });

const clean = (value, max) => {
  if (value === undefined || value === null) return "";
  const s = String(value).replace(/\r\n?/g, "\n").trim();
  return s.length > max ? s.slice(0, max) : s;
};

const headerSafe = (s) => s.replace(/[\r\n]+/g, " ").trim();

const escapeHtml = (s) =>
  s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

function validate(input) {
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
  if (!data.phone) {
    return { error: "Bitte geben Sie Ihre Telefonnummer an." };
  }
  if (!data.email) {
    return { error: "Bitte geben Sie Ihre E-Mail-Adresse an." };
  }
  if (!EMAIL_RE.test(data.email)) {
    return { error: "Bitte geben Sie eine gültige E-Mail-Adresse an." };
  }
  if (data.phone && !PHONE_RE.test(data.phone)) {
    return { error: "Bitte geben Sie eine gültige Telefonnummer an." };
  }
  if (data.message.length < 10) {
    return {
      error:
        "Bitte beschreiben Sie kurz Ihr Anliegen (mindestens 10 Zeichen).",
    };
  }
  if (!data.consent) {
    return { error: "Bitte bestätigen Sie den Hinweis zum Datenschutz." };
  }
  return { data };
}

function smtpConfig(env) {
  const host = String(env.SMTP_HOST || "").trim();
  const port = Number.parseInt(String(env.SMTP_PORT || "465"), 10) || 465;
  const user = String(env.SMTP_USER || "").trim();
  const pass = String(env.SMTP_PASSWORD || "");
  const to = String(env.CONTACT_TO || user).trim();
  const configured = Boolean(host && user && pass && to);
  return { host, port, user, pass, to, configured };
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
    d.email
      ? " Antworten Sie einfach auf diese E-Mail, um den Absender zu erreichen."
      : ""
  }</p>
</body></html>`;

  const mail = {
    from: { name: COMPANY, email: cfg.user },
    to: { email: cfg.to },
    subject: "Neue Anfrage über garten-streich.de",
    text,
    html,
  };
  if (d.email) {
    mail.reply = { name: headerSafe(d.name), email: d.email };
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
    from: { name: COMPANY, email: cfg.user },
    to: { email: d.email },
    reply: { email: cfg.to },
    subject: `Ihre Anfrage bei ${COMPANY_LEGAL}`,
    text,
  };
}

async function sendMail(cfg, message) {
  // Port 465 = implicit TLS; Port 587 = STARTTLS. Port 25 ist auf Cloudflare gesperrt.
  const secure = cfg.port === 465;
  await WorkerMailer.send(
    {
      host: cfg.host,
      port: cfg.port,
      secure,
      startTls: !secure,
      credentials: {
        username: cfg.user,
        password: cfg.pass,
      },
      authType: ["login", "plain"],
      socketTimeoutMs: 20000,
      responseTimeoutMs: 20000,
    },
    message,
  );
}

export async function onRequest(context) {
  const { request, env } = context;

  if (request.method !== "POST") {
    return json(
      405,
      { detail: "Methode nicht erlaubt." },
      { Allow: "POST" },
    );
  }

  const contentLength = Number.parseInt(
    request.headers.get("content-length") || "0",
    10,
  );
  if (Number.isFinite(contentLength) && contentLength > 50_000) {
    return json(413, { detail: "Die Anfrage ist zu groß." });
  }

  let payload;
  try {
    payload = await request.json();
  } catch {
    return json(400, { detail: "Ungültige Anfrage." });
  }
  if (!payload || typeof payload !== "object") {
    return json(400, { detail: "Ungültige Anfrage." });
  }

  const { data, error } = validate(payload);
  if (error) {
    return json(400, { detail: error });
  }

  // Honeypot ausgefüllt -> nicht versenden, aber unauffällig "ok" antworten.
  if (data.honeypot) {
    return json(200, {
      received: true,
      message: "Vielen Dank für Ihre Anfrage.",
    });
  }

  const cfg = smtpConfig(env || {});
  if (!cfg.configured) {
    console.error(
      "contact: SMTP ist nicht konfiguriert (SMTP_HOST/SMTP_USER/SMTP_PASSWORD/CONTACT_TO).",
    );
    return json(503, {
      detail:
        "Der Versand ist derzeit nicht möglich. Bitte rufen Sie uns an oder schreiben Sie uns per E-Mail.",
    });
  }

  const receivedAt = new Date().toLocaleString("de-DE", {
    timeZone: "Europe/Berlin",
  });

  try {
    await sendMail(cfg, notificationMail(cfg, data, receivedAt));
  } catch (err) {
    console.error(
      "contact: Versand der Benachrichtigung fehlgeschlagen:",
      err && err.message ? String(err.message).slice(0, 120) : "error",
    );
    return json(502, {
      detail:
        "Ihre Anfrage konnte gerade nicht gesendet werden. Bitte versuchen Sie es später erneut oder rufen Sie uns an.",
    });
  }

  if (data.email) {
    try {
      await sendMail(cfg, confirmationMail(cfg, data));
    } catch (err) {
      console.error(
        "contact: Eingangsbestätigung konnte nicht gesendet werden:",
        err && err.message ? String(err.message).slice(0, 120) : "error",
      );
    }
  }

  return json(200, {
    received: true,
    message:
      "Vielen Dank für Ihre Anfrage. Wir melden uns persönlich bei Ihnen.",
  });
}
