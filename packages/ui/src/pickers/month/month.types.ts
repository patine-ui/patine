import type { StyleProp, ViewStyle } from 'react-native';

import type { Locale, SlotStyles, ThemableProps, Theme } from '@/core';
import type { ValueOf } from '@/core/core.types';
import type { SheetChromeProps, WithPickerField } from '@/overlays/sheet';
import type { CalendarSlot } from '@/pickers/calendar/calendar.types';
import type { MonthFormat } from '@/pickers/date/date.types';
import type { MultiWheelSlot, WheelVariant } from '@/pickers/wheel/wheel.types';
import type { MONTH_DISPLAY } from './month.constants';

export type MonthDisplay = ValueOf<typeof MONTH_DISPLAY>;

export type MonthPickerSlot =
  | MultiWheelSlot
  | Extract<CalendarSlot, 'header' | 'headerTitle' | 'arrow' | 'arrowText' | 'gridCell' | 'gridCellText'>;

export interface MonthPickerProps extends ThemableProps {
  /** Selected month: a `Date` on its first day. */
  value?: Date;
  /** The value at first, when it keeps its own state */
  defaultValue?: Date;
  /** Called when the user changes the value; never when `value` changes from your code */
  onValueChange?: (month: Date) => void;
  /** Month and year wheels, or a grid of months under the year. Default: the design's: wheels on iOS, the grid in brand, Material and on the web */
  display?: MonthDisplay;
  /** A BCP 47 language tag for names and formats, e.g. 'en-US'. Default: the device's */
  locale?: Locale;
  /** Earliest selectable month (pass a day in it). */
  minDate?: Date;
  /** Latest selectable month (pass a day in it). */
  maxDate?: Date;
  /** Years to offer, kept within minDate/maxDate. Default: ±100 from today */
  yearRange?: [number, number];
  /** Wheel month names: 'long' (January), 'short' (Jan) or 'numeric' (01). Default: 'long' */
  monthFormat?: MonthFormat;
  /** Loop the month wheel. Default: true */
  loop?: boolean;
  /** Wheel row height, in points */
  itemHeight?: number;
  /** Visible wheel rows, an odd number */
  visibleItems?: number;
  /** '3d' cylinder or 'flat' list. Default: '3d' */
  variant?: WheelVariant;
  /** The outer view, for layout */
  style?: StyleProp<ViewStyle>;
  /** Per-part style overrides */
  styles?: SlotStyles<MonthPickerSlot>;
  testID?: string;
}

export type MonthGridProps = Pick<MonthPickerProps, 'locale' | 'minDate' | 'maxDate' | 'yearRange' | 'style' | 'styles' | 'testID'> & {
  value: Date;
  onValueChange: (month: Date) => void;
  theme: Theme;
};

export type MonthPickerSheetProps = SheetChromeProps &
  Omit<MonthPickerProps, 'value' | 'defaultValue' | 'onValueChange' | 'theme'> & {
    /** The value, when you control it */
    value?: Date;
    onConfirm: (month: Date) => void;
  };

export type MonthPickerFieldProps = WithPickerField<MonthPickerSheetProps, MonthPickerSlot>;
