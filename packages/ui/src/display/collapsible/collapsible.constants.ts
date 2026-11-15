import { ICON_POSITION } from '@/core/core.constants';
import type { Design } from '@/core/theme/theme.types';
import type { CollapsibleDesign } from './collapsible.types';

/**
 * Brand and Material: a chevron after the label that flips up when open (shadcn, Material's expandable list item). iOS and the
 * web: a disclosure arrow before the label that turns down, as in iOS Files and the browser's `<details>`.
 */
export const COLLAPSIBLE_DESIGN: Record<Design, CollapsibleDesign> = {
  brand: { iconPosition: ICON_POSITION.end, rotation: { closed: 0, open: 180 }, minHeight: 44, labelWeight: 'medium' },
  ios: { iconPosition: ICON_POSITION.start, rotation: { closed: -90, open: 0 }, minHeight: 44, labelWeight: 'regular' },
  material: { iconPosition: ICON_POSITION.end, rotation: { closed: 0, open: 180 }, minHeight: 48, labelWeight: 'medium' },
  web: { iconPosition: ICON_POSITION.start, rotation: { closed: -90, open: 0 }, minHeight: 44, labelWeight: 'medium' },
};
