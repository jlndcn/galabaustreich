import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { CheckCircle2, Send } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "@/components/ui/sonner";
import { site } from "@/data/site";

// Same-origin "/api" by default (Netlify Function via redirect); an explicit backend URL
// (preview environment) is used when REACT_APP_BACKEND_URL is set. Never talks SMTP itself.
const backendBase = (process.env.REACT_APP_BACKEND_URL || "").replace(/\/$/, "");
const API = `${backendBase}/api`;

const initialValues = {
  name: "",
  phone: "",
  email: "",
  location: "",
  message: "",
  consent: false,
  website: "", // honeypot – stays empty for real visitors
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function validate(values) {
  const errors = {};
  if (values.name.trim().length < 2) {
    errors.name = "Bitte geben Sie Ihren Namen an.";
  }
  const phone = values.phone.trim();
  const email = values.email.trim();
  if (!phone && !email) {
    errors.contact =
      "Bitte geben Sie eine Telefonnummer oder eine E-Mail-Adresse an, damit wir Sie erreichen können.";
  }
  if (email && !EMAIL_RE.test(email)) {
    errors.email = "Bitte geben Sie eine gültige E-Mail-Adresse an.";
  }
  if (values.message.trim().length < 10) {
    errors.message = "Bitte beschreiben Sie kurz Ihr Anliegen (mindestens 10 Zeichen).";
  }
  if (!values.consent) {
    errors.consent = "Bitte bestätigen Sie den Hinweis zum Datenschutz.";
  }
  return errors;
}

const fieldClass =
  "h-12 rounded-lg border-input bg-white px-4 text-base text-[color:var(--brand-ink)] placeholder:text-muted-foreground/70 focus-visible:ring-2 focus-visible:ring-[color:var(--brand-accent)] md:text-base";

const FieldError = ({ id, children }) =>
  children ? (
    <p id={id} role="alert" data-testid={`${id}`} className="mt-1.5 text-sm font-medium text-destructive">
      {children}
    </p>
  ) : null;

// Lean inquiry form – an additional contact channel next to phone, WhatsApp and e-mail.
// initialMessage: optional prefill (e.g. when arriving from a specific service).
export const ContactForm = ({ prefix = "contact-form", initialMessage = "" }) => {
  const [values, setValues] = useState({ ...initialValues, message: initialMessage });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle"); // idle | submitting | success
  const [serverError, setServerError] = useState("");

  // Apply a new prefill when the incoming service changes and the user has not typed yet.
  useEffect(() => {
    if (!initialMessage) return;
    setValues((v) => (v.message.trim() === "" || v.message.startsWith("Anfrage zu:") ? { ...v, message: initialMessage } : v));
  }, [initialMessage]);

  const update = (field) => (e) => {
    const value = e && e.target ? e.target.value : e;
    setValues((v) => ({ ...v, [field]: value }));
    const isContactField = field === "phone" || field === "email";
    if (errors[field] || (isContactField && errors.contact)) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        if (field === "phone" || field === "email") delete next.contact;
        return next;
      });
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setServerError("");
    const nextErrors = validate(values);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      const first = document.querySelector(`[data-form="${prefix}"] [aria-invalid="true"]`);
      if (first) first.focus();
      return;
    }

    setStatus("submitting");
    try {
      await axios.post(`${API}/contact`, {
        name: values.name.trim(),
        phone: values.phone.trim() || null,
        email: values.email.trim() || null,
        location: values.location.trim() || null,
        message: values.message.trim(),
        consent: values.consent,
        website: values.website,
        page: typeof window !== "undefined" ? window.location.pathname : null,
      });
      setStatus("success");
      toast.success("Ihre Anfrage wurde gesendet.", {
        description: "Vielen Dank – wir melden uns persönlich bei Ihnen.",
      });
    } catch (err) {
      setStatus("error");
      const code = err?.response?.status;
      const data = err?.response?.data;
      const detail =
        typeof data?.detail === "string" ? data.detail : typeof data?.error === "string" ? data.error : null;
      let message =
        "Ihre Anfrage konnte gerade nicht gesendet werden. Bitte versuchen Sie es später erneut oder rufen Sie uns an.";
      if (code === 429) {
        message =
          "Es wurden bereits mehrere Anfragen gesendet. Bitte versuchen Sie es später erneut oder rufen Sie uns an.";
      } else if ((code === 400 || code === 422 || code === 502 || code === 503) && detail) {
        message = detail;
      }
      setServerError(message);
      toast.error("Senden nicht möglich", { description: message });
    }
  };

  if (status === "success") {
    return (
      <div
        role="status"
        data-testid={`${prefix}-success`}
        className="border-t-2 border-[color:var(--brand-accent)] pt-6"
      >
        <CheckCircle2
          className="h-8 w-8 text-[color:var(--brand-accent-strong)]"
          strokeWidth={1.8}
          aria-hidden="true"
        />
        <h3 className="mt-4 text-2xl">Vielen Dank für Ihre Anfrage.</h3>
        <p className="mt-3 text-lg leading-relaxed text-muted-foreground">
          Wir haben Ihre Nachricht erhalten und melden uns persönlich bei
          Ihnen. Wenn es eilt, erreichen Sie uns telefonisch unter{" "}
          <a href={site.phone.href} className="text-link">
            {site.phone.display}
          </a>
          .
        </p>
        <button
          type="button"
          data-testid={`${prefix}-reset-button`}
          onClick={() => {
            setValues(initialValues);
            setErrors({});
            setStatus("idle");
          }}
          className="mt-6 text-link text-base"
        >
          Weitere Anfrage senden
        </button>
      </div>
    );
  }

  const submitting = status === "submitting";

  return (
    <form
      onSubmit={onSubmit}
      noValidate
      data-form={prefix}
      data-testid={prefix}
      data-state={status}
      className="relative space-y-6"
      aria-describedby={`${prefix}-intro`}
      aria-busy={submitting ? "true" : undefined}
    >
      <p id={`${prefix}-intro`} className="text-base text-muted-foreground">
        Pflichtfelder sind mit * gekennzeichnet. Bitte geben Sie eine
        Telefonnummer oder E-Mail-Adresse an.
      </p>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <Label htmlFor={`${prefix}-name`} className="text-base font-semibold text-[color:var(--brand-forest)]">
            Name *
          </Label>
          <Input
            id={`${prefix}-name`}
            name="name"
            autoComplete="name"
            value={values.name}
            onChange={update("name")}
            aria-invalid={errors.name ? "true" : undefined}
            aria-describedby={errors.name ? `${prefix}-name-error` : undefined}
            data-testid={`${prefix}-name-input`}
            className={`mt-2 ${fieldClass}`}
          />
          <FieldError id={`${prefix}-name-error`}>{errors.name}</FieldError>
        </div>

        <div>
          <Label htmlFor={`${prefix}-phone`} className="text-base font-semibold text-[color:var(--brand-forest)]">
            Telefon
          </Label>
          <Input
            id={`${prefix}-phone`}
            name="phone"
            type="tel"
            autoComplete="tel"
            inputMode="tel"
            value={values.phone}
            onChange={update("phone")}
            aria-invalid={errors.contact ? "true" : undefined}
            aria-describedby={errors.contact ? `${prefix}-contact-error` : undefined}
            data-testid={`${prefix}-phone-input`}
            className={`mt-2 ${fieldClass}`}
          />
        </div>

        <div>
          <Label htmlFor={`${prefix}-email`} className="text-base font-semibold text-[color:var(--brand-forest)]">
            E-Mail
          </Label>
          <Input
            id={`${prefix}-email`}
            name="email"
            type="email"
            autoComplete="email"
            inputMode="email"
            value={values.email}
            onChange={update("email")}
            aria-invalid={errors.email || errors.contact ? "true" : undefined}
            aria-describedby={
              errors.email ? `${prefix}-email-error` : errors.contact ? `${prefix}-contact-error` : undefined
            }
            data-testid={`${prefix}-email-input`}
            className={`mt-2 ${fieldClass}`}
          />
          <FieldError id={`${prefix}-email-error`}>{errors.email}</FieldError>
        </div>

        {errors.contact && (
          <div className="sm:col-span-2 -mt-2">
            <FieldError id={`${prefix}-contact-error`}>{errors.contact}</FieldError>
          </div>
        )}

        <div className="sm:col-span-2">
          <Label htmlFor={`${prefix}-location`} className="text-base font-semibold text-[color:var(--brand-forest)]">
            Ort des Gartens / Grundstücks
          </Label>
          <Input
            id={`${prefix}-location`}
            name="location"
            autoComplete="address-level2"
            placeholder="z. B. Lübeck, Scharbeutz, Bad Schwartau"
            value={values.location}
            onChange={update("location")}
            data-testid={`${prefix}-location-input`}
            className={`mt-2 ${fieldClass}`}
          />
        </div>

        <div className="sm:col-span-2">
          <Label htmlFor={`${prefix}-message`} className="text-base font-semibold text-[color:var(--brand-forest)]">
            Ihr Anliegen *
          </Label>
          <Textarea
            id={`${prefix}-message`}
            name="message"
            rows={5}
            placeholder="Worum geht es? Zum Beispiel: Heckenschnitt, regelmäßige Gartenpflege, Baumfällung …"
            value={values.message}
            onChange={update("message")}
            aria-invalid={errors.message ? "true" : undefined}
            aria-describedby={errors.message ? `${prefix}-message-error` : undefined}
            data-testid={`${prefix}-message-input`}
            className="mt-2 min-h-[150px] rounded-lg border-input bg-white px-4 py-3 text-base text-[color:var(--brand-ink)] placeholder:text-muted-foreground/70 focus-visible:ring-2 focus-visible:ring-[color:var(--brand-accent)] md:text-base"
          />
          <FieldError id={`${prefix}-message-error`}>{errors.message}</FieldError>
        </div>
      </div>

      {/* Honeypot – invisible for humans, filled by bots */}
      <div className="absolute left-[-10000px] top-auto h-px w-px overflow-hidden" aria-hidden="true">
        <label htmlFor={`${prefix}-website`}>Website</label>
        <input
          id={`${prefix}-website`}
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={values.website}
          onChange={update("website")}
        />
      </div>

      <div>
        <div className="flex items-start gap-3">
          <Checkbox
            id={`${prefix}-consent`}
            checked={values.consent}
            onCheckedChange={(checked) => update("consent")(checked === true)}
            aria-invalid={errors.consent ? "true" : undefined}
            aria-describedby={errors.consent ? `${prefix}-consent-error` : undefined}
            data-testid={`${prefix}-consent-checkbox`}
            className="mt-1 h-5 w-5 rounded border-[color:var(--brand-forest)] data-[state=checked]:bg-[color:var(--brand-forest)]"
          />
          <Label
            htmlFor={`${prefix}-consent`}
            className="text-base font-normal leading-relaxed text-[color:var(--brand-ink-soft)]"
          >
            Ich habe die{" "}
            <Link to="/datenschutz" className="text-link">
              Datenschutzerklärung
            </Link>{" "}
            gelesen und bin damit einverstanden, dass meine Angaben zur
            Bearbeitung meiner Anfrage gespeichert und verwendet werden. *
          </Label>
        </div>
        <FieldError id={`${prefix}-consent-error`}>{errors.consent}</FieldError>
      </div>

      {serverError && (
        <p
          role="alert"
          data-testid={`${prefix}-server-error`}
          className="border-l-2 border-destructive pl-4 text-base text-destructive"
        >
          {serverError}
        </p>
      )}

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <button
          type="submit"
          disabled={submitting}
          data-testid={`${prefix}-submit-button`}
          className="inline-flex h-12 shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-lg bg-[color:var(--brand-accent)] px-6 text-base font-semibold text-[color:var(--brand-forest)] shadow-sm transition-[background-color,box-shadow,transform] hover:bg-[color:var(--brand-accent-strong)] hover:shadow-md active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60"
        >
          <Send className="h-4 w-4" strokeWidth={2} aria-hidden="true" />
          {submitting ? "Wird gesendet …" : "Anfrage senden"}
        </button>
        <p className="text-sm text-muted-foreground">
          Ihre Daten werden ausschließlich zur Bearbeitung Ihrer Anfrage
          verwendet.
        </p>
      </div>
    </form>
  );
};
