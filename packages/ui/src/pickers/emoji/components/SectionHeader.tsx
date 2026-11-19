import { Text } from '@/core/primitives/Text';
import { View } from '@/core/primitives/View';
import { EMOJI_DESIGN } from '@/pickers/emoji/emoji.constants';
import { styles } from '@/pickers/emoji/emoji.styles';
import type { SectionHeaderProps } from '@/pickers/emoji/emoji.types';

export const SectionHeader = ({ label, theme, slots }: SectionHeaderProps) => (
  <View style={[styles.sectionHeader, slots?.sectionHeader]}>
    <Text
      theme={theme}
      size="xs"
      weight="semibold"
      color="textSecondary"
      style={[EMOJI_DESIGN[theme.design].uppercaseSectionHeaders && styles.uppercase, slots?.sectionHeaderText]}
    >
      {label}
    </Text>
  </View>
);
