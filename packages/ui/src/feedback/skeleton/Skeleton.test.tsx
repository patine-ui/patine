import { StyleSheet } from 'react-native';

import { render, screen } from '@testing-library/react-native';

import { lightTheme } from '@/core/theme/theme.constants';
import { Skeleton } from './Skeleton';

describe('Skeleton', () => {
  it('is a hidden placeholder of the given size and radius', async () => {
    await render(<Skeleton width={40} height={40} radius="full" testID="s" />);
    const s = screen.getByTestId('s', { includeHiddenElements: true });
    expect(s.props['aria-hidden']).toBe(true);
    expect(StyleSheet.flatten(s.props.style)).toMatchObject({
      width: 40,
      height: 40,
      borderRadius: lightTheme.radius.full,
      backgroundColor: lightTheme.colors.surface,
    });
  });
});
