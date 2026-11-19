import type { ViewStyle } from 'react-native';

import { clamp01 } from '@/core/utils/track.utils';
/** The value as a share of `max`, from 0 to 1, or `null` while indeterminate. */
export const getProgressRatio = (value: number | null | undefined, max: number): number | null => {
  if (value == null || !Number.isFinite(value)) return null;
  if (max <= 0) return 0;
  return clamp01(value / max);
};

/** A bar `size` thick with fully round ends. */
export const getBarShape = (size: number): ViewStyle => ({
  height: size,
  borderRadius: size / 2,
});
