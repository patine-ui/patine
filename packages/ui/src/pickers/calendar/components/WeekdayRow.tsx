import { Text } from '@/core/primitives/Text';
import { View } from '@/core/primitives/View';
import { CALENDAR_DESIGN } from '@/pickers/calendar/calendar.constants';
import { styles } from '@/pickers/calendar/calendar.styles';
import type { WeekdayRowProps } from '@/pickers/calendar/calendar.types';

/** The weekday names over the days, in the design's case. */
export const WeekdayRow = ({ weekdays, theme, slots }: WeekdayRowProps) => (
  <View style={[styles.week, styles.weekdays, slots?.weekdays]}>
    {weekdays.map((weekday) => (
      <View key={weekday.key} style={styles.cell}>
        <Text
          theme={theme}
          size="xs"
          weight="medium"
          color="textSecondary"
          style={[styles.weekdayText, CALENDAR_DESIGN[theme.design].uppercaseWeekdays && styles.uppercase, slots?.weekdayText]}
        >
          {weekday.label}
        </Text>
      </View>
    ))}
  </View>
);
