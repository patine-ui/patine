import type { Design } from '@/core/theme/theme.types';
import type { SuggestionsDesign } from './suggestions.types';

/**
 * Brand: outlined pills. iOS: filled gray pills, like Messages' quick replies. Material 3: outlined suggestion chips with
 * 8dp corners. The web (ChatGPT, Claude): outlined buttons with a small radius.
 */
export const SUGGESTIONS_DESIGN: Record<Design, SuggestionsDesign> = {
  brand: { variant: 'outline', radius: 'full' },
  ios: { variant: 'secondary', radius: 'full' },
  material: { variant: 'outline', radius: 'sm' },
  web: { variant: 'outline', radius: 'md' },
};

export const SUGGESTIONS_LABEL = 'Suggestions';
