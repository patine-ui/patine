import { StyleSheet } from 'react-native';

import { lightTheme } from '@/core/theme/theme.constants';
import { getAspectBox, getBoxStyle, getCellWidth, getColumnCount, getGridCellStyle, getSpacerStyle, toSpace } from './layout.utils';

const { spacing } = lightTheme;

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

describe('getAspectBox', () => {
  it('keeps the width and the ratio', () => {
    expect(getAspectBox('100%', 16 / 9)).toEqual({ width: '100%', aspectRatio: 16 / 9 });
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

describe('toSpace', () => {
  it('reads a spacing step, keeps a number, and passes nothing through', () => {
    expect(toSpace(spacing, 'md')).toBe(spacing.md);
    expect(toSpace(spacing, 7)).toBe(7);
    expect(toSpace(spacing, undefined)).toBeUndefined();
  });
});

describe('Box direction and wrap', () => {
  it('lays out a row that wraps, and lets direction win over row', () => {
    expect(getBoxStyle(lightTheme, { direction: 'row', wrap: true })).toEqual({ flexDirection: 'row', flexWrap: 'wrap' });
    expect(getBoxStyle(lightTheme, { row: true, direction: 'column' })).toEqual({ flexDirection: 'column' });
  });
});

describe('getGridCellStyle and getSpacerStyle', () => {
  it('shares the row equally and fixes a spacer only when sized', () => {
    expect(getGridCellStyle(4, 8)).toEqual({ width: '25%', paddingHorizontal: 4 });
    expect(getSpacerStyle(undefined)).toBeUndefined();
    expect(getSpacerStyle(12)).toEqual({ width: 12, height: 12, flexShrink: 0 });
  });
});
