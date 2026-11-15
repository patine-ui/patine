import { Button } from '@/actions/button/Button';
import { Text } from '@/foundations/text/Text';
import { useDialogContext } from '@/overlays/dialog/DialogContext';
import { CLOSE_BUTTON_ROOM, CLOSE_FILL_SIZE, MODAL_DESIGN } from '@/overlays/modal/modal.constants';
import { styles } from '@/overlays/modal/modal.styles';

interface ModalCloseButtonProps {
  label: string;
  /** Room above it, such as the status bar in a full-screen modal */
  top: number;
}

/** The ✕ in the top corner: a ghost icon button, or iOS's gray circle. 44pt to touch. */
export const ModalCloseButton = ({ label, top }: ModalCloseButtonProps) => {
  const { setOpen, theme, themeOverride } = useDialogContext();
  const look = MODAL_DESIGN[theme.design];
  const inset = look.padding / 2;
  return (
    <Button
      theme={themeOverride}
      size="icon"
      variant="ghost"
      accessibilityLabel={label}
      onPress={() => setOpen(false)}
      style={[
        styles.close,
        { top: top + inset, end: inset, borderRadius: theme.radius.full },
        look.closeFill && {
          backgroundColor: theme.colors.surface,
          width: CLOSE_FILL_SIZE,
          height: CLOSE_FILL_SIZE,
          minHeight: CLOSE_FILL_SIZE,
          top: top + look.padding - 4,
          end: look.padding - 4,
        },
      ]}
      hitSlop={look.closeFill ? (CLOSE_BUTTON_ROOM - CLOSE_FILL_SIZE) / 2 : undefined}
    >
      <Text theme={themeOverride} size="sm" weight="bold" color="textSecondary">
        ✕
      </Text>
    </Button>
  );
};
