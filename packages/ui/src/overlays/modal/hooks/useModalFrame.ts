import type { Animated } from 'react-native';
import { useWindowDimensions } from 'react-native';

import { PLATFORM } from '@/core/core.constants';
import { useDirection, usePlatform } from '@/core/theme/ThemeProvider';
import type { Theme } from '@/core/theme/theme.types';
import { resolveDialogRadius } from '@/overlays/dialog/dialog.utils';
import { DRAWER_SIDE, FULL_SCREEN_RISE, MODAL_LAYOUT, MODAL_SIZE } from '@/overlays/modal/modal.constants';
import { styles } from '@/overlays/modal/modal.styles';
import type { DrawerSide, ModalDesign, ModalFrame, ModalLayout, ModalSize } from '@/overlays/modal/modal.types';
import { getDrawerWidth } from '@/overlays/modal/modal.utils';
import { EXPANDED_TOP_INSET, IOS_BOTTOM_INSET } from '@/overlays/sheet/sheet.constants';

interface FrameOptions {
  layout: ModalLayout;
  size: ModalSize;
  side?: DrawerSide;
  theme: Theme;
  look: ModalDesign;
  progress: Animated.Value;
  scale: Animated.AnimatedInterpolation<number>;
}

/**
 * Where the panel sits and how it enters. Centered: a card that grows in. Full screen: the whole screen, below the status
 * bar and above the home indicator, rising in. Drawer: a full-height side panel sliding in from its edge.
 */
// ponytail: fixed status-bar and home-indicator insets (core has no safe-area API), the same ones BottomSheet uses.
export const useModalFrame = ({ layout, size, side = DRAWER_SIDE.end, theme, look, progress, scale }: FrameOptions): ModalFrame => {
  const rtl = useDirection() === 'rtl';
  const window = useWindowDimensions();
  const platform = usePlatform();
  const insets = { paddingTop: EXPANDED_TOP_INSET[platform] ?? 0, paddingBottom: platform === PLATFORM.ios ? IOS_BOTTOM_INSET : 0 };
  const surface = { backgroundColor: theme.colors.sheet, boxShadow: theme.shadows[look.shadow] };

  if (layout === MODAL_LAYOUT.centered)
    return {
      layout,
      container: styles.centered,
      panel: [styles.centeredPanel, surface, { maxWidth: MODAL_SIZE[size].modal, borderRadius: resolveDialogRadius(look.radius, theme) }],
      transform: [{ scale }],
    };
  if (layout === MODAL_LAYOUT.fullScreen)
    return {
      layout,
      container: styles.fill,
      panel: [styles.fullPanel, surface, insets],
      transform: [{ translateY: progress.interpolate({ inputRange: [0, 1], outputRange: [FULL_SCREEN_RISE, 0] }) }],
    };

  const width = getDrawerWidth(size, window.width);
  const atStart = side === DRAWER_SIDE.start;
  // Start is the left edge in LTR, the right in RTL; the slide comes from off that edge.
  const offscreen = (atStart ? -width : width) * (rtl ? -1 : 1);
  const corner = look.drawerRadius;
  return {
    layout,
    container: [styles.drawerRow, { justifyContent: atStart ? 'flex-start' : 'flex-end' }],
    panel: [
      styles.drawerPanel,
      surface,
      insets,
      { width },
      atStart
        ? { borderTopEndRadius: corner, borderBottomEndRadius: corner }
        : { borderTopStartRadius: corner, borderBottomStartRadius: corner },
    ],
    transform: [{ translateX: progress.interpolate({ inputRange: [0, 1], outputRange: [offscreen, 0] }) }],
  };
};
