import type React from 'react';
import type { GestureResponderEvent, HostInstance, PressableProps, StyleProp, ViewStyle } from 'react-native';

import type { SlotStyles, ThemableProps, ValueOf } from '@/core/core.types';
import type { TextProps } from '@/foundations/text/text.types';
import type { ButtonSize, ButtonVariant } from './button.types';
import type { FAB_SIZE, LINK_UNDERLINE } from './link.constants';

export type LinkUnderline = ValueOf<typeof LINK_UNDERLINE>;

export interface LinkProps extends Omit<TextProps, 'onPress' | 'role'> {
  children?: React.ReactNode;
  /** A URL. Opens in the browser (a real `<a>` on the web), or calls `onPress` instead when you route it yourself */
  href?: string;
  /** Called on press. Call `event.preventDefault()` to keep `href` from opening */
  onPress?: (event: GestureResponderEvent) => void;
  /** Leaves the app: opens a new tab on the web, and adds ↗ so people know. Default: false */
  external?: boolean;
  /** 'always', 'hover' (on pointer devices) or 'none'. Default: the design's */
  underline?: LinkUnderline;
  /** Dims it and ignores input. Default: false */
  disabled?: boolean;
}

export interface LinkDesign {
  underline: LinkUnderline;
  weight: 'regular' | 'medium';
}

export type FabSize = keyof typeof FAB_SIZE;

export interface FabProps extends Omit<PressableProps, 'children' | 'style'>, ThemableProps {
  /** The button's view: to focus it, or for a Tooltip to measure where it floats */
  ref?: React.Ref<HostInstance>;
  /** The icon, or a function of the color to draw it in */
  icon?: React.ReactNode | ((info: { color: string }) => React.ReactNode);
  /** Text beside the icon, for an extended FAB. Without it, give an `accessibilityLabel` */
  label?: string;
  /** Default: 'md' */
  size?: FabSize;
  /** Floats it over the screen's corner, above the content. Default: inline, where you put it */
  placement?: 'bottomEnd' | 'bottomStart' | 'bottomCenter';
  /** Space from the screen's edges when placed, e.g. the safe area's bottom inset plus 16. Default: 16 */
  offset?: number;
  /** The outer view, for layout */
  style?: StyleProp<ViewStyle>;
  /** Styles for its parts: `label` */
  styles?: SlotStyles<'label'>;
}

export interface FabDesign {
  /** A step of the theme's corner radius, or a circle */
  shape: 'rounded' | 'circle';
  /** The fill and its content, as theme colors */
  fill: 'primary' | 'primaryMuted';
  onFill: 'onPrimary' | 'primary';
  shadow: 'md' | 'lg';
}

export interface CopyButtonProps extends Omit<PressableProps, 'children' | 'style' | 'onPress'>, ThemableProps {
  /** The text to copy */
  value: string;
  /**
   * Copies `value`. Default: the browser clipboard on the web. On iOS and Android pass one from your clipboard library,
   * e.g. `Clipboard.setStringAsync` from expo-clipboard
   */
  onCopy?: (value: string) => unknown;
  /** Shows a word beside the icon. Default: icon only */
  label?: string;
  /** What it says after copying. Default: 'Copied' */
  copiedLabel?: string;
  /** How long the check shows, in ms. Default: 2000 */
  timeout?: number;
  /** As Button. Default: 'ghost' */
  variant?: ButtonVariant;
  /** As Button. Default: 'icon' without a `label`, else 'sm' */
  size?: ButtonSize;
  /** The outer view, for layout */
  style?: StyleProp<ViewStyle>;
}
