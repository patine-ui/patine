import type { TextProps } from '@/core/primitives/primitives.types';
import type { TextSize } from '@/core/theme/theme.types';
import type { HEADING_SIZE } from './text.constants';

export type { TextProps, ThemeColor } from '@/core/primitives/primitives.types';

export type HeadingLevel = keyof typeof HEADING_SIZE;

export interface HeadingProps extends Omit<TextProps, 'size'> {
  /** 1 to 4. Sets the size and, for screen readers and the web's `<h1>`–`<h4>`, the heading level. Default: 2 */
  level?: HeadingLevel;
  /** Overrides the size the level gives */
  size?: TextSize;
}
