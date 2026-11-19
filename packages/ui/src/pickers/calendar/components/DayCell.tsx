import { memo } from 'react';

import { focusRing } from '@/core/a11y/a11y.utils';
import { useFocusVisible } from '@/core/a11y/hooks/useFocusVisible';
import { useTouchFeedback } from '@/core/hooks/useTouchFeedback';
import { Text } from '@/core/primitives/Text';
import { TouchFeedback } from '@/core/primitives/TouchFeedback';
import { Pressable, View } from '@/core/primitives/View';
import { formatDate } from '@/core/utils/date.utils';
import { CALENDAR_DESIGN, MAX_MARKING_DOTS } from '@/pickers/calendar/calendar.constants';
import { styles, themed } from '@/pickers/calendar/calendar.styles';
import type { DayCellProps } from '@/pickers/calendar/calendar.types';
import {
  getBandBox,
  getCellHeight,
  getDayBox,
  getDayLook,
  getDaySize,
  getDayTextStyle,
  getDotColor,
  showsRangeBand,
} from '@/pickers/calendar/calendar.utils';

const ACCESSIBLE_DATE: Intl.DateTimeFormatOptions = { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' };

export const DayCell = memo(({ state, hidden, hasRangeEnd, height, locale, renderDay, onSelect, theme, slots }: DayCellProps) => {
  const touch = useTouchFeedback(theme, state.disabled);
  // ponytail: not on Touchable, whose feedback fills the whole cell; here it fills the day's circle.
  const focus = useFocusVisible();
  if (hidden) return <View style={[styles.cell, getCellHeight(height)]} />;
  const { date, selected, disabled, outside, today, rangeStart, rangeEnd, marking } = state;
  const c = theme.colors;
  const sheet = themed(theme);
  const size = getDaySize(height);
  const look = getDayLook(state, CALENDAR_DESIGN[theme.design]);
  const radius = CALENDAR_DESIGN[theme.design].squareDays ? theme.radius.sm : size / 2;

  return (
    <Pressable
      // A custom day has no circle to hold the effects, so they cover the whole cell instead.
      ref={renderDay ? touch.ref : undefined}
      {...touch.handlers}
      onPress={disabled ? undefined : () => onSelect(date)}
      onFocus={focus.onFocus}
      onBlur={focus.onBlur}
      style={[styles.cell, getCellHeight(height), focus.focusVisible && focusRing(c.primary), slots?.day]}
      role="button"
      aria-label={formatDate(date, locale, ACCESSIBLE_DATE)}
      aria-selected={selected}
      aria-disabled={disabled}
    >
      {() => (
        <>
          {renderDay ? <TouchFeedback {...touch.feedback} /> : null}
          {showsRangeBand(state, hasRangeEnd) && (
            <View
              style={[
                styles.band,
                getBandBox(height, size),
                sheet.band,
                rangeStart ? styles.bandFromCenter : rangeEnd ? styles.bandToCenter : null,
                slots?.rangeBand,
              ]}
            />
          )}
          {renderDay ? (
            renderDay(state, theme)
          ) : (
            <View
              ref={touch.ref}
              style={[
                styles.dayInner,
                getDayBox(size, radius),
                look.filled && sheet.filled,
                look.tinted && sheet.tinted,
                look.todayRing && [styles.todayRing, sheet.todayRing],
                look.todaySurface && sheet.todaySurface,
                slots?.dayInner,
                today && slots?.todayDay,
                selected && slots?.selectedDay,
              ]}
            >
              <TouchFeedback {...touch.feedback} borderRadius={radius} />
              <Text
                theme={theme}
                weight={selected || today ? 'semibold' : 'regular'}
                style={[
                  getDayTextStyle(state, c, look.tinted),
                  slots?.dayText,
                  outside && slots?.outsideDayText,
                  disabled && slots?.disabledDayText,
                  today && slots?.todayDayText,
                  selected && slots?.selectedDayText,
                ]}
              >
                {date.getDate()}
              </Text>
              {marking?.label ? (
                <Text style={[styles.dayLabel, look.filled ? sheet.labelOnFill : sheet.label, slots?.dayLabel]} numberOfLines={1}>
                  {marking.label}
                </Text>
              ) : null}
              {marking?.dots?.length ? (
                <View style={styles.dots}>
                  {marking.dots.slice(0, MAX_MARKING_DOTS).map((color, i) => (
                    // biome-ignore lint/suspicious/noArrayIndexKey: dots are positional and may repeat a colour.
                    <View key={i} style={[styles.dot, look.filled ? sheet.dotOnFill : getDotColor(color), slots?.dot]} />
                  ))}
                </View>
              ) : null}
            </View>
          )}
        </>
      )}
    </Pressable>
  );
});
