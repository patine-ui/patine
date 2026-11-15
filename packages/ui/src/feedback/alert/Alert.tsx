import { useMemo } from 'react';
import { View } from 'react-native';

import { useComponentTheme } from '@/core/theme/ThemeProvider';
import { Text } from '@/foundations/text/Text';
import type { TextProps } from '@/foundations/text/text.types';
import { AlertContext, useAlertAccent, useAlertText } from './AlertContext';
import { ALERT_VARIANT } from './alert.constants';
import { styles } from './alert.styles';
import type { AlertProps } from './alert.types';
import { getAlertAccent } from './alert.utils';
import { useAlertAnnouncement } from './hooks/useAlertAnnouncement';

/**
 * A message that needs attention: give it `title` and `description`, or put AlertTitle and AlertDescription inside.
 * Destructive alerts (or any with `live`) are read out by screen readers when they appear, on every platform.
 */
export const Alert = ({
  variant = ALERT_VARIANT.default,
  icon,
  live,
  title,
  description,
  theme: themeProp,
  design,
  style,
  children,
  ...rest
}: AlertProps) => {
  const { theme } = useComponentTheme(themeProp, design);
  const accent = getAlertAccent(theme.colors, variant);
  const announce = live ?? variant === ALERT_VARIANT.destructive;
  const register = useAlertAnnouncement(announce);
  const ctx = useMemo(
    () => ({
      accent,
      register,
    }),
    [accent, register]
  );
  return (
    <AlertContext.Provider value={ctx}>
      <View
        role={announce ? 'alert' : undefined}
        aria-live={announce ? 'assertive' : undefined}
        style={[
          styles.alert,
          {
            gap: theme.spacing.md,
            padding: theme.spacing.lg,
            borderRadius: theme.radius.lg,
            borderColor: variant === ALERT_VARIANT.default ? theme.colors.border : accent,
            backgroundColor: theme.colors.background,
          },
          style,
        ]}
        {...rest}
      >
        {icon}
        <View style={styles.body}>
          {title ? <AlertTitle>{title}</AlertTitle> : null}
          {description ? <AlertDescription>{description}</AlertDescription> : null}
          {children}
        </View>
      </View>
    </AlertContext.Provider>
  );
};

/** The alert's first line, in its variant's color. */
export const AlertTitle = ({ weight = 'medium', style, ...rest }: TextProps) => {
  const accent = useAlertAccent();
  useAlertText(rest.children);
  return <Text weight={weight} style={[accent ? { color: accent } : null, style]} {...rest} />;
};

/** The detail under the title. */
export const AlertDescription = ({ size = 'sm', color = 'textSecondary', ...rest }: TextProps) => {
  useAlertText(rest.children);
  return <Text size={size} color={color} {...rest} />;
};
