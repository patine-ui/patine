import { Text } from '@/core/primitives/Text';
import { Touchable } from '@/core/primitives/Touchable';
import { View } from '@/core/primitives/View';
import { useLabels } from '@/core/theme/ThemeProvider';
import { ARROW_DIRECTIONS, CALENDAR_DESIGN, CALENDAR_VIEW } from '@/pickers/calendar/calendar.constants';
import { styles, themed } from '@/pickers/calendar/calendar.styles';
import type { CalendarHeaderProps } from '@/pickers/calendar/calendar.types';
import { getArrowGlyph } from '@/pickers/calendar/calendar.utils';

export const CalendarHeader = ({
  label,
  spokenLabel,
  view,
  enableQuickJump,
  isArrowDisabled,
  onTitlePress,
  onArrowPress,
  renderArrow,
  rtl,
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
          <Text theme={theme} weight="bold" style={slots?.headerTitle}>
            {label}
          </Text>
          <Text theme={theme} size="sm" weight="bold" color="primary" style={styles.caret}>
            {view === CALENDAR_VIEW.days ? '▾' : '▴'}
          </Text>
        </Touchable>
      ) : (
        <View style={styles.titleButton} role="heading" aria-label={spokenLabel}>
          <Text theme={theme} weight="bold" style={slots?.headerTitle}>
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
                <Text
                  theme={theme}
                  size="lg"
                  weight="bold"
                  color={CALENDAR_DESIGN[theme.design].arrowColor}
                  style={[styles.arrowText, slots?.arrowText]}
                >
                  {getArrowGlyph(direction, rtl)}
                </Text>
              )}
            </Touchable>
          );
        })}
      </View>
    </View>
  );
};
