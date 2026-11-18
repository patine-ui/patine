import type React from 'react';
import type { DimensionValue, ImageResizeMode, ImageSourcePropType, StyleProp, ViewProps, ViewStyle } from 'react-native';

import type { ThemableProps } from '@/core/core.types';
import type { Theme } from '@/core/theme/theme.types';

export type ImageStatus = 'loading' | 'loaded' | 'error';

export type ImageFit = Exclude<ImageResizeMode, 'repeat'>;

export type ImageRadius = keyof Theme['radius'] | number;

export interface ImageDesign {
  radius: keyof Theme['radius'];
  border: boolean;
}

export interface ImageProps extends Omit<ViewProps, 'children'>, ThemableProps {
  /** The picture: a URL or an image source. Shows `fallback` when missing or when it fails to load */
  src?: string | ImageSourcePropType;
  /** What the picture shows, read by screen readers. Leave it out for a decorative image, which they skip */
  alt?: string;
  /** Default: '100%' */
  width?: DimensionValue;
  height?: DimensionValue;
  /** Width over height, e.g. 16 / 9. Sizes the frame before the picture arrives, so nothing jumps */
  aspectRatio?: number;
  /** How the picture fills the frame: 'cover' (default), 'contain', 'stretch' or 'center' */
  fit?: ImageFit;
  /** A radius step, 'full' for a circle, or points. Default: the design's ('lg' in brand and Material, 'md' in iOS and the web) */
  radius?: ImageRadius;
  /** Shown while loading. Default: a breathing placeholder (still when reducing motion) */
  placeholder?: React.ReactNode;
  /** Shown when there's no picture or it fails to load. Default: a picture glyph on a muted surface */
  fallback?: React.ReactNode;
  onLoad?: () => void;
  onError?: () => void;
  style?: StyleProp<ViewStyle>;
}
