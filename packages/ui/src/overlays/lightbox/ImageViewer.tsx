import { useState } from 'react';
import type { KeyDownEvent } from 'react-native';
import { Animated, Modal, Pressable, StyleSheet, View } from 'react-native';

import { usePresence } from '@/core/animation';
import { IS_WEB } from '@/core/core.constants';
import { useControllableState } from '@/core/hooks/useControllableState';
import { useReturnFocus } from '@/core/hooks/useReturnFocus';
import { useScrollLock } from '@/core/hooks/useScrollLock';
import { useComponentTheme, usePlatform } from '@/core/theme/ThemeProvider';
import { formatSlideLabel } from '@/display/carousel/carousel.utils';
import { Pager } from '@/display/carousel/Pager';
import { Text } from '@/foundations/text/Text';
import { EXPANDED_TOP_INSET } from '@/overlays/sheet/sheet.constants';
import { ZoomableImage } from './components/ZoomableImage';
import {
  DEFAULT_LIGHTBOX_LABELS,
  LIGHTBOX_BACKDROP,
  LIGHTBOX_DESIGN,
  LIGHTBOX_FOREGROUND,
  LIGHTBOX_SCRIM,
  ZOOM,
} from './lightbox.constants';
import { styles } from './lightbox.styles';
import type { ImageViewerProps } from './lightbox.types';
import { dismissOpacity } from './lightbox.utils';

const ZOOM_KEYS: Record<string, number> = { '+': ZOOM.step, '=': ZOOM.step, '-': 1, '0': 1 };

/**
 * A full-screen photo viewer: swipe between images, pinch or double-tap to zoom, drag a zoomed image around, and drag
 * down to close. On the web, arrows move between images, + and − zoom, and Escape closes. Black in light and dark mode.
 */
export const ImageViewer = ({
  images,
  open,
  onOpenChange,
  value,
  defaultValue = 0,
  onValueChange,
  swipeToClose = true,
  labels: labelsProp,
  theme: themeProp,
  design,
  testID,
}: ImageViewerProps) => {
  const { theme, themeOverride } = useComponentTheme(themeProp, design);
  const platform = usePlatform();
  const look = LIGHTBOX_DESIGN[theme.design];
  const labels = { ...DEFAULT_LIGHTBOX_LABELS, ...labelsProp };
  const [index, setIndex] = useControllableState(value, defaultValue, onValueChange);
  const [zoomed, setZoomed] = useState(false);
  const [drag, setDrag] = useState(0);
  const [command, setCommand] = useState<{ scale: number; id: number } | null>(null);
  const { mounted, progress } = usePresence({ visible: open, duration: theme.animation.duration });
  useReturnFocus(mounted);
  useScrollLock(mounted);
  if (!mounted) return null;

  const close = () => {
    setDrag(0);
    if (open) onOpenChange(false);
  };
  const onKeyDown = (e: KeyDownEvent) => {
    const scale = ZOOM_KEYS[e.nativeEvent.key];
    if (scale === undefined) return;
    e.preventDefault();
    setCommand((c) => ({
      scale,
      id: (c?.id ?? 0) + 1,
    }));
  };
  const counter = formatSlideLabel(labels.image, index + 1, images.length);
  const top = EXPANDED_TOP_INSET[platform] ?? 0;

  return (
    <Modal visible transparent animationType="none" statusBarTranslucent onRequestClose={close} testID={testID}>
      <Animated.View
        style={[
          StyleSheet.absoluteFill,
          { backgroundColor: LIGHTBOX_BACKDROP, opacity: Animated.multiply(progress, dismissOpacity(drag)) },
        ]}
      />
      <Animated.View
        style={[StyleSheet.absoluteFill, { opacity: progress }]}
        aria-modal
        accessibilityViewIsModal
        {...(IS_WEB ? { onKeyDown } : {})}
      >
        <Pager
          value={index}
          onValueChange={setIndex}
          scrollEnabled={!zoomed}
          showArrows={platform === 'web' && images.length > 1}
          accessibilityLabel={counter}
          labels={{ previous: labels.previous, next: labels.next, slide: labels.image }}
          theme={themeOverride}
          style={styles.fill}
          testID={testID ? `${testID}-pager` : undefined}
        >
          {images.map((image, i) => (
            <ZoomableImage
              // biome-ignore lint/suspicious/noArrayIndexKey: images are positions in the list; the same source may repeat.
              key={i}
              image={image}
              active={i === index}
              command={i === index ? command : null}
              swipeToClose={swipeToClose}
              duration={theme.animation.duration}
              onZoomChange={setZoomed}
              onDismissDrag={setDrag}
              onDismiss={close}
            />
          ))}
        </Pager>
        <View
          style={[
            styles.bar,
            look.closeSide === 'end' && styles.barEnd,
            { paddingTop: top, paddingHorizontal: theme.spacing.sm, backgroundColor: LIGHTBOX_SCRIM },
          ]}
        >
          <Pressable
            role="button"
            accessibilityLabel={labels.close}
            onPress={close}
            style={styles.close}
            testID={testID ? `${testID}-close` : undefined}
          >
            <View style={[styles.cross, { backgroundColor: LIGHTBOX_FOREGROUND, transform: [{ rotate: '45deg' }] }]} />
            <View style={[styles.cross, { backgroundColor: LIGHTBOX_FOREGROUND, transform: [{ rotate: '-45deg' }] }]} />
          </Pressable>
          {images.length > 1 ? (
            <Text
              theme={themeOverride}
              weight="medium"
              aria-live="polite"
              style={[
                look.counter === 'center' ? [styles.counterCenter, { top: top + theme.spacing.md }] : styles.counter,
                { color: LIGHTBOX_FOREGROUND, paddingHorizontal: theme.spacing.sm },
                look.closeSide === 'end' && look.counter === 'start' && { textAlign: 'left' },
              ]}
            >
              {`${index + 1} / ${images.length}`}
            </Text>
          ) : null}
        </View>
      </Animated.View>
    </Modal>
  );
};
