import { Animated, View } from 'react-native';

import { Button } from '@/actions/button/Button';
import { IS_WEB } from '@/core/core.constants';
import type { DeepPartial } from '@/core/core.types';
import type { Theme } from '@/core/theme/theme.types';
import { useToastItem } from '@/feedback/toast/hooks/useToastItem';
import { TOAST_CLOSE_GLYPH } from '@/feedback/toast/toast.constants';
import { styles } from '@/feedback/toast/toast.styles';
import type { ToastData, ToastDesign, ToastPosition } from '@/feedback/toast/toast.types';
import { getToastColors, isAssertive, isPersistent } from '@/feedback/toast/toast.utils';
import { Text } from '@/foundations/text/Text';
import { ToastIcon } from './ToastIcon';

interface ToastItemProps {
  toast: ToastData;
  theme: Theme;
  themeOverride: DeepPartial<Theme> | undefined;
  look: ToastDesign;
  position: ToastPosition;
  duration: number;
  /** The Toaster's `closeButton`, already defaulted for the platform */
  closeButton: boolean | undefined;
  closeLabel: string;
}

export const ToastItem = ({ toast: t, theme, themeOverride, look, position, duration, closeButton, closeLabel }: ToastItemProps) => {
  const item = useToastItem(t, {
    duration,
    animationDuration: theme.animation.duration,
    position,
  });
  if (!item.mounted) return null;
  const colors = getToastColors(theme, look, t.type);
  const assertive = isAssertive(t.type);

  return (
    <Animated.View style={[styles.item, { maxWidth: look.maxWidth }, item.style]} {...item.handlers}>
      <View
        role={IS_WEB ? (assertive ? 'alert' : 'status') : undefined}
        aria-live={IS_WEB ? (assertive ? 'assertive' : 'polite') : undefined}
        style={[
          styles.card,
          {
            gap: theme.spacing.md,
            paddingVertical: theme.spacing.sm,
            paddingStart: theme.spacing.lg,
            paddingEnd: theme.spacing.md,
            borderRadius: theme.radius[look.radius],
            backgroundColor: colors.background,
            borderWidth: look.border ? 1 : 0,
            borderColor: colors.border,
            boxShadow: theme.shadows[look.shadow],
          },
        ]}
      >
        {look.icon ? <ToastIcon type={t.type} colors={colors} /> : null}
        <View style={styles.body}>
          <Text theme={themeOverride} size="sm" weight="medium" style={{ color: colors.text }}>
            {t.message}
          </Text>
          {t.description ? (
            <Text theme={themeOverride} size="sm" style={{ color: colors.secondary }}>
              {t.description}
            </Text>
          ) : null}
        </View>
        {t.action ? (
          <Button
            theme={themeOverride}
            size="sm"
            variant={look.actionVariant}
            onPress={item.onAction}
            labelStyle={look.actionTinted ? { color: colors.action } : undefined}
          >
            {t.action.label}
          </Button>
        ) : null}
        {(closeButton ?? isPersistent(t, duration)) ? (
          <Button theme={themeOverride} size="sm" variant="ghost" accessibilityLabel={closeLabel} onPress={item.dismiss}>
            <Text theme={themeOverride} size="sm" style={{ color: colors.secondary }}>
              {TOAST_CLOSE_GLYPH}
            </Text>
          </Button>
        ) : null}
      </View>
    </Animated.View>
  );
};
