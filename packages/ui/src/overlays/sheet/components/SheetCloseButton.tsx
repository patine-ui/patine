import { PickerText } from '@/core/components/PickerText';
import { Touchable } from '@/core/components/Touchable';
import { styles } from '@/overlays/sheet/sheet.styles';
import type { SheetCloseButtonProps } from '@/overlays/sheet/sheet.types';

/** The ✕ of a sheet shown as a centered modal, which has no handle to drag away. 44pt to touch. */
export const SheetCloseButton = ({ label, onPress, theme }: SheetCloseButtonProps) => (
  <Touchable
    theme={theme}
    onPress={onPress}
    accessibilityRole="button"
    accessibilityLabel={label}
    style={[styles.close, { borderRadius: theme.radius.full }]}
  >
    <PickerText theme={theme} size="sm" weight="bold" color="textSecondary">
      ✕
    </PickerText>
  </Touchable>
);
