import type React from 'react';
import type { HostInstance, PressableProps, StyleProp, TextStyle, ViewProps, ViewStyle } from 'react-native';

import type { DisclosureIconOptions, DisclosureLook, ThemableProps } from '@/core/core.types';
import type { Theme } from '@/core/theme/theme.types';

export interface CollapsibleProps extends ViewProps, ThemableProps {
  /** Open, when you control it. Pair with `onOpenChange` */
  open?: boolean;
  /** Open at first, when it keeps its own state. Default: false */
  defaultOpen?: boolean;
  /** Called when the user opens or closes it. Not when `open` changes */
  onOpenChange?: (open: boolean) => void;
  /** The trigger ignores presses. Default: false */
  disabled?: boolean;
  /**
   * Shorthand: the trigger, so you don't compose CollapsibleTrigger and CollapsibleContent. A string is drawn as a label with
   * a chevron; an element, such as a Button, becomes the trigger itself. `children` are then the content
   */
  trigger?: React.ReactNode;
  /** The parts (CollapsibleTrigger, CollapsibleContent), or the content when you give `trigger` */
  children: React.ReactNode;
}

export interface CollapsibleTriggerProps extends Omit<PressableProps, 'children' | 'style' | 'role'>, DisclosureIconOptions {
  /** The label. A string is drawn in the theme's text style, with the icon beside it */
  children: React.ReactNode;
  /**
   * Render the one child as the trigger instead of a row of label and icon, like Radix's `asChild`: it gets `onPress`,
   * `aria-expanded` and `aria-controls`. For a Button, a card or any pressable of your own. Default: false
   */
  asChild?: boolean;
  /** The outer view, for layout */
  style?: StyleProp<ViewStyle>;
  labelStyle?: StyleProp<TextStyle>;
}

export interface CollapsibleContentProps extends ViewProps {
  children: React.ReactNode;
}

export interface CollapsibleDesign extends DisclosureLook {
  minHeight: number;
}

export interface CollapsibleContextValue {
  open: boolean;
  toggle: () => void;
  disabled: boolean;
  theme: Theme;
  triggerId: string;
  contentId: string;
  triggerRef: React.RefObject<HostInstance | null>;
}

/** What an `asChild` trigger's element receives. */
export interface SlotProps {
  onPress?: (...args: never[]) => void;
  'aria-expanded'?: boolean;
  'aria-controls'?: string;
  disabled?: boolean;
  id?: string;
}
