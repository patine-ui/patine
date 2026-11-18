import { Animated, StyleSheet, View } from 'react-native';

import { CHAT_DESIGN } from '@/ai/chat/chat.constants';
import { useSweep } from '@/core/animation';
import { useComponentTheme } from '@/core/theme/ThemeProvider';
import { TYPING_DOTS, TYPING_PADDING } from './typing.constants';
import type { TypingIndicatorProps } from './typing.types';
import { dotWave, typingLabel } from './typing.utils';

const DOTS = Array.from({ length: TYPING_DOTS.count }, (_, i) => i);

/**
 * Three dots in an incoming bubble that light up in turn while someone, or an assistant, writes a reply. Shaped like
 * MessageBubble's `from="them"` in every design. Screen readers hear "Maya is typing" when it appears; the dots hold still
 * when the OS asks to reduce motion.
 */
export const TypingIndicator = ({ name, accessibilityLabel, theme: themeProp, design, style, ...rest }: TypingIndicatorProps) => {
  const { theme } = useComponentTheme(themeProp, design);
  const look = CHAT_DESIGN[theme.design];
  const sweep = useSweep(true, TYPING_DOTS.period);
  return (
    <View
      accessible
      aria-label={accessibilityLabel ?? typingLabel(name)}
      aria-live="polite"
      style={[
        {
          alignSelf: 'flex-start',
          flexDirection: 'row',
          gap: TYPING_DOTS.gap,
          paddingHorizontal: TYPING_PADDING.horizontal,
          paddingVertical: TYPING_PADDING.vertical,
          borderRadius: look.radius,
          borderBottomStartRadius: look.tailRadius,
          backgroundColor: theme.colors[look.theirs],
          borderWidth: look.theirsBorder ? StyleSheet.hairlineWidth : 0,
          borderColor: theme.colors.border,
        },
        style,
      ]}
      {...rest}
    >
      {DOTS.map((i) => (
        <Animated.View
          key={i}
          style={{
            width: TYPING_DOTS.size,
            height: TYPING_DOTS.size,
            borderRadius: TYPING_DOTS.size / 2,
            backgroundColor: theme.colors.textSecondary,
            opacity: sweep.interpolate(dotWave(i, TYPING_DOTS.count, TYPING_DOTS.min)),
          }}
        />
      ))}
    </View>
  );
};
