import { useCallback, useMemo } from 'react';

import { useComponentTheme } from '@/core/theme/ThemeProvider';
import { getFirstDayOfWeek, getWeekdayNames } from '@/core/utils/date.utils';
import { CALENDAR_DESIGN } from '@/pickers/calendar/calendar.constants';
import type { WeekStripProps } from '@/pickers/calendar/calendar.types';
import { isDayDisabled, orderWeekdays } from '@/pickers/calendar/calendar.utils';
import { useCalendarSelection } from './useCalendarSelection';

/** What a one-day calendar sets up before it draws: the theme, the selected day, the disabled days and the weekday names. */
export const useDayCalendar = ({
  value,
  defaultValue,
  onValueChange,
  locale,
  minDate,
  maxDate,
  isDateDisabled,
  markedDates,
  firstDayOfWeek: firstDayOfWeekProp,
  weekdayFormat: weekdayFormatProp,
  theme: themeProp,
  design,
}: WeekStripProps) => {
  const { theme } = useComponentTheme(themeProp, design);
  const weekdayFormat = weekdayFormatProp ?? CALENDAR_DESIGN[theme.design].weekdayFormat;
  const firstDayOfWeek = firstDayOfWeekProp ?? getFirstDayOfWeek(locale);
  const today = useMemo(() => new Date(), []);
  const isDisabled = useCallback(
    (day: Date) => isDayDisabled(day, { minDate, maxDate, isDateDisabled, markedDates }),
    [isDateDisabled, markedDates, maxDate, minDate]
  );
  const { selection, select } = useCalendarSelection({ value, defaultValue, onValueChange }, isDisabled);
  const weekdays = useMemo(
    () => orderWeekdays(getWeekdayNames(locale, weekdayFormat), firstDayOfWeek),
    [firstDayOfWeek, locale, weekdayFormat]
  );
  return {
    theme,
    firstDayOfWeek,
    today,
    isDisabled,
    selection,
    select,
    weekdays,
  };
};
