import { lightTheme } from '@/core/theme/theme.constants';
import { BUTTON_DESIGN } from './button.constants';
import { getButtonBox, getButtonColors, isRaisedVariant } from './button.utils';

const { colors } = lightTheme;

describe('getButtonColors', () => {
  it.each([
    ['default', colors.primary, colors.onPrimary, 'transparent'],
    ['secondary', colors.surface, colors.text, 'transparent'],
    ['outline', 'transparent', colors.text, colors.border],
    ['ghost', 'transparent', colors.text, 'transparent'],
    ['destructive', colors.danger, colors.onDanger, 'transparent'],
    ['link', 'transparent', colors.primary, 'transparent'],
  ] as const)('%s', (variant, background, text, border) => {
    expect(getButtonColors(colors, variant)).toEqual({ background, text, border });
  });
});

describe('getButtonBox', () => {
  it('takes the height and padding of the size', () => {
    expect(getButtonBox(BUTTON_DESIGN.brand, 'lg')).toEqual({ height: 52, width: undefined, paddingHorizontal: 24 });
  });

  it('makes an icon button a square of the default height', () => {
    expect(getButtonBox(BUTTON_DESIGN.brand, 'icon')).toEqual({ height: 44, width: 44, paddingHorizontal: 0 });
  });

  it('makes icon-sm and icon-lg squares as tall as sm and lg', () => {
    expect(getButtonBox(BUTTON_DESIGN.brand, 'icon-sm')).toMatchObject({ height: 36, width: 36 });
    expect(getButtonBox(BUTTON_DESIGN.brand, 'icon-lg')).toMatchObject({ height: 52, width: 52 });
  });
});

describe('isRaisedVariant', () => {
  it('lifts filled and outlined buttons, and keeps ghost and link flat', () => {
    expect(['default', 'secondary', 'outline', 'destructive'].every((v) => isRaisedVariant(v as never))).toBe(true);
    expect(isRaisedVariant('ghost')).toBe(false);
    expect(isRaisedVariant('link')).toBe(false);
  });
});
