import { View } from 'react-native';

import { useTheme } from '@/core/theme/ThemeProvider';
import { toSpace } from '@/foundations/stack/stack.utils';
import type { SpacerProps } from './layout.types';

/** Empty space: grows to push its neighbours apart in a row or column, or a fixed `size`. Hidden from screen readers. */
export const Spacer = ({ size, theme: themeProp, style, ...rest }: SpacerProps) => {
  const theme = useTheme(themeProp);
  const fixed = toSpace(theme.spacing, size);
  return (
    <View
      aria-hidden
      role="none"
      style={[fixed === undefined ? { flexGrow: 1, flexShrink: 1 } : { width: fixed, height: fixed, flexShrink: 0 }, style]}
      {...rest}
    />
  );
};
