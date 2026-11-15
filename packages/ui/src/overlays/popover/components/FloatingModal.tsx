import { Modal, Pressable, StyleSheet, View } from 'react-native';

import { CLOSE_LABEL } from '@/overlays/popover/popover.constants';
import type { FloatingModalProps } from '@/overlays/popover/popover.types';
import { useAnchor } from '@/overlays/sheet/hooks/useAnchor';

/** A see-through modal over the window: a tap outside, Escape or Android's Back closes it. It measures itself, as `Dropdown` does. */
export const FloatingModal = ({ visible, onClose, children }: FloatingModalProps) => {
  // In an app the modal covers the window. A page that pins modals over a smaller area, like a phone preview, moves it.
  const root = useAnchor();
  return (
    <Modal visible transparent animationType="none" onRequestClose={onClose}>
      <View ref={root.ref} onLayout={root.measure} style={StyleSheet.absoluteFill} pointerEvents="box-none">
        {children(root.rect)}
        <Pressable
          style={StyleSheet.absoluteFill}
          onPress={onClose}
          disabled={!visible}
          accessibilityRole="button"
          accessibilityLabel={CLOSE_LABEL}
        />
      </View>
    </Modal>
  );
};
