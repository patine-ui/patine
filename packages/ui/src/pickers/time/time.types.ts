import type React from 'react';
import type { StyleProp, ViewStyle } from 'react-native';

import type { Locale, SlotStyles, ThemableProps } from '@/core';
import type { ValueOf } from '@/core/core.types';
import type { Theme } from '@/core/theme/theme.types';
import type { SheetChromeProps, WithPickerField } from '@/overlays/sheet';
import type { MultiWheelSlot, WheelColumn, WheelVariant } from '@/pickers/wheel/wheel.types';
import type { useClockDial } from './hooks/useClockDial';
import type { CLOCK_MODE, TIME_COLUMN, TIME_DISPLAY, TIME_FORMAT, TIME_RANGE_END } from './time.constants';
import type { getTimeRangeEndItems } from './time.utils';

export type TimeFormat = ValueOf<typeof TIME_FORMAT>;
export type TimeDisplay = ValueOf<typeof TIME_DISPLAY>;
export type ClockMode = ValueOf<typeof CLOCK_MODE>;

export interface TimePickerProps extends ThemableProps {
  /** Selected time (the date part is preserved). */
  value?: Date;
  /** The value at first, when it keeps its own state */
  defaultValue?: Date;
  /** Called when the user changes the value; never when `value` changes from your code */
  onValueChange?: (date: Date) => void;
  /** Fires on every tick while scrolling (for haptics). */
  onValueChanging?: (date: Date) => void;
  /** Wheels, a clock dial, hour and minute fields to type into, or columns of clickable hours and minutes. Default: the design's: the columns in brand and on the web, wheels on iOS, a dial in Material. With `showSeconds`, a dial or input falls back to wheels */
  display?: TimeDisplay;
  /** Default: 'auto' (from locale) */
  format?: TimeFormat;
  /** A BCP 47 language tag for names and formats, e.g. 'en-US'. Default: the device's */
  locale?: Locale;
  /** Minute step: 1, 5, 15... Default: 1 */
  minuteInterval?: number;
  /** A seconds column. Default: false */
  showSeconds?: boolean;
  /** Second step: 1, 5, 15... Default: 1 */
  secondInterval?: number;
  /** Earliest selectable time of day */
  minTime?: Date;
  /** Latest selectable time of day */
  maxTime?: Date;
  /** Infinite hour/minute wheels. Default: true */
  loop?: boolean;
  /** Zero-pad hours. Default: true for 24h, false for 12h */
  padHours?: boolean;
  /** Labels for AM/PM. Default: from locale */
  dayPeriodLabels?: [string, string];
  /** Put AM/PM before the hours (e.g. zh, ko). Default: false */
  dayPeriodFirst?: boolean;
  /** Separator between columns. Default: ':' */
  separator?: React.ReactNode;
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

/** The TimePicker props that shape its wheels, without the visual ones. */
export type TimeOptions = Omit<
  TimePickerProps,
  'value' | 'defaultValue' | 'onValueChange' | 'itemHeight' | 'visibleItems' | 'variant' | 'style' | 'styles' | 'theme' | 'display'
>;

export type TimeColumnsOptions = TimeOptions & {
  date: Date;
  onValueChange: (date: Date) => void;
};

export type TimePickerSheetProps = SheetChromeProps &
  Omit<TimePickerProps, 'value' | 'defaultValue' | 'onValueChange' | 'theme'> & {
    /** The value, when you control it */
    value?: Date;
    onConfirm: (date: Date) => void;
  };

export type TimePickerFieldProps = WithPickerField<TimePickerSheetProps, MultiWheelSlot>;

/** A start and an end time. The end is on the start's day, or the next day when it's earlier, as in 22:00 – 07:00. */
export interface TimeRange {
  start: Date;
  end: Date;
}

export type TimeRangeEnd = ValueOf<typeof TIME_RANGE_END>;

export interface TimeRangeRules {
  /** Shortest range, in minutes. Default: 0 */
  minDuration?: number;
  /** Longest range, in minutes */
  maxDuration?: number;
  /** Let the end run into the next day, as in 22:00 – 07:00. Default: true */
  allowOvernight?: boolean;
}

export type TimeRangePickerProps = Omit<TimePickerProps, 'value' | 'defaultValue' | 'onValueChange' | 'onValueChanging'> &
  TimeRangeRules & {
    /** The value, when you control it */
    value?: TimeRange;
    /** Default: from now, for an hour */
    defaultValue?: TimeRange;
    /** Called when the user changes the value; never when `value` changes from your code */
    onValueChange?: (range: TimeRange) => void;
    /** Default: 'Start' */
    startLabel?: string;
    /** Default: 'End' */
    endLabel?: string;
  };

export type TimeRangePickerSheetProps = SheetChromeProps &
  Omit<TimeRangePickerProps, 'value' | 'defaultValue' | 'onValueChange' | 'theme'> & {
    /** The value, when you control it */
    value?: TimeRange;
    onConfirm: (range: TimeRange) => void;
  };

export type TimeRangePickerFieldProps = WithPickerField<TimeRangePickerSheetProps, MultiWheelSlot>;

export interface TimeParts {
  hours: number;
  minutes: number;
  seconds: number;
}

/** Selectable seconds of the day, inclusive. */
export type TimeBounds = [minSecond: number, maxSecond: number];

export type TimeColumnKey = ValueOf<typeof TIME_COLUMN>;

/** A time wheel column before its change handlers are attached; `toPatch` maps a wheel value to the time parts it sets. */
export type TimeColumnSpec = Omit<WheelColumn<number>, 'onValueChange' | 'onValueChanging' | 'key'> & {
  key: TimeColumnKey;
  toPatch: (value: number) => Partial<TimeParts>;
};

/** A column of cells to click on the web: a time or duration wheel column with its handler attached. */
export type TimePanelColumn = Pick<WheelColumn<number>, 'items' | 'accessibilityLabel' | 'suffix' | 'testID'> & {
  key: string;
  value?: number;
  onValueChange: (value: number) => void;
};

export interface TimePanelProps {
  columns: TimePanelColumn[];
  visibleRows?: number;
  theme: Theme;
  style?: StyleProp<ViewStyle>;
  testID?: string;
}

export interface TimePanelColumnProps {
  column: TimePanelColumn;
  visibleRows: number;
  theme: Theme;
}

export interface DialNumber {
  /** An hour of the day (12h: 1–12) or a minute */
  value: number;
  label: string;
  /** The number's centre on the dial */
  x: number;
  y: number;
  /** On the inner ring of a 24h dial */
  inner: boolean;
  disabled: boolean;
}

export interface ClockDialProps {
  /** Only the typed fields: no dial and no button to switch to it */
  inputOnly?: boolean;
  date: Date;
  onValueChange: (date: Date) => void;
  options: TimeOptions;
  theme: Theme;
  style?: StyleProp<ViewStyle>;
  testID?: string;
}

export type ClockDialState = ReturnType<typeof useClockDial>;

export interface ClockFieldProps extends ClockPartProps {
  field: ClockMode;
}

export interface ClockPartProps {
  dial: ClockDialState;
  theme: Theme;
  testID?: string;
}

export interface RangeEndsProps {
  items: ReturnType<typeof getTimeRangeEndItems>;
  active: TimeRangeEnd;
  onSelect: (end: TimeRangeEnd) => void;
  /** The range's length, such as "8 h", between the ends in the designs that show it */
  duration: string;
  theme: Theme;
  /** The picker for an end: under each row on iOS, folding open for the active one, and under both ends elsewhere */
  renderPicker: (end: TimeRangeEnd) => React.ReactNode;
  testID?: string;
}
