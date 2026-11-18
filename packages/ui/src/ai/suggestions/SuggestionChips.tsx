import { ScrollView } from 'react-native';

import { Button } from '@/actions/button/Button';
import { useComponentTheme } from '@/core/theme/ThemeProvider';
import { SUGGESTIONS_DESIGN, SUGGESTIONS_LABEL } from './suggestions.constants';
import type { SuggestionChipsProps } from './suggestions.types';

/** Quick replies in a row that scrolls sideways: prompts to start a chat from, or answers to the last question. */
export const SuggestionChips = ({
  suggestions,
  onPress,
  disabled,
  accessibilityLabel = SUGGESTIONS_LABEL,
  theme: themeProp,
  design,
  style,
}: SuggestionChipsProps) => {
  const { theme, themeOverride } = useComponentTheme(themeProp, design);
  const look = SUGGESTIONS_DESIGN[theme.design];
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      role="group"
      aria-label={accessibilityLabel}
      keyboardShouldPersistTaps="handled"
      style={style}
      contentContainerStyle={{ gap: theme.spacing.sm, paddingHorizontal: theme.spacing.sm }}
    >
      {suggestions.map((suggestion) => (
        <Button
          key={suggestion}
          theme={themeOverride}
          variant={look.variant}
          size="sm"
          disabled={disabled}
          onPress={() => onPress(suggestion)}
          style={{ borderRadius: theme.radius[look.radius] }}
        >
          {suggestion}
        </Button>
      ))}
    </ScrollView>
  );
};
