import { I18nManager } from 'react-native';

import { darkTheme, lightTheme } from './theme.constants';
import { createStyles, getSystemDirection, mergeTheme, resolveDesign, stepShadow } from './theme.utils';

describe('resolveDesign', () => {
  it('matches the platform for native: iOS, the web, and Material everywhere else', () => {
    expect(resolveDesign('native', 'ios')).toBe('ios');
    expect(resolveDesign('native', 'web')).toBe('web');
    expect(resolveDesign('native', 'android')).toBe('material');
    expect(resolveDesign('native', 'windows')).toBe('material');
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

describe('createStyles', () => {
  it('builds a sheet once per theme and again for another theme', () => {
    const factory = jest.fn((t: typeof lightTheme) => ({ row: { gap: t.spacing.sm } }));
    const themed = createStyles(factory);
    const first = themed(lightTheme);
    expect(themed(lightTheme)).toBe(first);
    expect(first.row.gap).toBe(lightTheme.spacing.sm);
    expect(themed(darkTheme)).not.toBe(first);
    expect(factory).toHaveBeenCalledTimes(2);
  });
});

describe('getSystemDirection', () => {
  afterEach(() => jest.restoreAllMocks());

  it('reads I18nManager on iOS and Android', () => {
    expect(getSystemDirection()).toBe('ltr');
    jest.replaceProperty(I18nManager, 'isRTL', true);
    expect(getSystemDirection()).toBe('rtl');
  });
});
