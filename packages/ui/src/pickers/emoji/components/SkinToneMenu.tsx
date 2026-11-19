import { Text } from '@/core/primitives/Text';
import { Touchable } from '@/core/primitives/Touchable';
import { View } from '@/core/primitives/View';
import { TONE_SWATCHES } from '@/pickers/emoji/emoji.constants';
import { styles, themed } from '@/pickers/emoji/emoji.styles';
import type { SkinTone, SkinToneMenuProps } from '@/pickers/emoji/emoji.types';

export const SkinToneMenu = ({ tone, onSelect, theme, slots }: SkinToneMenuProps) => (
  <View style={[styles.toneMenu, themed(theme).toneMenu, slots?.skinToneMenu]}>
    {TONE_SWATCHES.map((swatch, i) => (
      <Touchable
        key={swatch}
        theme={theme}
        onPress={() => onSelect(i as SkinTone)}
        role="button"
        aria-label={`Skin tone ${i}`}
        aria-selected={i === tone}
        style={[styles.toneOption, themed(theme).toneOption, i === tone && themed(theme).toneOn]}
      >
        <Text style={styles.toneOptionText}>{swatch}</Text>
      </Touchable>
    ))}
  </View>
);
