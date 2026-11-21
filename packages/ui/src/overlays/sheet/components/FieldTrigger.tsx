import { StyleSheet } from 'react-native';

import { CloseMark } from '@/core/components/CloseMark';
import { cs, startAlign } from '@/core/core.styles';
import { Text } from '@/core/primitives/Text';
import { Touchable } from '@/core/primitives/Touchable';
import { View } from '@/core/primitives/View';
import { useDirection, useLabels } from '@/core/theme/ThemeProvider';
import { FIELD_DESIGN, FIELD_LABEL } from '@/overlays/sheet/sheet.constants';
import { fieldStyles, sheetStyles, styles } from '@/overlays/sheet/sheet.styles';
import type { FieldTriggerProps } from '@/overlays/sheet/sheet.types';
import { getFieldAccessibility } from '@/overlays/sheet/sheet.utils';
import { Chevron } from './Chevron';
import { FloatingLabel } from './FloatingLabel';

/** The field that opens a picker: placeholder or value (or custom `children`), clear button and chevron. */
export const FieldTrigger = ({
  displayValue,
  icon,
  children,
  placeholder,
  label,
  open,
  disabled,
  clearable,
  error,
  required,
  onOpen,
  onClear,
  renderChevron,
  theme,
  slots,
  testID,
}: FieldTriggerProps) => {
  const dir = useDirection();
  const words = useLabels();
  const look = FIELD_DESIGN[theme.design];
  const borderWidth = open ? look.openBorderWidth : 1;
  const box = fieldStyles(theme);
  const sheet = sheetStyles(theme);
  const floating = look.label === FIELD_LABEL.floating && !!label;
  const raised = open || !!displayValue || children != null;
  const invalid = !!error;

  return (
    <View
      testID={testID}
      style={[styles.trigger, box.box, open && box.open, invalid && box.invalid, disabled && cs.disabled, slots?.trigger]}
    >
      {floating ? (
        <FloatingLabel
          label={label}
          raised={raised}
          open={open}
          invalid={invalid}
          required={required}
          borderWidth={borderWidth}
          theme={theme}
          style={[open ? box.floatingStartOpen : box.floatingStart, slots?.label]}
        />
      ) : null}
      {/* Full-size press target behind the content, so chips and clear stay sibling buttons */}
      <Touchable
        theme={theme}
        ripple={false}
        style={[styles.fill, sheet.pressArea]}
        onPress={onOpen}
        disabled={disabled}
        role="button"
        {...getFieldAccessibility({ name: label ?? placeholder, value: displayValue, error, required }, words)}
        aria-expanded={open}
      />
      <View style={styles.flex} pointerEvents="box-none">
        {children ??
          (displayValue ? (
            <View style={styles.triggerRow} pointerEvents="none">
              {icon ? <View style={styles.triggerIcon}>{icon}</View> : null}
              <Text style={[startAlign[dir], slots?.triggerText]} numberOfLines={1}>
                {displayValue}
              </Text>
            </View>
          ) : (
            <Text color="textSecondary" pointerEvents="none" style={[startAlign[dir], slots?.placeholder]} numberOfLines={1}>
              {floating && !raised ? '' : placeholder}
            </Text>
          ))}
      </View>
      {clearable && displayValue && !disabled ? (
        <Touchable
          theme={theme}
          onPress={onClear}
          role="button"
          aria-label={words.clear}
          style={[styles.clearButton, sheet.round, slots?.clear]}
        >
          {/* The `clear` slot's color reaches the drawn ✕ too */}
          <CloseMark size="sm" color={String(StyleSheet.flatten(slots?.clear)?.color ?? theme.colors.textSecondary)} />
        </Touchable>
      ) : null}
      <Chevron open={open} renderChevron={renderChevron} theme={theme} style={slots?.chevron} />
    </View>
  );
};
