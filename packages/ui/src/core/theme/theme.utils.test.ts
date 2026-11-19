import { I18nManager } from 'react-native';

import { darkTheme, lightTheme } from './theme.constants';
import { createStyles, createTheme, fontFace, getSystemDirection, mergeTheme, resolveDesign, stepShadow, textStyle } from './theme.utils';

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

describe('fontFace and textStyle', () => {
  const themed = createTheme({
    typography: {
      fonts: {
        body: { regular: 'Manrope_400Regular', semibold: 'Manrope_600SemiBold' },
        heading: { regular: 'Newsreader_500Medium' },
      },
      lineHeights: { md: 24 },
      tracking: { md: 0 },
    },
  });

  it('keeps the system font and its weight with no fonts set', () => {
    expect(fontFace(lightTheme, 'semibold')).toEqual({ fontWeight: '600' });
    expect(textStyle(lightTheme, 'md')).not.toHaveProperty('lineHeight');
  });

  it("draws a weight's own family without fontWeight, so Android doesn't fake bold over it", () => {
    expect(fontFace(themed, 'semibold')).toMatchObject({ fontFamily: 'Manrope_600SemiBold' });
    expect(fontFace(themed, 'semibold')).not.toHaveProperty('fontWeight');
  });

  it("falls back to the role's regular family at the weight, then to body", () => {
    expect(fontFace(themed, 'medium')).toMatchObject({ fontFamily: 'Manrope_400Regular', fontWeight: '500' });
    expect(fontFace(themed, 'semibold', 'heading')).toMatchObject({ fontFamily: 'Newsreader_500Medium', fontWeight: '600' });
    expect(fontFace(themed, 'regular', 'mono')).toMatchObject({ fontFamily: 'Manrope_400Regular' });
  });

  it("sets the step's line height and tracking, and tabular figures for numbers", () => {
    expect(textStyle(themed, 'md')).toMatchObject({ fontSize: 16, lineHeight: 24, letterSpacing: 0 });
    expect(textStyle(themed, 'hero', 'semibold', 'numeric')).toMatchObject({ fontSize: 64, fontVariant: ['tabular-nums'] });
  });
});
