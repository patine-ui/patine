import { Text } from '@/core/primitives/Text';
import { Touchable } from '@/core/primitives/Touchable';
import { sheetStyles, styles } from '@/overlays/sheet/sheet.styles';
import type { SheetCloseButtonProps } from '@/overlays/sheet/sheet.types';

/** The ✕ of a sheet shown as a centered modal, which has no handle to drag away. 44pt to touch. */
export const SheetCloseButton = ({ label, onPress, theme }: SheetCloseButtonProps) => (
  <Touchable theme={theme} onPress={onPress} role="button" aria-label={label} style={[styles.close, sheetStyles(theme).round]}>
    <Text size="sm" weight="semibold" color="textSecondary">
      ✕
    </Text>
  </Touchable>
);
