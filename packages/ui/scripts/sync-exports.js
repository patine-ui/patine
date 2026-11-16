// Writes package.json `exports`: one flat subpath per component folder (`patine-ui/date`), wherever it sits under src/<category>/.
// Agents and users import by component, never by category, so moving a folder between categories is not a breaking change.
// `--check` fails instead of writing, for CI and `pnpm lint`.
const fs = require('node:fs');
const path = require('node:path');

const root = path.join(__dirname, '..');
const src = path.join(root, 'src');
const pkgPath = path.join(root, 'package.json');

const isDir = (p) => fs.statSync(p).isDirectory();
const hasIndex = (p) => fs.existsSync(path.join(p, 'index.ts'));

/** `[subpath, folder relative to src]`, e.g. `['date', 'pickers/date']`. `core` sits at the top level. */
const findFolders = () =>
  fs
    .readdirSync(src)
    .map((name) => path.join(src, name))
    .filter(isDir)
    .flatMap((dir) =>
      hasIndex(dir)
        ? [[path.basename(dir), path.basename(dir)]]
        : fs
            .readdirSync(dir)
            .map((name) => path.join(dir, name))
            .filter((p) => isDir(p) && hasIndex(p))
            .map((p) => [path.basename(p), path.relative(src, p)])
    );

// Apps resolve the compiled lib/ (aliases rewritten by tsc-alias), never src/: src's `@/` imports only resolve inside this repo.
const entry = (folder) => ({
  types: `./lib/${folder}/index.d.ts`,
  default: `./lib/${folder}/index.js`,
});

const buildExports = () => {
  const folders = findFolders().sort(([a], [b]) => a.localeCompare(b));
  const names = folders.map(([name]) => name);
  const duplicate = names.find((name, i) => names.indexOf(name) !== i);
  if (duplicate) throw new Error(`Two component folders are named "${duplicate}": subpaths must be unique across categories.`);
  return {
    '.': {
      types: './lib/index.d.ts',
      default: './lib/index.js',
    },
    ...Object.fromEntries(folders.map(([name, folder]) => [`./${name}`, entry(folder)])),
    './package.json': './package.json',
  };
};

const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));
const next = buildExports();
if (JSON.stringify(pkg.exports) === JSON.stringify(next)) process.exit(0);
if (process.argv.includes('--check')) {
  console.error('package.json exports are out of date with src/. Run `pnpm sync:exports`.');
  process.exit(1);
}
pkg.exports = next;
fs.writeFileSync(pkgPath, `${JSON.stringify(pkg, null, 2)}\n`);
console.log(`package.json exports: ${Object.keys(next).length - 2} component subpaths.`);
