import test from 'node:test';
import assert from 'node:assert/strict';
import { validateContact, type ContactValues } from '../../src/data/contact.ts';
const valid: ContactValues = {
  name: 'Test Person',
  phone: '',
  email: 'test@example.invalid',
  location: 'Testort',
  message: 'Nur eine lokale Testnachricht.',
  consent: true,
  website: '',
};
test('email or telephone is sufficient', () => {
  assert.deepEqual(validateContact(valid), {});
  assert.deepEqual(validateContact({ ...valid, email: '', phone: '+49 (451) 123-45' }), {});
});
test('all errors returned together for first-error focus', () => {
  assert.deepEqual(
    Object.keys(
      validateContact({ ...valid, name: ' ', email: '', message: 'kurz', consent: false }),
    ),
    ['name', 'phone', 'message', 'consent'],
  );
});
test('optional contact fields reject malformed values', () => {
  assert.ok(validateContact({ ...valid, phone: 'not a number' }).phone);
  assert.ok(validateContact({ ...valid, email: 'invalid@' }).email);
  assert.ok(validateContact({ ...valid, email: 'a@b.c' }).email);
  assert.ok(validateContact({ ...valid, email: 'one,two@example.invalid' }).email);
  assert.ok(validateContact({ ...valid, email: 'Person<test@example.invalid>' }).email);
});
