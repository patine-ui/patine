import { lightTheme } from '@/core/theme/theme.constants';
import { getAlertAccent } from './alert.utils';

const { colors } = lightTheme;

describe('getAlertAccent', () => {
  it.each([
    ['default', colors.text],
    ['destructive', colors.danger],
    ['success', colors.success],
    ['warning', colors.warning],
  ] as const)('%s', (variant, accent) => {
    expect(getAlertAccent(colors, variant)).toBe(accent);
  });
});
