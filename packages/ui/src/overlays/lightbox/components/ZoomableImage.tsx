import { animatedAdd } from '@/core/animation/animated';
import { AnimatedImage, AnimatedView, Pressable } from '@/core/primitives/View';
import { toImageSource } from '@/display/avatar/avatar.utils';
import { useZoom } from '@/overlays/lightbox/hooks/useZoom';
import { styles } from '@/overlays/lightbox/lightbox.styles';
import type { ZoomableImageProps } from '@/overlays/lightbox/lightbox.types';

/** One page of the viewer: an image that fits the screen, pinches and double-taps to zoom, and drags down to close. */
export const ZoomableImage = ({ image, ...props }: ZoomableImageProps) => {
  const zoom = useZoom(props);
  // Animated values: the image pans, zooms and follows a drag to close.
  const motion = { transform: [{ translateX: zoom.x }, { translateY: animatedAdd(zoom.y, zoom.dismiss) }, { scale: zoom.scale }] };
  return (
    <AnimatedView style={styles.page} onLayout={zoom.onLayout} {...zoom.panHandlers}>
      <Pressable accessible={false} tabIndex={-1} onPress={zoom.onPress} style={styles.page}>
        <AnimatedImage
          source={toImageSource(image.src)}
          aria-label={image.alt}
          accessibilityIgnoresInvertColors
          role="img"
          resizeMode="contain"
          style={[styles.image, motion]}
        />
      </Pressable>
    </AnimatedView>
  );
};
