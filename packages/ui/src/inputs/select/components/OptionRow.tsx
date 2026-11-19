import { startAlign } from '@/core/core.styles';
import { Text } from '@/core/primitives/Text';
import { Touchable } from '@/core/primitives/Touchable';
import { View } from '@/core/primitives/View';
import { useDirection } from '@/core/theme/ThemeProvider';
import { SELECT_DESIGN, SINGLE_INDICATOR } from '@/inputs/select/select.constants';
import { styles, themed } from '@/inputs/select/select.styles';
import type { OptionRowProps } from '@/inputs/select/select.types';
import { Check } from './Check';

export const OptionRow = <T,>({
  option,
  selected,
  disabled,
  multiple,
  showCheckmarks,
  renderOption,
  onToggle,
  theme,
  slots,
}: OptionRowProps<T>) => {
  const dir = useDirection();
  const sheet = themed(theme);
  const look = SELECT_DESIGN[theme.design];
  const radio = !multiple && look.singleIndicator === SINGLE_INDICATOR.radio;
  return (
    <Touchable
      theme={theme}
      disabled={disabled}
      onPress={() => onToggle(option)}
      role={multiple ? 'checkbox' : radio ? 'radio' : 'button'}
      aria-selected={selected}
      aria-checked={multiple || radio ? selected : undefined}
      aria-label={option.label}
      style={[
        styles.option,
        sheet.row,
        selected && sheet.rowOn,
        disabled && styles.disabledOption,
        slots?.option,
        selected && slots?.selectedOption,
      ]}
    >
      {renderOption ? (
        renderOption({ option, selected, disabled, theme })
      ) : (
        <>
          {option.icon ? <View style={[styles.icon, sheet.leading]}>{option.icon}</View> : null}
          <View style={styles.flex}>
            <Text
              theme={theme}
              weight={selected ? 'medium' : 'regular'}
              numberOfLines={1}
              style={[startAlign[dir], slots?.optionLabel, selected && slots?.selectedOptionLabel]}
            >
              {option.label}
            </Text>
            {option.description ? (
              <Text
                theme={theme}
                size="sm"
                color="textSecondary"
                numberOfLines={2}
                style={[startAlign[dir], styles.description, slots?.optionDescription]}
              >
                {option.description}
              </Text>
            ) : null}
          </View>
          {showCheckmarks && (multiple || radio || selected) ? (
            <Check selected={selected} multiple={multiple} radio={radio} theme={theme} style={slots?.check} />
          ) : null}
        </>
      )}
    </Touchable>
  );
};
