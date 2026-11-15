import type React from 'react';
import type { StyleProp, ViewProps, ViewStyle } from 'react-native';

import type { ThemableProps } from '@/core/core.types';
import type { Theme } from '@/core/theme/theme.types';

/** What an item's icon can match: its state and the color its label is drawn in. */
export interface TabBarIconInfo {
  selected: boolean;
  color: string;
}

export interface TabBarItem<T extends string = string> {
  value: T;
  label: string;
  /** An icon, or a function of the item's state to color it like the label */
  icon?: React.ReactNode | ((info: TabBarIconInfo) => React.ReactNode);
  /** A count in a red bubble, or `true` for a dot. 0 and false show none */
  badge?: number | boolean;
  disabled?: boolean;
}

export interface TabBarProps<T extends string = string> extends Omit<ViewProps, 'children'>, ThemableProps {
  items: ReadonlyArray<TabBarItem<T>>;
  /** The selected item, controlled */
  value?: T;
  /** The selected item when uncontrolled. Default: the first */
  defaultValue?: T;
  /** Called with the item the user picks. Pressing the selected one again calls it too, to scroll to top or pop to root */
  onValueChange?: (value: T) => void;
  /** Space under the bar, for the home indicator: pass the safe area's bottom inset. Default: 0 */
  bottomInset?: number;
  /** Names the bar for screen readers. Default: 'Tabs' */
  accessibilityLabel?: string;
  style?: StyleProp<ViewStyle>;
}

export interface NavigationRailProps<T extends string = string> extends Omit<TabBarProps<T>, 'bottomInset'> {
  /** Above the items, such as a menu button or a FAB */
  header?: React.ReactNode;
  /** Space above the header, for the status bar. Default: 0 */
  topInset?: number;
}

export interface TabBarDesign {
  /** The bar's height, before the inset */
  height: number;
  /** A pill behind the selected icon, as Material 3 draws it, rather than tinting the icon alone */
  indicator: boolean;
  /** A hairline on the bar's edge toward the content */
  border: boolean;
  /** The bar's fill */
  background: keyof Theme['colors'];
  /** The selected icon and label */
  selectedColor: keyof Theme['colors'];
  labelSize: 'xs' | 'sm';
  /** The rail's width */
  railWidth: number;
}

export interface TabBarButtonProps {
  item: TabBarItem;
  selected: boolean;
  onPress: () => void;
  look: TabBarDesign;
  theme: Theme;
  /** Fills a share of the row in a bar; a fixed square in a rail */
  rail: boolean;
}
