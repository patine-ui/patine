import { View } from '@/core/primitives/View';
import { ThemeScope, useComponentTheme } from '@/core/theme/ThemeProvider';
import { useRadioGroupState } from './hooks/useRadioGroupState';
import { RadioGroupContext } from './RadioGroupContext';
import { RadioGroupItem } from './RadioGroupItem';
import { styles, themed } from './radio.styles';
import type { RadioGroupProps } from './radio.types';

/**
 * A set of options where one can be chosen. Give it `options` ({ value, label }), or put `RadioGroupItem`s inside; arrow keys
 * move and select on the web.
 */
export const RadioGroup = ({
  value,
  defaultValue,
  onValueChange,
  disabled = false,
  orientation = 'vertical',
  theme: themeProp,
  design,
  style,
  options,
  children,
  ...rest
}: RadioGroupProps) => {
  const { theme, themeOverride } = useComponentTheme(themeProp, design);
  const ctx = useRadioGroupState({
    value,
    defaultValue,
    onValueChange,
    disabled,
    theme,
  });
  return (
    <ThemeScope theme={themeOverride}>
      <RadioGroupContext.Provider value={ctx}>
        <View
          role="radiogroup"
          aria-disabled={disabled}
          style={[orientation === 'horizontal' && styles.row, themed(theme).row, style]}
          {...rest}
        >
          {options ? options.map((option) => <RadioGroupItem key={option.value} {...option} />) : children}
        </View>
      </RadioGroupContext.Provider>
    </ThemeScope>
  );
};
