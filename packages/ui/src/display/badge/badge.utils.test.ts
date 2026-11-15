import { lightTheme } from '@/core/theme/theme.constants';
import { getBadgeColors } from './badge.utils';

const { colors } = lightTheme;

describe('getBadgeColors', () => {
  it('fills the default and destructive variants', () => {
    expect(getBadgeColors(colors, 'default')).toMatchObject({ background: colors.primary, text: colors.onPrimary });
    expect(getBadgeColors(colors, 'destructive')).toMatchObject({ background: colors.danger, text: colors.onDanger });
  });

  it('outlines the outline variant', () => {
    expect(getBadgeColors(colors, 'outline')).toEqual({ background: 'transparent', text: colors.text, border: colors.border });
  });

  it('tints status variants with their own color', () => {
    expect(getBadgeColors(colors, 'success')).toEqual({ background: `${colors.success}1F`, text: colors.success, border: 'transparent' });
  });
});
