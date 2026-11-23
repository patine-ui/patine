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
  /** The main line. A string is drawn in the row's text style; a node is drawn as it is */
  title: React.ReactNode;
  /** A second line under the title. A string is drawn in small secondary text; a node as it is */
  description?: React.ReactNode;
  /** An icon or avatar before the text, or a control such as a Checkbox */
  leading?: React.ReactNode;
  /** A control after the text, such as a Switch, a Badge or a DropdownMenu */
  trailing?: React.ReactNode;
  /** The current value, in secondary text at the end, e.g. "English" */
  value?: string;
  /** Show a chevron at the end. Default: when the row has `onPress`, isn't `destructive`, and the design draws them (brand and iOS) */
  showChevron?: boolean;
  /** Draws the title, and an `Icon` in `leading` without its own color, in the danger color, for rows like "Delete account" */
  destructive?: boolean;
  /** Draws the title, and an `Icon` in `leading` without its own color, in secondary text, for rows that are done, read or archived. Default: false */
  muted?: boolean;
  /** Dims it and ignores input. Default: false */
  disabled?: boolean;
  /** Makes the row a button. A control in `leading` or `trailing` then sits beside the button, with the text as the button */
  onPress?: (event: GestureResponderEvent) => void;
  /** Styles for its parts: `title` */
  styles?: SlotStyles<'title'>;
  /** Where it goes: a real link (`<a href>`) on the web that crawlers follow, opened with `Linking` on iOS and Android. Call `event.preventDefault()` in `onPress` to keep it from opening */
  href?: string;
  /** With `href`, opens in a new tab on the web. Default: false */
  external?: boolean;
}

export interface BulletListProps extends ViewProps, ThemableProps {
  /** The items, each after a bullet. Strings are drawn in body text; nodes as they are */
  items: React.ReactNode[];
  /** Styles for its parts: `item` (a row), `bullet`, `text` */
  styles?: SlotStyles<'item' | 'bullet' | 'text'>;
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
