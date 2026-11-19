import { useTheme } from '@/core';
import { View } from '@/core/primitives/View';
import { Calendar } from '@/pickers/calendar/Calendar';
import { TIME_POSITION } from '@/pickers/datetime/datetime.constants';
import { styles, themed } from '@/pickers/datetime/datetime.styles';
import type { DateTimeViewProps } from '@/pickers/datetime/datetime.types';
import { getCalendarTimeRows, getDayTimeBounds, withDay } from '@/pickers/datetime/datetime.utils';
import { useBesideFit } from '@/pickers/datetime/hooks/useBesideFit';
import { TimePicker } from '@/pickers/time/TimePicker';

/** A month grid for the day, and the time beside it (when both fit) or under it: wheels, a dial, Material's time input or the web's time panel. */
export const DateTimeCalendar = ({
  date,
  onValueChange,
  locale,
  minDate,
  maxDate,
  calendarProps,
  formatDay: _formatDay,
  visibleItems,
  timeDisplay,
  timePosition,
  style,
  theme,
  testID,
  ...timeProps
}: DateTimeViewProps) => {
  const t = useTheme(theme);
  const { beside, onLayout, onTimeLayout } = useBesideFit(
    timePosition === TIME_POSITION.beside,
    [timeDisplay, timeProps.format, timeProps.showSeconds, locale].join()
  );
  return (
    <View onLayout={onLayout} style={[styles.calendarLayout, beside && [styles.besideLayout, themed(t).beside], style]} testID={testID}>
      <Calendar
        {...calendarProps}
        style={[beside && styles.besideCalendar, calendarProps?.style]}
        locale={locale}
        minDate={minDate}
        maxDate={maxDate}
        theme={theme}
        value={date}
        onValueChange={(day) => onValueChange(withDay(date, day, minDate, maxDate))}
        testID={testID ? `${testID}-calendar` : undefined}
      />
      <View onLayout={onTimeLayout}>
        <TimePicker
          {...timeProps}
          display={timeDisplay}
          {...getDayTimeBounds(date, minDate, maxDate)}
          locale={locale}
          visibleItems={visibleItems ?? getCalendarTimeRows(timeDisplay, beside ? TIME_POSITION.beside : TIME_POSITION.below)}
          theme={theme}
          value={date}
          onValueChange={onValueChange}
          style={beside && styles.besideTime}
          testID={testID ? `${testID}-time` : undefined}
        />
      </View>
    </View>
  );
};
