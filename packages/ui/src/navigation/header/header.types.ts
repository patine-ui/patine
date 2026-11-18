import type React from 'react';
import type { StyleProp, TextStyle, ViewProps } from 'react-native';

import type { ThemableProps, ValueOf } from '@/core/core.types';
import type { TextSize, TextWeight } from '@/core/theme/theme.types';
import type { HEADER_SIZE } from './header.constants';

export type HeaderSize = ValueOf<typeof HEADER_SIZE>;

export interface HeaderProps extends ViewProps, ThemableProps {
  /** The screen's title, read as a heading */
  title?: string;
  /** A line under the title, e.g. "Last seen 5 min ago" */
  subtitle?: string;
  /** Shows a back button that calls this */
  onBack?: () => void;
  /** The back button's text on iOS, and its name for screen readers everywhere. Default: 'Back' */
  backLabel?: string;
  /** Replaces the back button, e.g. a close button or an avatar */
  leading?: React.ReactNode;
  /** Buttons at the end, e.g. `<Button size="icon" variant="ghost">` */
  actions?: React.ReactNode;
  /** 'large' puts a big title under the bar. Default: 'default' */
  size?: HeaderSize;
  /** The title's text */
  titleStyle?: StyleProp<TextStyle>;
}

export interface HeaderDesign {
  height: number;
  centerTitle: boolean;
  titleSize: TextSize;
  titleWeight: TextWeight;
  /** The title's size under the bar when `size="large"` */
  largeSize: TextSize;
  /** A hairline under the bar */
  border: boolean;
  /** Shows the back label beside the chevron */
  backLabel: boolean;
}
