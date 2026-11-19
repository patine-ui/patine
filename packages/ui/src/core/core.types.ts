import type React from 'react';
import type { RefObject } from 'react';
import type {
  Animated,
  GestureResponderEvent,
  GestureResponderHandlers,
  HostInstance,
  PanResponderGestureState,
  PressableProps,
  PressableStateCallbackType,
  StyleProp,
  TextInputProps,
  TextStyle,
  ViewStyle,
} from 'react-native';

import type { DIRECTION, KEY } from '@/core/a11y/a11y.constants';
import type { CONTROL_POSITION, ICON_POSITION, PICKER_DISPLAY, PRESS_FEEDBACK } from './core.constants';
import type { DesignPreference, TextWeight, Theme } from './theme/theme.types';

// React Native 0.88's types can't be named from outside the package, so a hook returning them couldn't emit its
// declaration. These are the same types under names of our own.
export interface PanHandlers extends GestureResponderHandlers {}
export interface HostRef extends HostInstance {}

export type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends (...args: never[]) => unknown ? T[K] : T[K] extends object ? DeepPartial<T[K]> : T[K];
};

/** The union of an object's values, e.g. the strings of an `as const` lookup. */
export type ValueOf<T> = T[keyof T];

/** Blocks inference from `onValueChange`, so `onValueChange={setState}` doesn't infer `T` as `SetStateAction<…>`. Works before TS 5.4's built-in NoInfer. */
export type NoInferValue<T> = [T][T extends unknown ? 0 : never];

export type PickerDisplay = ValueOf<typeof PICKER_DISPLAY>;

/** `Omit` that keeps a union a union, so discriminated props (like a sheet's `mode`) still narrow. */
export type DistributiveOmit<T, K extends PropertyKey> = T extends unknown ? Omit<T, K> : never;

/** A BCP 47 language tag passed to `Intl`, e.g. `'en-US'` or `'he'`. Default: the device locale. */
export type Locale = string;

/** Per-slot style overrides. Every component exposes its own slot names. */
export type SlotStyles<K extends string> = Partial<Record<K, StyleProp<TextStyle>>>;

export type IconPosition = ValueOf<typeof ICON_POSITION>;
export type ControlPosition = ValueOf<typeof CONTROL_POSITION>;

/** A disclosure icon's turn, in degrees, closed and open. The default chevron points down at 0. */
export interface DisclosureRotation {
  closed: number;
  open: number;
}

/** The icon of anything that opens and closes: Collapsible, Accordion, a tree's rows. Every part is replaceable. */
export interface DisclosureIconOptions {
  /** Replaces the chevron with any node: an icon, a "+", text. It turns with `rotation`. `null` draws none */
  icon?: React.ReactNode;
  /** Draws the icon from the open state, such as "+" closed and "−" open. Wins over `icon` and isn't turned */
  renderIcon?: (state: { open: boolean }) => React.ReactNode;
  /** Before the label, after it, or none. Default: the design's */
  iconPosition?: IconPosition;
  /** The icon's turn closed and open, in degrees; `false` keeps it still. Default: the design's */
  rotation?: DisclosureRotation | false;
}

export interface DisclosureIconProps extends Omit<DisclosureIconOptions, 'iconPosition'> {
  open: boolean;
  theme: Theme;
  /** The design's turn, used when `rotation` is left out */
  defaultRotation: DisclosureRotation;
}

/** How a design draws a disclosure trigger's icon and label. */
export interface DisclosureLook {
  iconPosition: Exclude<IconPosition, 'none'>;
  rotation: DisclosureRotation;
  labelWeight: TextWeight;
}

export interface DisclosureLabelProps {
  open: boolean;
  theme: Theme;
  look: DisclosureLook;
  options: DisclosureIconOptions;
  /** A string is drawn in the theme's text style; anything else as it is */
  children: React.ReactNode;
  labelStyle?: StyleProp<TextStyle>;
}

/** The open state of an overlay you control: `open` + `onOpenChange`, as Radix names them. */
export interface OpenStateProps {
  /** Shows it. It animates in and out; keep it mounted and flip this. Pair with `onOpenChange`. Default: false */
  open?: boolean;
  /**
   * Called with `false` when the user closes it: a swipe down, a backdrop tap, Cancel, the back button or Escape. Set `open`
   * to false here. Never called when `open` changes from your code
   */
  onOpenChange?: (open: boolean) => void;
}

/**
 * The open state of an overlay that opens itself from its trigger, such as a Select or a DropdownMenu: it keeps its own,
 * or you control it with `open` + `onOpenChange`.
 */
export interface TriggeredOpenProps {
  /** Open, when you control it. Pair with `onOpenChange` */
  open?: boolean;
  /** Open at first, when it keeps its own state. Default: false */
  defaultOpen?: boolean;
  /** Called when the user opens or closes it. Never called when `open` changes from your code */
  onOpenChange?: (open: boolean) => void;
}

export interface ThemableProps {
  /** Component-level theme override, merged on top of the provider theme */
  theme?: DeepPartial<Theme>;
  /**
   * Draw this design instead of the provider's: 'brand' (Patine's look), 'ios', 'material', 'web', or 'native' for the
   * platform's own ('ios' on iOS, 'material' on Android, 'web' in the browser). Default: the provider's, which defaults to 'brand'
   */
  design?: DesignPreference;
}

export interface SearchInputProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder: string;
  autoFocus?: boolean;
  theme: Theme;
  /** The text field itself: its fill, border, corners and text */
  style?: StyleProp<TextStyle>;
  /** The box around the field and its magnifier, for layout (e.g. `flex: 1` in a row) */
  containerStyle?: StyleProp<ViewStyle>;
  /** More `TextInput` props, such as `onSubmitEditing` or `editable`. `onFocus` and `onBlur` run after the field's own */
  inputProps?: Omit<TextInputProps, 'value' | 'onChangeText' | 'placeholder' | 'style'>;
  /** Drawn over the field, after it: a clear button, a spinner */
  children?: React.ReactNode;
}

/** Where a ripple starts inside its element, and how big it grows to cover the farthest corner. */
export interface RippleOrigin {
  x: number;
  y: number;
  radius: number;
}

export type PressFeedback = ValueOf<typeof PRESS_FEEDBACK>;

/** How a design draws its search field. */
export interface SearchDesign {
  height: number;
  radius: keyof Theme['radius'];
  /** A border around the field, on the picker's background, instead of a gray fill */
  outlined: boolean;
  /** A primary-colored ring while focused. Designs without it rely on the caret, except on the web, where keyboard users need the ring */
  focusRing: boolean;
  /** Space before the magnifier */
  iconInset: keyof Theme['spacing'];
}

export interface TouchFeedbackProps {
  /** The hover tint's opacity, 0 → 1, eased in and out */
  hover: Animated.Value;
  /** The press dim's opacity, 0 → 1, in designs that dim what's pressed rather than ripple */
  press: Animated.Value;
  ripple: RippleOrigin | null;
  scale: Animated.Value;
  opacity: Animated.Value;
  theme: Theme;
  /** Match the element's corners, so the tint and ripple stay inside its shape. */
  borderRadius?: number;
}

export interface TouchFeedbackState {
  ref: RefObject<HostInstance | null>;
  /** Held down right now, whatever the design draws */
  pressed: boolean;
  /** The pressable's scale: 1, or a little less while held when `pressScale` is on */
  pressScale: Animated.Value;
  handlers: {
    onPressIn: (e: GestureResponderEvent) => void;
    onPressOut: () => void;
    onHoverIn: () => void;
    onHoverOut: () => void;
  };
  feedback: Omit<TouchFeedbackProps, 'borderRadius'>;
}

/** Pressable's state, plus whether keyboard focus is on it (the ring is showing). */
export type TouchableState = PressableStateCallbackType & { focusVisible: boolean };

export type TouchableProps = Omit<PressableProps, 'style' | 'children' | 'role'> & {
  /** A theme override; leave it out to use the one in scope */
  theme?: DeepPartial<Theme>;
  /** What the control is to a screen reader: `button`, `link`, `tab`, `checkbox`… Required */
  role: NonNullable<PressableProps['role']>;
  /** The pressable's view, e.g. to `focus()` it */
  ref?: React.Ref<HostInstance>;
  /** Show press feedback: a ripple from the touch point, or a dim while held, as the design does it. Default: true */
  ripple?: boolean;
  /** Tint on pointer hover. Turn it off for media and cards that show hover their own way, or a selected row. Default: true */
  hover?: boolean;
  /** Shrink a little while held and spring back on release, as buttons do in brand, iOS and the web (not Material). Default: false */
  pressScale?: boolean;
  /** Draw the theme's ring on keyboard focus; `inset` draws it inside, for controls in a clipping container. Default: true */
  focusRing?: boolean | 'inset';
  /** On phones, grow the touch area to 44pt around a smaller `width`/`height` in `style`. Default: true */
  minTarget?: boolean;
  /** Where it goes: a real link (`<a href>`) on the web, opened with `Linking` on iOS and Android after `onPress` unless it calls `event.preventDefault()`. Its role becomes `link` */
  href?: string;
  /** With `href`, opens in a new tab on the web. Default: false */
  external?: boolean;
  style?: StyleProp<ViewStyle> | ((state: TouchableState) => StyleProp<ViewStyle>);
  children?: React.ReactNode | ((state: TouchableState) => React.ReactNode);
};

/** A page sliding in: its fade and its sideways offset. */
export interface SlideStyle {
  opacity: Animated.AnimatedInterpolation<number>;
  transform: { translateX: Animated.AnimatedInterpolation<number> }[];
}

export type Key = ValueOf<typeof KEY>;
export type Direction = ValueOf<typeof DIRECTION>;
export type KeyHandlers = Partial<Record<Key, () => void>>;

export interface AdjustableOptions {
  label?: string;
  /** What a screen reader reads as the value */
  valueText: string;
  disabled?: boolean;
  /** 1 to step up, -1 to step down */
  onStep: (direction: 1 | -1) => void;
  /** Page Up and Page Down: 1 or -1 */
  onPage?: (direction: 1 | -1) => void;
  onMin?: () => void;
  onMax?: () => void;
}

export interface DragOptions {
  /** Claim drags that are clearly up or down, rather than sideways. Default: false */
  vertical?: boolean;
  /** The drag is claimed */
  onStart?: () => void;
  onMove?: (gesture: PanResponderGestureState) => void;
  /** The finger lifts */
  onEnd?: (gesture: PanResponderGestureState) => void;
  /** The gesture is taken away, such as by a scroll view */
  onCancel?: () => void;
}

export interface TrackPanOptions {
  /** Where the drag is, 0–1 across and down */
  onMove: (x: number, y: number) => void;
  /** Where the touch lands. Default: `onMove` */
  onStart?: (x: number, y: number) => void;
  /** The finger lifts, or the gesture is taken away */
  onEnd?: () => void;
  /** Keeps the ends this far in, where a slider's thumb centre stops */
  insetX?: number;
}

/** The few DOM members arrow-key focus needs; the library is typed without the DOM. */
export interface WebElement {
  getBoundingClientRect: () => Rect;
  focus: () => void;
  tagName: string;
  contains: (node: WebElement) => boolean;
  querySelectorAll: (selectors: string) => ArrayLike<WebElement>;
  parentElement: WebElement | null;
  dispatchEvent: (event: unknown) => boolean;
  ownerDocument: {
    activeElement: WebElement | null;
    defaultView: {
      getComputedStyle: (element: WebElement) => { direction: string };
      KeyboardEvent: new (type: string, init: { key: string; bubbles: boolean; cancelable: boolean }) => unknown;
    } | null;
  };
}

/** A box on screen, as `getBoundingClientRect` gives it. */
export interface Rect {
  left: number;
  top: number;
  right: number;
  bottom: number;
}

/** A checkbox, switch or radio's checked state. `'mixed'` is a checkbox that's partly checked. */
export type CheckedState = boolean | 'mixed';

export interface ChoiceRowProps extends Omit<PressableProps, 'children' | 'style' | 'role'> {
  theme: Theme;
  ref?: React.Ref<HostInstance>;
  role: 'checkbox' | 'switch' | 'radio';
  checked: CheckedState;
  /** The drawn control: the box, track or circle */
  control: React.ReactNode;
  label?: React.ReactNode;
  /** A line of secondary text under the label */
  description?: React.ReactNode;
  /** Put the control after the label, as settings lists do. Default: before */
  controlAtEnd?: boolean;
  style?: StyleProp<ViewStyle>;
  labelStyle?: StyleProp<TextStyle>;
}
