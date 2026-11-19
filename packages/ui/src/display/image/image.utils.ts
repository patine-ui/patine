import type { DimensionValue, ImageSourcePropType, ImageURISource, ViewStyle } from 'react-native';

import { IS_WEB } from '@/core/core.constants';
import type { ImageStatus } from './image.types';

/** What identifies a source across renders: its URI (an inline `{ uri }` is a new object every render) or its asset number. */
export const sourceKey = (source: ImageSourcePropType | undefined): string => {
  if (source === undefined || source === null) return '';
  if (typeof source === 'number') return `asset:${source}`;
  // A list of sizes (`[{ uri: '@1x' }, { uri: '@2x' }]`) is one picture.
  const sources: readonly ImageURISource[] = Array.isArray(source) ? source : [source as ImageURISource];
  return sources.map((s) => s.uri ?? '').join('|');
};

/** A source's status: what it last settled to, or loading when it's new. No source at all is an error, so the fallback shows. */
export const toImageStatus = (key: string, settled: { key: string; status: ImageStatus } | null): ImageStatus => {
  if (!key) return 'error';
  return settled?.key === key ? settled.status : 'loading';
};

/** On the web, the `aria-label` React Native Web turns into the `<img>`'s `alt`. Native reads `alt` from the frame instead. */
export const getImageAlt = (alt: string | undefined) => (IS_WEB && alt ? { 'aria-label': alt } : {});

/** The frame's size and corners: a theme radius step or points. */
export const getFrameBox = (
  width: DimensionValue | undefined,
  height: DimensionValue | undefined,
  aspectRatio: number | undefined,
  borderRadius: number
): ViewStyle => ({
  width,
  height,
  aspectRatio,
  borderRadius,
});
