// What only Patine Pro has, for search to point at after the free results. pro.json is written by scripts/pro.js from the
// private repo, so nothing here imports Pro. Pure, so it's testable.
const { searchIcons } = require('./icons');
const PRO = require('./pro.json');

const PRICING = 'https://patine.dev/pricing';

/** How to get a Pro item, under every Pro result. */
const PRO_NOTE = `Pro items need a Patine Pro license: ${PRICING}. Then import them from '@patine-ui/pro'.`;

/** A docs search's Pro matches: charts, blocks, app templates and Pro components, with what they are and where to read more. */
const searchProPages = (query, limit = 3, exclude = []) =>
  searchIcons(query, limit + exclude.length, PRO.pages)
    .filter((page) => !exclude.includes(page.name))
    .slice(0, limit)
    .map((page) => `- [Pro ${page.category}] ${page.name}: ${page.description} Docs: ${page.url}`);

/** An icon search's Pro matches: icons beyond the free set, and brand logos. */
const searchProIcons = (query, limit = 10) => {
  const icons = searchIcons(query, limit, PRO.icons).map(
    (icon) => `- [Pro] ${icon.name} (${icon.category}): ${icon.tags}. <Icon name="${icon.name}" /> from '@patine-ui/pro'`
  );
  const brands = searchIcons(query, limit, PRO.brands).map(
    (brand) => `- [Pro brand logo] ${brand.name} (${brand.category}). <BrandIcon name="${brand.name}" /> from '@patine-ui/pro'`
  );
  return [...brands, ...icons].slice(0, limit);
};

module.exports = {
  PRO,
  PRO_NOTE,
  searchProIcons,
  searchProPages,
};
