import { Text } from '@/core/primitives/Text';
import { FIELD_DESIGN, FIELD_LABEL } from '@/overlays/sheet/sheet.constants';
import { sheetStyles, styles } from '@/overlays/sheet/sheet.styles';
import type { FieldMessageProps } from '@/overlays/sheet/sheet.types';
import { getFieldMessage } from '@/overlays/sheet/sheet.utils';

/** The line under a field: the error message, or the helper text. Announced as it changes. */
export const FieldMessage = ({ error, helperText, centered = false, theme, style }: FieldMessageProps) => {
  const message = getFieldMessage(error, helperText);
  if (!message) return null;
  const inset = !centered && FIELD_DESIGN[theme.design].label === FIELD_LABEL.floating;
  return (
    <Text
      size="sm"
      color={error ? 'danger' : 'textSecondary'}
      aria-live="polite"
      style={[styles.fieldMessage, centered && styles.centeredMessage, inset && sheetStyles(theme).messageInset, style]}
    >
      {message}
    </Text>
  );
};
