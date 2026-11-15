import type { Design } from '@/core/theme/theme.types';
import type { CardDesign } from './card.types';

/**
 * iOS groups content on a filled surface without a border or shadow; Material and the web outline it. A pressable card rises
 * on hover: two steps up the shadow scale and 2pt up in brand and the web, one step in place in Material (its elevated
 * card's hover), and two steps in place on iOS, whose touch screens dim it on press instead.
 */
export const CARD_DESIGN: Record<Design, CardDesign> = {
  brand: { radius: 'lg', border: true, shadow: 'xs', hoverSteps: 2, hoverLift: 2, hoverTint: false },
  ios: { radius: 'md', border: false, shadow: 'none', hoverSteps: 2, hoverLift: 0, hoverTint: true },
  material: { radius: 'lg', border: true, shadow: 'none', hoverSteps: 1, hoverLift: 0, hoverTint: true },
  web: { radius: 'md', border: true, shadow: 'xs', hoverSteps: 2, hoverLift: 2, hoverTint: false },
};
