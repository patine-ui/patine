import { StyleSheet } from 'react-native';

import { MIN_TOUCH_TARGET } from '@/core/a11y/a11y.constants';
import { createStyles } from '@/core/theme/theme.utils';
import { STEP_STATUS, STEPS_DESIGN } from './steps.constants';
import { getStepColors } from './steps.utils';

export const styles = StyleSheet.create({
  row: { flexDirection: 'row' },
  column: { flexDirection: 'column' },
  item: { flex: 1, alignItems: 'center', minHeight: MIN_TOUCH_TARGET },
  itemVertical: { flexDirection: 'row', minHeight: MIN_TOUCH_TARGET },
  rail: { alignItems: 'center' },
  track: { flexDirection: 'row', alignItems: 'center', alignSelf: 'stretch' },
  line: { flex: 1 },
  lineVertical: { flex: 1, minHeight: 16 },
  circle: { alignItems: 'center', justifyContent: 'center' },
  text: { alignItems: 'center' },
  textVertical: { flex: 1, paddingBottom: 16 },
  center: { textAlign: 'center' },
  hidden: { opacity: 0 },
});

/** The design's circles per status (`complete`, `current`…, and their marks `completeMark`…), connectors and spacing. */
export const themed = createStyles((t) => {
  const look = STEPS_DESIGN[t.design];
  return {
    ...Object.fromEntries(
      Object.values(STEP_STATUS).flatMap((status) => {
        const colors = getStepColors(t.colors, look, status);
        return [
          [
            status,
            {
              width: look.size,
              height: look.size,
              borderRadius: look.size / 2,
              backgroundColor: colors.fill,
              borderWidth: status === STEP_STATUS.current && !look.currentFilled ? 2 : 1,
              borderColor: colors.border,
            },
          ],
          [`${status}Mark`, { color: colors.ink }],
        ];
      })
    ),
  };
});

export const lineStyles = createStyles((t) => {
  const look = STEPS_DESIGN[t.design];
  return {
    across: { height: look.connector },
    down: { width: look.connector, marginVertical: t.spacing.xs },
    on: { backgroundColor: t.colors.primary },
    off: { backgroundColor: t.colors.border },
    textAcross: { paddingHorizontal: t.spacing.xs, marginTop: t.spacing.xs },
    textDown: { paddingStart: t.spacing.md },
  };
});

export const layoutStyles = createStyles((t) => ({
  progress: { gap: t.spacing.sm },
}));
