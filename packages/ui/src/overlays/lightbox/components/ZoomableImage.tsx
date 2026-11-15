import { Animated, Pressable } from 'react-native';

import { useZoom } from '@/overlays/lightbox/hooks/useZoom';
import { styles } from '@/overlays/lightbox/lightbox.styles';
import type { ZoomableImageProps } from '@/overlays/lightbox/lightbox.types';

/** One page of the viewer: an image that fits the screen, pinches and double-taps to zoom, and drags down to close. */
export const ZoomableImage = ({ image, ...props }: ZoomableImageProps) => {
  const zoom = useZoom(props);
  return (
    <Animated.View style={styles.page} onLayout={zoom.onLayout} {...zoom.panHandlers}>
      <Pressable accessible={false} tabIndex={-1} onPress={zoom.onPress} style={styles.page}>
        <Animated.Image
          source={image.source}
          accessibilityLabel={image.alt}
          accessibilityIgnoresInvertColors
          role="img"
          resizeMode="contain"
          style={[
            styles.image,
            { transform: [{ translateX: zoom.x }, { translateY: Animated.add(zoom.y, zoom.dismiss) }, { scale: zoom.scale }] },
          ]}
        />
      </Pressable>
    </Animated.View>
  );
};
