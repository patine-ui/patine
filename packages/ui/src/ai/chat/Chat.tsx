import { View } from 'react-native';

import { useComponentTheme } from '@/core/theme/ThemeProvider';
import { Text } from '@/foundations/text/Text';
import { BUBBLE_MAX_WIDTH, CHAT_DESIGN, MESSAGE_FROM } from './chat.constants';
import { styles } from './chat.styles';
import type { MessageBubbleProps } from './chat.types';
import { getBubbleColors, getBubbleCorners } from './chat.utils';

/** One chat message: mine at the end in the primary color, theirs at the start, with an optional name above and time under it. */
export const MessageBubble = ({
  from = MESSAGE_FROM.them,
  name,
  meta,
  theme: themeProp,
  design,
  style,
  bubbleStyle,
  textStyle,
  children,
  ...rest
}: MessageBubbleProps) => {
  const { theme, themeOverride } = useComponentTheme(themeProp, design);
  const look = CHAT_DESIGN[theme.design];
  const colors = getBubbleColors(theme.colors, look, from);
  return (
    <View style={[styles.message, from === MESSAGE_FROM.me ? styles.mine : styles.theirs, { gap: 2 }, style]} {...rest}>
      {name ? (
        <Text theme={themeOverride} size="xs" weight="medium" color="textSecondary" style={{ paddingHorizontal: theme.spacing.sm }}>
          {name}
        </Text>
      ) : null}
      <View
        style={[
          styles.bubble,
          getBubbleCorners(look, from),
          {
            maxWidth: BUBBLE_MAX_WIDTH,
            backgroundColor: colors.background,
            borderColor: colors.border,
            paddingHorizontal: theme.spacing.md,
            paddingVertical: theme.spacing.sm,
          },
          bubbleStyle,
        ]}
      >
        {typeof children === 'string' || typeof children === 'number' ? (
          <Text theme={themeOverride} selectable style={[{ color: colors.text }, textStyle]}>
            {children}
          </Text>
        ) : (
          children
        )}
      </View>
      {meta ? (
        <Text theme={themeOverride} size="xs" color="textSecondary" style={{ paddingHorizontal: theme.spacing.sm }}>
          {meta}
        </Text>
      ) : null}
    </View>
  );
};
