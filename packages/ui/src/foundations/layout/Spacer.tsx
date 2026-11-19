import { View } from '@/core/primitives/View';
import { useTheme } from '@/core/theme/ThemeProvider';
import { styles } from './layout.styles';
import type { SpacerProps } from './layout.types';
import { getSpacerStyle, toSpace } from './layout.utils';

/** Empty space: grows to push its neighbours apart in a row or column, or a fixed `size`. Hidden from screen readers. */
export const Spacer = ({ size, theme: themeProp, style, ...rest }: SpacerProps) => {
  const theme = useTheme(themeProp);
  const fixed = toSpace(theme.spacing, size);
  return <View aria-hidden role="none" style={[fixed === undefined && styles.grow, getSpacerStyle(fixed), style]} {...rest} />;
};
