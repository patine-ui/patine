import { ICON_META } from './icons.meta';
import { ICONS } from './icons.registry';
import { resolveColor, resolveIconSize, splitCut, toSvgId } from './icons.utils';

// The list the generator copies from Pro. Plain JSON, so `require` it like the generator does.
declare const require: (id: string) => string[];
const FREE = require('../scripts/free-icons.json');

describe('icons.utils', () => {
  it('resolves named and point sizes', () => {
    expect(resolveIconSize('sm')).toBe(16);
    expect(resolveIconSize(30)).toBe(30);
  });

  it('draws cut strokes on top, the rest under the mask', () => {
    expect(splitCut([['a', 1], ['b', 8], ['c']])).toEqual({ base: ['a', 'c'], cut: ['b'] });
  });

  it('makes ids url() can use', () => {
    expect(toSvgId(':r1:')).toBe('pir1');
  });

  it('takes theme colors by name, any color as is, and a fallback', () => {
    const colors = { primary: '#123456' };
    expect(resolveColor(colors, 'primary', '#000')).toBe('#123456');
    expect(resolveColor(colors, 'tomato', '#000')).toBe('tomato');
    expect(resolveColor(colors, undefined, '#000')).toBe('#000');
  });
});

describe('the free set', () => {
  it('is exactly the list in scripts/free-icons.json (run `pnpm --filter @patine-ui/icons icons` after changing it)', () => {
    expect(Object.keys(ICONS).sort()).toEqual([...FREE].sort());
    expect(Object.keys(ICON_META).sort()).toEqual([...FREE].sort());
  });

  it('keys every glyph by its own name', () => {
    for (const [name, glyph] of Object.entries(ICONS)) expect(glyph.name).toBe(name);
  });
});
