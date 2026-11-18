import type { StyleProp, ViewProps, ViewStyle } from 'react-native';

import type { ButtonVariant } from '@/actions/button/button.types';
import type { ThemableProps } from '@/core/core.types';

/** What the pagination says, for translation. */
export interface PaginationLabels {
  /** Default: 'Pagination' */
  nav: string;
  /** Default: 'Previous' */
  previous: string;
  /** Default: 'Next' */
  next: string;
  /** A page button's name for screen readers. Default: page => `Page ${page}` */
  page: (page: number) => string;
  /** The compact variant's text. Default: (page, count) => `Page ${page} of ${count}` */
  status: (page: number, count: number) => string;
}

export interface PaginationProps extends Omit<ViewProps, 'children'>, ThemableProps {
  /** How many pages there are */
  pageCount: number;
  /** The current page, from 1, controlled */
  page?: number;
  /** The first page when uncontrolled. Default: 1 */
  defaultPage?: number;
  /** Called with the page the user goes to */
  onPageChange?: (page: number) => void;
  /** Pages shown on each side of the current one. Default: 1 */
  siblingCount?: number;
  /** Pages always shown at each end. Default: 1 */
  boundaryCount?: number;
  /** 'numbers': page buttons with ellipses. 'compact': Previous, "Page 3 of 10", Next, for a phone. Default: 'numbers' */
  variant?: 'numbers' | 'compact';
  /** Hides the words on Previous and Next, keeping the arrows. Default: false */
  iconOnly?: boolean;
  /** Dims it and ignores input. Default: false */
  disabled?: boolean;
  /** Its built-in text, for translation */
  labels?: Partial<PaginationLabels>;
  /** The outer view, for layout */
  style?: StyleProp<ViewStyle>;
}

/** A page number, or a gap of pages left out. */
export type PageItem = number | 'start-ellipsis' | 'end-ellipsis';

export interface PaginationDesign {
  /** The current page's button */
  current: ButtonVariant;
  /** The other pages' and the arrows' buttons */
  other: ButtonVariant;
  /** Round page buttons, as Material draws them */
  round: boolean;
}
