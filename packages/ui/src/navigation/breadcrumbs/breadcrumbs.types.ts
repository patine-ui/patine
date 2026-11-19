import type React from 'react';
import type { StyleProp, TextStyle, ViewProps, ViewStyle } from 'react-native';

import type { SlotStyles, ThemableProps } from '@/core/core.types';

export interface BreadcrumbItem {
  label: string;
  /** Goes to this level. The last item is the current page and isn't pressable */
  onPress?: () => void;
  /** Before the label, such as a home icon */
  icon?: React.ReactNode;
  /** Where it goes: a real link (`<a href>`) on the web that crawlers follow, opened with `Linking` on iOS and Android. Call `event.preventDefault()` in `onPress` to keep it from opening */
  href?: string;
  /** With `href`, opens in a new tab on the web. Default: false */
  external?: boolean;
}

export type BreadcrumbsSlot = 'item' | 'current' | 'separator';

export interface BreadcrumbsProps extends Omit<ViewProps, 'children'>, ThemableProps {
  /** The path from the top level to the current page */
  items: ReadonlyArray<BreadcrumbItem>;
  /** Between items. Default: the design's ('/' on the web and brand, '›' on iOS and Material) */
  separator?: React.ReactNode;
  /** Past this many items, the middle ones fold into '…', which unfolds when pressed. Default: no limit */
  maxItems?: number;
  /** Names the trail for screen readers. Default: 'Breadcrumb' */
  accessibilityLabel?: string;
  /** The folded items' button, for screen readers. Default: 'Show path' */
  expandLabel?: string;
  /** The outer view, for layout */
  style?: StyleProp<ViewStyle>;
  /** Per-part style overrides */
  styles?: SlotStyles<BreadcrumbsSlot>;
}

export type BreadcrumbEntry = { kind: 'item'; item: BreadcrumbItem; index: number } | { kind: 'ellipsis' };

export interface BreadcrumbsDesign {
  separator: string;
  /** The current page's weight */
  currentWeight: 'regular' | 'medium' | 'bold';
  /** Links in the primary color, as iOS and Material draw them, rather than gray */
  primaryLinks: boolean;
  textStyle?: TextStyle;
}
