import { View } from '@/core/primitives/View';
import { useTheme } from '@/core/theme/ThemeProvider';
import { styles, themed } from './separator.styles';
import type { SeparatorProps } from './separator.types';

/** A hairline between content, across or down. Hidden from screen readers unless `decorative={false}`. */
export const Separator = ({ orientation = 'horizontal', decorative = true, theme: themeProp, style, ...rest }: SeparatorProps) => {
  const theme = useTheme(themeProp);
  const horizontal = orientation === 'horizontal';
  return (
    <View
      role={decorative ? 'none' : 'separator'}
      aria-hidden={decorative}
      aria-orientation={decorative ? undefined : orientation}
      style={[horizontal ? styles.horizontal : styles.vertical, themed(theme).line, style]}
      {...rest}
    />
  );
};
