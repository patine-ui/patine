import { View } from 'react-native';

import { PickerText } from '@/core/components/PickerText';
import { EMOJI_DESIGN } from '@/pickers/emoji/emoji.constants';
import { styles } from '@/pickers/emoji/emoji.styles';
import type { SectionHeaderProps } from '@/pickers/emoji/emoji.types';

export const SectionHeader = ({ label, theme, slots }: SectionHeaderProps) => (
  <View style={[styles.sectionHeader, slots?.sectionHeader]}>
    <PickerText
      theme={theme}
      size="xs"
      weight="bold"
      color="textSecondary"
      style={[EMOJI_DESIGN[theme.design].uppercaseSectionHeaders && styles.uppercase, slots?.sectionHeaderText]}
    >
      {label}
    </PickerText>
  </View>
);
