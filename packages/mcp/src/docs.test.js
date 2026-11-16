const { findPage, parsePages, searchPages, summarize } = require('./docs');

const DOC = `# Patine UI

> intro

## Introduction

Patine UI is a library. It has parts.

## React Native Button

## Button

A pressable button with a label. Variants too.

### Variants

\`default\` is filled.

## Notes

A heading inside the Button page.

## React Native Date Picker & Calendar

## DatePicker & Calendar

Pick a date from a calendar. Button below.
`;

describe('parsePages', () => {
  it('folds each SEO title into the page under it', () => {
    const pages = parsePages(DOC);
    expect(pages.map((p) => [p.title, p.name])).toEqual([
      ['Introduction', 'Introduction'],
      ['React Native Button', 'Button'],
      ['React Native Date Picker & Calendar', 'DatePicker & Calendar'],
    ]);
    expect(pages[1].body).toContain('### Variants');
    expect(pages[1].body).toContain('## Notes');
  });
});

describe('findPage', () => {
  const pages = parsePages(DOC);

  it('finds a page by name, title or part of either', () => {
    expect(findPage(pages, 'button').name).toBe('Button');
    expect(findPage(pages, 'React Native Button').name).toBe('Button');
    expect(findPage(pages, 'datepicker').name).toBe('DatePicker & Calendar');
    expect(findPage(pages, 'notes').name).toBe('Button');
    expect(findPage(pages, 'nothing like it')).toBeNull();
    expect(findPage(pages, '  ')).toBeNull();
  });
});

describe('searchPages', () => {
  it('ranks heading matches first', () => {
    const results = searchPages(parsePages(DOC), 'button');
    expect(results.map((r) => r.page.name)).toEqual(['Button', 'DatePicker & Calendar']);
    expect(results[0].snippet).toContain('pressable button');
  });

  it('returns nothing for an empty query', () => {
    expect(searchPages(parsePages(DOC), '')).toEqual([]);
  });

  // Agents pass arbitrary text: it must never reach a RegExp unescaped.
  it('treats regex characters in a query as plain text', () => {
    const pages = parsePages(DOC);
    for (const query of ['(', '[a-', '.*', '\\', '(a+)+$', '$&']) {
      expect(() => searchPages(pages, query)).not.toThrow();
      expect(() => findPage(pages, query)).not.toThrow();
    }
    expect(searchPages(pages, 'button(').map((r) => r.page.name)[0]).toBe('Button');
  });
});

describe('summarize', () => {
  it('takes the first sentence', () => {
    expect(summarize(parsePages(DOC)[1])).toBe('A pressable button with a label.');
  });
});
