import { Button } from '@/actions/button/Button';
import { colorStyles } from '@/core/core.styles';
import { useDialogContext } from '@/overlays/dialog/DialogContext';
import { DIALOG_FOOTER } from '@/overlays/dialog/dialog.constants';
import { styles } from '@/overlays/dialog/dialog.styles';
import type { DialogActionProps } from '@/overlays/dialog/dialog.types';
import { getDialogButton } from '@/overlays/dialog/dialog.utils';

/** A Button in the dialog's design: filled variants, tinted text buttons, or an iOS full-width cell. */
export const DialogButton = ({ variant = 'default', style, styles: slots, ...rest }: DialogActionProps) => {
  const { look, theme, themeOverride } = useDialogContext();
  const button = getDialogButton(look.buttons, variant);
  return (
    <Button
      theme={themeOverride}
      variant={button.variant}
      style={[look.footer === DIALOG_FOOTER.cells && styles.cellButton, style]}
      styles={{ ...slots, label: [button.color && colorStyles(theme)[button.color], slots?.label] }}
      {...rest}
    />
  );
};
