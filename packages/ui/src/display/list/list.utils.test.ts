import { LIST_DESIGN } from './list.constants';
import { getSeparatorEdge, showsChevron } from './list.utils';

describe('showsChevron', () => {
  it('follows the design for rows that navigate', () => {
    expect(showsChevron(LIST_DESIGN.ios, true, undefined)).toBe(true);
    expect(showsChevron(LIST_DESIGN.material, true, undefined)).toBe(false);
    expect(showsChevron(LIST_DESIGN.ios, false, undefined)).toBe(false);
  });

  it('lets the prop win', () => {
    expect(showsChevron(LIST_DESIGN.material, true, true)).toBe(true);
    expect(showsChevron(LIST_DESIGN.ios, true, false)).toBe(false);
  });
});

describe('getSeparatorEdge', () => {
  it('draws nothing above the first row', () => {
    expect(getSeparatorEdge(LIST_DESIGN.ios, true)).toBeNull();
  });

  it('starts the line at the text on iOS, spans the row on the web, and leaves it out in Material', () => {
    expect(getSeparatorEdge(LIST_DESIGN.ios, false)).toBe('content');
    expect(getSeparatorEdge(LIST_DESIGN.web, false)).toBe('row');
    expect(getSeparatorEdge(LIST_DESIGN.material, false)).toBeNull();
  });
});
