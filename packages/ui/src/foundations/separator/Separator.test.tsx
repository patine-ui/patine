import { StyleSheet } from 'react-native';

import { render, screen } from '@testing-library/react-native';

import { lightTheme } from '@/core/theme/theme.constants';
import { Separator } from './Separator';

describe('Separator', () => {
  it('is a hidden hairline by default', async () => {
    await render(<Separator testID="sep" />);
    const sep = screen.getByTestId('sep', { includeHiddenElements: true });
    expect(sep.props['aria-hidden']).toBe(true);
    expect(StyleSheet.flatten(sep.props.style)).toMatchObject({
      height: StyleSheet.hairlineWidth,
      backgroundColor: lightTheme.colors.border,
    });
  });

  it('is announced as a separator when not decorative, and can stand vertically', async () => {
    await render(<Separator decorative={false} orientation="vertical" testID="sep" />);
    const sep = screen.getByTestId('sep', { includeHiddenElements: true });
    expect(sep.props.role).toBe('separator');
    expect(StyleSheet.flatten(sep.props.style)).toMatchObject({ width: StyleSheet.hairlineWidth });
  });
});
