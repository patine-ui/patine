import { Text, View } from 'react-native';

import { Touchable } from '@/core/components/Touchable';
import { TONE_SWATCHES } from '@/pickers/emoji/emoji.constants';
import { styles } from '@/pickers/emoji/emoji.styles';
import type { SkinTone, SkinToneMenuProps } from '@/pickers/emoji/emoji.types';

export const SkinToneMenu = ({ tone, onSelect, theme, slots }: SkinToneMenuProps) => (
  <View
    style={[
      styles.toneMenu,
      { marginHorizontal: theme.spacing.sm, backgroundColor: theme.colors.surface, borderRadius: theme.radius.md },
      slots?.skinToneMenu,
    ]}
  >
    {TONE_SWATCHES.map((swatch, i) => (
      <Touchable
        key={swatch}
        theme={theme}
        onPress={() => onSelect(i as SkinTone)}
        accessibilityRole="button"
        accessibilityLabel={`Skin tone ${i}`}
        accessibilityState={{ selected: i === tone }}
        style={[
          styles.toneOption,
          { borderRadius: theme.radius.sm, backgroundColor: i === tone ? theme.colors.primaryMuted : 'transparent' },
        ]}
      >
        <Text style={styles.toneOptionText}>{swatch}</Text>
      </Touchable>
    ))}
  </View>
);
