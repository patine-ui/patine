import type React from 'react';
import type { Animated, StyleProp, ViewStyle } from 'react-native';

import type { SlotStyles, ThemableProps, Theme } from '@/core';
import type { NoInferValue, ValueOf } from '@/core/core.types';
import type { ARROW_POSITION, CHOICE_ICON_POSITION, CHOICE_VARIANT, SCROLL_ARROW_SIDE } from './segmented.constants';

/** What an item's icon can match: its state and its label's color. */
export interface ChoiceIconInfo {
  selected: boolean;
  disabled: boolean;
  color: string;
}

export interface ChoiceItem<T> {
  label: string;
  value: T;
  disabled?: boolean;
  /** An icon, avatar, flag... beside the label, or a function of the item's state to color it like the label */
  icon?: React.ReactNode | ((info: ChoiceIconInfo) => React.ReactNode);
}

export type ChoiceVariant = ValueOf<typeof CHOICE_VARIANT>;

export type ChoiceIconPosition = ValueOf<typeof CHOICE_ICON_POSITION>;

export type ChoiceSlot =
  | 'container'
  | 'content'
  | 'item'
  | 'selectedItem'
  | 'itemLabel'
  | 'selectedItemLabel'
  | 'thumb'
  | 'arrow'
  | 'arrowText';

export type ChoiceArrowSide = ValueOf<typeof SCROLL_ARROW_SIDE>;

export type ChoiceArrowPosition = ValueOf<typeof ARROW_POSITION>;

export interface ChoiceRenderItemInfo<T> {
  item: ChoiceItem<T>;
  selected: boolean;
  disabled: boolean;
  theme: Theme;
}

export type ChoiceListProps<T> = ThemableProps & {
  items: ReadonlyArray<ChoiceItem<T>>;
  /** The selected item's value, when you control it; `null` for none */
  value?: T | null;
  /** The value selected at first, when it keeps its own state. Default: none */
  defaultValue?: T | null;
  onValueChange?: (value: NoInferValue<T>, item: ChoiceItem<T>) => void;
  isEqual?: (a: T, b: T) => boolean;
  /** 'segmented': items on a track, the selected one on a sliding thumb. 'chips': separate pills. Set by SegmentedControl and ChipGroup */
  variant?: ChoiceVariant;
  /** Where each item's icon sits around its label. 'left' and 'right' follow the layout direction, so they swap in RTL. Default: 'left' */
  iconPosition?: ChoiceIconPosition;
  /** Round ‹ › buttons that scroll the list about a page, shown while its items overflow. Default: false */
  showArrows?: boolean;
  /**
   * 'outside': the arrows sit beside the list, the one that can't scroll further dimmed.
   * 'overlay': they float over the list's edges, each shown only while items are hidden past it. Default: 'outside'
   */
  arrowPosition?: ChoiceArrowPosition;
  /** Custom arrow content, inside the pressable arrow */
  renderArrow?: (side: ChoiceArrowSide, disabled: boolean) => React.ReactNode;
  /** Custom item content, inside the pressable item */
  renderItem?: (info: ChoiceRenderItemInfo<T>) => React.ReactNode;
  /** Names the list for screen readers */
  'aria-label'?: string;
  style?: StyleProp<ViewStyle>;
  styles?: SlotStyles<ChoiceSlot>;
  testID?: string;
};

export interface ItemLayout {
  x: number;
  width: number;
}

/** The segmented control's sliding thumb: its animated position, whether it has a place yet, and the items' layout callback. */
export interface SegmentThumb {
  style: { left: Animated.Value; width: Animated.Value };
  placed: boolean;
  onItemLayout: (index: number, layout: ItemLayout) => void;
}

/** The visible window of a horizontal scroll view over its content. */
export interface ScrollFrame {
  offset: number;
  width: number;
  contentWidth: number;
}

export interface ListDesign {
  /** Outlined segments and chips, the chosen one filled and checked, instead of a sliding thumb */
  outlined: boolean;
}

export interface ListItemProps<T> {
  item: ChoiceItem<T>;
  selected: boolean;
  /** Not the first item, so an outlined segment draws a divider before it */
  divided: boolean;
  variant: ChoiceVariant;
  iconPosition: ChoiceIconPosition;
  renderItem?: ChoiceListProps<T>['renderItem'];
  onPress: () => void;
  onLayout: (layout: ItemLayout) => void;
  theme: Theme;
  slots?: SlotStyles<ChoiceSlot>;
  testID?: string;
}

export interface ScrollArrowProps {
  side: ChoiceArrowSide;
  disabled: boolean;
  /** Floats over the list's edge instead of sitting beside it */
  overlay: boolean;
  renderArrow?: ChoiceListProps<unknown>['renderArrow'];
  onPress: () => void;
  theme: Theme;
  slots?: SlotStyles<ChoiceSlot>;
  testID?: string;
}

/** One choice from a few, on a track with a sliding thumb. Scrolls sideways when the items don't fit. */
export type SegmentedControlProps<T> = Omit<ChoiceListProps<T>, 'variant'>;

/** One choice from separate pills that scroll sideways, such as filters or categories. */
export type ChipGroupProps<T> = Omit<ChoiceListProps<T>, 'variant'>;
