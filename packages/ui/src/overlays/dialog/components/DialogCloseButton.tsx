import { Button } from '@/actions/button/Button';
import { CloseMark } from '@/core/components/CloseMark';
import { useLabels } from '@/core/theme/ThemeProvider';
import { useDialogContext } from '@/overlays/dialog/DialogContext';
import { styles, themed } from '@/overlays/dialog/dialog.styles';

/** The ✕ in the dialog's top corner, as shadcn/ui's DialogContent draws it: a ghost icon button, 44pt to touch. */
export const DialogCloseButton = ({ label }: { label?: string }) => {
  const { setOpen, theme, themeOverride } = useDialogContext();
  const words = useLabels();
  return (
    <Button
      theme={themeOverride}
      size="icon-sm"
      variant="ghost"
      aria-label={label ?? words.close}
      onPress={() => setOpen(false)}
      style={[styles.close, themed(theme).close]}
    >
      <CloseMark color={theme.colors.textSecondary} />
    </Button>
  );
};
