import { Touchable } from '@/core/primitives/Touchable';
import { View } from '@/core/primitives/View';
import { useLabels } from '@/core/theme/ThemeProvider';
import { Chevron } from '@/overlays/sheet/components/Chevron';
import { CALENDAR_DESIGN } from '@/pickers/calendar/calendar.constants';
import { styles, themed } from '@/pickers/calendar/calendar.styles';
import type { ExpandHandleProps } from '@/pickers/calendar/calendar.types';

/** Under the days: a grabber on iOS, as a sheet has, and a chevron that flips in Material and on the web. */
export const ExpandHandle = ({ expanded, onPress, theme, slots }: ExpandHandleProps) => {
  const words = useLabels();
  return (
    <Touchable
      theme={theme}
      ripple={false}
      onPress={onPress}
      role="button"
      aria-label={expanded ? words.calendar.collapse : words.calendar.expand}
      aria-expanded={expanded}
      style={[styles.expandHandle, slots?.expandHandle]}
    >
      {CALENDAR_DESIGN[theme.design].expandHandle === 'grabber' ? (
        <View style={[styles.grabber, themed(theme).handle]} />
      ) : (
        <Chevron open={expanded} theme={theme} />
      )}
    </Touchable>
  );
};
