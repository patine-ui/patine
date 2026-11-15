import { lightTheme } from '@/core/theme/theme.constants';
import { formatChange, getTrend, getTrendColor } from './stat.utils';

describe('getTrend', () => {
  it('reads the sign of a number or text', () => {
    expect(getTrend('+12.5%')).toBe('up');
    expect(getTrend('8%')).toBe('up');
    expect(getTrend('-3%')).toBe('down');
    expect(getTrend('−3%')).toBe('down');
    expect(getTrend('0%')).toBe('neutral');
    expect(getTrend(-2)).toBe('down');
    expect(getTrend(0)).toBe('neutral');
    expect(getTrend(undefined)).toBe('neutral');
  });
});

describe('getTrendColor', () => {
  const c = lightTheme.colors;
  it('is green when good and red when bad, swapped when inverted', () => {
    expect(getTrendColor(c, 'up', false)).toBe(c.success);
    expect(getTrendColor(c, 'down', false)).toBe(c.danger);
    expect(getTrendColor(c, 'down', true)).toBe(c.success);
    expect(getTrendColor(c, 'neutral', true)).toBe(c.textSecondary);
  });
});

describe('formatChange', () => {
  it('signs positive numbers', () => {
    expect(formatChange(4)).toBe('+4');
    expect(formatChange(-4)).toBe('-4');
    expect(formatChange('12%')).toBe('12%');
  });
});
