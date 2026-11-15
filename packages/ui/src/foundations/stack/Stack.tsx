import { View } from 'react-native';

import { useTheme } from '@/core/theme/ThemeProvider';
import type { StackProps } from './stack.types';
import { getStackStyle } from './stack.utils';

/** Lays out its children in a column (or a row) with the theme's spacing between them. */
export const Stack = ({ direction = 'column', gap, padding, align, justify, wrap, theme: themeProp, style, ...rest }: StackProps) => {
  const theme = useTheme(themeProp);
  return (
    <View
      style={[
        getStackStyle(theme.spacing, {
          direction,
          gap,
          padding,
          align,
          justify,
          wrap,
        }),
        style,
      ]}
      {...rest}
    />
  );
};

/** A Stack in a row, its children centered on the cross axis. */
export const HStack = ({ align = 'center', ...rest }: Omit<StackProps, 'direction'>) => <Stack direction="row" align={align} {...rest} />;

/** A Stack in a column. */
export const VStack = (props: Omit<StackProps, 'direction'>) => <Stack direction="column" {...props} />;
