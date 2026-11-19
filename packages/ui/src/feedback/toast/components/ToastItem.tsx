import { Button } from '@/actions/button/Button';
import { IS_WEB } from '@/core/core.constants';
import { Text } from '@/core/primitives/Text';
import { AnimatedView, View } from '@/core/primitives/View';
import { useTheme } from '@/core/theme/ThemeProvider';
import { useToastItem } from '@/feedback/toast/hooks/useToastItem';
import { TOAST_CLOSE_GLYPH } from '@/feedback/toast/toast.constants';
import { styles, themed } from '@/feedback/toast/toast.styles';
import type { ToastData, ToastDesign, ToastPosition } from '@/feedback/toast/toast.types';
import { isAssertive, isPersistent } from '@/feedback/toast/toast.utils';
import { ToastIcon } from './ToastIcon';

interface ToastItemProps {
  toast: ToastData;
  look: ToastDesign;
  position: ToastPosition;
  duration: number;
  /** The Toaster's `closeButton`, already defaulted for the platform */
  closeButton: boolean | undefined;
  closeLabel: string;
}

export const ToastItem = ({ toast: t, look, position, duration, closeButton, closeLabel }: ToastItemProps) => {
  const theme = useTheme();
  const sheet = themed(theme);
  const item = useToastItem(t, {
    duration,
    animationDuration: theme.animation.duration,
    position,
  });
  if (!item.mounted) return null;
  const assertive = isAssertive(t.type);

  return (
    <AnimatedView style={[styles.item, sheet.item, item.style]} {...item.handlers}>
      <View
        role={IS_WEB ? (assertive ? 'alert' : 'status') : undefined}
        aria-live={IS_WEB ? (assertive ? 'assertive' : 'polite') : undefined}
        style={[styles.card, sheet.card]}
      >
        {look.icon ? <ToastIcon type={t.type} /> : null}
        <View style={styles.body}>
          <Text size="sm" weight="medium" style={sheet.text}>
            {t.message}
          </Text>
          {t.description ? (
            <Text size="sm" style={sheet.secondary}>
              {t.description}
            </Text>
          ) : null}
        </View>
        {t.action ? (
          <Button
            size="sm"
            variant={look.actionVariant}
            onPress={item.onAction}
            styles={look.actionTinted ? { label: sheet.action } : undefined}
          >
            {t.action.label}
          </Button>
        ) : null}
        {(closeButton ?? isPersistent(t, duration)) ? (
          <Button size="sm" variant="ghost" aria-label={closeLabel} onPress={item.dismiss}>
            <Text size="sm" style={sheet.secondary}>
              {TOAST_CLOSE_GLYPH}
            </Text>
          </Button>
        ) : null}
      </View>
    </AnimatedView>
  );
};
