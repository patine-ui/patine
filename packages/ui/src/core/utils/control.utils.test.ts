import { isControlAtEnd } from './control.utils';

describe('isControlAtEnd', () => {
  it('takes controlPosition, then the deprecated prop, then the default', () => {
    expect(isControlAtEnd('end', 'start', 'start')).toBe(true);
    expect(isControlAtEnd(undefined, 'end', 'start')).toBe(true);
    expect(isControlAtEnd(undefined, undefined, 'end')).toBe(true);
    expect(isControlAtEnd(undefined, undefined, 'start')).toBe(false);
  });
});
