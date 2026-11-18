import type React from 'react';
import type { StyleProp, ViewProps, ViewStyle } from 'react-native';

import type { SlotStyles, ThemableProps } from '@/core/core.types';

export interface DescriptionItem {
  /** The name: 'Order number' */
  term: string;
  /** Its value: '#1042', or any node, such as a Badge */
  details: React.ReactNode;
}

export type DescriptionListSlot = 'row' | 'term' | 'details';

export interface DescriptionListProps extends Omit<ViewProps, 'children'>, ThemableProps {
  items: ReadonlyArray<DescriptionItem>;
  /** 'horizontal': the term beside its details. 'vertical': the term above. Default: the design's */
  orientation?: 'horizontal' | 'vertical';
  /** Hairlines between rows. Default: true */
  dividers?: boolean;
  /** The outer view, for layout */
  style?: StyleProp<ViewStyle>;
  /** Per-part style overrides */
  styles?: SlotStyles<DescriptionListSlot>;
}

export interface DescriptionListDesign {
  orientation: 'horizontal' | 'vertical';
  /** The details at the row's end, as iOS's Settings › About lists them */
  detailsAtEnd: boolean;
  /** The term in the secondary color (a label), or the details (a value) */
  mutedTerm: boolean;
  /** The term's share of a horizontal row */
  termWidth: `${number}%`;
}
