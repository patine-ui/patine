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
  defaultValue?: Date;
  onValueChange?: (month: Date) => void;
  /** Month and year wheels, or a grid of months under the year. Default: wheels on iOS, the grid in Material and on the web */
  display?: MonthDisplay;
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
  itemHeight?: number;
  visibleItems?: number;
  variant?: WheelVariant;
  style?: StyleProp<ViewStyle>;
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
    value?: Date;
    onConfirm: (month: Date) => void;
  };

export type MonthPickerFieldProps = WithPickerField<MonthPickerSheetProps, MonthPickerSlot>;
