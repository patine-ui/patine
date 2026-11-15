import { ScrollView, StyleSheet, useWindowDimensions, View } from 'react-native';

import { hasShorthand } from '@/core/utils/shorthand.utils';
import { DialogClose, DialogDescription, DialogTitle, DialogTrigger, renderDialogActions } from '@/overlays/dialog/Dialog';
import { DialogContext, useDialogContext } from '@/overlays/dialog/DialogContext';
import { useDialogContent } from '@/overlays/dialog/hooks/useDialogContent';
import { ModalPanel } from './components/ModalPanel';
import { useModal } from './hooks/useModal';
import { useModalFrame } from './hooks/useModalFrame';
import { useModalLayout } from './ModalContext';
import { MODAL_DESIGN, MODAL_LAYOUT } from './modal.constants';
import { styles } from './modal.styles';
import type { ModalBodyProps, ModalContentProps, ModalLayoutProps, ModalProps, ModalSectionProps } from './modal.types';
import { resolveModalLayout } from './modal.utils';

/**
 * A window for rich content: forms, details, media. Centered on a wide screen and full screen on a phone. Give it `trigger`,
 * `title`, `description` and `actions` (children are the scrolling body), or put ModalTrigger and ModalContent inside for
 * full control. Closes on the backdrop, the ✕, Escape on the web and Android back, unless `dismissible={false}`. For a short
 * question with two answers, use AlertDialog.
 */
export const Modal = ({ children, trigger, title, description, actions, size, fullScreen, ...props }: ModalProps) => {
  const ctx = useModal(props);
  return (
    <DialogContext.Provider value={ctx}>
      {hasShorthand(trigger, title, description, actions) ? (
        <ModalLayout
          trigger={trigger}
          title={title}
          description={description}
          actions={actions}
          renderContent={(sections) => (
            <ModalContent size={size} fullScreen={fullScreen}>
              {sections}
            </ModalContent>
          )}
        >
          {children}
        </ModalLayout>
      ) : (
        children
      )}
    </DialogContext.Provider>
  );
};

/** Opens the modal when its one child, such as a Button, is pressed. */
export const ModalTrigger = DialogTrigger;

/** Closes the modal when its one child, such as a Button, is pressed. */
export const ModalClose = DialogClose;

/** The modal's name: a heading that labels it for screen readers. */
export const ModalTitle = DialogTitle;

/** The detail under the title, read out as the modal's description. */
export const ModalDescription = DialogDescription;

/**
 * The window: ModalHeader, ModalBody and ModalFooter inside. `size` caps its width; on a screen narrower than 600pt it fills
 * the screen (`fullScreen` decides either way). The body scrolls while the header and footer stay put.
 */
export const ModalContent = ({ size = 'md', fullScreen, ...rest }: ModalContentProps) => {
  const ctx = useDialogContext();
  const content = useDialogContent(ctx);
  const window = useWindowDimensions();
  const frame = useModalFrame({
    layout: resolveModalLayout(size, fullScreen, window.width),
    size,
    theme: ctx.theme,
    look: MODAL_DESIGN[ctx.theme.design],
    progress: content.progress,
    scale: content.scale,
  });
  if (!content.mounted) return null;
  return <ModalPanel frame={frame} content={content} {...rest} />;
};

/** The title and description at the top, clear of the close button. */
export const ModalHeader = ({ style, ...rest }: ModalSectionProps) => {
  const { theme } = useDialogContext();
  const look = MODAL_DESIGN[theme.design];
  return (
    <View
      style={[
        styles.header,
        { gap: look.headerGap, padding: look.padding, paddingBottom: look.dividers ? look.padding : look.gap / 2 },
        look.textAlign === 'center' && { paddingStart: look.padding + 44 },
        look.dividers && { borderBottomWidth: StyleSheet.hairlineWidth, borderColor: theme.colors.border },
        style,
      ]}
      {...rest}
    />
  );
};

/** The content between the header and the footer. It scrolls when it's taller than the room left. */
export const ModalBody = ({ style, contentContainerStyle, ...rest }: ModalBodyProps) => {
  const { theme } = useDialogContext();
  const look = MODAL_DESIGN[theme.design];
  const fills = useModalLayout() !== MODAL_LAYOUT.centered;
  return (
    <ScrollView
      style={[styles.body, fills && styles.bodyFill, style]}
      contentContainerStyle={[{ paddingHorizontal: look.padding, paddingVertical: look.gap / 2, gap: look.gap }, contentContainerStyle]}
      keyboardShouldPersistTaps="handled"
      {...rest}
    />
  );
};

/** The actions at the bottom, in a row at the end. */
export const ModalFooter = ({ style, ...rest }: ModalSectionProps) => {
  const { theme } = useDialogContext();
  const look = MODAL_DESIGN[theme.design];
  return (
    <View
      style={[
        styles.footer,
        { gap: theme.spacing.sm, padding: look.padding, paddingTop: look.dividers ? look.padding : look.gap / 2 },
        look.dividers && { borderTopWidth: StyleSheet.hairlineWidth, borderColor: theme.colors.border },
        style,
      ]}
      {...rest}
    />
  );
};

/** The shorthand's layout, built from the parts above: the trigger, then the panel with its header, body and footer. */
export const ModalLayout = ({ trigger, title, description, actions, renderContent, children }: ModalLayoutProps) => (
  <>
    {trigger ? <ModalTrigger>{trigger}</ModalTrigger> : null}
    {renderContent(
      <>
        {title || description ? (
          <ModalHeader>
            {title ? <ModalTitle>{title}</ModalTitle> : null}
            {description ? <ModalDescription>{description}</ModalDescription> : null}
          </ModalHeader>
        ) : null}
        {children ? <ModalBody>{children}</ModalBody> : null}
        {actions?.length ? <ModalFooter>{renderDialogActions(actions)}</ModalFooter> : null}
      </>
    )}
  </>
);
