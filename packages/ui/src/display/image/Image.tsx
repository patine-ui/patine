import { Animated, StyleSheet, View } from 'react-native';

import { useAnimatedTo } from '@/core/animation';
import { useComponentTheme } from '@/core/theme/ThemeProvider';
import { toImageSource } from '@/display/avatar/avatar.utils';
import { Skeleton } from '@/feedback/skeleton/Skeleton';
import { ImageGlyph } from './components/ImageGlyph';
import { useImageStatus } from './hooks/useImageStatus';
import { IMAGE_DESIGN } from './image.constants';
import { styles } from './image.styles';
import type { ImageProps } from './image.types';

/**
 * A picture in a frame that holds its size while it loads: a breathing placeholder first, a fade in when it arrives, and a
 * fallback when it's missing or fails. `alt` names it for screen readers; without it the image is decorative and skipped.
 */
export const Image = ({
  src,
  alt,
  width = '100%',
  height,
  aspectRatio,
  fit = 'cover',
  radius,
  placeholder,
  fallback,
  onLoad,
  onError,
  theme: themeProp,
  design,
  style,
  testID,
  ...rest
}: ImageProps) => {
  const { theme } = useComponentTheme(themeProp, design);
  const look = IMAGE_DESIGN[theme.design];
  const source = toImageSource(src);
  const { status, handleLoad, handleError } = useImageStatus(source, onLoad, onError);
  const opacity = useAnimatedTo(status === 'loaded' ? 1 : 0, { duration: theme.animation.duration });
  const corner = radius ?? look.radius;

  return (
    <View
      testID={testID}
      role={alt ? 'img' : undefined}
      aria-label={alt}
      aria-hidden={!alt}
      aria-busy={status === 'loading'}
      style={[
        styles.frame,
        {
          width,
          height,
          aspectRatio,
          borderRadius: typeof corner === 'number' ? corner : theme.radius[corner],
          backgroundColor: theme.colors.surface,
          borderWidth: look.border ? StyleSheet.hairlineWidth : 0,
          borderColor: theme.colors.border,
        },
        style,
      ]}
      {...rest}
    >
      {source && status !== 'error' ? (
        <Animated.Image
          source={source}
          resizeMode={fit}
          onLoad={handleLoad}
          onError={handleError}
          style={[StyleSheet.absoluteFill, { opacity }]}
          testID={testID ? `${testID}-image` : undefined}
        />
      ) : null}
      {status === 'loading' ? (
        <View pointerEvents="none" style={styles.layer}>
          {placeholder ?? <Skeleton width="100%" height="100%" radius={0} theme={themeProp} />}
        </View>
      ) : null}
      {status === 'error' ? <View style={styles.layer}>{fallback ?? <ImageGlyph color={theme.colors.textSecondary} />}</View> : null}
    </View>
  );
};
