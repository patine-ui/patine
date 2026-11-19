import { Text } from '@/core/primitives/Text';
import { Touchable } from '@/core/primitives/Touchable';
import { View } from '@/core/primitives/View';
import { CLOCK_MODE } from '@/pickers/time/time.constants';
import { styles, themed } from '@/pickers/time/time.styles';
import type { ClockPartProps } from '@/pickers/time/time.types';
import { ClockField } from './ClockField';

/** The chosen time in large type, to point the dial at the hours or minutes or to type them; AM/PM beside them on a 12h clock. */
export const ClockHeader = ({ dial, theme, testID }: ClockPartProps) => {
  const period = (pm: boolean) => {
    const active = dial.isPM === pm;
    return (
      <Touchable
        theme={theme}
        onPress={() => dial.selectPeriod(pm)}
        role="radio"
        aria-checked={active}
        style={[styles.periodHalf, active && themed(theme).halfOn]}
      >
        <Text theme={theme} size="sm" weight="medium" color={active ? 'primary' : 'textSecondary'}>
          {dial.periods[pm ? 1 : 0]}
        </Text>
      </Touchable>
    );
  };

  return (
    <View style={[styles.header, dial.typing && styles.headerTop, themed(theme).gapSm]}>
      <ClockField field={CLOCK_MODE.hour} dial={dial} theme={theme} testID={testID} />
      <Text theme={theme} size="xl" style={styles.fieldText}>
        :
      </Text>
      <ClockField field={CLOCK_MODE.minute} dial={dial} theme={theme} testID={testID} />
      {dial.is12 ? (
        <View role="radiogroup" style={[styles.period, themed(theme).period]}>
          {period(false)}
          {period(true)}
        </View>
      ) : null}
    </View>
  );
};
