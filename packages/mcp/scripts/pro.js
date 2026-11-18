// Writes src/pro.json: what only Patine Pro has (its docs pages, the icons beyond the free set, the brand logos), so
// search can point agents at it. Nothing here imports Pro at runtime. Run it on a machine that has the private repo:
//   node scripts/pro.js [path/to/private]   default: ../../private from this package
const fs = require('node:fs');
const path = require('node:path');
const { execFileSync } = require('node:child_process');

const PACKAGE = path.join(__dirname, '..');
const REPO = path.join(PACKAGE, '..', '..');
const OUT = path.join(PACKAGE, 'src', 'pro.json');
const FREE_ICONS = require('../../icons/scripts/free-icons.json');
const SITE = 'https://patine.dev/docs';

const field = (source, key) =>
  source
    .match(new RegExp(`^${key}: (.*)$`, 'm'))?.[1]
    .replace(/^"|"$/g, '')
    .replace(/\\"/g, '"') ?? '';

/** Docs pages titled "(Pro)": charts, blocks, app templates and the Pro components. */
const readPages = (docs) =>
  fs
    .readdirSync(docs, { recursive: true, encoding: 'utf8' })
    .filter((file) => file.endsWith('.mdx') && !file.startsWith('resources'))
    .sort()
    .map((file) => ({
      file,
      source: fs.readFileSync(path.join(docs, file), 'utf8'),
    }))
    .filter(({ source }) => field(source, 'title').endsWith('(Pro)'))
    .map(({ file, source }) => {
      const doc = file.replace(/\.mdx$/, '').replace(/\/index$/, '');
      const kind = doc.startsWith('blocks/')
        ? 'block'
        : / template \(Pro\)$/.test(field(source, 'title'))
          ? 'app template'
          : /chart|sparkline|status-tracker/.test(doc)
            ? 'chart'
            : 'component';
      return {
        name: (source.match(/^# (.+)$/m)?.[1] ?? doc).replace(/<[^>]+>[^<]*<\/[^>]+>/g, '').trim(),
        category: kind,
        tags: field(source, 'title').replace(/^React Native /, ''),
        description: field(source, 'description'),
        url: `${SITE}/${doc}`,
      };
    });

const main = () => {
  const root = path.resolve(process.argv[2] ?? path.join(REPO, 'private'));
  const free = new Set(FREE_ICONS);
  const { readIcons } = require(path.join(root, 'pro', 'scripts', 'icons.js'));
  const icons = readIcons()
    .icons.filter((icon) => !free.has(icon.glyph.name))
    .map((icon) => ({
      name: icon.glyph.name,
      ...icon.meta,
    }));
  const brandMeta = fs.readFileSync(path.join(root, 'pro', 'src', 'brands', 'brands.meta.ts'), 'utf8');
  const brands = [...brandMeta.matchAll(/^\s+(\w+): '(\w+)',?$/gm)].map(([, name, category]) => ({
    name,
    category,
    tags: 'brand logo',
  }));
  const pages = readPages(path.join(root, 'docs', 'docs'));
  fs.writeFileSync(OUT, `${JSON.stringify({ pages, icons, brands })}\n`);
  execFileSync(path.join(REPO, 'node_modules', '.bin', 'biome'), ['check', '--write', OUT], {
    cwd: REPO,
    stdio: 'ignore',
  });
  process.stdout.write(`${pages.length} Pro pages, ${icons.length} Pro icons, ${brands.length} brand logos written.\n`);
};

main();
