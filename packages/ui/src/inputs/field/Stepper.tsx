import { hitSlopFor } from '@/core/a11y/a11y.utils';
import { adjustableProps } from '@/core/a11y/adjustable.utils';
import { cs } from '@/core/core.styles';
import { useControllableState } from '@/core/hooks/useControllableState';
import { Text } from '@/core/primitives/Text';
import { View } from '@/core/primitives/View';
import { ThemeScope, useComponentTheme, useLabels } from '@/core/theme/ThemeProvider';
import { StepButton } from './components/StepButton';
import { STEPPER_DESIGN } from './field.constants';
import { styles, themed } from './field.styles';
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
  'aria-label': accessibilityLabel,
  disabled = false,
  labels: labelsProp,
  theme: themeProp,
  design,
  style,
  testID,
}: StepperProps) => {
  const { theme, themeOverride } = useComponentTheme(themeProp, design);
  const range = { min, max, step };
  const [current, setCurrent] = useControllableState(value, () => clampValue(defaultValue ?? min ?? 0, range), onValueChange);
  const look = STEPPER_DESIGN[theme.design];
  const words = useLabels();
  const labels = { ...words.stepper, ...labelsProp };
  const sheet = themed(theme);
  const go = (direction: 1 | -1) => {
    const next = stepValue(current, direction, range);
    if (next !== current) setCurrent(next);
  };
  const jump = (to: number | undefined) => (to === undefined || to === current ? undefined : () => setCurrent(to));
  const separate = look.shape === 'separate';
  const button = (direction: 1 | -1) => (
    <StepButton
      direction={direction}
      label={direction === 1 ? labels.increment : labels.decrement}
      disabled={disabled || !canStep(current, direction, range)}
      onStep={() => go(direction)}
      focusable={false}
      theme={theme}
      style={[sheet.button, separate && sheet.separateButton]}
      hitSlop={hitSlopFor(look.buttonWidth, look.height)}
    />
  );
  return (
    <ThemeScope theme={themeOverride}>
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
          sheet.stepper,
          separate ? sheet.separate : [styles.clip, look.shape === 'filled' ? sheet.filled : sheet.outlined],
          disabled && cs.disabled,
          style,
        ]}
      >
        {button(-1)}
        {(showValue ?? look.showValue) ? (
          <Text weight="medium" style={[styles.value, sheet.value]} aria-hidden>
            {formatValue(current)}
          </Text>
        ) : (
          <View style={[styles.divider, sheet.divider]} />
        )}
        {button(1)}
      </View>
    </ThemeScope>
  );
};
