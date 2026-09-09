// Read-only, heuristic scan. Output contains locations and rule names, never secret values.
import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
const root = path.resolve('..');
const git = (...args) => execFileSync('git', args, { cwd: root, maxBuffer: 128 * 1024 * 1024 });
const findings = [];
const envFiles = [];
const counts = { workingTextFiles: 0, gitTextBlobs: 0, binaryFiles: 0 };
const patterns = [
  ['private-key', /-----BEGIN (?:RSA |EC |OPENSSH |DSA |ENCRYPTED )?PRIVATE KEY-----/g],
  [
    'provider-token',
    /\b(?:AKIA[0-9A-Z]{16}|gh[pousr]_[A-Za-z0-9]{30,}|github_pat_[A-Za-z0-9_]{40,}|sk-(?:proj-)?[A-Za-z0-9_-]{24,}|xox[baprs]-[A-Za-z0-9-]{20,})\b/g,
  ],
  ['url-credentials', /[a-z][a-z0-9+.-]*:\/\/[^\s/:@]+:[^\s/@]+@/gi],
  [
    'literal-secret',
    /(?:[\w.-]*(?:password|passwd|secret|api[_-]?key|access[_-]?token|auth[_-]?token)[\w.-]*)["']?\s*[:=]\s*["']([^"'\r\n]{6,})["']/gi,
  ],
  [
    'environment-secret',
    /^(?:[\w.-]*(?:PASSWORD|SECRET|API_KEY|TOKEN)[\w.-]*)\s*=\s*([^\r\n]{6,})$/gm,
  ],
];
function scan(label, data, counter) {
  if (data.includes(0)) {
    counts.binaryFiles++;
    return;
  }
  counts[counter]++;
  const text = data.toString('utf8');
  for (const [rule, pattern] of patterns) {
    for (const match of text.matchAll(pattern)) {
      const value = match[1] || '';
      // One deliberately fake SMTP credential in the isolated transport tests.
      if (value === 'synthetic-test-only' && label.includes('tests/unit/function.test.mjs'))
        continue;
      // Existing runtime lookup, dependency version and historical UI test identifiers.
      if (label.includes('.emergent/cron/dispatch_webhook.sh') && /^['"]?\$\(/.test(value))
        continue;
      if (
        label.endsWith('package-lock.json') &&
        match[0].startsWith('keyvault-secrets') &&
        value === '^4.9.0'
      )
        continue;
      if (
        label.endsWith('frontend/src/constants/testIds/auth.js') &&
        /^(?:login|register)-(?:password|forgot-password)/.test(value)
      )
        continue;
      findings.push({ file: label, line: text.slice(0, match.index).split('\n').length, rule });
    }
  }
}
function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.isSymbolicLink()) continue;
    const file = path.join(dir, entry.name);
    const relative = path.relative(root, file).replaceAll('\\', '/');
    if (entry.isDirectory()) {
      // Dependencies and disposable browser profiles are not project source.
      if (
        ['.git', 'node_modules', '.venv', '__pycache__'].includes(entry.name) ||
        entry.name.startsWith('profile-')
      )
        continue;
      walk(file);
    } else {
      if (entry.name === '.git') continue;
      if (/^\.env|\.env(?:\.|$)/i.test(entry.name)) {
        let ignored = false;
        try {
          git('check-ignore', '--quiet', '--', relative);
          ignored = true;
        } catch {}
        envFiles.push({ file: relative, ignored });
      }
      scan(relative, fs.readFileSync(file), 'workingTextFiles');
    }
  }
}
walk(root);
// Include all reachable history and the index, without rewriting either.
const objects = new Map();
for (const line of git('rev-list', '--objects', '--all').toString().trim().split('\n')) {
  const [oid, ...name] = line.split(' ');
  objects.set(oid, name.join(' ') || oid);
}
for (const line of git('ls-files', '--stage', '-z').toString().split('\0').filter(Boolean)) {
  const [metadata, name] = line.split('\t');
  objects.set(metadata.split(' ')[1], `index:${name}`);
}
const raw = execFileSync('git', ['cat-file', '--batch'], {
  cwd: root,
  input: [...objects.keys()].join('\n') + '\n',
  maxBuffer: 128 * 1024 * 1024,
});
let offset = 0;
while (offset < raw.length) {
  const end = raw.indexOf(10, offset);
  const [oid, type, sizeText] = raw.subarray(offset, end).toString().split(' ');
  const size = Number(sizeText);
  if (!Number.isFinite(size)) throw new Error('Cannot inspect Git object');
  const data = raw.subarray(end + 1, end + 1 + size);
  if (type === 'blob') scan(`git:${oid.slice(0, 12)}:${objects.get(oid)}`, data, 'gitTextBlobs');
  offset = end + 1 + size + 1;
}
const ignoreProbes = [
  '.env',
  '.env.production',
  '.env.backup',
  'backend/.env',
  'frontend/.env.local',
  'frontend/local.env',
  'frontend/local.env.backup',
  'frontend/.netlify/state.json',
  'credentials.json',
  'private.key',
  'certificate.pfx',
];
const unprotected = ignoreProbes.filter((file) => {
  try {
    git('check-ignore', '--quiet', '--no-index', '--', file);
    return false;
  } catch {
    return true;
  }
});
const trackedSensitivePaths = git('ls-files', '-z')
  .toString()
  .split('\0')
  .filter((file) =>
    /(?:^|\/)\.env|\.env(?:\.|$)|\.(?:pem|key|p12|pfx)$|(?:^|\/)credentials\.[^/]+$/.test(file),
  );
const report = {
  date: new Date().toISOString(),
  counts,
  envFiles,
  trackedSensitivePaths,
  unprotected,
  findings,
  limits:
    'Heuristic text scan of project files (including ignored builds/reports), index and all reachable Git history. Dependencies, disposable browser profiles and binary contents excluded. No proof that every possible secret can be detected.',
};
fs.mkdirSync('reports', { recursive: true });
fs.writeFileSync('reports/security-scan.json', JSON.stringify(report, null, 2));
console.log(JSON.stringify(report, null, 2));
if (
  findings.length ||
  unprotected.length ||
  trackedSensitivePaths.length ||
  envFiles.some((file) => !file.ignored)
)
  process.exitCode = 1;
