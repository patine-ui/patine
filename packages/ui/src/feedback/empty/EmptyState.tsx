import { Text } from '@/core/primitives/Text';
import { View } from '@/core/primitives/View';
import { ThemeScope, useComponentTheme } from '@/core/theme/ThemeProvider';
import { Heading } from '@/foundations/text/Heading';
import { styles, themed } from './empty.styles';
import type { EmptyStateProps } from './empty.types';

/** What a screen shows when there's nothing in it yet: an icon, a heading, what to do next and a button to do it. */
export const EmptyState = ({ title, description, icon, action, theme: themeProp, design, style, children, ...rest }: EmptyStateProps) => {
  const { theme, themeOverride } = useComponentTheme(themeProp, design);
  const sheet = themed(theme);
  return (
    <ThemeScope theme={themeOverride}>
      <View style={[styles.root, sheet.root, style]} {...rest}>
        {icon ? (
          <View aria-hidden style={[styles.icon, sheet.icon]}>
            {typeof icon === 'string' ? <Text style={styles.iconText}>{icon}</Text> : icon}
          </View>
        ) : null}
        <View style={[styles.text, sheet.text]}>
          <Heading level={3} size="lg" style={[styles.center, styles.heading]}>
            {title}
          </Heading>
          {description ? (
            <Text size="sm" color="textSecondary" style={styles.center}>
              {description}
            </Text>
          ) : null}
        </View>
        {children}
        {action ? <View style={[styles.actions, sheet.actions]}>{action}</View> : null}
      </View>
    </ThemeScope>
  );
};
