import type { StyleProp, ViewStyle } from 'react-native';

import type { ThemeColor } from 'patine-ui';

import type { ICON_SIZE } from './icons.constants';
import type { IconName } from './icons.registry';

export type { IconName };

/** The palette Patine Pro paints an icon with in its `color` variant. Kept on the data so Pro's `Glyph` draws free icons too. */
export type IconTone = 'indigo' | 'blue' | 'sky' | 'teal' | 'emerald' | 'green' | 'amber' | 'orange' | 'red' | 'pink' | 'violet' | 'slate';

/** One stroke of an icon: its SVG path and its roles (`ROLE` flags: body, inner, accent, cut). */
export type IconPath = readonly [d: string, role?: number];

/** An icon as plain data, drawn on a 24-point grid. The same shape as Patine Pro's. */
export interface IconGlyph {
  name: string;
  tone: IconTone;
  /** Points one way (arrows, send, undo), so it flips in right-to-left layouts */
  rtl?: boolean;
  paths: readonly IconPath[];
}

export interface GlyphProps {
  /** The icon's data, e.g. `iconBell` from `@patine-ui/icons` */
  icon: IconGlyph;
  /** Points, or 'sm' (16), 'md' (20), 'lg' (24). Default: 'md' */
  size?: keyof typeof ICON_SIZE | number;
  /** A theme color or any CSS color. Default: the color of the Button, Fab or toggle it sits in, else 'textSecondary' */
  color?: ThemeColor | (string & {});
  /** On the 24-point grid. Default: 1.5 */
  strokeWidth?: number;
  /** Names the icon for screen readers. Without it the icon is decorative and hidden from them. */
  'aria-label'?: string;
  /** Flips the icon. Default: directional icons flip in right-to-left layouts */
  mirror?: boolean;
  style?: StyleProp<ViewStyle>;
}

export interface IconProps extends Omit<GlyphProps, 'icon'> {
  name: IconName;
}
