import { Button } from '@/actions/button/Button';
import { Text } from '@/core/primitives/Text';
import { useDialogContext } from '@/overlays/dialog/DialogContext';
import { CLOSE_BUTTON_ROOM, CLOSE_FILL_SIZE, MODAL_DESIGN } from '@/overlays/modal/modal.constants';
import { styles, themed } from '@/overlays/modal/modal.styles';
import { getClosePlace } from '@/overlays/modal/modal.utils';

interface ModalCloseButtonProps {
  label: string;
  /** Room above it, such as the status bar in a full-screen modal */
  top: number;
}

/** The ✕ in the top corner: a ghost icon button, or iOS's gray circle. 44pt to touch. */
export const ModalCloseButton = ({ label, top }: ModalCloseButtonProps) => {
  const { setOpen, theme, themeOverride } = useDialogContext();
  const look = MODAL_DESIGN[theme.design];
  return (
    <Button
      theme={themeOverride}
      size="icon"
      variant="ghost"
      aria-label={label}
      onPress={() => setOpen(false)}
      style={[styles.close, themed(theme).close, getClosePlace(top, look.padding, look.closeFill)]}
      hitSlop={look.closeFill ? (CLOSE_BUTTON_ROOM - CLOSE_FILL_SIZE) / 2 : undefined}
    >
      <Text size="sm" weight="semibold" color="textSecondary">
        ✕
      </Text>
    </Button>
  );
};
