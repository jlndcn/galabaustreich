export interface ContactValues {
  name: string;
  phone: string;
  email: string;
  location: string;
  message: string;
  consent: boolean;
  website: string;
}
export function validateContact(
  values: ContactValues,
): Partial<Record<keyof ContactValues, string>> {
  const errors: Partial<Record<keyof ContactValues, string>> = {};
  if (values.name.trim().length < 2) errors.name = 'Bitte geben Sie Ihren Namen an.';
  if (!values.phone.trim() && !values.email.trim())
    errors.phone =
      'Bitte geben Sie eine Telefonnummer oder eine E-Mail-Adresse an, damit wir Sie erreichen können.';
  if (values.phone.trim() && !/^[+0-9][0-9\s()/.-]{4,}$/.test(values.phone.trim()))
    errors.phone = 'Bitte geben Sie eine gültige Telefonnummer an.';
  if (
    values.email.trim() &&
    !/^[^\s@<>,;:"\\()[\]\x00-\x1f\x7f]+@[^\s@<>,;:"\\()[\]\x00-\x1f\x7f]+\.[^\s@<>,;:"\\()[\]\x00-\x1f\x7f]{2,}$/.test(
      values.email.trim(),
    )
  )
    errors.email = 'Bitte geben Sie eine gültige E-Mail-Adresse an.';
  if (values.message.trim().length < 10)
    errors.message = 'Bitte beschreiben Sie kurz Ihr Anliegen (mindestens 10 Zeichen).';
  if (!values.consent) errors.consent = 'Bitte bestätigen Sie den Hinweis zum Datenschutz.';
  return errors;
}
