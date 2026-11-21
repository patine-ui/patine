import { isTextContent } from './text.utils';

describe('isTextContent', () => {
  it.each([
    ['Save', true],
    [3, true],
    [['Add at ', '3:00 PM'], true],
    [['Total ', 12, ' items'], true],
    [[], false],
    [null, false],
    [['Hi ', { type: 'b' }], false],
  ])('%p is text: %p', (children, expected) => {
    expect(isTextContent(children as never)).toBe(expected);
  });
});
