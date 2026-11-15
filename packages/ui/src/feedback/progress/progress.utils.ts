/** The value as a share of `max`, from 0 to 1, or `null` while indeterminate. */
export const getProgressRatio = (value: number | null | undefined, max: number): number | null => {
  if (value == null || !Number.isFinite(value)) return null;
  if (max <= 0) return 0;
  return Math.min(1, Math.max(0, value / max));
};
