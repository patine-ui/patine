import { CHECK_MARK } from '@/core/core.constants';
import { Text } from '@/core/primitives/Text';
import { Touchable } from '@/core/primitives/Touchable';
import { View } from '@/core/primitives/View';
import { styles, themed } from '@/overlays/action/action.styles';
import type { ActionSheetRowProps } from '@/overlays/action/action.types';
import { getRowMinHeight } from '@/overlays/action/action.utils';

export const ActionSheetRow = ({
  action,
  onPress,
  grouped,
  cancel = false,
  separated,
  rowHeight,
  iconAtEnd = false,
  compact = false,
  theme,
  slots,
}: ActionSheetRowProps) => {
  const sheet = themed(theme);
  // Disabled rows take Touchable's dim, like every other control.
  const label = action.destructive ? sheet.destructive : grouped ? sheet.groupedLabel : sheet.label;
  return (
    <Touchable
      theme={theme}
      onPress={() => onPress(action)}
      disabled={action.disabled}
      role="button"
      aria-label={action.description ? `${action.label}, ${action.description}` : action.label}
      aria-selected={action.selected}
      testID={action.testID}
      style={[
        styles.row,
        grouped && styles.groupedRow,
        getRowMinHeight(rowHeight),
        sheet.row,
        compact && sheet.compactRow,
        separated && [styles.separator, sheet.separator],
        slots?.[cancel ? 'cancel' : 'action'],
      ]}
    >
      {iconAtEnd ? null : action.icon}
      <View style={grouped ? styles.groupedText : styles.text}>
        <Text
          size={grouped ? 'lg' : compact ? 'sm' : 'md'}
          weight={cancel && grouped ? 'semibold' : 'regular'}
          style={[label, slots?.[cancel ? 'cancelLabel' : 'actionLabel']]}
          numberOfLines={1}
        >
          {action.label}
        </Text>
        {action.description ? (
          <Text size="sm" color="textSecondary" style={slots?.actionDescription} numberOfLines={2}>
            {action.description}
          </Text>
        ) : null}
      </View>
      {action.selected ? (
        <Text weight="semibold" color="primary" style={[grouped && [styles.groupedCheck, sheet.groupedCheck], slots?.check]}>
          {CHECK_MARK}
        </Text>
      ) : null}
      {iconAtEnd ? action.icon : null}
    </Touchable>
  );
};
