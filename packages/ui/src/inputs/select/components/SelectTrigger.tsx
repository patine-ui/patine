import { Text } from '@/core/primitives/Text';
import { Touchable } from '@/core/primitives/Touchable';
import { View } from '@/core/primitives/View';
import { styles, themed } from '@/inputs/select/select.styles';
import type { SelectTriggerProps } from '@/inputs/select/select.types';
import { getSelectedLabel } from '@/inputs/select/select.utils';
import { FieldTrigger } from '@/overlays/sheet/components/FieldTrigger';

/** The shared field trigger, showing the selected label or removable chips. */
export const SelectTrigger = <T,>({ selected, multiple, chips, onRemove, disabled, theme, slots, ...trigger }: SelectTriggerProps<T>) => (
  <FieldTrigger
    {...trigger}
    displayValue={getSelectedLabel(selected)}
    icon={multiple ? undefined : selected[0]?.icon}
    disabled={disabled}
    theme={theme}
    slots={slots}
  >
    {multiple && chips && selected.length > 0 ? (
      <View style={styles.chips} pointerEvents="box-none">
        {selected.map((option) => (
          <Touchable
            key={option.label}
            theme={theme}
            onPress={() => onRemove(option)}
            disabled={disabled}
            role="button"
            aria-label={`Remove ${option.label}`}
            style={[styles.chip, themed(theme).chip, slots?.chip]}
          >
            <Text size="sm" weight="medium" color="primary" style={slots?.chipText}>
              {option.label} ×
            </Text>
          </Touchable>
        ))}
      </View>
    ) : null}
  </FieldTrigger>
);
