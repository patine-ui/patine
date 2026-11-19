import { Text } from '@/core/primitives/Text';
import { Touchable } from '@/core/primitives/Touchable';
import { BUTTON_HIT_SLOP } from '@/overlays/sheet/sheet.constants';
import { sheetStyles, styles } from '@/overlays/sheet/sheet.styles';
import type { SheetButtonProps } from '@/overlays/sheet/sheet.types';

export const SheetButton = ({ label, onPress, primary = false, disabled, theme }: SheetButtonProps) => {
  return (
    <Touchable
      theme={theme}
      onPress={onPress}
      disabled={disabled}
      hitSlop={BUTTON_HIT_SLOP}
      role="button"
      style={[styles.button, sheetStyles(theme).button]}
    >
      <Text weight={primary ? 'semibold' : 'regular'} color={primary ? 'primary' : 'textSecondary'}>
        {label}
      </Text>
    </Touchable>
  );
};
