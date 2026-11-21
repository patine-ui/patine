import { themed } from '@/ai/chat/chat.styles';
import { useSweep } from '@/core/animation';
import { AnimatedView, View } from '@/core/primitives/View';
import { ThemeScope, useComponentTheme } from '@/core/theme/ThemeProvider';
import { TYPING_DOTS } from './typing.constants';
import { styles } from './typing.styles';
import type { TypingIndicatorProps } from './typing.types';
import { dotWave, typingLabel } from './typing.utils';

const DOTS = Array.from({ length: TYPING_DOTS.count }, (_, i) => i);

/**
 * Three dots in an incoming bubble that light up in turn while someone, or an assistant, writes a reply. Shaped like
 * MessageBubble's `from="them"` in every design. Screen readers hear "Maya is typing" when it appears; the dots hold still
 * when the OS asks to reduce motion.
 */
export const TypingIndicator = ({
  name,
  'aria-label': accessibilityLabel,
  theme: themeProp,
  design,
  style,
  ...rest
}: TypingIndicatorProps) => {
  const { theme, themeOverride } = useComponentTheme(themeProp, design);
  const sweep = useSweep(true, TYPING_DOTS.period);
  const sheet = themed(theme);
  // Animated values: each dot's opacity follows the sweep.
  const fades = DOTS.map((i) => ({ opacity: sweep.interpolate(dotWave(i, TYPING_DOTS.count, TYPING_DOTS.min)) }));
  return (
    <ThemeScope theme={themeOverride}>
      <View
        accessible
        aria-label={accessibilityLabel ?? typingLabel(name)}
        aria-live="polite"
        style={[styles.bubble, sheet.typing, style]}
        {...rest}
      >
        {DOTS.map((i) => (
          <AnimatedView key={i} style={[styles.dot, sheet.dot, fades[i]]} />
        ))}
      </View>
    </ThemeScope>
  );
};
