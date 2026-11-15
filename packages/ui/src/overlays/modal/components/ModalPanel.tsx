import { Animated, KeyboardAvoidingView, Modal, Platform, StyleSheet, View } from 'react-native';

import { PLATFORM } from '@/core/core.constants';
import { useDialogContext } from '@/overlays/dialog/DialogContext';
import type { useDialogContent } from '@/overlays/dialog/hooks/useDialogContent';
import { ModalLayoutContext } from '@/overlays/modal/ModalContext';
import { DEFAULT_CLOSE_LABEL } from '@/overlays/modal/modal.constants';
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
  closeLabel = DEFAULT_CLOSE_LABEL,
  children,
  style,
  ...rest
}: ModalPanelProps) => {
  const ctx = useDialogContext();
  const top = (StyleSheet.flatten(frame.panel)?.paddingTop as number | undefined) ?? 0;
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
      <KeyboardAvoidingView behavior={Platform.OS === PLATFORM.ios ? 'padding' : undefined} style={StyleSheet.absoluteFill}>
        {/* A responder, not a Pressable: the web's focus trap skips it, and a drag that starts in the panel doesn't close it */}
        <Animated.View
          testID={rest.testID ? `${rest.testID}-backdrop` : undefined}
          style={[StyleSheet.absoluteFill, { backgroundColor: ctx.theme.colors.backdrop, opacity: content.progress }]}
          onStartShouldSetResponder={() => !!content.onBackdropPress}
          onResponderRelease={content.onBackdropPress}
        />
        <View style={frame.container} pointerEvents="box-none">
          <Animated.View
            role="dialog"
            aria-modal
            aria-labelledby={ctx.titleId}
            aria-describedby={ctx.descriptionId}
            accessibilityViewIsModal
            onAccessibilityEscape={content.onRequestClose}
            {...rest}
            style={[frame.panel, { opacity: content.progress, transform: frame.transform }, style]}
          >
            <ModalLayoutContext.Provider value={frame.layout}>{children}</ModalLayoutContext.Provider>
            {showCloseButton ? <ModalCloseButton label={closeLabel} top={top} /> : null}
          </Animated.View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
};
