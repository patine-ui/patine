import { StyleSheet } from 'react-native';

import { createStyles } from '@/core/theme/theme.utils';
import { STEP_SIZE, STEPPER_DESIGN } from './field.constants';

export const styles = StyleSheet.create({
  stepper: { flexDirection: 'row', alignItems: 'center', alignSelf: 'flex-start' },
  stepButton: { alignItems: 'center', justifyContent: 'center', alignSelf: 'stretch' },
  glyph: { textAlign: 'center', lineHeight: undefined },
  value: { textAlign: 'center', fontVariant: ['tabular-nums'] },
  divider: { width: StyleSheet.hairlineWidth, alignSelf: 'center' },
  stacked: { alignSelf: 'stretch', justifyContent: 'center' },
  clip: { overflow: 'hidden' },
  stackedButton: { width: STEP_SIZE * 0.75, flex: 1 },
  splitButton: { width: STEP_SIZE, height: STEP_SIZE },
  stepDivider: { height: STEP_SIZE / 2 },
});

/** The design's stepper (`separate` buttons, a `filled` pill or an `outlined` one) and NumberField's buttons. */
export const themed = createStyles((t) => {
  const look = STEPPER_DESIGN[t.design];
  const radius = t.radius[look.radius];
  return {
    stepper: { height: look.height, borderRadius: radius },
    separate: { gap: t.spacing.sm },
    filled: { backgroundColor: t.colors.surface },
    outlined: { borderWidth: 1, borderColor: t.colors.border },
    button: { width: look.buttonWidth, borderRadius: look.shape === 'separate' ? radius : 0 },
    separateButton: { height: look.height, backgroundColor: t.colors.surface },
    value: { minWidth: look.buttonWidth, paddingHorizontal: t.spacing.xs },
    divider: { height: look.height / 2, backgroundColor: t.colors.textSecondary },
    rule: { backgroundColor: t.colors.textSecondary },
    numberButton: { borderRadius: t.radius.sm },
    numberStack: { marginVertical: -t.spacing.sm },
    numberPill: { backgroundColor: t.colors.surface, borderRadius: t.radius.sm },
  };
});
