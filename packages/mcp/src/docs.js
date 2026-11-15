// Pure helpers over llms-full.txt: split it into pages, find one by name, and search them. No I/O here, so it's testable.

/** Lines of context kept around a search hit. */
const SNIPPET_CHARS = 280;

/** A heading match counts this many times more than a match in the text. */
const HEADING_WEIGHT = 5;

/**
 * llms-full.txt joins every docs page under its SEO title as a `## ` heading, followed by the page's own title, also `## `,
 * with nothing between them. That empty section marks where a page starts; any other `## ` heading is part of the page.
 */
const parsePages = (text) => {
  const pages = [];
  let pendingTitle = null;
  let current = null;
  let heading = null;
  let lines = [];
  const flush = () => {
    if (heading === null) return;
    const body = lines.join('\n').trim();
    if (!body) pendingTitle = heading;
    else if (current && pendingTitle === null) current.body += `\n\n## ${heading}\n\n${body}`;
    else {
      current = {
        title: pendingTitle ?? heading,
        name: heading,
        body,
      };
      pages.push(current);
      pendingTitle = null;
    }
  };
  for (const line of text.split('\n')) {
    if (line.startsWith('## ')) {
      flush();
      heading = line.slice(3).trim();
      lines = [];
    } else if (heading !== null) lines.push(line);
  }
  flush();
  return pages;
};

const normalize = (s) =>
  s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, ' ')
    .trim();

/** The page for a component or topic: an exact name, then a name or title that contains it. */
const findPage = (pages, query) => {
  const q = normalize(query);
  if (!q) return null;
  return (
    pages.find((p) => normalize(p.name) === q) ??
    pages.find((p) => normalize(p.title) === q || normalize(p.title) === `react native ${q}`) ??
    pages.find((p) => normalize(p.name).includes(q) || normalize(p.title).includes(q)) ??
    // A page without an SEO title of its own is folded into the one before it, under its `## ` heading.
    pages.find((p) => p.body.split('\n').some((line) => line.startsWith('## ') && normalize(line.slice(3)) === q)) ??
    null
  );
};

/** Whole-word matches, so "min" finds "min" and not "minutes". */
const countOf = (haystack, word) => haystack.match(new RegExp(`\\b${word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'g'))?.length ?? 0;

/** Pages ranked by how often the query's words appear, headings counting more, each with a snippet around the first hit. */
const searchPages = (pages, query, limit = 5) => {
  const terms = normalize(query).split(' ').filter(Boolean);
  if (terms.length === 0) return [];
  const texts = pages.map((page) => ({
    heading: normalize(`${page.title} ${page.name}`),
    body: page.body.toLowerCase(),
  }));
  // Rare words count more than common ones (inverse document frequency), so "nights" outweighs "min".
  const weight = Object.fromEntries(
    terms.map((t) => [t, Math.log((pages.length + 1) / (1 + texts.filter((x) => countOf(x.body, t) > 0).length)) + 1])
  );
  return pages
    .map((page, i) => {
      const { heading, body } = texts[i];
      const score = terms.reduce((sum, t) => sum + (countOf(heading, t) * HEADING_WEIGHT + countOf(body, t)) * weight[t], 0);
      const hit = Math.max(0, body.search(new RegExp(`\\b${terms[0]}\\b`)));
      return {
        page,
        score,
        snippet: page.body.slice(Math.max(0, hit - SNIPPET_CHARS / 2), hit + SNIPPET_CHARS / 2).trim(),
      };
    })
    .filter((r) => r.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit);
};

/** The first sentence of a page, for a one-line summary. */
const summarize = (page) => {
  const prose = page.body.split('\n').find((line) => line.trim() && !line.startsWith('```') && !line.startsWith('#')) ?? '';
  const end = prose.search(/[.!?](\s|$)/);
  return end === -1 ? prose.trim() : prose.slice(0, end + 1).trim();
};

module.exports = {
  findPage,
  parsePages,
  searchPages,
  summarize,
};
