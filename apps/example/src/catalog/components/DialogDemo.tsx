import type { ReactNode } from 'react';

import { AlertDialog, AlertDialogContent, Dialog, DialogContent, Modal, ModalContent } from 'patine-ui';

interface OpenerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children?: ReactNode;
  dismissible?: boolean;
}

/** The playground's opener passes `open` and `onOpenChange`; these put the body in the dialog's content. */
export const DialogDemo = ({ children, ...props }: OpenerProps) => (
  <Dialog {...props}>
    <DialogContent>{children}</DialogContent>
  </Dialog>
);

export const AlertDialogDemo = ({ children, ...props }: OpenerProps) => (
  <AlertDialog {...props}>
    <AlertDialogContent>{children}</AlertDialogContent>
  </AlertDialog>
);

interface ModalOpenerProps extends OpenerProps {
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  fullScreen?: boolean;
  showCloseButton?: boolean;
}

export const ModalDemo = ({ open, onOpenChange, children, dismissible, ...content }: ModalOpenerProps) => (
  <Modal dismissible={dismissible} open={open} onOpenChange={onOpenChange}>
    <ModalContent {...content}>{children}</ModalContent>
  </Modal>
);
