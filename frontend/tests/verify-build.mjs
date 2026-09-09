import fs from 'node:fs/promises';
import path from 'node:path';
import assert from 'node:assert/strict';
import { gzipSync } from 'node:zlib';
import { createHash } from 'node:crypto';
import { site } from '../src/data/site.ts';
import { seoPages, buildLocalBusinessJsonLd } from '../src/data/seo.ts';
const preview = process.argv.includes('--preview');
const root = path.resolve(preview ? 'dist-preview' : 'dist');
const pages = [
  'index',
  'leistungen',
  'ueber-uns',
  'team',
  'impressum',
  'datenschutz',
  'agb',
  '404',
];
const results = [];
const titles = new Set();
const descriptions = new Set();
for (const page of pages) {
  const html = await fs.readFile(path.join(root, `${page}.html`), 'utf8');
  const indexable = !preview && page !== '404';
  assert.match(
    html,
    new RegExp(`name="robots" content="${indexable ? 'index,follow' : 'noindex,nofollow'}"`),
  );
  assert.equal((html.match(/<h1(?:\s|>)/g) || []).length, 1);
  assert.equal(html.includes('rel="canonical"'), page !== '404');
  const title = html.match(/<title>(.*?)<\/title>/s)?.[1];
  const description = html.match(/name="description" content="([^"]+)"/)?.[1];
  assert.ok(title && description, `${page}: missing metadata`);
  assert.ok(!titles.has(title) && !descriptions.has(description), `${page}: duplicate metadata`);
  titles.add(title);
  descriptions.add(description);
  if (page !== '404') {
    const route = page === 'index' ? '/' : `/${page}`;
    const canonical = new URL(route, site.domain).href;
    assert.ok(html.includes(`rel="canonical" href="${canonical}"`));
    assert.ok(html.includes(`property="og:url" content="${canonical}"`));
  }
  if (page === 'index') {
    const jsonLd = html.match(
      /<script[^>]*type="application\/ld\+json"[^>]*>(.*?)<\/script>/s,
    )?.[1];
    assert.ok(jsonLd, 'Missing structured business data');
    assert.deepEqual(JSON.parse(jsonLd), buildLocalBusinessJsonLd());
  }
  const scripts = [...html.matchAll(/<script[^>]+src="([^"]+)"/g)].map((match) => match[1]);
  let jsGzip = 0;
  for (const script of scripts) {
    assert.ok(script.startsWith('/_astro/'));
    jsGzip += gzipSync(await fs.readFile(path.join(root, script))).length;
  }
  assert.ok(jsGzip <= (page === 'index' ? 5000 : 1000), `${page}: JavaScript budget exceeded`);
  results.push({
    page,
    htmlBytes: Buffer.byteLength(html),
    scripts: scripts.length,
    jsGzip,
    sha256: createHash('sha256').update(html).digest('hex'),
  });
}
const robots = await fs.readFile(path.join(root, 'robots.txt'), 'utf8');
assert.ok(robots.includes(preview ? 'Disallow: /' : 'Allow: /'));
const headers = await fs.readFile(path.join(root, '_headers'), 'utf8');
assert.equal(headers.includes('X-Robots-Tag: noindex'), preview);
const sitemap = await fs.readFile(path.join(root, 'sitemap.xml'), 'utf8');
assert.equal((sitemap.match(/<loc>/g) || []).length, 7);
assert.ok(!sitemap.includes('/404'));
assert.deepEqual(
  [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map((match) => match[1]).sort(),
  Object.values(seoPages)
    .map((seo) => new URL(seo.path, site.domain).href)
    .sort(),
);
for (const asset of [
  'og-image.jpg',
  'favicon.ico',
  'manifest.json',
  'logo192.png',
  'logo512.png',
  'fonts/figtree-variable.woff2',
])
  assert.ok((await fs.stat(path.join(root, asset))).size > 0, asset);
await fs.mkdir('reports', { recursive: true });
await fs.writeFile(
  `reports/build-${preview ? 'preview' : 'production'}.json`,
  JSON.stringify({ date: new Date().toISOString(), preview, results }, null, 2),
);
console.log(
  JSON.stringify({
    preview,
    pages: results.length,
    homeJsGzip: results[0].jsGzip,
    innerPageJsGzip: results[1].jsGzip,
    status: 'passed',
  }),
);
