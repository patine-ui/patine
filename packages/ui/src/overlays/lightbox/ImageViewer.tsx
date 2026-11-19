import { useState } from 'react';
import type { KeyDownEvent } from 'react-native';
import { Modal } from 'react-native';

import { useReturnFocus } from '@/core/a11y/hooks/useReturnFocus';
import { usePresence } from '@/core/animation';
import { animatedMultiply } from '@/core/animation/animated';
import { IS_WEB } from '@/core/core.constants';
import { useControllableState } from '@/core/hooks/useControllableState';
import { useScrollLock } from '@/core/hooks/useScrollLock';
import { Text } from '@/core/primitives/Text';
import { Touchable } from '@/core/primitives/Touchable';
import { AnimatedView, View } from '@/core/primitives/View';
import { ThemeScope, useComponentTheme, useLabels, usePlatform } from '@/core/theme/ThemeProvider';
import { formatSlideLabel } from '@/display/carousel/carousel.utils';
import { Pager } from '@/display/carousel/Pager';
import { EXPANDED_TOP_INSET } from '@/overlays/sheet/sheet.constants';
import { ZoomableImage } from './components/ZoomableImage';
import { LIGHTBOX_DESIGN, ZOOM } from './lightbox.constants';
import { styles, themed } from './lightbox.styles';
import type { ImageViewerProps } from './lightbox.types';
import { dismissOpacity, getBarInset, getCounterPlace } from './lightbox.utils';

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
  const words = useLabels();
  const labels = { ...words.lightbox, ...labelsProp };
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
  const sheet = themed(theme);
  // Animated values: the viewer fades in, and the backdrop fades as the image is dragged away.
  const fade = { opacity: progress };
  const backdropFade = { opacity: animatedMultiply(progress, dismissOpacity(drag)) };

  return (
    <ThemeScope theme={themeOverride}>
      <Modal visible transparent animationType="none" statusBarTranslucent onRequestClose={close} testID={testID}>
        <AnimatedView style={[styles.backdropFill, sheet.backdrop, backdropFade]} />
        <AnimatedView style={[styles.backdropFill, fade]} aria-modal accessibilityViewIsModal {...(IS_WEB ? { onKeyDown } : {})}>
          <Pager
            value={index}
            onValueChange={setIndex}
            scrollEnabled={!zoomed}
            showArrows={platform === 'web' && images.length > 1}
            aria-label={counter}
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
          <View style={[styles.bar, look.closeSide === 'end' && styles.barEnd, sheet.bar, getBarInset(top)]}>
            <Touchable
              theme={theme}
              role="button"
              aria-label={labels.close}
              onPress={close}
              style={styles.close}
              testID={testID ? `${testID}-close` : undefined}
            >
              <View style={[styles.cross, sheet.cross, styles.crossA]} />
              <View style={[styles.cross, sheet.cross, styles.crossB]} />
            </Touchable>
            {images.length > 1 ? (
              <Text
                theme={themeOverride}
                weight="medium"
                aria-live="polite"
                style={[
                  look.counter === 'center' ? [styles.counterCenter, getCounterPlace(top, theme.spacing.md)] : styles.counter,
                  sheet.counter,
                  look.closeSide === 'end' && look.counter === 'start' && styles.startText,
                ]}
              >
                {`${index + 1} / ${images.length}`}
              </Text>
            ) : null}
          </View>
        </AnimatedView>
      </Modal>
    </ThemeScope>
  );
};
