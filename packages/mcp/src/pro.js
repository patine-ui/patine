// What only Patine Pro has, for search to point at after the free results. pro.json is written by scripts/pro.js from the
// private repo, so nothing here imports Pro. Pure, so it's testable.
const { searchIcons } = require('./icons');
const PRO = require('./pro.json');

const PRICING = 'https://patine.dev/pricing';

/** How to get a Pro item, under every Pro result. */
const PRO_NOTE = `Pro items need a Patine Pro license: ${PRICING}. Install one with \`npx shadcn add @patine-pro/<item>\` (its docs page names the item), then import it from '@/components/patine/<item>' (for example '@/components/patine/kanban'). There is no @patine-ui/pro package.`;

/** A docs search's Pro matches: charts, blocks, app templates and Pro components, with what they are and where to read more. */
const searchProPages = (query, limit = 3, exclude = []) =>
  searchIcons(query, limit + exclude.length, PRO.pages)
    .filter((page) => !exclude.includes(page.name))
    .slice(0, limit)
    .map((page) => `- [Pro ${page.category}] ${page.name}: ${page.description} Docs: ${page.url}`);

/** An icon search's Pro matches: icons beyond the free set, and brand logos. */
const searchProIcons = (query, limit = 10) => {
  const icons = searchIcons(query, limit, PRO.icons).map(
    (icon) =>
      `- [Pro] ${icon.name} (${icon.category}): ${icon.tags}. <Icon name="${icon.name}" /> from '@/components/patine/icons' (npx shadcn add @patine-pro/icons)`
  );
  const brands = searchIcons(query, limit, PRO.brands).map(
    (brand) =>
      `- [Pro brand logo] ${brand.name} (${brand.category}). <BrandIcon name="${brand.name}" /> from '@/components/patine/brands' (npx shadcn add @patine-pro/brands)`
  );
  return [...brands, ...icons].slice(0, limit);
};

module.exports = {
  PRO,
  PRO_NOTE,
  searchProIcons,
  searchProPages,
};
