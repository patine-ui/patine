import { lightTheme } from '@/core/theme/theme.constants';
import { getStackStyle, toSpace } from './stack.utils';

const { spacing } = lightTheme;

describe('toSpace', () => {
  it('reads a spacing step, keeps a number, and passes nothing through', () => {
    expect(toSpace(spacing, 'md')).toBe(spacing.md);
    expect(toSpace(spacing, 7)).toBe(7);
    expect(toSpace(spacing, undefined)).toBeUndefined();
  });
});

describe('getStackStyle', () => {
  it('maps the layout props to flex styles', () => {
    expect(
      getStackStyle(spacing, { direction: 'row', gap: 'sm', padding: 4, align: 'center', justify: 'space-between', wrap: true })
    ).toEqual({
      flexDirection: 'row',
      gap: spacing.sm,
      padding: 4,
      alignItems: 'center',
      justifyContent: 'space-between',
      flexWrap: 'wrap',
    });
  });

  it('defaults to a column that does not wrap', () => {
    expect(getStackStyle(spacing, {})).toMatchObject({ flexDirection: 'column', flexWrap: undefined });
  });
});
