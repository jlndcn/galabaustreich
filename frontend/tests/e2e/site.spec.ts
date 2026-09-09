import { test, expect, type Page } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { services } from '../../src/data/services';
import { monthNames, seasonByMonth } from '../../src/data/seasons';
import { seoPages } from '../../src/data/seo';
import baseline from '../fixtures/baseline.json' with { type: 'json' };
import { correctedOriginal } from '../fixtures/content-corrections';

const routes = [
  '/',
  '/leistungen',
  '/ueber-uns',
  '/team',
  '/impressum',
  '/datenschutz',
  '/agb',
  '/unbekannte-seite',
];
const viewports = {
  desktop: { width: 1440, height: 1000 },
  mobile: { width: 390, height: 844 },
  tablet: { width: 768, height: 1024 },
};
for (const [route, original] of Object.entries(baseline.routes))
  test(`original content preserved: ${route}`, async ({ page }) => {
    await page.goto(route);
    const text = (await page.locator('main').textContent())!.replace(/\s/g, '');
    for (const paragraph of original.paragraphs)
      expect(text).toContain(correctedOriginal(paragraph, route));
    if ('legal' in original)
      expect((await page.locator('.legal-copy').textContent())!.replace(/\s/g, '')).toBe(
        correctedOriginal(original.legal, route),
      );
  });
test.beforeEach(async ({ context }) => {
  await context.route('**/*', (route) => {
    const url = new URL(route.request().url());
    if (url.pathname === '/api/contact')
      return route.fulfill({ status: 503, json: { detail: 'Local test: no delivery.' } });
    return url.hostname === '127.0.0.1' ? route.continue() : route.abort();
  });
});
for (const [device, viewport] of Object.entries(viewports)) {
  for (const route of routes)
    test(`${device}: ${route} layout, SEO, accessibility`, async ({ page }, info) => {
      await page.setViewportSize(viewport);
      const errors: string[] = [];
      page.on('pageerror', (error) => errors.push(error.message));
      const response = await page.goto(route);
      expect(response?.status()).toBe(route === '/unbekannte-seite' ? 404 : 200);
      await page.evaluate(() => document.fonts.ready);
      await expect(page.locator('h1')).toHaveCount(1);
      expect(await page.locator('html').getAttribute('lang')).toBe('de');
      expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(
        viewport.width,
      );
      expect(errors).toEqual([]);
      const whatsapp = page.getByTestId('floating-whatsapp-button');
      await expect(whatsapp).toBeVisible();
      await expect(whatsapp).toHaveAttribute('href', 'https://wa.me/491773216077');
      await expect(whatsapp).toHaveAttribute('rel', 'noopener noreferrer');
      const seo = Object.values(seoPages).find((item) => item.path === route);
      if (seo) {
        await expect(page).toHaveTitle(seo.title);
        await expect(page.locator('meta[name=description]')).toHaveAttribute(
          'content',
          seo.description,
        );
        await expect(page.locator('link[rel=canonical]')).toHaveAttribute(
          'href',
          `https://garten-streich.de${route === '/' ? '/' : route}`,
        );
        await expect(page.locator('meta[name=robots]')).toHaveAttribute('content', 'index,follow');
        await expect(page.locator('meta[property="og:url"]')).toHaveAttribute(
          'content',
          `https://garten-streich.de${route}`,
        );
        await expect(page.locator('meta[property="og:image"]')).toHaveAttribute(
          'content',
          'https://garten-streich.de/og-image.jpg',
        );
        await expect(page.locator('meta[property="og:image:width"]')).toHaveAttribute(
          'content',
          '1200',
        );
        await expect(page.locator('meta[property="og:image:height"]')).toHaveAttribute(
          'content',
          '630',
        );
      } else {
        await expect(page.locator('link[rel=canonical]')).toHaveCount(0);
        await expect(page.locator('meta[name=robots]')).toHaveAttribute(
          'content',
          'noindex,nofollow',
        );
      }
      const axe = await new AxeBuilder({ page })
        .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'])
        .analyze();
      expect(axe.violations).toEqual([]);
      const screenshot = await page.screenshot({
        path: `reports/screenshots/${info.project.name}-${device}-${route === '/' ? 'home' : route.slice(1)}.png`,
        fullPage: true,
        animations: 'disabled',
      });
      await info.attach(`${device}-${route === '/' ? 'home' : route.slice(1)}`, {
        body: screenshot,
        contentType: 'image/png',
      });
    });
}
for (const width of [320, 1024, 1920])
  test(`additional viewport ${width}: all pages fit`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    for (const route of routes) {
      await page.goto(route);
      expect(
        await page.evaluate(() => document.documentElement.scrollWidth),
        route,
      ).toBeLessThanOrEqual(width);
    }
  });
test('mobile menu keyboard, Escape, landscape scrolling and resize', async ({ page }) => {
  await page.setViewportSize({ width: 667, height: 375 });
  await page.goto('/');
  const button = page.getByTestId('header-mobile-menu-button');
  const dialog = page.locator('#mobile-menu');
  await button.click();
  await expect(dialog).toBeVisible();
  for (let n = 0; n < 20; n++) {
    await page.keyboard.press('Tab');
    expect(await page.evaluate(() => !!document.activeElement?.closest('dialog'))).toBe(true);
  }
  await expect(dialog.getByRole('link', { name: 'AGB', exact: true })).toBeVisible();
  await dialog.getByRole('link', { name: 'AGB', exact: true }).scrollIntoViewIfNeeded();
  expect(await dialog.evaluate((el) => el.scrollTop)).toBeGreaterThan(0);
  expect(
    (
      await new AxeBuilder({ page })
        .withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa'])
        .analyze()
    ).violations,
  ).toEqual([]);
  await page.keyboard.press('Escape');
  await expect(dialog).not.toBeVisible();
  await expect(button).toBeFocused();
  await button.click();
  await page.setViewportSize({ width: 1440, height: 1000 });
  await expect(dialog).not.toBeVisible();
  await page.setViewportSize({ width: 390, height: 844 });
  await button.click();
  await page.getByTestId('mobile-nav-leistungen').click();
  await expect(page).toHaveURL(/\/leistungen$/);
});
test('CTA reaches form, keyboard skip link reaches main, reduced motion respected', async ({
  page,
}) => {
  await page.setViewportSize(viewports.mobile);
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');
  expect(await page.evaluate(() => getComputedStyle(document.documentElement).scrollBehavior)).toBe(
    'auto',
  );
  await page.keyboard.press('Tab');
  await expect(page.locator('.skip-link')).toBeFocused();
  await page.keyboard.press('Enter');
  await expect(page.locator('main')).toBeFocused();
  await page.getByTestId('home-hero-primary-cta').click();
  const panel = await page.locator('#anfrage').boundingBox();
  expect(panel!.y).toBeGreaterThanOrEqual(76);
  expect(panel!.y).toBeLessThan(300);
  expect(await page.evaluate(() => document.getAnimations().length)).toBe(0);
});
test('all service links and static text remain available without JavaScript', async ({
  browser,
}) => {
  const context = await browser.newContext({
    javaScriptEnabled: false,
    viewport: viewports.mobile,
  });
  const page = await context.newPage();
  await page.goto('http://127.0.0.1:4140/leistungen');
  for (const service of services) {
    const section = page.locator(`#${service.id}`);
    await expect(section.locator('h2')).toHaveText(service.title);
    for (const paragraph of service.description) await expect(section).toContainText(paragraph);
  }
  await page.goto('http://127.0.0.1:4140/');
  await expect(page.locator('.nojs-nav')).toBeVisible();
  await expect(page.locator('noscript .notice')).toContainText('JavaScript');
  await expect(page.locator('#inquiry-name')).toBeDisabled();
  expect(JSON.parse(await page.locator('[type="application/ld+json"]').innerText())['@type']).toBe(
    'HomeAndConstructionBusiness',
  );
  await context.close();
});
for (let month = 1; month <= 12; month++)
  test(`client season follows month ${month} without rebuild`, async ({ page }) => {
    await page.clock.install({ time: new Date(2027, month - 1, 15, 12) });
    await page.goto('/');
    await expect(page.getByTestId('home-season-month')).toHaveText(monthNames[month - 1]);
    expect(
      await page
        .locator('[data-season-cards] > a')
        .evaluateAll((nodes) => nodes.map((node) => (node as HTMLElement).dataset.serviceId)),
    ).toEqual(seasonByMonth[month].ids.slice(0, 3));
    await expect(page.locator('[data-season-links] a')).toHaveCount(
      seasonByMonth[month].ids.length,
    );
  });
async function fillValid(page: Page) {
  await page.locator('#inquiry-name').fill('Lokale Testperson');
  await page.locator('#inquiry-email').fill('test@example.invalid');
  await page.locator('#inquiry-message').fill('Ausschließlich lokale Testnachricht.');
  await page.locator('#inquiry-consent').check();
}
test('invalid submit focuses first field and exposes accessible errors without POST', async ({
  page,
}) => {
  let posts = 0;
  page.on('request', (request) => {
    if (request.method() === 'POST') posts++;
  });
  await page.goto('/#anfrage');
  await page.locator('[type=submit]').click();
  await expect(page.locator('#inquiry-name')).toBeFocused();
  await expect(page.locator('[aria-invalid=true]')).toHaveCount(4);
  expect(posts).toBe(0);
  expect(
    (
      await new AxeBuilder({ page })
        .withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa'])
        .analyze()
    ).violations,
  ).toEqual([]);
});
test('service prefilling and privacy page retain draft', async ({ page }) => {
  await page.goto('/?leistung=rasenpflege#anfrage');
  await expect(page.locator('#inquiry-message')).toContainText('');
  expect(await page.locator('#inquiry-message').inputValue()).toContain('Rasenpflege');
  await fillValid(page);
  const popupPromise = page.waitForEvent('popup');
  await page.locator('.consent-row a').click();
  const popup = await popupPromise;
  await popup.waitForLoadState();
  await expect(popup).toHaveURL(/\/datenschutz$/);
  await popup.close();
  await expect(page.locator('#inquiry-name')).toHaveValue('Lokale Testperson');
  await expect(page.locator('#inquiry-consent')).toBeChecked();
});
test('success, duplicate prevention and reset with intercepted delivery', async ({ page }) => {
  let posts = 0;
  await page.route('**/api/contact', async (route) => {
    posts++;
    expect(route.request().postDataJSON().consent).toBe(true);
    await new Promise((resolve) => setTimeout(resolve, 150));
    await route.fulfill({ json: { received: true } });
  });
  await page.goto('/#anfrage');
  await fillValid(page);
  await page.locator('[type=submit]').click();
  await expect(page.locator('form')).toHaveAttribute('aria-busy', 'true');
  await expect(page.locator('[type=submit]')).toBeDisabled();
  await expect(page.locator('#form-success')).toBeVisible();
  await expect(page.locator('#form-success h4')).toBeFocused();
  expect(posts).toBe(1);
  await page.locator('[data-reset-form]').click();
  await expect(page.locator('#inquiry-name')).toBeFocused();
  await expect(page.locator('#inquiry-name')).toHaveValue('');
});
for (const status of [400, 429, 502, 503, 200])
  test(`failed or malformed response ${status} preserves draft`, async ({ page }) => {
    await page.route('**/api/contact', (route) =>
      route.fulfill({ status, json: { detail: 'Synthetischer Fehler' } }),
    );
    await page.goto('/#anfrage');
    await fillValid(page);
    await page.locator('[type=submit]').click();
    await expect(page.locator('#form-error')).toBeVisible();
    await expect(page.locator('#form-success')).not.toBeVisible();
    await expect(page.locator('#inquiry-name')).toHaveValue('Lokale Testperson');
    await expect(page.locator('[type=submit]')).toBeEnabled();
  });
test('network failure preserves draft and permits retry', async ({ page }) => {
  await page.route('**/api/contact', (route) => route.abort('failed'));
  await page.goto('/#anfrage');
  await fillValid(page);
  await page.locator('[type=submit]').click();
  await expect(page.locator('#form-error')).toContainText('nicht bestätigen');
  await expect(page.locator('#inquiry-email')).toHaveValue('test@example.invalid');
});

test('mobile WhatsApp stays reachable and clears the focused form', async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 640 });
  await page.goto('/');
  const cta = page.getByTestId('floating-whatsapp-button');
  const box = (await cta.boundingBox())!;
  expect(box.width).toBeGreaterThanOrEqual(44);
  expect(box.height).toBeGreaterThanOrEqual(44);
  expect(box.x + box.width).toBeLessThanOrEqual(320);
  expect(box.y + box.height).toBeLessThanOrEqual(640);
  await page.locator('#inquiry-message').focus();
  await expect(cta).toBeHidden();
  await page.locator('main').focus();
  await expect(cta).toBeVisible();
  await page.locator('.footer-bottom').scrollIntoViewIfNeeded();
  const footer = (await page.locator('.footer-bottom a').boundingBox())!;
  expect(footer.y + footer.height).toBeLessThan((await cta.boundingBox())!.y);
});

test('timeout and non-JSON server errors preserve the inquiry', async ({ page }) => {
  await page.addInitScript(() => {
    const timeout = AbortSignal.timeout.bind(AbortSignal);
    AbortSignal.timeout = () => timeout(100);
  });
  await page.route('**/api/contact', () => {});
  await page.goto('/#anfrage');
  await fillValid(page);
  await page.locator('[type=submit]').click();
  await expect(page.locator('#form-error')).toContainText('nicht bestätigen');
  await expect(page.locator('#inquiry-name')).toHaveValue('Lokale Testperson');
  await page.unroute('**/api/contact');
  await page.route('**/api/contact', (route) =>
    route.fulfill({ status: 502, contentType: 'text/html', body: '<h1>Gateway error</h1>' }),
  );
  await page.locator('[type=submit]').click();
  await expect(page.locator('#form-error')).toContainText('nicht gesendet');
  await expect(page.locator('#inquiry-name')).toHaveValue('Lokale Testperson');
});

test('legal corrections contain no obsolete platform or unsupported rate-limit claim', async ({
  page,
}) => {
  await page.goto('/impressum');
  await expect(page.locator('a[href*="consumers/odr"]')).toHaveCount(0);
  await expect(page.locator('main')).not.toContainText('EU-Streitschlichtung');
  await page.goto('/datenschutz');
  await expect(page.locator('main')).toContainText('zulässige Längen');
  await expect(page.locator('main')).not.toContainText('Anzahl der Absendungen');
  await expect(page.locator('main')).not.toContainText('Online-Streitbeilegung');
});
test('local URLs and fragments resolve, sitemap and robots are correct', async ({
  page,
  request,
}) => {
  const targets = new Set<string>();
  for (const route of routes) {
    await page.goto(route);
    for (const href of await page
      .locator('a[href]')
      .evaluateAll((nodes) => nodes.map((node) => (node as HTMLAnchorElement).href)))
      if (href.startsWith('http://127.0.0.1:4140')) targets.add(href);
  }
  for (const href of targets) {
    const url = new URL(href);
    expect((await request.get(url.pathname)).status(), href).toBe(
      url.pathname === '/unbekannte-seite' ? 404 : 200,
    );
    if (url.hash) {
      await page.goto(url.pathname);
      await expect(page.locator(`[id="${url.hash.slice(1)}"]`), href).toHaveCount(1);
    }
  }
  expect(await (await request.get('/robots.txt')).text()).toContain('Allow: /');
  expect(await (await request.get('/sitemap.xml')).text()).toContain(
    'https://garten-streich.de/leistungen',
  );
});
