// Local static build server. Contact requests never reach an SMTP service.
import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { resolve, extname, sep } from 'node:path';
import { gzipSync } from 'node:zlib';
const root = resolve(process.env.TEST_ROOT || 'dist');
const port = Number(process.env.PORT || 4140);
const baseline = process.env.TEST_BASELINE === 'true';
const types = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css',
  '.js': 'text/javascript',
  '.json': 'application/json',
  '.webp': 'image/webp',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.ico': 'image/x-icon',
  '.woff2': 'font/woff2',
  '.xml': 'application/xml',
  '.txt': 'text/plain',
};
createServer(async (req, res) => {
  const url = new URL(req.url, `http://127.0.0.1:${port}`);
  res.setHeader('X-Content-Type-Options', 'nosniff');
  if (req.method !== 'GET' && req.method !== 'HEAD') {
    res.writeHead(503, { 'Content-Type': 'application/json' });
    return res.end(JSON.stringify({ detail: 'Local test server: no mail delivery.' }));
  }
  const pathname = decodeURIComponent(url.pathname);
  let file = resolve(root, '.' + pathname);
  if (file !== root && !file.startsWith(root + sep)) {
    res.writeHead(403);
    return res.end();
  }
  if (pathname === '/') file = resolve(root, 'index.html');
  else if (!extname(file)) file += '.html';
  let status = 200;
  try {
    if (!(await stat(file)).isFile()) throw new Error('not file');
  } catch {
    file = resolve(root, baseline ? 'index.html' : '404.html');
    status = baseline ? 200 : 404;
  }
  try {
    let body = await readFile(file);
    res.setHeader('Content-Type', types[extname(file)] || 'text/plain');
    res.setHeader(
      'Cache-Control',
      pathname.startsWith('/_astro/') || pathname.startsWith('/fonts/')
        ? 'public, max-age=31536000, immutable'
        : 'no-cache',
    );
    res.setHeader('Vary', 'Accept-Encoding');
    if (/\bgzip\b/.test(req.headers['accept-encoding'] || '')) {
      body = gzipSync(body);
      res.setHeader('Content-Encoding', 'gzip');
    }
    res.writeHead(status, { 'Content-Length': body.length });
    res.end(req.method === 'HEAD' ? undefined : body);
  } catch {
    res.writeHead(500);
    res.end('Build missing. Run npm run build first.');
  }
}).listen(port, '127.0.0.1', () => console.log(`Static test server: http://127.0.0.1:${port}`));
