// Capture the final interaction states without contacting external services.
import fs from 'node:fs/promises';
import { spawn } from 'node:child_process';
import { chromium } from '@playwright/test';
const server = spawn(process.execPath, ['tests/server.mjs'], {
  env: { ...process.env, PORT: '4142' },
  stdio: 'pipe',
  windowsHide: true,
});
await new Promise((resolve, reject) => {
  server.stdout.once('data', resolve);
  server.once('error', reject);
});
const browser = await chromium.launch({ channel: 'chrome', headless: true });
try {
  const context = await browser.newContext({
    viewport: { width: 390, height: 844 },
    reducedMotion: 'reduce',
  });
  await context.route('**/*', (route) => {
    if (new URL(route.request().url()).pathname === '/api/contact')
      return route.fulfill({ json: { received: true } });
    return new URL(route.request().url()).hostname === '127.0.0.1'
      ? route.continue()
      : route.abort();
  });
  const page = await context.newPage();
  const metrics = [];
  for (const [width, height] of [
    [320, 900],
    [390, 844],
    [768, 1024],
    [1440, 1000],
  ]) {
    await page.setViewportSize({ width, height });
    await page.goto('http://127.0.0.1:4142/');
    await page.evaluate(() => document.fonts.ready);
    await page.screenshot({ path: `reports/screenshots/hero-${width}.png` });
    metrics.push(
      await page.evaluate(() => ({
        width: innerWidth,
        height: document.documentElement.scrollHeight,
        images: [...document.images].map((img) => ({
          src: img.currentSrc,
          width: img.getBoundingClientRect().width,
          naturalWidth: img.naturalWidth,
          alt: img.alt,
        })),
      })),
    );
  }
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('http://127.0.0.1:4142/#anfrage');
  await page.locator('[type=submit]').click();
  await page.locator('#name-error').waitFor();
  await page.screenshot({ path: 'reports/screenshots/form-errors-mobile.png' });
  await page.locator('#inquiry-name').fill('Lokale Testperson');
  await page.locator('#inquiry-email').fill('test@example.invalid');
  await page.locator('#inquiry-message').fill('Nur eine lokale Testnachricht.');
  await page.locator('#inquiry-consent').check();
  await page.locator('[type=submit]').click();
  await page.locator('#form-success').waitFor();
  await page.screenshot({ path: 'reports/screenshots/form-success-mobile.png' });
  await page.goto('http://127.0.0.1:4142/');
  await page.getByTestId('header-mobile-menu-button').click();
  await page.screenshot({ path: 'reports/screenshots/menu-mobile.png' });
  await page.keyboard.press('Escape');
  await page.setViewportSize({ width: 667, height: 375 });
  await page.getByTestId('header-mobile-menu-button').click();
  await page.locator('#mobile-menu .menu-legal').scrollIntoViewIfNeeded();
  await page.screenshot({ path: 'reports/screenshots/menu-landscape-bottom.png' });
  await fs.writeFile(
    'reports/visual-review.json',
    JSON.stringify(
      { date: new Date().toISOString(), browser: browser.version(), metrics },
      null,
      2,
    ),
  );
  await context.close();
} finally {
  await browser.close();
  server.kill();
}
