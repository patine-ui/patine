import { Text } from '@/core/primitives/Text';
import { Touchable } from '@/core/primitives/Touchable';
import { Pressable, View } from '@/core/primitives/View';
import { useLabels } from '@/core/theme/ThemeProvider';
import { SKIN_TONES } from '@/pickers/emoji/emoji.constants';
import { styles, themed } from '@/pickers/emoji/emoji.styles';
import type { SkinTonePopoverProps } from '@/pickers/emoji/emoji.types';
import { getPopoverPlace, squareOf, withSkinTone } from '@/pickers/emoji/emoji.utils';

/** One emoji in every skin tone, over the emoji that was long-pressed; a tap outside closes it. */
export const SkinTonePopover = ({
  emoji,
  left,
  top,
  size,
  fontSize,
  renderEmoji,
  onSelect,
  onClose,
  theme,
  slots,
}: SkinTonePopoverProps) => {
  const words = useLabels();
  return (
    <>
      <Pressable style={styles.fillArea} onPress={onClose} role="button" aria-label={words.close} />
      <View style={[styles.tonePopover, getPopoverPlace(left, top), styles.popoverPad, themed(theme).popover, slots?.skinTonePopover]}>
        {SKIN_TONES.map((tone) => {
          const char = withSkinTone(emoji, tone);
          return (
            <Touchable
              key={tone}
              theme={theme}
              onPress={() => onSelect(tone)}
              role="button"
              aria-label={`${emoji.name}, skin tone ${tone}`}
              style={[styles.cell, squareOf(size), themed(theme).cell]}
            >
              {renderEmoji ? (
                renderEmoji(char, emoji, fontSize)
              ) : (
                <Text selectable={false} style={[{ fontSize, lineHeight: fontSize * 1.2 }, slots?.emojiText]}>
                  {char}
                </Text>
              )}
            </Touchable>
          );
        })}
      </View>
    </>
  );
};
