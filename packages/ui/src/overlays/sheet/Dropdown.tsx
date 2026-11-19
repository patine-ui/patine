import { Modal, useWindowDimensions } from 'react-native';

import { useReturnFocus } from '@/core/a11y/hooks/useReturnFocus';
import { ARROW_FOCUS } from '@/core/a11y/keyboard.utils';
import { usePresence } from '@/core/animation/hooks/usePresence';
import { AnimatedView, Pressable, View } from '@/core/primitives/View';
import { ThemeScope, useComponentTheme, useLabels } from '@/core/theme/ThemeProvider';
import { useAnchor } from './hooks/useAnchor';
import { DROPDOWN_MAX_HEIGHT } from './sheet.constants';
import { sheetStyles, styles } from './sheet.styles';
import type { DropdownProps } from './sheet.types';
import { getDropdownFrame, getRectBox, toLocalRect } from './sheet.utils';

/** A popover anchored to a field; a tap outside closes it. It fades out, so a row's ripple can finish as it closes. */
export const Dropdown = ({
  visible,
  anchor,
  onClose,
  children,
  overlay,
  maxHeight = DROPDOWN_MAX_HEIGHT,
  minWidth,
  ready = true,
  onClosed,
  style,
  theme: themeProp,
  design,
  testID,
}: DropdownProps) => {
  const words = useLabels();
  const { theme, themeOverride } = useComponentTheme(themeProp, design);
  const windowSize = useWindowDimensions();
  const { mounted, progress } = usePresence({ visible, duration: theme.animation.duration, onHidden: onClosed });
  // In an app the modal covers the window. A page that pins modals over a smaller area, like a phone preview, moves it.
  const root = useAnchor();
  useReturnFocus(mounted);
  if (!mounted || !anchor) return null;
  const area = root.rect ?? { x: 0, y: 0, ...windowSize };
  const field = toLocalRect(anchor, area);

  // Animated values: the field's overlay fades in, and the list once it's placed.
  const fade = { opacity: progress };
  const shown = { opacity: ready && root.rect ? progress : 0 };
  return (
    <ThemeScope theme={themeOverride}>
      <Modal visible transparent animationType="none" onRequestClose={onClose} testID={testID}>
        {/* One view around the field and the list, so arrow keys go between them */}
        <View ref={root.ref} onLayout={root.measure} style={styles.fill} pointerEvents="box-none" {...ARROW_FOCUS}>
          <Pressable style={styles.fill} onPress={onClose} disabled={!visible} role="button" aria-label={words.close} />
          {overlay ? <AnimatedView style={[styles.dropdownOverlay, fade, getRectBox(field)]}>{overlay}</AnimatedView> : null}
          <AnimatedView
            pointerEvents={visible ? 'auto' : 'none'}
            style={[styles.dropdown, shown, getDropdownFrame(field, area, maxHeight, minWidth), sheetStyles(theme).dropdown, style]}
          >
            {children}
          </AnimatedView>
        </View>
      </Modal>
    </ThemeScope>
  );
};
