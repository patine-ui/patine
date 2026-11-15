import type React from 'react';
import type {
  Animated,
  HostInstance,
  KeyDownEvent,
  LayoutChangeEvent,
  PressableProps,
  StyleProp,
  TextStyle,
  ViewProps,
  ViewStyle,
} from 'react-native';

import type { ThemableProps, ValueOf } from '@/core/core.types';
import type { Theme } from '@/core/theme/theme.types';
import type { INDICATOR_FIT, TABS_ORIENTATION, TABS_VARIANT } from './tabs.constants';

export type TabsVariant = ValueOf<typeof TABS_VARIANT>;
export type TabsOrientation = ValueOf<typeof TABS_ORIENTATION>;
export type IndicatorFit = ValueOf<typeof INDICATOR_FIT>;

export interface TabsProps extends ViewProps, ThemableProps {
  /** The active tab's value, controlled */
  value?: string;
  /** The active tab's value when uncontrolled */
  defaultValue?: string;
  /** Called with the tab's value when the user picks one */
  onValueChange?: (value: string) => void;
  /** 'vertical' puts the list beside the content, and up and down arrows move through it. Default: 'horizontal' */
  orientation?: TabsOrientation;
  /** 'pills': a muted track with the active tab raised on it. 'underline': a line under the active tab. Default: the design's */
  variant?: TabsVariant;
  /** Shorthand: the tabs and their panels, so you don't compose TabsList, TabsTrigger and TabsContent. The first enabled one opens first */
  items?: TabsItem[];
  /** The parts: a TabsList of TabsTriggers and a TabsContent for each. Leave out when you give `items` */
  children?: React.ReactNode;
}

/** One tab for the shorthand `items`: its trigger and its panel. */
export interface TabsItem {
  value: string;
  /** The tab's label */
  label: React.ReactNode;
  /** The panel shown while it's active */
  content: React.ReactNode;
  /** An icon before the label */
  icon?: React.ReactNode;
  disabled?: boolean;
}

export interface TabsListProps extends ViewProps {
  children: React.ReactNode;
}

export interface TabsTriggerProps extends Omit<PressableProps, 'children' | 'style' | 'onPress' | 'role'> {
  value: string;
  disabled?: boolean;
  /** An icon before the label */
  icon?: React.ReactNode;
  /** The label. A string is drawn in the tab's text color */
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  labelStyle?: StyleProp<TextStyle>;
}

export interface TabsContentProps extends ViewProps {
  value: string;
  /** Keep it mounted, hidden, while another tab is active, so its state survives. Default: false */
  forceMount?: boolean;
  children: React.ReactNode;
}

export interface TabsDesign {
  variant: TabsVariant;
  /** The tabs share the list's width when they fit, as iOS segments and Material tabs do */
  fullWidth: boolean;
  pillHeight: number;
  underlineHeight: number;
  /** The underline's thickness */
  indicatorSize: number;
  /** Under the label only, as Material 3's primary tabs do, or under the whole tab */
  indicatorFit: IndicatorFit;
  /** The pill track's color */
  track: keyof Theme['colors'];
  /** The active label's color under an underline */
  activeLabel: keyof Theme['colors'];
}

export interface TabLayout {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface TabEntry {
  value: string;
  disabled: boolean;
  ref: React.RefObject<HostInstance | null>;
}

export interface TabsIndicator {
  style: { left: Animated.Value; width: Animated.Value } | { top: Animated.Value; height: Animated.Value };
  /** Whether the active tab has been laid out, so the indicator has somewhere to be */
  placed: boolean;
  onTabLayout: (value: string, layout: TabLayout) => void;
}

/** What `useTabsTrigger` gives a tab. */
export interface TabsTriggerState {
  tabs: TabsContextValue;
  ref: React.RefObject<HostInstance | null>;
  focus: { focusVisible: boolean; onFocus: () => void; onBlur: () => void };
  look: TabsDesign;
  selected: boolean;
  ids: { tab: string; panel: string };
  onTabLayout: (e: LayoutChangeEvent) => void;
  onContentLayout: (e: LayoutChangeEvent) => void;
  keys: { focusable: boolean; onKeyDown: (e: KeyDownEvent) => void };
}

export interface TabsContextValue {
  value: string | undefined;
  select: (value: string) => void;
  theme: Theme;
  variant: TabsVariant;
  vertical: boolean;
  /** Prefix of the tab and panel ids that link them for screen readers */
  baseId: string;
  indicator: TabsIndicator;
  /** Adds a tab in render order and returns the function that removes it */
  register: (entry: TabEntry) => () => void;
  /** Selects and focuses the enabled tab `step` places from `from`, wrapping around */
  move: (from: string, step: number) => void;
  /** Selects and focuses the first or last enabled tab */
  moveToEdge: (last: boolean) => void;
}
