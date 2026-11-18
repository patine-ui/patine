import type { ImageSourcePropType } from 'react-native';

import type { ThemableProps } from '@/core/core.types';

export interface LightboxImage {
  /** A URL, or a `require`d image */
  source: ImageSourcePropType;
  /** Read by screen readers */
  alt?: string;
}

export interface LightboxLabels {
  /** Default: 'Close' */
  close: string;
  /** Default: 'Previous image' */
  previous: string;
  /** Default: 'Next image' */
  next: string;
  /** The counter, with `{page}` and `{count}`. Default: 'Image {page} of {count}' */
  image: string;
}

export interface ImageViewerProps extends ThemableProps {
  images: readonly LightboxImage[];
  open: boolean;
  /** Closed by the close button, a swipe down, Escape or Android back */
  onOpenChange: (open: boolean) => void;
  /** The image shown, from 0. Pair with `onValueChange` to control it */
  value?: number;
  /** The first image when uncontrolled. Default: 0 */
  defaultValue?: number;
  /** The user went to another image. Not called when you change `value` */
  onValueChange?: (index: number) => void;
  /** Close by dragging an image down. Default: true */
  swipeToClose?: boolean;
  /** Its built-in text, for translation */
  labels?: Partial<LightboxLabels>;
  testID?: string;
}

export interface LightboxDesign {
  closeSide: 'start' | 'end';
  counter: 'start' | 'center';
}

/** An image's zoom and pan, in points from its centre. */
export interface ZoomState {
  scale: number;
  x: number;
  y: number;
}

export interface ZoomableImageProps {
  image: LightboxImage;
  active: boolean;
  /** A zoom asked for by a key: the scale, and a counter so the same scale can be asked again */
  command: { scale: number; id: number } | null;
  swipeToClose: boolean;
  duration: number;
  onZoomChange: (zoomed: boolean) => void;
  onDismissDrag: (dy: number) => void;
  onDismiss: () => void;
}
