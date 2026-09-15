/**
 * Copy self-hosted Decap CMS browser build into public/admin.
 * Runs on postinstall / prebuild so Cloudflare Pages never loads unpkg.
 */
const fs = require("fs");
const path = require("path");

const root = path.join(__dirname, "..");
const candidates = [
  path.join(root, "node_modules", "decap-cms", "dist", "decap-cms.js"),
  path.join(root, "node_modules", "decap-cms", "dist", "decap-cms.js.js"),
];

const destDir = path.join(root, "public", "admin");
const dest = path.join(destDir, "decap-cms.js");

const src = candidates.find((p) => fs.existsSync(p));
if (!src) {
  console.error(
    "copy-decap-cms: decap-cms dist not found. Run yarn install first.",
  );
  process.exit(1);
}

fs.mkdirSync(destDir, { recursive: true });
fs.copyFileSync(src, dest);
console.log("copy-decap-cms: wrote", path.relative(root, dest));
