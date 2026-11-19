import { Children, isValidElement } from 'react';
import { KeyboardAvoidingView, Modal } from 'react-native';

import { KEYBOARD_AVOID_BEHAVIOR } from '@/core/core.constants';
import { Scroll } from '@/core/primitives/Scroll';
import { Text } from '@/core/primitives/Text';
import { AnimatedView, View } from '@/core/primitives/View';
import { hasShorthand } from '@/core/utils/shorthand.utils';
import { Heading } from '@/foundations/text/Heading';
import type { HeadingProps, TextProps } from '@/foundations/text/text.types';
import { DialogButton } from './components/DialogButton';
import { PressSlot } from './components/PressSlot';
import { DialogContext, useDialogContext } from './DialogContext';
import { DIALOG_FOOTER } from './dialog.constants';
import { styles, themed } from './dialog.styles';
import type {
  DialogAction,
  DialogContentProps,
  DialogLayoutProps,
  DialogPressSlotProps,
  DialogProps,
  DialogSectionProps,
} from './dialog.types';
import { getFooterDirection } from './dialog.utils';
import { useDialog } from './hooks/useDialog';
import { useDialogContent } from './hooks/useDialogContent';

/**
 * A modal window over the screen. Give it `trigger`, `title`, `description` and `actions` (children are the body), or put
 * DialogTrigger and DialogContent inside for full control. Closes on the backdrop, Escape on the web and Android back, unless
 * `dismissible={false}`.
 */
export const Dialog = ({ children, trigger, title, description, actions, ...props }: DialogProps) => {
  const ctx = useDialog(props, false);
  return (
    <DialogContext.Provider value={ctx}>
      {hasShorthand(trigger, title, description, actions) ? (
        <DialogLayout
          trigger={trigger}
          title={title}
          description={description}
          footer={actions?.length ? <DialogFooter>{renderDialogActions(actions)}</DialogFooter> : null}
        >
          {children}
        </DialogLayout>
      ) : (
        children
      )}
    </DialogContext.Provider>
  );
};

/** Opens the dialog when its one child, such as a Button, is pressed. */
export const DialogTrigger = ({ children }: DialogPressSlotProps) => {
  const { open, setOpen } = useDialogContext();
  return (
    <PressSlot onPress={() => setOpen(true)} aria-expanded={open}>
      {children}
    </PressSlot>
  );
};

/** Closes the dialog when its one child, such as a Button, is pressed. */
export const DialogClose = ({ children }: DialogPressSlotProps) => {
  const { setOpen } = useDialogContext();
  return <PressSlot onPress={() => setOpen(false)}>{children}</PressSlot>;
};

/** The dialog's window: a centered card over a dimmed backdrop. Scrolls when taller than the screen. */
export const DialogContent = ({ children, style, ...rest }: DialogContentProps) => {
  const ctx = useDialogContext();
  const { theme, alert } = ctx;
  const content = useDialogContent(ctx);
  const sheet = themed(theme);
  if (!content.mounted) return null;

  return (
    <Modal
      visible
      transparent
      animationType="none"
      statusBarTranslucent
      onRequestClose={content.onRequestClose}
      onShow={content.onShow}
      testID={rest.testID ? `${rest.testID}-modal` : undefined}
    >
      <KeyboardAvoidingView behavior={KEYBOARD_AVOID_BEHAVIOR} style={styles.fill}>
        {/* A responder, not a Pressable: the web's focus trap skips it, and a drag that starts in the card doesn't close it */}
        <AnimatedView
          testID={rest.testID ? `${rest.testID}-backdrop` : undefined}
          style={[styles.fill, sheet.backdrop, content.fade]}
          onStartShouldSetResponder={() => !!content.onBackdropPress}
          onResponderRelease={content.onBackdropPress}
        />
        <View style={styles.container} pointerEvents="box-none">
          <AnimatedView
            role={alert ? 'alertdialog' : 'dialog'}
            aria-modal
            aria-labelledby={ctx.titleId}
            aria-describedby={ctx.descriptionId}
            accessibilityViewIsModal
            onAccessibilityEscape={content.onRequestClose}
            {...rest}
            style={[styles.card, sheet.card, content.pop, style]}
          >
            <Scroll style={styles.scroll} contentContainerStyle={sheet.body} bounces={false}>
              {children}
            </Scroll>
          </AnimatedView>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
};

/** The title and description at the top. */
export const DialogHeader = ({ style, ...rest }: DialogSectionProps) => {
  const { theme } = useDialogContext();
  return <View style={[themed(theme).header, style]} {...rest} />;
};

/** The dialog's name: a heading that labels it for screen readers. */
export const DialogTitle = ({ level = 2, style, ...rest }: HeadingProps) => {
  const { look, titleId, themeOverride, theme } = useDialogContext();
  return (
    <Heading nativeID={titleId} level={level} size={look.titleSize} theme={themeOverride} style={[themed(theme).text, style]} {...rest} />
  );
};

/** The detail under the title, read out as the dialog's description. */
export const DialogDescription = ({ style, ...rest }: TextProps) => {
  const { look, descriptionId, themeOverride, theme } = useDialogContext();
  return (
    <Text
      nativeID={descriptionId}
      size={look.descriptionSize}
      color="textSecondary"
      theme={themeOverride}
      style={[themed(theme).text, style]}
      {...rest}
    />
  );
};

/** The buttons at the bottom: a row at the end, or iOS's full-width cells split by hairlines. */
export const DialogFooter = ({ children, style, ...rest }: DialogSectionProps) => {
  const { look, theme } = useDialogContext();
  const items = Children.toArray(children);
  const direction = getFooterDirection(look.footer, items.length);
  if (look.footer === DIALOG_FOOTER.row)
    return (
      <View style={[styles.row, style]} {...rest}>
        {children}
      </View>
    );
  const sheet = themed(theme);

  return (
    <View style={[styles.cells, sheet.hairline, direction === 'row' ? styles.rowCells : styles.columnCells, sheet.cells, style]} {...rest}>
      {items.map((item, i) => (
        <View
          key={isValidElement(item) ? item.key : String(item)}
          style={[
            direction === 'row' ? styles.cell : styles.stackedCell,
            i > 0 && [sheet.hairline, direction === 'row' ? styles.cellDivider : styles.cells],
          ]}
        >
          {item}
        </View>
      ))}
    </View>
  );
};

/** The shorthand's layout, built from the parts above: the trigger, then the content with its header, the body and a footer. */
export const DialogLayout = ({ trigger, title, description, footer, children }: DialogLayoutProps) => (
  <>
    {trigger ? <DialogTrigger>{trigger}</DialogTrigger> : null}
    <DialogContent>
      {title || description ? (
        <DialogHeader>
          {title ? <DialogTitle>{title}</DialogTitle> : null}
          {description ? <DialogDescription>{description}</DialogDescription> : null}
        </DialogHeader>
      ) : null}
      {children}
      {footer}
    </DialogContent>
  </>
);

/**
 * The shorthand's `actions`: a button in the dialog's design for each, that runs its `onPress`, then closes. An array, not
 * one element, so DialogFooter can lay each button out in its own iOS cell.
 */
export const renderDialogActions = (actions: DialogAction[]) =>
  actions.map(({ label, ...rest }) => (
    <DialogClose key={label}>
      <DialogButton {...rest}>{label}</DialogButton>
    </DialogClose>
  ));
