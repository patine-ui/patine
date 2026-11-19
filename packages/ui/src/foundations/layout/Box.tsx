import { View } from '@/core/primitives/View';
import { useTheme } from '@/core/theme/ThemeProvider';
import type { BoxProps } from './layout.types';
import { getBoxStyle } from './layout.utils';

/** A View with the theme's spacing, colors, corners and shadows as props: `<Box padding="lg" background="surface" radius="md">`. */
export const Box = (props: BoxProps) => {
  const {
    padding: _padding,
    paddingX: _paddingX,
    paddingY: _paddingY,
    margin: _margin,
    marginX: _marginX,
    marginY: _marginY,
    gap: _gap,
    background: _background,
    radius: _radius,
    border: _border,
    shadow: _shadow,
    flex: _flex,
    row: _row,
    direction: _direction,
    wrap: _wrap,
    align: _align,
    justify: _justify,
    theme: themeProp,
    style,
    ...rest
  } = props;
  const theme = useTheme(themeProp);
  return <View style={[getBoxStyle(theme, props), style]} {...rest} />;
};
