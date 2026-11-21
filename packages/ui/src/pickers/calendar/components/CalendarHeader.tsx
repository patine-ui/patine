import { StyleSheet } from 'react-native';

import { ChevronMark } from '@/core/components/ChevronMark';
import { Text } from '@/core/primitives/Text';
import { Touchable } from '@/core/primitives/Touchable';
import { View } from '@/core/primitives/View';
import { useLabels } from '@/core/theme/ThemeProvider';
import { ARROW_DIRECTION, ARROW_DIRECTIONS, CALENDAR_DESIGN, CALENDAR_VIEW } from '@/pickers/calendar/calendar.constants';
import { styles, themed } from '@/pickers/calendar/calendar.styles';
import type { CalendarHeaderProps } from '@/pickers/calendar/calendar.types';

export const CalendarHeader = ({
  label,
  spokenLabel,
  view,
  enableQuickJump,
  isArrowDisabled,
  onTitlePress,
  onArrowPress,
  renderArrow,
  theme,
  slots,
}: CalendarHeaderProps) => {
  const words = useLabels();
  return (
    <View style={[styles.header, themed(theme).header, slots?.header]}>
      {enableQuickJump ? (
        <Touchable
          theme={theme}
          onPress={onTitlePress}
          style={[styles.titleButton, themed(theme).title]}
          role="button"
          aria-label={spokenLabel}
        >
          <Text theme={theme} weight="semibold" style={slots?.headerTitle}>
            {label}
          </Text>
          <Text theme={theme} size="sm" weight="semibold" color="primary" style={styles.caret}>
            {view === CALENDAR_VIEW.days ? '▾' : '▴'}
          </Text>
        </Touchable>
      ) : (
        <View style={styles.titleButton} role="heading" aria-label={spokenLabel}>
          <Text theme={theme} weight="semibold" style={slots?.headerTitle}>
            {label}
          </Text>
        </View>
      )}
      <View style={styles.arrows}>
        {ARROW_DIRECTIONS.map((direction) => {
          const disabled = isArrowDisabled(direction);
          return (
            <Touchable
              key={direction}
              theme={theme}
              disabled={disabled}
              onPress={() => onArrowPress(direction)}
              style={[styles.arrow, themed(theme).round, slots?.arrow]}
              role="button"
              aria-label={direction === 'prev' ? words.calendar.previous : words.calendar.next}
            >
              {renderArrow ? (
                renderArrow(direction, disabled)
              ) : (
                // The `arrowText` slot's color tints the drawn chevron.
                <ChevronMark
                  direction={direction === ARROW_DIRECTION.prev ? 'back' : 'forward'}
                  color={String(StyleSheet.flatten(slots?.arrowText)?.color ?? theme.colors[CALENDAR_DESIGN[theme.design].arrowColor])}
                />
              )}
            </Touchable>
          );
        })}
      </View>
    </View>
  );
};
