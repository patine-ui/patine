import { StyleSheet } from 'react-native';

import { Modal } from '@/core/primitives/Modal';
import { Pressable, View } from '@/core/primitives/View';
import { useLabels } from '@/core/theme/ThemeProvider';
import type { FloatingModalProps } from '@/overlays/popover/popover.types';
import { useAnchor } from '@/overlays/sheet/hooks/useAnchor';

/** A see-through modal over the window: a tap outside, Escape or Android's Back closes it. It measures itself, as `Dropdown` does. */
export const FloatingModal = ({ visible, onClose, children }: FloatingModalProps) => {
  const words = useLabels();
  // In an app the modal covers the window. A page that pins modals over a smaller area, like a phone preview, moves it.
  const root = useAnchor();
  return (
    <Modal visible transparent animationType="none" onRequestClose={onClose}>
      <View ref={root.ref} onLayout={root.measure} style={StyleSheet.absoluteFill} pointerEvents="box-none">
        {children(root.rect)}
        <Pressable style={StyleSheet.absoluteFill} onPress={onClose} disabled={!visible} role="button" aria-label={words.close} />
      </View>
    </Modal>
  );
};
