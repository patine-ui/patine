import type { ReactNode } from 'react';

import { AlertDialog, AlertDialogContent, Dialog, DialogContent, Modal, ModalContent } from 'patine-ui';

interface OpenerProps {
  visible: boolean;
  onClose: () => void;
  children?: ReactNode;
  dismissible?: boolean;
}

/** The playground's opener passes `visible` and `onClose`; these map them onto `open` and `onOpenChange`. */
export const DialogDemo = ({ visible, onClose, children, ...props }: OpenerProps) => (
  <Dialog {...props} open={visible} onOpenChange={(open) => !open && onClose()}>
    <DialogContent>{children}</DialogContent>
  </Dialog>
);

export const AlertDialogDemo = ({ visible, onClose, children, ...props }: OpenerProps) => (
  <AlertDialog {...props} open={visible} onOpenChange={(open) => !open && onClose()}>
    <AlertDialogContent>{children}</AlertDialogContent>
  </AlertDialog>
);

interface ModalOpenerProps extends OpenerProps {
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  fullScreen?: boolean;
  showCloseButton?: boolean;
}

export const ModalDemo = ({ visible, onClose, children, dismissible, ...content }: ModalOpenerProps) => (
  <Modal dismissible={dismissible} open={visible} onOpenChange={(open) => !open && onClose()}>
    <ModalContent {...content}>{children}</ModalContent>
  </Modal>
);
