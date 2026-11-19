import type { Design } from '@/core/theme/theme.types';
import type { ButtonGroupDesign, ToggleDesign } from './toggle.types';

export const TOGGLE_VARIANT = {
  default: 'default',
  outline: 'outline',
} as const;

/**
 * brand: clear until pressed, then a soft primary tint. ios: a gray button that turns tinted, as UIKit's tinted buttons
 * do. material: Material 3's toggle button, tonal off and filled primary on. web: shadcn's Toggle, ghost off and muted on.
 */
export const TOGGLE_DESIGN: Record<Design, ToggleDesign> = {
  brand: { offFill: null, onFill: 'primaryMuted', onText: 'primary' },
  ios: { offFill: 'surface', onFill: 'primaryMuted', onText: 'primary' },
  material: { offFill: 'surface', onFill: 'primary', onText: 'onPrimary' },
  web: { offFill: null, onFill: 'surface', onText: 'text' },
};

export const BUTTON_GROUP_DESIGN: Record<Design, ButtonGroupDesign> = {
  brand: { gap: 0, innerRadius: 0 },
  ios: { gap: 0, innerRadius: 0 },
  material: { gap: 2, innerRadius: 8 },
  web: { gap: 0, innerRadius: 0 },
};

/** Buttons' border width, which joined buttons overlap so two edges read as one. */
export const BUTTON_BORDER = 1;

/** Variants drawn as a solid fill, which need FILLED_DIVIDER when joined. */
export const FILLED_VARIANTS: readonly string[] = ['default', 'destructive'];
