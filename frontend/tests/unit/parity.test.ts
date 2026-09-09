import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { site, mainNav, legalNav } from '../../src/data/site.ts';
import { services, furtherServices } from '../../src/data/services.ts';
import { seoPages } from '../../src/data/seo.ts';
import { seasonByMonth } from '../../src/data/seasons.ts';
const baseline = JSON.parse(
  readFileSync(new URL('../fixtures/baseline.json', import.meta.url), 'utf8'),
);
test('company, services, navigation, SEO and season data equal original CRA data', () => {
  for (const [key, value] of Object.entries({
    site,
    mainNav,
    legalNav,
    services,
    furtherServices,
    seoPages,
    seasonByMonth,
  }))
    assert.deepEqual(value, baseline.data[key], key);
});
// Function behavior is covered by function.test.mjs; input hardening intentionally
// changes the original bytes while preserving notification and confirmation delivery.
