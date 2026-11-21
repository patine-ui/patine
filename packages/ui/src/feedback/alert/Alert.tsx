import { useMemo } from 'react';

import { Text } from '@/core/primitives/Text';
import { View } from '@/core/primitives/View';
import { ContentColor } from '@/core/theme/ContentColor';
import { ThemeScope, useComponentTheme } from '@/core/theme/ThemeProvider';
import type { TextProps } from '@/foundations/text/text.types';
import { AlertContext, useAlertText, useAlertTitleStyle } from './AlertContext';
import { ALERT_VARIANT } from './alert.constants';
import { styles, themed } from './alert.styles';
import type { AlertProps } from './alert.types';
import { getAlertAccent } from './alert.utils';
import { useAlertAnnouncement } from './hooks/useAlertAnnouncement';

/**
 * A message that needs attention: give it `title`, `description` and an `action` such as a dismiss ✕, or put AlertTitle and
 * AlertDescription inside.
 * Destructive alerts (or any with `live`) are read out by screen readers when they appear, on every platform.
 */
export const Alert = ({
  variant = ALERT_VARIANT.default,
  icon,
  live,
  title,
  description,
  action,
  theme: themeProp,
  design,
  style,
  children,
  ...rest
}: AlertProps) => {
  const { theme, themeOverride } = useComponentTheme(themeProp, design);
  const sheet = themed(theme);
  const titleStyle = sheet[`${variant}Title`];
  const announce = live ?? variant === ALERT_VARIANT.destructive;
  const register = useAlertAnnouncement(announce);
  const ctx = useMemo(
    () => ({
      titleStyle,
      register,
    }),
    [titleStyle, register]
  );
  return (
    <ThemeScope theme={themeOverride}>
      <AlertContext.Provider value={ctx}>
        <View
          role={announce ? 'alert' : undefined}
          aria-live={announce ? 'assertive' : undefined}
          style={[styles.alert, sheet.alert, sheet[variant], style]}
          {...rest}
        >
          <ContentColor color={getAlertAccent(theme.colors, variant)}>{icon}</ContentColor>
          <View style={styles.body}>
            {title ? <AlertTitle>{title}</AlertTitle> : null}
            {description ? <AlertDescription>{description}</AlertDescription> : null}
            {children}
          </View>
          {action}
        </View>
      </AlertContext.Provider>
    </ThemeScope>
  );
};

/** The alert's first line, in its variant's color. */
export const AlertTitle = ({ weight = 'medium', style, ...rest }: TextProps) => {
  const titleStyle = useAlertTitleStyle();
  useAlertText(rest.children);
  return <Text weight={weight} style={[titleStyle, style]} {...rest} />;
};

/** The detail under the title. */
export const AlertDescription = ({ size = 'sm', color = 'textSecondary', ...rest }: TextProps) => {
  useAlertText(rest.children);
  return <Text size={size} color={color} {...rest} />;
};
