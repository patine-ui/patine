import type { Design } from '@/core/theme/theme.types';
import type { DescriptionListDesign } from './descriptions.types';

/**
 * ios: Settings › About, the name on the left and the value on the right in gray. material and brand: gray labels over
 * their values. web: a two-column definition list, as Tailwind UI's.
 */
export const DESCRIPTION_LIST_DESIGN: Record<Design, DescriptionListDesign> = {
  brand: { orientation: 'horizontal', detailsAtEnd: false, mutedTerm: true, termWidth: '40%' },
  ios: { orientation: 'horizontal', detailsAtEnd: true, mutedTerm: false, termWidth: '50%' },
  material: { orientation: 'vertical', detailsAtEnd: false, mutedTerm: true, termWidth: '40%' },
  web: { orientation: 'horizontal', detailsAtEnd: false, mutedTerm: true, termWidth: '33%' },
};
