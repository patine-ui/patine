/** Role flags on each path, the same bits as Patine Pro's. Outline only needs `cut`; the rest ride along for Pro. */
export const ROLE = {
  /** A closed shape: filled in Pro's solid, duotone and color variants */
  body: 1,
  /** A detail inside a body */
  inner: 2,
  /** The second color in Pro's `color` variant */
  accent: 4,
  /** Drawn on top with a gap around it: the slash in eye-off */
  cut: 8,
} as const;

export const ICON_SIZE = { sm: 16, md: 20, lg: 24 } as const;

export const DEFAULT_STROKE_WIDTH = 1.5;

/** How wide the gap around a `cut` stroke is, as a multiple of the stroke width. */
export const CUT_GAP = 2.6;
