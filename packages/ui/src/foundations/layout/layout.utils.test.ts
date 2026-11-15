import { StyleSheet } from 'react-native';

import { lightTheme } from '@/core/theme/theme.constants';
import { getBoxStyle, getCellWidth, getColumnCount } from './layout.utils';

describe('getBoxStyle', () => {
  it('reads every shorthand from the theme', () => {
    expect(
      getBoxStyle(lightTheme, {
        padding: 'md',
        paddingX: 4,
        gap: 'sm',
        background: 'surface',
        radius: 'lg',
        border: true,
        shadow: 'sm',
        row: true,
      })
    ).toEqual({
      padding: lightTheme.spacing.md,
      paddingHorizontal: 4,
      gap: lightTheme.spacing.sm,
      backgroundColor: lightTheme.colors.surface,
      borderRadius: lightTheme.radius.lg,
      borderWidth: StyleSheet.hairlineWidth,
      borderColor: lightTheme.colors.border,
      boxShadow: lightTheme.shadows.sm,
      flexDirection: 'row',
    });
  });

  it('leaves out what was not asked for', () => {
    expect(getBoxStyle(lightTheme, {})).toEqual({});
  });
});

describe('getColumnCount', () => {
  it('fits as many columns as are at least the minimum wide', () => {
    expect(getColumnCount(360, 160, 12)).toBe(2);
    expect(getColumnCount(1024, 160, 12)).toBe(6);
    expect(getColumnCount(332, 160, 12)).toBe(2);
  });

  it('never goes below one column', () => {
    expect(getColumnCount(100, 160, 12)).toBe(1);
    expect(getColumnCount(0, 160, 12)).toBe(1);
  });
});

describe('getCellWidth', () => {
  it('splits the width less the gaps', () => {
    expect(getCellWidth(332, 2, 12)).toBe(160);
    expect(getCellWidth(300, 1, 12)).toBe(300);
  });
});
