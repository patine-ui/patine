import { memo } from 'react';

import { Text } from '@/core/primitives/Text';
import { Touchable } from '@/core/primitives/Touchable';
import { styles } from '@/pickers/emoji/emoji.styles';
import type { EmojiCellProps } from '@/pickers/emoji/emoji.types';

export const EmojiCell = memo(({ emoji, char, size, fontSize, renderEmoji, onSelect, onLongPress, theme, slots }: EmojiCellProps) => (
  <Touchable
    theme={theme}
    onPress={() => onSelect(emoji, char)}
    onLongPress={onLongPress && (() => onLongPress(emoji))}
    role="button"
    aria-label={emoji.name}
    style={({ pressed }) => [
      styles.cell,
      { width: size, height: size, borderRadius: theme.radius.sm },
      pressed && styles.cellPressed,
      slots?.emojiCell,
    ]}
  >
    {renderEmoji ? (
      renderEmoji(char, emoji, fontSize)
    ) : (
      <Text selectable={false} style={[{ fontSize, lineHeight: fontSize * 1.2 }, slots?.emojiText]}>
        {char}
      </Text>
    )}
  </Touchable>
));
