import { Text as RNText, type TextProps } from 'react-native';

import { MAX_FONT_SCALE } from '@/core/a11y/a11y.constants';

/**
 * A run of text that takes its look from the text around it: a bold word, a link or a code span inside a `Text`, or text
 * whose whole style is set by hand (a rich text editor's blocks). Unlike `Text` it adds no size or colour of its own; font
 * scaling is capped at `MAX_FONT_SCALE`, as `Text` caps it.
 */
export const Span = ({ maxFontSizeMultiplier = MAX_FONT_SCALE, ...rest }: TextProps) => (
  <RNText maxFontSizeMultiplier={maxFontSizeMultiplier} {...rest} />
);
