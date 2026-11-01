import { View } from 'react-native';

import { PickerText } from '@/core/components/PickerText';
import { coreStyles } from '@/core/core.styles';
import { HEADLINE_FONT_SIZE } from '@/pickers/date/date.constants';
import { styles } from '@/pickers/date/date.styles';
import type { DateHeadlineProps } from '@/pickers/date/date.types';

/** The picked date in large type, above a Material calendar. */
export const DateHeadline = ({ text, theme }: DateHeadlineProps) => (
  <View
    style={[
      styles.headline,
      { borderBottomColor: theme.colors.border, paddingHorizontal: theme.spacing.sm, paddingBottom: theme.spacing.md },
    ]}
  >
    <PickerText theme={theme} size="xl" style={[coreStyles.startAligned, { fontSize: HEADLINE_FONT_SIZE }]} accessibilityRole="header">
      {text}
    </PickerText>
  </View>
);
