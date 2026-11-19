import { Button } from '@/actions/button/Button';
import { themed } from '@/ai/chat/chat.styles';
import { Scroll } from '@/core/primitives/Scroll';
import { ThemeScope, useComponentTheme, useLabels } from '@/core/theme/ThemeProvider';
import { SUGGESTIONS_DESIGN } from './suggestions.constants';
import { chipStyles } from './suggestions.styles';
import type { SuggestionChipsProps } from './suggestions.types';

/** Quick replies in a row that scrolls sideways: prompts to start a chat from, or answers to the last question. */
export const SuggestionChips = ({
  suggestions,
  onPress,
  disabled,
  accessibilityLabel: accessibilityLabelProp,
  theme: themeProp,
  design,
  style,
}: SuggestionChipsProps) => {
  const words = useLabels();
  const accessibilityLabel = accessibilityLabelProp ?? words.suggestions;
  const { theme, themeOverride } = useComponentTheme(themeProp, design);
  const look = SUGGESTIONS_DESIGN[theme.design];
  const sheet = themed(theme);
  return (
    <ThemeScope theme={themeOverride}>
      <Scroll
        horizontal
        showsHorizontalScrollIndicator={false}
        role="group"
        aria-label={accessibilityLabel}
        style={style}
        contentContainerStyle={sheet.chips}
      >
        {suggestions.map((suggestion) => (
          <Button
            key={suggestion}
            variant={look.variant}
            size="sm"
            disabled={disabled}
            onPress={() => onPress(suggestion)}
            style={chipStyles(theme).chip}
          >
            {suggestion}
          </Button>
        ))}
      </Scroll>
    </ThemeScope>
  );
};
