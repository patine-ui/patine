import { ARROW_FOCUS } from '@/core/a11y/keyboard.utils';
import { View } from '@/core/primitives/View';
import { CALENDAR_VIEW } from '@/pickers/calendar/calendar.constants';
import { themed } from '@/pickers/calendar/calendar.styles';
import { CalendarHeader } from '@/pickers/calendar/components/CalendarHeader';
import { QuickGrid } from '@/pickers/calendar/components/QuickGrid';
import { useMonthGrid } from '@/pickers/month/hooks/useMonthGrid';
import { MONTH_GRID_HEIGHT } from '@/pickers/month/month.constants';
import type { MonthGridProps } from '@/pickers/month/month.types';

/** Material's and the web's month picker: the months of a year to tap, under the year; tap the year for a grid of years. */
export const MonthGrid = (props: MonthGridProps) => {
  const { theme, style, styles: slots, testID } = props;
  const grid = useMonthGrid(props);
  return (
    <View style={[themed(theme).container, style]} {...ARROW_FOCUS} testID={testID}>
      <CalendarHeader
        label={grid.title}
        spokenLabel={grid.title}
        // The header's caret points down while the title opens a grid, as the calendar's day view does.
        view={grid.view === CALENDAR_VIEW.years ? CALENDAR_VIEW.years : CALENDAR_VIEW.days}
        enableQuickJump
        isArrowDisabled={grid.isArrowDisabled}
        onTitlePress={grid.toggleView}
        onArrowPress={grid.onArrowPress}
        theme={theme}
        slots={slots}
      />
      <QuickGrid cells={grid.cells} height={MONTH_GRID_HEIGHT} onSelect={grid.select} theme={theme} slots={slots} />
    </View>
  );
};
