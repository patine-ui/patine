import { View } from 'react-native';

import { PickerText } from '@/core/components/PickerText';
import { DISABLED_OPACITY, MIN_TOUCH_TARGET } from '@/core/core.constants';
import { useControllableState } from '@/core/hooks/useControllableState';
import { useComponentTheme } from '@/core/theme/ThemeProvider';
import { adjustableProps } from '@/core/utils/adjustable.utils';
import { StepButton } from './components/StepButton';
import { DEFAULT_STEP_LABELS, STEPPER_DESIGN } from './field.constants';
import { styles } from './field.styles';
import type { StepperProps } from './field.types';
import { canStep, clampValue, stepValue } from './field.utils';

/**
 * A − / + control that changes a number by steps: guests, quantity, font size. Tapping steps once, holding keeps going,
 * and the buttons dim at `min` and `max`. Drawn as iOS's UIStepper, Material's tonal icon buttons, or an outlined group.
 */
export const Stepper = ({
  value,
  defaultValue,
  onValueChange,
  min,
  max,
  step = 1,
  showValue,
  formatValue = String,
  accessibilityLabel,
  disabled = false,
  labels: labelsProp,
  theme: themeProp,
  design,
  style,
  testID,
}: StepperProps) => {
  const { theme } = useComponentTheme(themeProp, design);
  const range = { min, max, step };
  const [current, setCurrent] = useControllableState(value, () => clampValue(defaultValue ?? min ?? 0, range), onValueChange);
  const look = STEPPER_DESIGN[theme.design];
  const labels = { ...DEFAULT_STEP_LABELS, ...labelsProp };
  const c = theme.colors;
  const go = (direction: 1 | -1) => {
    const next = stepValue(current, direction, range);
    if (next !== current) setCurrent(next);
  };
  const jump = (to: number | undefined) => (to === undefined || to === current ? undefined : () => setCurrent(to));
  const separate = look.shape === 'separate';
  const radius = theme.radius[look.radius];
  const slop = Math.max(0, (MIN_TOUCH_TARGET - look.height) / 2);
  const button = (direction: 1 | -1) => (
    <StepButton
      direction={direction}
      label={direction === 1 ? labels.increment : labels.decrement}
      disabled={disabled || !canStep(current, direction, range)}
      onStep={() => go(direction)}
      focusable={false}
      theme={theme}
      style={[
        { width: look.buttonWidth, borderRadius: separate ? radius : 0 },
        separate && { height: look.height, backgroundColor: c.surface },
      ]}
      hitSlop={slop || undefined}
    />
  );
  return (
    <View
      testID={testID}
      {...adjustableProps({
        label: accessibilityLabel,
        valueText: formatValue(current),
        disabled,
        onStep: go,
        onMin: jump(min),
        onMax: jump(max),
      })}
      style={[
        styles.stepper,
        { height: look.height, borderRadius: radius },
        separate
          ? { gap: theme.spacing.sm }
          : look.shape === 'filled'
            ? { backgroundColor: c.surface, overflow: 'hidden' }
            : { borderWidth: 1, borderColor: c.border, overflow: 'hidden' },
        disabled && { opacity: DISABLED_OPACITY },
        style,
      ]}
    >
      {button(-1)}
      {(showValue ?? look.showValue) ? (
        <PickerText
          theme={theme}
          weight="medium"
          style={[styles.value, { minWidth: look.buttonWidth, paddingHorizontal: theme.spacing.xs }]}
          aria-hidden
        >
          {formatValue(current)}
        </PickerText>
      ) : (
        <View style={[styles.divider, { height: look.height / 2, backgroundColor: c.textSecondary }]} />
      )}
      {button(1)}
    </View>
  );
};
