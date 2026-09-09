import { defineConfig } from '@playwright/test';
export default defineConfig({
  testDir: './tests/e2e',
  timeout: 45000,
  expect: { timeout: 6000 },
  fullyParallel: false,
  workers: 1,
  projects: [
    { name: 'chrome', use: { browserName: 'chromium', channel: 'chrome' } },
    { name: 'firefox', use: { browserName: 'firefox' } },
    { name: 'webkit', use: { browserName: 'webkit' } },
  ],
  reporter: [['list'], ['html', { open: 'never' }]],
  use: {
    baseURL: 'http://127.0.0.1:4140',
    viewport: { width: 1440, height: 1000 },
    launchOptions: {
      args: ['--disable-background-networking', '--no-first-run'],
    },
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
  },
  webServer: {
    command: 'node tests/server.mjs',
    url: 'http://127.0.0.1:4140',
    reuseExistingServer: !process.env.CI,
  },
});
