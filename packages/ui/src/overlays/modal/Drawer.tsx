import { hasShorthand } from '@/core/utils/shorthand.utils';
import { useDialogContext } from '@/overlays/dialog/DialogContext';
import { useDialogContent } from '@/overlays/dialog/hooks/useDialogContent';
import { ModalPanel } from './components/ModalPanel';
import { useModalFrame } from './hooks/useModalFrame';
import { Modal, ModalBody, ModalClose, ModalDescription, ModalFooter, ModalHeader, ModalLayout, ModalTitle, ModalTrigger } from './Modal';
import { MODAL_DESIGN, MODAL_LAYOUT } from './modal.constants';
import type { DrawerContentProps, DrawerProps } from './modal.types';

/**
 * A full-height panel that slides in from the side: navigation, filters, details. Works like Modal: give it `trigger`,
 * `title`, `description` and `actions` (children are the body), or put DrawerTrigger and DrawerContent inside.
 */
export const Drawer = ({ children, trigger, title, description, actions, side, size, showCloseButton, ...props }: DrawerProps) => (
  <Modal {...props}>
    {hasShorthand(trigger, title, description, actions) ? (
      <ModalLayout
        trigger={trigger}
        title={title}
        description={description}
        actions={actions}
        renderContent={(sections) => (
          <DrawerContent side={side} size={size} showCloseButton={showCloseButton}>
            {sections}
          </DrawerContent>
        )}
      >
        {children}
      </ModalLayout>
    ) : (
      children
    )}
  </Modal>
);
export const DrawerTrigger = ModalTrigger;
export const DrawerClose = ModalClose;
export const DrawerHeader = ModalHeader;
export const DrawerTitle = ModalTitle;
export const DrawerDescription = ModalDescription;
export const DrawerBody = ModalBody;
export const DrawerFooter = ModalFooter;

/** The side panel. `side` is the edge it slides in from, in the reading direction; `size` its width, at most 85% of the screen. */
export const DrawerContent = ({ side = 'end', size = 'sm', ...rest }: DrawerContentProps) => {
  const ctx = useDialogContext();
  const content = useDialogContent(ctx);
  const frame = useModalFrame({
    layout: MODAL_LAYOUT.drawer,
    size,
    side,
    theme: ctx.theme,
    look: MODAL_DESIGN[ctx.theme.design],
    progress: content.progress,
    scale: content.scale,
  });
  if (!content.mounted) return null;
  return <ModalPanel frame={frame} content={content} {...rest} />;
};
