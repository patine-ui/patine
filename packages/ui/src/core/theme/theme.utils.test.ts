import { lightTheme } from './theme.constants';
import { mergeTheme, resolveDesign, stepShadow } from './theme.utils';

describe('resolveDesign', () => {
  it('matches the platform for auto: iOS, the web, and Material everywhere else', () => {
    expect(resolveDesign('auto', 'ios')).toBe('ios');
    expect(resolveDesign('auto', 'web')).toBe('web');
    expect(resolveDesign('auto', 'android')).toBe('material');
    expect(resolveDesign('auto', 'windows')).toBe('material');
  });

  it('keeps a chosen design on every platform', () => {
    expect(resolveDesign('material', 'ios')).toBe('material');
    expect(resolveDesign('ios', 'android')).toBe('ios');
  });
});

describe('stepShadow', () => {
  it('steps along the elevation scale and stops at its ends', () => {
    expect(stepShadow('xs', 2)).toBe('md');
    expect(stepShadow('md', -1)).toBe('sm');
    expect(stepShadow('lg', 3)).toBe('xl');
    expect(stepShadow('xs', -4)).toBe('none');
  });
});

describe('mergeTheme', () => {
  it('keeps the base value for a key set to undefined', () => {
    expect(mergeTheme(lightTheme, { shadows: undefined }).shadows).toBe(lightTheme.shadows);
  });
});
