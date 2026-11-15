import { ActivityIndicator, Text, View } from 'react-native';

import { TOAST_GLYPH, TOAST_TYPE } from '@/feedback/toast/toast.constants';
import { styles } from '@/feedback/toast/toast.styles';
import type { ToastColors, ToastType } from '@/feedback/toast/toast.types';

/** The status in a filled circle, or a spinner while loading. Hidden from screen readers: the message says it. */
export const ToastIcon = ({ type, colors }: { type: ToastType; colors: ToastColors }) => {
  if (type === TOAST_TYPE.loading) return <ActivityIndicator size="small" color={colors.accent} />;
  const glyph = TOAST_GLYPH[type];
  if (!glyph) return null;
  return (
    <View aria-hidden style={[styles.icon, { backgroundColor: colors.accent }]}>
      <Text allowFontScaling={false} style={[styles.glyph, { color: colors.background }]}>
        {glyph}
      </Text>
    </View>
  );
};
