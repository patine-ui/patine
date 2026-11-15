import { View } from 'react-native';

import { useTheme } from '@/core/theme/ThemeProvider';
import type { BoxProps } from './layout.types';
import { getBoxStyle } from './layout.utils';

/** A View with the theme's spacing, colors, corners and shadows as props: `<Box padding="lg" background="surface" radius="md">`. */
export const Box = ({
  padding,
  paddingX,
  paddingY,
  margin,
  marginX,
  marginY,
  gap,
  background,
  radius,
  border,
  shadow,
  flex,
  row,
  align,
  justify,
  theme: themeProp,
  style,
  ...rest
}: BoxProps) => {
  const theme = useTheme(themeProp);
  return (
    <View
      style={[
        getBoxStyle(theme, {
          padding,
          paddingX,
          paddingY,
          margin,
          marginX,
          marginY,
          gap,
          background,
          radius,
          border,
          shadow,
          flex,
          row,
          align,
          justify,
        }),
        style,
      ]}
      {...rest}
    />
  );
};
