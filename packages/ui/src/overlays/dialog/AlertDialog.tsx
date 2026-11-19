import { BUTTON_VARIANT } from '@/actions/button/button.constants';
import { useLabels } from '@/core/theme/ThemeProvider';
import { hasShorthand } from '@/core/utils/shorthand.utils';
import { DialogButton } from './components/DialogButton';
import { DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogLayout, DialogTitle, DialogTrigger } from './Dialog';
import { DialogContext, useDialogContext } from './DialogContext';
import type { AlertDialogProps, DialogActionProps } from './dialog.types';
import { useDialog } from './hooks/useDialog';

/**
 * A dialog that asks the user to confirm or cancel: the backdrop doesn't close it, and Cancel takes focus first. Escape
 * and Android back still cancel, unless `dismissible={false}`. Give it `title`, `description`, `confirmLabel` and
 * `onConfirm`, or compose AlertDialogContent and its parts for full control.
 */
export const AlertDialog = ({
  children,
  trigger,
  title,
  description,
  confirmLabel,
  cancelLabel,
  destructive,
  onConfirm,
  onCancel,
  ...props
}: AlertDialogProps) => {
  const words = useLabels();
  const ctx = useDialog(props, true);
  return (
    <DialogContext.Provider value={ctx}>
      {hasShorthand(trigger, title, description, confirmLabel, cancelLabel, destructive, onConfirm, onCancel) ? (
        <DialogLayout
          trigger={trigger}
          title={title}
          description={description}
          footer={
            <DialogFooter>
              <AlertDialogCancel onPress={onCancel}>{cancelLabel ?? words.alertDialog.cancel}</AlertDialogCancel>
              <AlertDialogAction variant={destructive ? BUTTON_VARIANT.destructive : BUTTON_VARIANT.default} onPress={onConfirm}>
                {confirmLabel ?? words.alertDialog.confirm}
              </AlertDialogAction>
            </DialogFooter>
          }
        >
          {children}
        </DialogLayout>
      ) : (
        children
      )}
    </DialogContext.Provider>
  );
};

/** Confirms: runs its `onPress`, then closes. `variant="destructive"` draws it in the danger color. */
export const AlertDialogAction = ({ variant = 'default', onPress, ...rest }: DialogActionProps) => {
  const { setOpen } = useDialogContext();
  return (
    <DialogButton
      variant={variant}
      onPress={(e) => {
        onPress?.(e);
        setOpen(false);
      }}
      {...rest}
    />
  );
};

/** Closes without doing anything. It takes focus when the dialog opens. */
export const AlertDialogCancel = ({ variant = 'outline', onPress, ...rest }: DialogActionProps) => {
  const { setOpen, initialFocus } = useDialogContext();
  return (
    <DialogButton
      ref={initialFocus}
      variant={variant}
      onPress={(e) => {
        onPress?.(e);
        setOpen(false);
      }}
      {...rest}
    />
  );
};

export const AlertDialogTrigger = DialogTrigger;
export const AlertDialogContent = DialogContent;
export const AlertDialogHeader = DialogHeader;
export const AlertDialogTitle = DialogTitle;
export const AlertDialogDescription = DialogDescription;
export const AlertDialogFooter = DialogFooter;
