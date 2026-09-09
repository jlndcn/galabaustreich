import test from 'node:test';
import assert from 'node:assert/strict';
import nodemailer from 'nodemailer';
import handler from '../../netlify/functions/contact.mjs';
// Every SMTP transport is replaced. Only synthetic addresses, no network.
test('Netlify contact contract with stubbed SMTP', async (t) => {
  const keys = ['SMTP_HOST', 'SMTP_PORT', 'SMTP_USER', 'SMTP_PASSWORD', 'CONTACT_TO'];
  const saved = Object.fromEntries(keys.map((key) => [key, process.env[key]]));
  const original = nodemailer.createTransport;
  const sent = [];
  let failAt = 0;
  let transportOptions;
  nodemailer.createTransport = (options) => {
    transportOptions = options;
    return {
      sendMail: async (mail) => {
        sent.push(mail);
        if (sent.length === failAt)
          throw Object.assign(new Error('synthetic'), { code: 'TEST_FAILURE' });
        return { accepted: [] };
      },
    };
  };
  const valid = {
    name: 'Test <Person>',
    email: 'TEST@example.invalid',
    phone: '',
    message: '<script>synthetic test</script>',
    consent: true,
  };
  const request = (data) =>
    new Request('https://local.invalid/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
  try {
    for (const key of keys) delete process.env[key];
    await t.test('GET and broken JSON rejected', async () => {
      assert.equal((await handler(new Request('https://local.invalid/api/contact'))).status, 405);
      assert.equal(
        (
          await handler(
            new Request('https://local.invalid/api/contact', { method: 'POST', body: '{' }),
          )
        ).status,
        400,
      );
      assert.equal((await handler(request(null))).status, 400);
      assert.equal((await handler(request([]))).status, 400);
      assert.equal((await handler(request('text'))).status, 400);
    });
    await t.test('invalid fields rejected without mail', async () => {
      for (const input of [
        { ...valid, name: 'x' },
        { ...valid, email: '' },
        { ...valid, email: 'bad' },
        { ...valid, phone: 'abc' },
        { ...valid, message: 'short' },
        { ...valid, consent: false },
      ])
        assert.equal((await handler(request(input))).status, 400);
      assert.equal(sent.length, 0);
    });
    await t.test('honeypot accepts without delivery', async () => {
      assert.equal((await handler(request({ ...valid, website: 'bot.invalid' }))).status, 200);
      assert.equal(sent.length, 0);
    });
    await t.test('types, field limits and injection attempts rejected without mail', async () => {
      for (const [key, max] of Object.entries({
        name: 120,
        email: 160,
        phone: 40,
        location: 160,
        message: 4000,
        page: 200,
        website: 300,
      })) {
        for (const value of [{ injected: true }, ['injected'], 123, 'a'.repeat(max + 1)])
          assert.equal((await handler(request({ ...valid, [key]: value }))).status, 400, key);
      }
      for (const email of [
        'one,two@example.invalid',
        'Person<test@example.invalid>',
        'test@example.invalid\r\nBcc:other@example.invalid',
        'test\u0000@example.invalid',
      ])
        assert.equal((await handler(request({ ...valid, email }))).status, 400);
      assert.equal(
        (await handler(request({ ...valid, name: 'Test\r\nBcc: injected' }))).status,
        400,
      );
      assert.equal(sent.length, 0);
    });
    await t.test('oversized body rejected with and without content length', async () => {
      const oversized = request({ ...valid, message: 'a'.repeat(33000) });
      assert.equal((await handler(oversized)).status, 413);
      const declared = request(valid);
      declared.headers.set('content-length', '33000');
      assert.equal((await handler(declared)).status, 413);
      assert.equal(sent.length, 0);
    });
    await t.test('missing configuration returns 503', async () =>
      assert.equal((await handler(request(valid))).status, 503),
    );
    Object.assign(process.env, {
      SMTP_HOST: 'smtp.example.invalid',
      SMTP_PORT: '465',
      SMTP_USER: 'sender@example.invalid',
      SMTP_PASSWORD: 'synthetic-test-only',
      CONTACT_TO: 'recipient@example.invalid',
    });
    await t.test('invalid SMTP configuration fails closed', async () => {
      for (const port of ['465junk', '-1', '65536', '0', '1.5']) {
        process.env.SMTP_PORT = port;
        assert.equal((await handler(request(valid))).status, 503);
      }
      process.env.SMTP_PORT = '465';
      process.env.CONTACT_TO = 'invalid';
      assert.equal((await handler(request(valid))).status, 503);
      process.env.CONTACT_TO = 'recipient@example.invalid';
      assert.equal(sent.length, 0);
    });
    await t.test('notification and confirmation escape content', async () => {
      const response = await handler(request(valid));
      assert.equal(response.status, 200);
      assert.equal((await response.json()).received, true);
      assert.equal(sent.length, 2);
      assert.equal(sent[0].to, 'recipient@example.invalid');
      assert.equal(sent[0].replyTo.address, 'test@example.invalid');
      assert.ok(sent[0].html.includes('&lt;script&gt;'));
      assert.ok(!sent[0].html.includes('<script>'));
      assert.equal(sent[1].to, 'test@example.invalid');
      assert.equal(transportOptions.secure, true);
      assert.equal(transportOptions.auth.user, 'sender@example.invalid');
    });
    await t.test('phone-only inquiry creates no confirmation', async () => {
      sent.length = 0;
      process.env.SMTP_PORT = '587';
      assert.equal(
        (await handler(request({ ...valid, email: '', phone: '01234 56789' }))).status,
        200,
      );
      assert.equal(sent.length, 1);
      assert.equal(transportOptions.secure, false);
      assert.equal(transportOptions.requireTLS, true);
      process.env.SMTP_PORT = '465';
    });
    await t.test(
      'notification failure returns 502; confirmation failure still acknowledges receipt',
      async () => {
        sent.length = 0;
        failAt = 1;
        assert.equal((await handler(request(valid))).status, 502);
        sent.length = 0;
        failAt = 2;
        assert.equal((await handler(request(valid))).status, 200);
      },
    );
  } finally {
    nodemailer.createTransport = original;
    for (const key of keys) {
      if (saved[key] === undefined) delete process.env[key];
      else process.env[key] = saved[key];
    }
  }
});
