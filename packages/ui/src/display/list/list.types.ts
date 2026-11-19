import type React from 'react';
import type { GestureResponderEvent, ViewProps } from 'react-native';

import type { SlotStyles, ThemableProps, ValueOf } from '@/core/core.types';
import type { Theme } from '@/core/theme/theme.types';
import type { ThemeColor } from '@/foundations/text/text.types';
import type { LIST_SEPARATOR } from './list.constants';

export type ListSeparator = ValueOf<typeof LIST_SEPARATOR>;

export interface ListProps extends ViewProps, ThemableProps {
  /** A section heading above the rows, e.g. "Notifications" */
  title?: string;
  /** A note under the rows, e.g. what a setting does */
  footer?: string;
  /** ListItem rows */
  children?: React.ReactNode;
  /** Styles for its parts: `content` */
  styles?: SlotStyles<'content'>;
}

export interface ListItemProps extends Omit<ViewProps, 'children'>, ThemableProps {
  /** The main line */
  title: string;
  /** A second line under the title */
  description?: string;
  /** An icon or avatar before the text */
  leading?: React.ReactNode;
  /** A control after the text, such as a Switch or a Badge */
  trailing?: React.ReactNode;
  /** The current value, in secondary text at the end, e.g. "English" */
  value?: string;
  /** Show a chevron at the end. Default: when the row has `onPress` and the design draws them (brand and iOS) */
  showChevron?: boolean;
  /** Draws the title in the danger color, for rows like "Delete account" */
  destructive?: boolean;
  /** Dims it and ignores input. Default: false */
  disabled?: boolean;
  /** Makes the row a button */
  onPress?: (event: GestureResponderEvent) => void;
  /** Styles for its parts: `title` */
  styles?: SlotStyles<'title'>;
  /** Where it goes: a real link (`<a href>`) on the web that crawlers follow, opened with `Linking` on iOS and Android. Call `event.preventDefault()` in `onPress` to keep it from opening */
  href?: string;
  /** With `href`, opens in a new tab on the web. Default: false */
  external?: boolean;
}

export interface ListDesign {
  /** The group's corners. `null` draws full-width rows with no group box */
  radius: keyof Theme['radius'] | null;
  fill: 'background' | 'surface';
  border: boolean;
  /** Keeps the group in from the screen edges */
  inset: boolean;
  separator: ListSeparator;
  minHeight: number;
  /** Rows that navigate show a chevron */
  chevron: boolean;
  headerUppercase: boolean;
  headerColor: ThemeColor;
}

/** Where a row draws its separator: over its text and trailing part, over the whole row, or not at all. */
export type SeparatorEdge = 'content' | 'row' | null;
