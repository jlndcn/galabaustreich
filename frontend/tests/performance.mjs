import fs from 'node:fs/promises';
import path from 'node:path';
import { gzipSync, brotliCompressSync } from 'node:zlib';
import { spawn } from 'node:child_process';
import lighthouse from 'lighthouse';
import { launch } from 'chrome-launcher';
import desktopConfig from 'lighthouse/core/config/desktop-config.js';
const output = path.resolve('reports/performance');
await fs.mkdir(output, { recursive: true });
const server = spawn(process.execPath, ['tests/server.mjs'], { stdio: 'pipe', windowsHide: true });
const ready = new Promise((resolve, reject) => {
  server.stdout.once('data', resolve);
  server.once('error', reject);
  server.once('exit', (code) => reject(new Error(`Server stopped ${code}`)));
});
await ready;
const chrome = await launch({
  userDataDir: await fs.mkdtemp(path.join(output, 'profile-')),
  chromeFlags: ['--headless', '--disable-gpu', '--no-first-run', '--disable-background-networking'],
  logLevel: 'silent',
});
const results = [];
const runs = ['mobile', 'desktop'].flatMap((device) =>
  [1, 2, 3].map((run) => ({ device, run, route: '/' })),
);
for (const route of ['/leistungen', '/ueber-uns', '/team', '/impressum', '/datenschutz', '/agb']) {
  runs.push({ device: 'mobile', run: 1, route });
}
try {
  for (const { device, run, route } of runs) {
    const { lhr, report } = await lighthouse(
      'http://127.0.0.1:4140' + route,
      {
        port: chrome.port,
        output: 'json',
        logLevel: 'error',
        onlyCategories: ['performance', 'accessibility', 'best-practices', 'seo'],
      },
      device === 'desktop' ? desktopConfig : undefined,
    );
    if (lhr.runtimeError) throw new Error(JSON.stringify(lhr.runtimeError));
    await fs.writeFile(
      path.join(output, `${route === '/' ? 'home' : route.slice(1)}-${device}-${run}.json`),
      report,
    );
    const result = {
      device,
      run,
      route,
      date: lhr.fetchTime,
      version: lhr.lighthouseVersion,
      settings: lhr.configSettings,
      scores: Object.fromEntries(
        Object.entries(lhr.categories).map(([key, value]) => [key, value.score]),
      ),
      metrics: Object.fromEntries(
        [
          'first-contentful-paint',
          'largest-contentful-paint',
          'total-blocking-time',
          'cumulative-layout-shift',
          'speed-index',
          'bootup-time',
          'mainthread-work-breakdown',
          'total-byte-weight',
        ].map((key) => [key, lhr.audits[key].numericValue]),
      ),
      failed: Object.entries(lhr.audits)
        .filter(([, value]) => value.score !== null && value.score < 1)
        .map(([key, value]) => ({ id: key, title: value.title, score: value.score })),
    };
    results.push(result);
    console.log(
      JSON.stringify({ device, run, route, scores: result.scores, metrics: result.metrics }),
    );
  }
  const assets = [];
  for (const name of await fs.readdir('dist/_astro')) {
    const data = await fs.readFile(path.join('dist/_astro', name));
    assets.push({
      name,
      raw: data.length,
      gzip: gzipSync(data).length,
      brotli: brotliCompressSync(data).length,
    });
  }
  await fs.writeFile(
    path.join(output, 'summary.json'),
    JSON.stringify({ results, assets }, null, 2),
  );
} finally {
  try {
    await chrome.kill();
  } finally {
    server.kill();
  }
}
