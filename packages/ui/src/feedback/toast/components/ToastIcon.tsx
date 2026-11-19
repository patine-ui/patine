import { ActivityIndicator } from 'react-native';

import { Text } from '@/core/primitives/Text';
import { View } from '@/core/primitives/View';
import { useTheme } from '@/core/theme/ThemeProvider';
import { TOAST_DESIGN, TOAST_GLYPH, TOAST_TYPE } from '@/feedback/toast/toast.constants';
import { accentStyles, styles, themed } from '@/feedback/toast/toast.styles';
import type { ToastType } from '@/feedback/toast/toast.types';
import { getToastColors } from '@/feedback/toast/toast.utils';

/** The status in a filled circle, or a spinner while loading. Hidden from screen readers: the message says it. */
export const ToastIcon = ({ type }: { type: ToastType }) => {
  const theme = useTheme();
  const sheet = themed(theme);
  if (type === TOAST_TYPE.loading)
    return <ActivityIndicator size="small" color={getToastColors(theme, TOAST_DESIGN[theme.design], type).accent} />;
  const glyph = TOAST_GLYPH[type];
  if (!glyph) return null;
  return (
    <View aria-hidden style={[styles.icon, accentStyles(theme)[type]]}>
      <Text allowFontScaling={false} style={[styles.glyph, sheet.glyph]}>
        {glyph}
      </Text>
    </View>
  );
};
