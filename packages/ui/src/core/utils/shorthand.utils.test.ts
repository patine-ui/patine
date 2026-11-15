import { hasShorthand } from './shorthand.utils';

describe('hasShorthand', () => {
  it('is true when any value is given, even an empty one', () => {
    expect(hasShorthand(undefined, 'Title')).toBe(true);
    expect(hasShorthand([], undefined)).toBe(true);
    expect(hasShorthand('')).toBe(true);
  });

  it('is false when none is given', () => {
    expect(hasShorthand()).toBe(false);
    expect(hasShorthand(undefined, null)).toBe(false);
  });
});
