import { View } from 'react-native';

import { IS_WEB, PLATFORM } from '@/core/core.constants';
import { useComponentTheme, usePlatform } from '@/core/theme/ThemeProvider';
import { ToastItem } from './components/ToastItem';
import { useToasts } from './hooks/useToasts';
import { TOAST_CLOSE_LABEL, TOAST_DESIGN, TOAST_DURATION, TOAST_MAX, TOAST_POSITION } from './toast.constants';
import { styles } from './toast.styles';
import type { ToasterProps } from './toast.types';
import { getDefaultPosition } from './toast.utils';

/**
 * Where `toast()` shows its toasts: mount it once, last in your root view, so it draws over the screen. Toasts stack from the
 * top or bottom edge, close on a timer that pauses while touched or hovered, swipe away, and are read out by screen readers.
 */
export const Toaster = ({
  position,
  offset,
  max = TOAST_MAX,
  duration = TOAST_DURATION,
  insets = {},
  closeButton,
  closeLabel = TOAST_CLOSE_LABEL,
  id,
  theme: themeProp,
  design,
  style,
}: ToasterProps) => {
  const { theme, themeOverride } = useComponentTheme(themeProp, design);
  const platform = usePlatform();
  const toasts = useToasts(id, max);
  const look = TOAST_DESIGN[theme.design];
  const side = position ?? getDefaultPosition(platform);
  const edge = offset ?? theme.spacing.lg;

  return (
    <View
      aria-live={IS_WEB ? 'polite' : undefined}
      aria-label={IS_WEB ? 'Notifications' : undefined}
      style={[
        styles.toaster,
        {
          flexDirection: side === TOAST_POSITION.top ? 'column' : 'column-reverse',
          alignItems: look.align,
          gap: theme.spacing.sm,
          paddingTop: (insets.top ?? 0) + edge,
          paddingBottom: (insets.bottom ?? 0) + edge,
          paddingLeft: (insets.left ?? 0) + edge,
          paddingRight: (insets.right ?? 0) + edge,
        },
        style,
      ]}
    >
      {toasts.map((t) => (
        <ToastItem
          key={t.id}
          toast={t}
          theme={theme}
          themeOverride={themeOverride}
          look={look}
          position={side}
          duration={duration}
          closeButton={closeButton ?? (platform === PLATFORM.web || undefined)}
          closeLabel={closeLabel}
        />
      ))}
    </View>
  );
};
