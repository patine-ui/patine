// Fails if the npm tarball would ship anything outside the allowlist (tests, configs, secrets, stray files) or if an
// `exports` target is missing from it. Run after `pnpm build`, in CI and before publishing.
const { execFileSync } = require('node:child_process');
const path = require('node:path');

const root = path.join(__dirname, '..');

const ALLOWED = [/^package\.json$/, /^README\.md$/, /^LICENSE$/, /^llms-full\.txt$/, /^lib\/.+\.(js|d\.ts)(\.map)?$/, /^src\/.+\.tsx?$/];
const FORBIDDEN = /(\.test\.|__tests__|__mocks__|\.env|\.npmrc|\.pem$|\.key$)/;

const [pack] = JSON.parse(
  execFileSync('npm', ['pack', '--dry-run', '--json', '--ignore-scripts'], {
    cwd: root,
    encoding: 'utf8',
  })
);
const files = new Set(pack.files.map((f) => f.path));
const pkgExports = require(path.join(root, 'package.json')).exports;
const targets = Object.values(pkgExports).flatMap((t) => (typeof t === 'string' ? [t] : Object.values(t)));

const errors = [
  ...[...files].filter((f) => FORBIDDEN.test(f) || !ALLOWED.some((re) => re.test(f))).map((f) => `not allowed: ${f}`),
  ...targets
    .map((t) => t.replace(/^\.\//, ''))
    .filter((t) => !files.has(t))
    .map((t) => `exports target missing: ${t}`),
];

if (errors.length > 0) {
  console.error(`npm tarball check failed (${files.size} files):\n${errors.join('\n')}`);
  process.exit(1);
}
console.log(`npm tarball OK: ${files.size} files, ${Math.round(pack.size / 1024)} kB packed.`);
