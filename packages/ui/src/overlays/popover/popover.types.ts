import type React from 'react';
import type { Animated, GestureResponderEvent, HostInstance, StyleProp, ViewProps, ViewStyle } from 'react-native';

import type { ThemableProps, ValueOf } from '@/core/core.types';
import type { Theme } from '@/core/theme/theme.types';
import type { FieldAnchor } from '@/overlays/sheet/sheet.types';
import type { POPOVER_ALIGN, POPOVER_PRESENTATION, POPOVER_SIDE } from './popover.constants';

export type PopoverSide = ValueOf<typeof POPOVER_SIDE>;
export type PopoverAlign = ValueOf<typeof POPOVER_ALIGN>;
export type PopoverPresentation = ValueOf<typeof POPOVER_PRESENTATION>;

export interface Size {
  width: number;
  height: number;
}

export interface PlacementOptions {
  /** The trigger, in the same space as `area` */
  trigger: { x: number; y: number; width: number; height: number };
  /** The panel's measured size */
  size: Size;
  /** The space the panel must stay inside, usually the window */
  area: Size;
  side: PopoverSide;
  align: PopoverAlign;
  /** Space between the trigger and the panel */
  sideOffset: number;
  /** Right-to-left layout: `start` and `end` swap on the top and bottom sides */
  rtl: boolean;
}

export interface Placement {
  /** The side it ended up on, after flipping when the asked one has no room */
  side: PopoverSide;
  x: number;
  y: number;
  /** Where the arrow's tip sits along the panel's edge, from its left (top and bottom) or top (left and right) */
  arrow: number;
}

export interface PopoverDesign {
  width: number;
  padding: number;
  radius: keyof Theme['radius'];
  border: boolean;
  /** Draw an arrow pointing at the trigger by default */
  arrow: boolean;
  sideOffset: number;
}

export interface PopoverContextValue {
  open: boolean;
  /** For user actions only: calls `onOpenChange` */
  setOpen: (open: boolean) => void;
  anchor: FieldAnchor;
}

/** The shorthand: give `trigger` and the popover draws its own trigger and content, with `children` as the content. */
export interface PopoverShorthandProps
  extends Pick<PopoverContentProps, 'side' | 'align' | 'sideOffset' | 'arrow' | 'presentation' | 'aria-label' | 'theme' | 'design'> {
  /** One pressable element, such as a Button, that opens and closes it */
  trigger?: React.ReactElement;
}

export interface PopoverProps extends PopoverShorthandProps {
  /** The parts (PopoverTrigger, PopoverContent), or the content when you give `trigger` */
  children: React.ReactNode;
  /** Controlled open state */
  open?: boolean;
  /** Open on first render, uncontrolled. Default: false */
  defaultOpen?: boolean;
  /** The user opened or closed it: the trigger, a tap outside, Escape, Back or a `PopoverClose`. Not called when `open` changes */
  onOpenChange?: (open: boolean) => void;
}

/** A pressable element, such as a Button: it gets `onPress` and `aria-expanded`. */
export interface PopoverTriggerProps {
  children: React.ReactElement;
  /** The box around the trigger, which is what the popover lines up with */
  style?: StyleProp<ViewStyle>;
}

/** What a trigger adds to the pressable it wraps. */
export interface TriggerChildProps {
  onPress?: (e: GestureResponderEvent) => void;
  'aria-expanded'?: boolean;
  'aria-haspopup'?: string;
}

/** A pressable element that closes the popover when pressed. */
export interface PopoverCloseProps {
  children: React.ReactElement;
}

export interface PopoverPlacementProps {
  /** The side of the trigger it opens on; it flips when there's no room there. Default: 'bottom' (Tooltip: 'top') */
  side?: PopoverSide;
  /** Which edge of the trigger it lines up with. `start` and `end` follow the layout direction. Default: 'center' */
  align?: PopoverAlign;
  /** Space from the trigger. Default: the design's */
  sideOffset?: number;
}

export interface PopoverContentProps extends PopoverPlacementProps, ThemableProps {
  children: React.ReactNode;
  /** An arrow pointing at the trigger. Default: true in the iOS design, false otherwise */
  arrow?: boolean;
  /** By the trigger, or a bottom sheet (as `DropdownMenu` does). Default: 'popover' */
  presentation?: PopoverPresentation;
  /** As a sheet shown as a dialog (wide web): its close button, for content that draws its own. Default: true */
  showCloseButton?: boolean;
  /** What screen readers call the dialog */
  'aria-label'?: string;
  /** The panel: its width, padding, colors */
  style?: StyleProp<ViewStyle>;
  testID?: string;
}

export interface FloatingModalProps {
  /** False while it fades out: a tap outside then does nothing */
  visible: boolean;
  onClose: () => void;
  /** Given the modal's own rect in the window, once measured */
  children: (area: FieldAnchor['rect']) => React.ReactNode;
}

export interface FloatingPanelProps extends PopoverPlacementProps, Omit<ViewProps, 'style'> {
  /** The panel's own view, such as to lift it into the web's top layer */
  ref?: React.Ref<HostInstance>;
  /** The trigger, in `area`'s space */
  trigger: PlacementOptions['trigger'];
  area: Size;
  sideOffset: number;
  /** 0 hidden, 1 shown */
  progress: Animated.Value;
  /** The arrow's color, or none */
  arrowColor?: string;
  /** Stay hidden until the area is known. Default: true */
  ready?: boolean;
  style?: StyleProp<ViewStyle>;
}
