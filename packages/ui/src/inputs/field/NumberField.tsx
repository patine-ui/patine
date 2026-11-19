import type { TextInputKeyPressEvent } from 'react-native';

import { A11Y_ACTION, ADJUSTABLE_ACTIONS, KEY } from '@/core/a11y/a11y.constants';
import { View } from '@/core/primitives/View';
import { ThemeScope, useComponentTheme, useLabels } from '@/core/theme/ThemeProvider';
import { stepDecimals } from '@/core/utils/track.utils';
import { TextField } from '@/inputs/textfield/TextField';
import { StepButton } from './components/StepButton';
import { NUMBER_BUTTONS, NUMBER_FIELD_DESIGN, STACKED_GLYPH } from './field.constants';
import { styles, themed } from './field.styles';
import type { NumberFieldProps } from './field.types';
import { canStep } from './field.utils';
import { useNumberField } from './hooks/useNumberField';

const STEP_SLOP = 6;

/**
 * A text field for a number, with − and + buttons: quantity, age, price. Typing is read on blur or Enter and kept within
 * `min` and `max`; the buttons, arrow keys and screen-reader adjust actions step it. Label, helper text and error work
 * as in TextField.
 */
export const NumberField = ({
  value,
  defaultValue,
  onValueChange,
  min,
  max,
  step = 1,
  hideButtons = false,
  formatValue,
  stepLabels,
  disabled = false,
  readOnly = false,
  onFocus,
  onBlur,
  onSubmitEditing,
  onKeyPress,
  theme: themeProp,
  design,
  ...rest
}: NumberFieldProps) => {
  const { theme, themeOverride } = useComponentTheme(themeProp, design);
  const range = { min, max, step };
  const field = useNumberField({ value, defaultValue, onValueChange, formatValue }, range);
  const words = useLabels();
  const labels = { ...words.stepper, ...stepLabels };
  const layout = NUMBER_FIELD_DESIGN[theme.design].buttons;
  const sheet = themed(theme);
  const blocked = disabled || readOnly;
  const button = (direction: 1 | -1, stacked = false) => (
    <StepButton
      direction={direction}
      label={direction === 1 ? labels.increment : labels.decrement}
      disabled={blocked || !canStep(field.value, direction, range)}
      onStep={() => field.step(direction)}
      focusable={false}
      hitSlop={stacked ? undefined : STEP_SLOP}
      glyph={stacked ? STACKED_GLYPH[direction] : undefined}
      theme={theme}
      style={[stacked ? styles.stackedButton : styles.splitButton, sheet.numberButton]}
    />
  );
  const buttons = hideButtons
    ? {}
    : layout === NUMBER_BUTTONS.split
      ? { startIcon: button(-1), endIcon: button(1) }
      : layout === NUMBER_BUTTONS.stacked
        ? { endIcon: <View style={[styles.stacked, sheet.numberStack]}>{[button(1, true), button(-1, true)]}</View> }
        : {
            endIcon: (
              <View style={[styles.stepper, sheet.numberPill]}>
                {button(-1)}
                <View style={[styles.divider, styles.stepDivider, sheet.rule]} />
                {button(1)}
              </View>
            ),
          };
  const decimals = stepDecimals(step) > 0;
  return (
    <ThemeScope theme={themeOverride}>
      <TextField
        theme={themeOverride}
        value={field.text}
        onValueChange={field.onChangeText}
        disabled={disabled}
        readOnly={readOnly}
        inputMode={decimals ? 'decimal' : 'numeric'}
        keyboardType={min !== undefined && min >= 0 ? (decimals ? 'decimal-pad' : 'number-pad') : 'numbers-and-punctuation'}
        role="spinbutton"
        aria-valuenow={field.value ?? undefined}
        aria-valuemin={min}
        aria-valuemax={max}
        accessibilityActions={blocked ? undefined : ADJUSTABLE_ACTIONS}
        onAccessibilityAction={(e) => field.step(e.nativeEvent.actionName === A11Y_ACTION.increment ? 1 : -1)}
        onFocus={(e) => {
          field.onFocus();
          onFocus?.(e);
        }}
        onBlur={(e) => {
          field.commit();
          onBlur?.(e);
        }}
        onSubmitEditing={(e) => {
          field.commit();
          onSubmitEditing?.(e);
        }}
        onKeyPress={(e: TextInputKeyPressEvent) => {
          const { key } = e.nativeEvent;
          if (!blocked && (key === KEY.up || key === KEY.down)) {
            e.preventDefault();
            field.step(key === KEY.up ? 1 : -1);
          }
          onKeyPress?.(e);
        }}
        {...buttons}
        {...rest}
      />
    </ThemeScope>
  );
};
