import { View } from 'react-native';

import { useComponentTheme } from '@/core/theme/ThemeProvider';
import { Heading } from '@/foundations/text/Heading';
import { Text } from '@/foundations/text/Text';
import { styles } from './empty.styles';
import type { EmptyStateProps } from './empty.types';

/** What a screen shows when there's nothing in it yet: an icon, a heading, what to do next and a button to do it. */
export const EmptyState = ({ title, description, icon, action, theme: themeProp, design, style, children, ...rest }: EmptyStateProps) => {
  const { theme, themeOverride } = useComponentTheme(themeProp, design);
  return (
    <View style={[styles.root, { padding: theme.spacing.xl, gap: theme.spacing.md }, style]} {...rest}>
      {icon ? (
        <View aria-hidden style={[styles.icon, { backgroundColor: theme.colors.surface, borderRadius: theme.radius.full }]}>
          {typeof icon === 'string' ? <Text style={styles.iconText}>{icon}</Text> : icon}
        </View>
      ) : null}
      <View style={[styles.text, { gap: theme.spacing.xs }]}>
        <Heading theme={themeOverride} level={3} size="lg" style={[styles.center, styles.heading]}>
          {title}
        </Heading>
        {description ? (
          <Text theme={themeOverride} size="sm" color="textSecondary" style={styles.center}>
            {description}
          </Text>
        ) : null}
      </View>
      {children}
      {action ? <View style={[styles.actions, { gap: theme.spacing.sm, marginTop: theme.spacing.xs }]}>{action}</View> : null}
    </View>
  );
};
