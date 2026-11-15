import { StyleSheet, View } from 'react-native';

import { useTheme } from '@/core/theme/ThemeProvider';
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
      style={[
        horizontal ? { height: StyleSheet.hairlineWidth, alignSelf: 'stretch' } : { width: StyleSheet.hairlineWidth, alignSelf: 'stretch' },
        { backgroundColor: theme.colors.border },
        style,
      ]}
      {...rest}
    />
  );
};
