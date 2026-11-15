import type { Design } from '@/core/theme/theme.types';
import type { ProgressDesign } from './progress.types';

/** iOS and Material 3: a thin 4pt track. The web and brand: an 8px rounded track, as shadcn draws it. */
export const PROGRESS_DESIGN: Record<Design, ProgressDesign> = {
  brand: { height: 8, track: 'surface' },
  ios: { height: 4, track: 'surface' },
  material: { height: 4, track: 'primaryMuted' },
  web: { height: 8, track: 'surface' },
};

/** How much of the track the moving segment covers while indeterminate. */
export const INDETERMINATE_SHARE = 0.4;

/** How long the fill takes to reach a new value, in ms. */
export const PROGRESS_FILL_MS = 250;
