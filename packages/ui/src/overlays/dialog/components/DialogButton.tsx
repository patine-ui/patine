import { Button } from '@/actions/button/Button';
import { useDialogContext } from '@/overlays/dialog/DialogContext';
import { DIALOG_FOOTER } from '@/overlays/dialog/dialog.constants';
import { styles } from '@/overlays/dialog/dialog.styles';
import type { DialogActionProps } from '@/overlays/dialog/dialog.types';
import { getDialogButton } from '@/overlays/dialog/dialog.utils';

/** A Button in the dialog's design: filled variants, tinted text buttons, or an iOS full-width cell. */
export const DialogButton = ({ variant = 'default', style, labelStyle, ...rest }: DialogActionProps) => {
  const { look, theme, themeOverride } = useDialogContext();
  const button = getDialogButton(look.buttons, variant);
  return (
    <Button
      theme={themeOverride}
      variant={button.variant}
      style={[look.footer === DIALOG_FOOTER.cells && styles.cellButton, style]}
      labelStyle={[button.color && { color: theme.colors[button.color] }, labelStyle]}
      {...rest}
    />
  );
};
