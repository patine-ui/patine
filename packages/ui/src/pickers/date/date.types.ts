import type { StyleProp, ViewStyle } from 'react-native';

import type { Locale, SlotStyles, ThemableProps, Theme } from '@/core';
import type { PICKER_DISPLAY } from '@/core/core.constants';
import type { PickerDisplay, ValueOf } from '@/core/core.types';
import type { SheetChromeProps, WithPickerField } from '@/overlays/sheet';
import type { CALENDAR_MODE } from '@/pickers/calendar/calendar.constants';
import type {
  CalendarBaseProps,
  CalendarMode,
  CalendarProps,
  CalendarSlot,
  DateRange,
  DateRangePreset,
  RangePresetsListProps,
  RangeRules,
} from '@/pickers/calendar/calendar.types';
import type { MultiWheelSlot, WheelColumn, WheelVariant } from '@/pickers/wheel/wheel.types';
import type { DATE_PART, MONTH_FORMAT } from './date.constants';

export type DatePart = ValueOf<typeof DATE_PART>;

export type MonthFormat = ValueOf<typeof MONTH_FORMAT>;

export interface DateWheelPickerProps extends ThemableProps {
  /** The value, when you control it */
  value?: Date;
  /** The value at first, when it keeps its own state */
  defaultValue?: Date;
  /** Called when the user changes the value; never when `value` changes from your code */
  onValueChange?: (date: Date) => void;
  /** Fires on every tick while scrolling (for haptics) */
  onValueChanging?: (date: Date) => void;
  /** A BCP 47 language tag for names and formats, e.g. 'en-US'. Default: the device's */
  locale?: Locale;
  /** The earliest date that can be picked */
  minDate?: Date;
  /** The latest date that can be picked */
  maxDate?: Date;
  /** Column order. Default: from locale (e.g. M/D/Y for en-US, D/M/Y for he) */
  order?: DatePart[];
  /** 'long' (January), 'short' (Jan) or 'numeric' (01). Default: 'long' */
  monthFormat?: MonthFormat;
  /** Years to offer, kept within minDate/maxDate. Default: ±100 from today */
  yearRange?: [number, number];
  /** Loop the day and month wheels. Default: true */
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
  styles?: SlotStyles<MultiWheelSlot>;
  testID?: string;
}

export type DatePickerProps =
  | ({ display?: typeof PICKER_DISPLAY.calendar } & CalendarProps)
  | ({ display: typeof PICKER_DISPLAY.wheel } & DateWheelPickerProps);

export type DateSheetMode = CalendarMode;

export type DateSheetSelection =
  | { mode?: typeof CALENDAR_MODE.single; value?: Date | null; onConfirm: (date: Date) => void }
  | ({
      mode: typeof CALENDAR_MODE.range;
      value?: DateRange;
      onConfirm: (range: DateRange) => void;
      /** Chips above the days that pick a whole range in one tap, such as `getRangePresets()` */
      presets?: DateRangePreset[];
      /** Any ChipGroup prop for the presets row, such as `showArrows`, `renderItem` or `styles`; `variant: 'segmented'` draws it as a segmented control */
      presetsProps?: RangePresetsListProps;
    } & RangeRules)
  | { mode: typeof CALENDAR_MODE.multiple; value?: Date[]; onConfirm: (dates: Date[]) => void; maxSelections?: number }
  | ({
      mode: typeof CALENDAR_MODE.ranges;
      value?: DateRange[];
      onConfirm: (ranges: DateRange[]) => void;
      maxRanges?: number;
    } & RangeRules);

/** What a date sheet holds while open: one date, a range or a list, depending on the mode. */
export type DateDraft = Date | DateRange | Date[] | DateRange[] | null;

export type DatePickerSheetProps = SheetChromeProps &
  Omit<CalendarBaseProps, 'theme'> &
  DateSheetSelection & {
    /** 'calendar' (default) or 'wheel'. Only single mode can use the wheel */
    display?: PickerDisplay;
    wheelProps?: Partial<DateWheelPickerProps>;
    /** Single mode: confirm as soon as a day is tapped. Default: false */
    confirmOnSelect?: boolean;
  };

export type DatePickerFieldProps = WithPickerField<DatePickerSheetProps, CalendarSlot>;

/** A date wheel column before its change handlers are attached. */
export type DateColumnSpec = Omit<WheelColumn<number>, 'onValueChange' | 'onValueChanging'>;

export interface DateHeadlineProps {
  text: string;
  theme: Theme;
}
