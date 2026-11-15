import { View } from 'react-native';

import { useComponentTheme } from '@/core/theme/ThemeProvider';
import { Text } from '@/foundations/text/Text';
import { BADGE_VARIANT } from './badge.constants';
import { styles } from './badge.styles';
import type { BadgeProps } from './badge.types';
import { getBadgeColors } from './badge.utils';

/** A small label for a status, count or category. */
export const Badge = ({ variant = BADGE_VARIANT.default, theme: themeProp, design, style, labelStyle, children, ...rest }: BadgeProps) => {
  const { theme, themeOverride } = useComponentTheme(themeProp, design);
  const colors = getBadgeColors(theme.colors, variant);
  return (
    <View
      style={[
        styles.badge,
        {
          backgroundColor: colors.background,
          borderColor: colors.border,
          borderRadius: theme.radius.full,
          paddingHorizontal: theme.spacing.sm,
        },
        style,
      ]}
      {...rest}
    >
      {typeof children === 'string' || typeof children === 'number' ? (
        <Text theme={themeOverride} size="xs" weight="medium" numberOfLines={1} style={[{ color: colors.text }, labelStyle]}>
          {children}
        </Text>
      ) : (
        children
      )}
    </View>
  );
};
