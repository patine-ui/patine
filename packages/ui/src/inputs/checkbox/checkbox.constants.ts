import type { Design } from '@/core/theme/theme.types';
import type { CheckboxDesign } from './checkbox.types';

/** iOS has no checkbox; its apps (Reminders, Mail) use a circle, so the iOS design does too. */
export const CHECKBOX_DESIGN: Record<Design, CheckboxDesign> = {
  brand: { size: 20, radius: 5, offColor: 'outline' },
  ios: { size: 22, radius: 'full', offColor: 'textDisabled' },
  material: { size: 18, radius: 2, offColor: 'textSecondary' },
  web: { size: 16, radius: 4, offColor: 'textSecondary' },
};

export const MIXED = 'mixed';
export const DASH = '–';
