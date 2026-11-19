import { SearchInput } from '@/core/components/SearchInput';
import { Text } from '@/core/primitives/Text';
import { Touchable } from '@/core/primitives/Touchable';
import { View } from '@/core/primitives/View';
import { useLabels } from '@/core/theme/ThemeProvider';
import { TONE_SWATCHES } from '@/pickers/emoji/emoji.constants';
import { styles, themed } from '@/pickers/emoji/emoji.styles';
import type { EmojiHeaderProps } from '@/pickers/emoji/emoji.types';

export const EmojiHeader = ({
  searchable,
  showSkinTones,
  query,
  onQueryChange,
  searchPlaceholder,
  tone,
  onToneButtonPress,
  theme,
  slots,
}: EmojiHeaderProps) => {
  const words = useLabels();
  return (
    <View style={[styles.header, themed(theme).header, slots?.header]}>
      {searchable ? (
        <SearchInput
          value={query}
          onChangeText={onQueryChange}
          placeholder={searchPlaceholder}
          theme={theme}
          style={slots?.searchInput}
          containerStyle={styles.flex}
        />
      ) : (
        <View style={styles.flex} />
      )}
      {showSkinTones && (
        <Touchable
          theme={theme}
          onPress={onToneButtonPress}
          role="button"
          aria-label={words.emoji.skinTone}
          style={[styles.toneButton, themed(theme).toneButton, slots?.skinToneButton]}
        >
          <Text style={styles.toneButtonText}>{TONE_SWATCHES[tone]}</Text>
        </Touchable>
      )}
    </View>
  );
};
