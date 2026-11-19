import { useControllableState } from '@/core/hooks/useControllableState';
import { View } from '@/core/primitives/View';
import { ThemeScope, useComponentTheme } from '@/core/theme/ThemeProvider';
import { Checkbox } from './Checkbox';
import { styles, themed } from './checkbox.styles';
import type { CheckboxGroupProps } from './checkbox.types';
import { getAllChecked, toggleAll, toggleChecked } from './checkbox.utils';

/**
 * A set of checkboxes for picking any number of options, from `options` ({ value, label }). `selectAllLabel` adds a parent
 * box that checks or clears them all and shows a dash when some are checked.
 */
export const CheckboxGroup = ({
  options,
  value,
  defaultValue = [],
  onValueChange,
  selectAllLabel,
  disabled = false,
  orientation = 'vertical',
  controlPosition,
  theme: themeProp,
  design,
  style,
  ...rest
}: CheckboxGroupProps) => {
  const { theme, themeOverride } = useComponentTheme(themeProp, design);
  const sheet = themed(theme);
  const [checked, setChecked] = useControllableState<readonly string[]>(value, defaultValue, (next) => onValueChange?.([...next]));
  const horizontal = orientation === 'horizontal';
  return (
    <ThemeScope theme={themeOverride}>
      <View role="group" aria-disabled={disabled} style={[horizontal && sheet.groupGap, style]} {...rest}>
        {selectAllLabel ? (
          <Checkbox
            theme={themeOverride}
            label={selectAllLabel}
            checked={getAllChecked(options, checked)}
            onCheckedChange={() => setChecked(toggleAll(options, checked))}
            disabled={disabled}
            controlPosition={controlPosition}
          />
        ) : null}
        <View style={[horizontal && [styles.groupRow, sheet.groupRow], !!selectAllLabel && !horizontal && sheet.indented]}>
          {options.map((option) => (
            <Checkbox
              key={option.value}
              theme={themeOverride}
              label={option.label}
              description={option.description}
              disabled={disabled || option.disabled}
              checked={checked.includes(option.value)}
              onCheckedChange={() => setChecked(toggleChecked(options, checked, option.value))}
              controlPosition={controlPosition}
            />
          ))}
        </View>
      </View>
    </ThemeScope>
  );
};
