// Run once against a verified CRA build to record content parity fixtures.
// Usage: BASELINE_ROOT=<CRA build> BASELINE_SOURCE=<original frontend> node tests/compare-baseline.mjs
import fs from 'node:fs/promises';
import path from 'node:path';
import { spawn } from 'node:child_process';
import { createHash } from 'node:crypto';
import { chromium } from '@playwright/test';
const baselineRoot = process.env.BASELINE_ROOT;
const source = process.env.BASELINE_SOURCE;
if (!baselineRoot || !source) throw new Error('Set BASELINE_ROOT and BASELINE_SOURCE.');
const processes = [];
async function serve(port, root, baseline) {
  const child = spawn(process.execPath, ['tests/server.mjs'], {
    env: { ...process.env, PORT: String(port), TEST_ROOT: root, TEST_BASELINE: String(baseline) },
    stdio: 'pipe',
    windowsHide: true,
  });
  processes.push(child);
  await new Promise((resolve, reject) => {
    child.stdout.once('data', resolve);
    child.once('error', reject);
  });
}
const browser = await chromium.launch({ channel: 'chrome', headless: true });
const result = {
  sourceCommit: '8e6a5119f06580a48114bc2c573d9fc0b9176c1b',
  recordedAt: new Date().toISOString(),
  routes: {},
  data: {},
};
try {
  await serve(4140, path.resolve('dist'), false);
  await serve(4141, baselineRoot, true);
  const context = await browser.newContext({ viewport: { width: 1440, height: 1000 } });
  await context.route('**/*', (route) =>
    new URL(route.request().url()).hostname === '127.0.0.1' && route.request().method() === 'GET'
      ? route.continue()
      : route.abort(),
  );
  const page = await context.newPage();
  for (const route of [
    '/',
    '/leistungen',
    '/ueber-uns',
    '/team',
    '/impressum',
    '/datenschutz',
    '/agb',
  ]) {
    await page.goto('http://127.0.0.1:4141' + route);
    await page.locator('main h1').waitFor();
    const baseline = await page.locator('main').evaluate((el) => ({
      paragraphs: [...el.querySelectorAll('p')]
        .filter((p) => !p.closest('[data-testid="photo-placeholder"]'))
        .map((p) => p.textContent.replace(/\s+/g, ' ').trim())
        .filter(Boolean),
      legal: el.querySelector('.legal-copy')?.textContent.replace(/\s+/g, ' ').trim(),
    }));
    result.routes[route] = baseline;
    await page.goto('http://127.0.0.1:4140' + route);
    const current = await page
      .locator('main')
      .evaluate((el) => el.textContent.replace(/\s+/g, ' ').trim());
    console.log(
      JSON.stringify({ route, missing: baseline.paragraphs.filter((p) => !current.includes(p)) }),
    );
  }
  for (const name of ['site', 'services', 'seasons', 'seo']) {
    let code = await fs.readFile(path.join(source, `src/data/${name}.js`), 'utf8');
    if (name === 'seo') {
      const site = await fs.readFile(path.join(source, 'src/data/site.js'), 'utf8');
      code = code.replace(
        /from ["']@\/data\/site["']/,
        `from 'data:text/javascript;base64,${Buffer.from(site).toString('base64')}'`,
      );
    }
    const module = await import(
      `data:text/javascript;base64,${Buffer.from(code).toString('base64')}`
    );
    for (const [key, value] of Object.entries(module))
      if (typeof value !== 'function') result.data[key] = value;
  }
  result.contactFunctionSha256 = createHash('sha256')
    .update(await fs.readFile(path.join(source, 'netlify/functions/contact.mjs')))
    .digest('hex');
  await fs.writeFile('tests/fixtures/baseline.json', JSON.stringify(result, null, 2));
  await page.setViewportSize({ width: 320, height: 900 });
  await page.goto('http://127.0.0.1:4140/');
  await page.evaluate(() => document.fonts.ready);
  console.log(
    'OVERFLOW',
    JSON.stringify(
      await page.locator('body *').evaluateAll((nodes) =>
        nodes
          .filter((el) => {
            const r = el.getBoundingClientRect();
            return (
              r.width > 0 &&
              (r.right > 320 || r.left < 0) &&
              getComputedStyle(el).position !== 'absolute'
            );
          })
          .map((el) => ({
            tag: el.tagName,
            cls: el.className,
            text: el.textContent.slice(0, 45),
            right: el.getBoundingClientRect().right,
            width: el.getBoundingClientRect().width,
          })),
      ),
    ),
  );
  await page.screenshot({ path: 'reports/screenshots/mobile-320-home.png', fullPage: true });
  await context.close();
} finally {
  await browser.close();
  for (const child of processes) child.kill();
}
