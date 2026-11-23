import { createContext, useContext, useMemo } from 'react';
import { Text as RNText } from 'react-native';

import { MAX_FONT_SCALE } from '@/core/a11y/a11y.constants';
import { colorStyles, startAlign } from '@/core/core.styles';
import { useComponentTheme, useDirection } from '@/core/theme/ThemeProvider';
import { textStyle } from '@/core/theme/theme.utils';
import type { TextProps } from './primitives.types';

type TextLook = Required<Pick<TextProps, 'size' | 'weight' | 'font' | 'color'>>;

const ROOT_LOOK: TextLook = {
  size: 'md',
  weight: 'regular',
  font: 'body',
  color: 'text',
};

/** The look of the enclosing `Text`, so a nested one inherits what it doesn't set, as in CSS. */
const TextLookContext = createContext<TextLook>(ROOT_LOOK);

/**
 * Text in the theme's type scale and colors. Scales with the user's font size setting, like React Native's Text, up to
 * `MAX_FONT_SCALE` so fixed-height controls don't clip it. On the web it starts at the layout's start edge: the browser would
 * otherwise align each string by its own script, so a Latin name in a right-to-left list would sit on the left. A `Text`
 * inside another takes the outer one's `size`, `weight`, `font` and `color` unless it sets its own.
 */
export const Text = ({
  size,
  weight,
  font,
  color,
  theme: themeProp,
  design,
  style,
  maxFontSizeMultiplier = MAX_FONT_SCALE,
  ...rest
}: TextProps) => {
  const { theme } = useComponentTheme(themeProp, design);
  const dir = useDirection();
  const parent = useContext(TextLookContext);
  const s = size ?? parent.size;
  const w = weight ?? parent.weight;
  const f = font ?? parent.font;
  const c = color ?? parent.color;
  const look = useMemo(
    () => ({
      size: s,
      weight: w,
      font: f,
      color: c,
    }),
    [s, w, f, c]
  );
  return (
    <TextLookContext.Provider value={look}>
      <RNText
        maxFontSizeMultiplier={maxFontSizeMultiplier}
        style={[startAlign[dir], textStyle(theme, s, w, f), colorStyles(theme)[c], style]}
        {...rest}
      />
    </TextLookContext.Provider>
  );
};
