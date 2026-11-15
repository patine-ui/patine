import type { Design } from '@/core/theme/theme.types';
import type { TooltipDesign } from './tooltip.types';

export const DEFAULT_DELAY_MS = 500;
export const DEFAULT_SKIP_DELAY_MS = 300;
/** After a long press the tooltip stays this long, as Material's do. */
export const LONG_PRESS_HIDE_MS = 1500;
export const TOOLTIP_MAX_WIDTH = 280;
export const ESCAPE_KEY = 'Escape';

/**
 * Brand and the web use a small dark chip; Material 3's plain tooltip is a 4dp inverse-surface label. iOS has no tooltips,
 * so it gets a light callout with an arrow, like an iPad popover.
 */
export const TOOLTIP_DESIGN: Record<Design, TooltipDesign> = {
  brand: {
    background: 'text',
    foreground: 'background',
    radius: 'full',
    paddingX: 10,
    paddingY: 6,
    textSize: 'xs',
    raised: false,
    arrow: false,
    sideOffset: 6,
  },
  ios: {
    background: 'sheet',
    foreground: 'text',
    radius: 'md',
    paddingX: 12,
    paddingY: 8,
    textSize: 'sm',
    raised: true,
    arrow: true,
    sideOffset: 6,
  },
  material: {
    background: 'text',
    foreground: 'background',
    radius: 'md',
    paddingX: 8,
    paddingY: 4,
    textSize: 'xs',
    raised: false,
    arrow: false,
    sideOffset: 4,
  },
  web: {
    background: 'text',
    foreground: 'background',
    radius: 'sm',
    paddingX: 8,
    paddingY: 4,
    textSize: 'sm',
    raised: false,
    arrow: false,
    sideOffset: 4,
  },
};
