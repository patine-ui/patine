// Search over the free icon set (`@patine-ui/icons`). icons.json is written by packages/icons/scripts/icons.js, so the
// names here are the names that exist. Pure, so it's testable.
const ICONS = require('./icons.json');

const words = (s) =>
  s
    .replace(/([a-z])([A-Z])/g, '$1 $2')
    .toLowerCase()
    .split(/[^a-z0-9]+/)
    .filter(Boolean);

/** How well one icon matches the query's words: its name counts most, then its category, then its search tags. */
const score = (icon, terms) => {
  const name = words(icon.name);
  const tags = words(icon.tags);
  return terms.reduce((sum, t) => {
    if (name.includes(t)) return sum + 3;
    if (name.some((w) => w.startsWith(t))) return sum + 2;
    if (icon.category === t || tags.includes(t)) return sum + 1;
    return sum;
  }, 0);
};

/** The icons that best match a query such as "notification" or "arrow left", best first. */
const searchIcons = (query, limit = 20, icons = ICONS) => {
  const terms = words(query);
  if (terms.length === 0) return [];
  return icons
    .map((icon) => ({
      icon,
      score: score(icon, terms),
    }))
    .filter((r) => r.score > 0)
    .sort((a, b) => b.score - a.score || a.icon.name.localeCompare(b.icon.name))
    .slice(0, limit)
    .map((r) => r.icon);
};

module.exports = { ICONS, searchIcons };
