import { lightTheme } from '@/core/theme/theme.constants';
import { BUTTON_DESIGN } from './button.constants';
import { getButtonBox, getButtonColors, getHitSlop } from './button.utils';

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
});

describe('getHitSlop', () => {
  it('grows a small button to 44pt on touch platforms', () => {
    expect(getHitSlop(32, 32, false)).toEqual({ top: 6, bottom: 6, left: 6, right: 6 });
    expect(getHitSlop(undefined, 36, false)).toEqual({ top: 4, bottom: 4, left: 0, right: 0 });
  });

  it('adds nothing when the button is big enough, or on the web', () => {
    expect(getHitSlop(undefined, 44, false)).toBeUndefined();
    expect(getHitSlop(32, 32, true)).toBeUndefined();
  });
});
