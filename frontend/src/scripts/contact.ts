import { validateContact, type ContactValues } from '../data/contact';

const form = document.querySelector<HTMLFormElement>('#contact-form');
if (form) {
  const fieldset = form.querySelector<HTMLFieldSetElement>('fieldset')!;
  const errorBox = form.querySelector<HTMLElement>('#form-error')!;
  const success = document.querySelector<HTMLElement>('#form-success')!;
  const submitLabel = form.querySelector<HTMLElement>('[data-submit-label]')!;
  const message = form.elements.namedItem('message') as HTMLTextAreaElement;
  let pending = false;
  const prefill = () => {
    const serviceId = new URLSearchParams(location.search).get('leistung');
    const service = document.querySelector<HTMLElement>(
      `[data-service-id="${CSS.escape(serviceId || '')}"]`,
    );
    if (service && !message.value.trim())
      message.value = `Anfrage zu: ${service.dataset.serviceTitle}\n\n`;
  };
  prefill();
  fieldset.disabled = false;
  form.noValidate = true;
  const clearErrors = () => {
    form.querySelectorAll('[aria-invalid]').forEach((el) => el.removeAttribute('aria-invalid'));
    form.querySelectorAll<HTMLElement>('.field-error').forEach((el) => {
      el.hidden = true;
      el.textContent = '';
    });
    errorBox.hidden = true;
  };
  form.addEventListener('input', () => {
    errorBox.hidden = true;
  });
  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    if (pending) return;
    clearErrors();
    const values = Object.fromEntries(new FormData(form)) as unknown as ContactValues;
    values.consent = (form.elements.namedItem('consent') as HTMLInputElement).checked;
    const errors = validateContact(values);
    for (const [name, error] of Object.entries(errors)) {
      const input = form.elements.namedItem(name) as HTMLInputElement;
      const help = form.querySelector<HTMLElement>(`#${name}-error`)!;
      input.setAttribute('aria-invalid', 'true');
      help.textContent = error;
      help.hidden = false;
    }
    if (Object.keys(errors).length) {
      form.querySelector<HTMLElement>('[aria-invalid="true"]')?.focus();
      return;
    }
    pending = true;
    fieldset.disabled = true;
    form.setAttribute('aria-busy', 'true');
    submitLabel.textContent = 'Wird gesendet …';
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: values.name.trim(),
          phone: values.phone.trim() || null,
          email: values.email.trim() || null,
          location: values.location.trim() || null,
          message: values.message.trim(),
          consent: values.consent,
          website: values.website,
          page: location.pathname,
        }),
        signal: AbortSignal.timeout(45000),
      });
      const data = await response.json().catch(() => null);
      if (!response.ok || data?.received !== true) {
        let text =
          'Ihre Anfrage konnte gerade nicht gesendet werden. Bitte versuchen Sie es später erneut oder rufen Sie uns an.';
        if (response.status === 429)
          text =
            'Es wurden bereits mehrere Anfragen gesendet. Bitte versuchen Sie es später erneut oder rufen Sie uns an.';
        else if ([400, 422, 502, 503].includes(response.status) && typeof data?.detail === 'string')
          text = data.detail;
        throw new Error(text);
      }
      form.hidden = true;
      success.hidden = false;
      success.querySelector('h4')?.focus();
    } catch (error) {
      errorBox.textContent =
        error instanceof Error && !['TimeoutError', 'AbortError', 'TypeError'].includes(error.name)
          ? error.message
          : 'Wir konnten den Versand nicht bestätigen. Bitte versuchen Sie es später erneut oder kontaktieren Sie uns telefonisch.';
      errorBox.hidden = false;
    } finally {
      pending = false;
      fieldset.disabled = false;
      form.removeAttribute('aria-busy');
      submitLabel.textContent = 'Anfrage senden';
      if (!errorBox.hidden) errorBox.focus();
    }
  });
  document.querySelector('[data-reset-form]')?.addEventListener('click', () => {
    form.reset();
    clearErrors();
    success.hidden = true;
    form.hidden = false;
    prefill();
    (form.elements.namedItem('name') as HTMLInputElement).focus();
  });
}
