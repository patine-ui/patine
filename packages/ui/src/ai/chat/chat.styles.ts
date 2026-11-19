import { StyleSheet } from 'react-native';

import { createStyles } from '@/core/theme/theme.utils';
import { BUBBLE_MAX_WIDTH, CHAT_DESIGN, MESSAGE_FROM } from './chat.constants';
import { getBubbleColors, getBubbleCorners } from './chat.utils';

export const styles = StyleSheet.create({
  message: { width: '100%', gap: 2 },
  mine: { alignItems: 'flex-end' },
  theirs: { alignItems: 'flex-start' },
  bubble: { borderWidth: StyleSheet.hairlineWidth },
  composer: { flexDirection: 'row', alignItems: 'flex-end' },
  input: { flex: 1 },
  sendGlyph: { fontSize: 18, lineHeight: 20 },
  stopGlyph: { width: 12, height: 12, borderRadius: 2 },
});

/** Each side's bubble (`me`, `them`) and its text (`meText`, `themText`) in the design's shape and colors. */
export const themed = createStyles((t) => {
  const look = CHAT_DESIGN[t.design];
  const bubble = (from: (typeof MESSAGE_FROM)[keyof typeof MESSAGE_FROM]) => {
    const colors = getBubbleColors(t.colors, look, from);
    return {
      ...getBubbleCorners(look, from),
      maxWidth: BUBBLE_MAX_WIDTH,
      backgroundColor: colors.background,
      borderColor: colors.border,
      paddingHorizontal: t.spacing.md,
      paddingVertical: t.spacing.sm,
    };
  };
  return {
    me: bubble(MESSAGE_FROM.me),
    them: bubble(MESSAGE_FROM.them),
    meText: { color: getBubbleColors(t.colors, look, MESSAGE_FROM.me).text },
    themText: { color: getBubbleColors(t.colors, look, MESSAGE_FROM.them).text },
    caption: { paddingHorizontal: t.spacing.sm },
    composer: { gap: t.spacing.sm, padding: t.spacing.sm },
    onPrimary: { color: t.colors.onPrimary },
    onPrimaryFill: { backgroundColor: t.colors.onPrimary },
    // The typing indicator: an incoming bubble's shape and fill, and its dots.
    typing: {
      borderRadius: look.radius,
      borderBottomStartRadius: look.tailRadius,
      backgroundColor: t.colors[look.theirs],
      borderWidth: look.theirsBorder ? StyleSheet.hairlineWidth : 0,
      borderColor: t.colors.border,
    },
    dot: { backgroundColor: t.colors.textSecondary },
    chips: { gap: t.spacing.sm, paddingHorizontal: t.spacing.sm },
  };
});
