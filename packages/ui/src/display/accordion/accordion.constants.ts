import { ICON_POSITION } from '@/core/core.constants';
import type { Design } from '@/core/theme/theme.types';
import type { AccordionDesign } from './accordion.types';

export const ACCORDION_TYPE = {
  single: 'single',
  multiple: 'multiple',
} as const;

/**
 * Brand and Material: a chevron at the end that flips up when open (shadcn, Material expansion panels). iOS and the web:
 * a disclosure arrow before the label that turns down, as in Files and Finder lists and the browser's `<details>`.
 */
export const ACCORDION_DESIGN: Record<Design, AccordionDesign> = {
  brand: { iconPosition: ICON_POSITION.end, rotation: { closed: 0, open: 180 }, minHeight: 52, labelWeight: 'medium' },
  ios: { iconPosition: ICON_POSITION.start, rotation: { closed: -90, open: 0 }, minHeight: 44, labelWeight: 'regular' },
  material: { iconPosition: ICON_POSITION.end, rotation: { closed: 0, open: 180 }, minHeight: 56, labelWeight: 'medium' },
  web: { iconPosition: ICON_POSITION.start, rotation: { closed: -90, open: 0 }, minHeight: 44, labelWeight: 'medium' },
};
