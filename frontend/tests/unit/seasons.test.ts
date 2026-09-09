import test from 'node:test';
import assert from 'node:assert/strict';
import { getSeason, getSeasonalTop, monthNames, seasonByMonth } from '../../src/data/seasons.ts';
import { services } from '../../src/data/services.ts';
for (let month = 1; month <= 12; month++) {
  test(`season ${month}: valid services at both month boundaries`, () => {
    for (const date of [new Date(2026, month - 1, 1), new Date(2026, month, 0, 23, 59)]) {
      const result = getSeasonalTop(services, 3, date);
      assert.equal(result.season.monthName, monthNames[month - 1]);
      assert.deepEqual(
        result.services.map((service) => service.id),
        seasonByMonth[month].ids.slice(0, 3),
      );
      assert.equal(new Set(result.services).size, 3);
      assert.ok(result.services.every((service) => services.includes(service)));
    }
  });
}
test('unavailable services fall back without duplicates', () => {
  const available = services.filter((service) => service.key);
  const result = getSeasonalTop(available, 3, new Date(2026, 0, 1));
  assert.equal(new Set(result.services).size, result.services.length);
  assert.ok(result.services.every((service) => available.includes(service)));
});
test('year change updates December to January', () => {
  assert.equal(getSeason(new Date(2026, 11, 31)).month, 12);
  assert.equal(getSeason(new Date(2027, 0, 1)).month, 1);
});
