import { KeyboardAvoidingView, Modal, StyleSheet } from 'react-native';

import { KEYBOARD_AVOID_BEHAVIOR } from '@/core/core.constants';
import { AnimatedView, View } from '@/core/primitives/View';
import { useLabels } from '@/core/theme/ThemeProvider';
import { useDialogContext } from '@/overlays/dialog/DialogContext';
import type { useDialogContent } from '@/overlays/dialog/hooks/useDialogContent';
import { ModalLayoutContext } from '@/overlays/modal/ModalContext';
import { styles, themed } from '@/overlays/modal/modal.styles';
import type { ModalContentProps, ModalFrame } from '@/overlays/modal/modal.types';
import { ModalCloseButton } from './ModalCloseButton';

interface ModalPanelProps extends Omit<ModalContentProps, 'size' | 'fullScreen'> {
  frame: ModalFrame;
  content: ReturnType<typeof useDialogContent>;
}

/**
 * The window over a dimmed backdrop, wherever the frame puts it. React Native's Modal keeps focus inside on the web and
 * closes the top one on Escape, so modals nest: open one from inside another.
 */
export const ModalPanel = ({
  frame,
  content,
  showCloseButton = true,
  closeLabel: closeLabelProp,
  children,
  style,
  ...rest
}: ModalPanelProps) => {
  const words = useLabels();
  const closeLabel = closeLabelProp ?? words.close;
  const ctx = useDialogContext();
  const top = (StyleSheet.flatten(frame.panel)?.paddingTop as number | undefined) ?? 0;
  // Animated values: the backdrop fades and the panel fades and moves in.
  const fade = { opacity: content.progress };
  const enter = { opacity: content.progress, transform: frame.transform };
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
        {/* A responder, not a Pressable: the web's focus trap skips it, and a drag that starts in the panel doesn't close it */}
        <AnimatedView
          testID={rest.testID ? `${rest.testID}-backdrop` : undefined}
          style={[styles.fill, themed(ctx.theme).backdrop, fade]}
          onStartShouldSetResponder={() => !!content.onBackdropPress}
          onResponderRelease={content.onBackdropPress}
        />
        <View style={frame.container} pointerEvents="box-none">
          <AnimatedView
            role="dialog"
            aria-modal
            aria-labelledby={ctx.titleId}
            aria-describedby={ctx.descriptionId}
            accessibilityViewIsModal
            onAccessibilityEscape={content.onRequestClose}
            {...rest}
            style={[frame.panel, enter, style]}
          >
            <ModalLayoutContext.Provider value={frame.layout}>{children}</ModalLayoutContext.Provider>
            {showCloseButton ? <ModalCloseButton label={closeLabel} top={top} /> : null}
          </AnimatedView>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
};
