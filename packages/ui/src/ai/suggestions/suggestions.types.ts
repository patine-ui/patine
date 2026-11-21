import type { StyleProp, ViewStyle } from 'react-native';

import type { ButtonVariant } from '@/actions/button/button.types';
import type { ThemableProps } from '@/core/core.types';
import type { Theme } from '@/core/theme/theme.types';

export interface SuggestionsDesign {
  variant: ButtonVariant;
  radius: keyof Theme['radius'];
}

export interface SuggestionChipsProps extends ThemableProps {
  /** The replies or prompts, shown in order. Each is its own label and the value `onPress` gets */
  suggestions: readonly string[];
  /** Called with the suggestion the user picks, e.g. to send it */
  onPress: (suggestion: string) => void;
  /** Blocks every chip, e.g. while an assistant replies */
  disabled?: boolean;
  /** Names the group for screen readers. Default: 'Suggestions' */
  'aria-label'?: string;
  style?: StyleProp<ViewStyle>;
}
