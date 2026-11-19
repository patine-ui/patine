import { Text } from '@/core/primitives/Text';
import { View } from '@/core/primitives/View';
import { ThemeScope, useComponentTheme } from '@/core/theme/ThemeProvider';
import { BADGE_VARIANT } from './badge.constants';
import { styles, themed } from './badge.styles';
import type { BadgeProps } from './badge.types';

/** A small label for a status, count or category. */
export const Badge = ({
  variant = BADGE_VARIANT.default,
  theme: themeProp,
  design,
  style,
  styles: slots,
  children,
  ...rest
}: BadgeProps) => {
  const { theme, themeOverride } = useComponentTheme(themeProp, design);
  const sheet = themed(theme);
  return (
    <ThemeScope theme={themeOverride}>
      <View style={[styles.badge, sheet.shape, sheet[variant], style]} {...rest}>
        {typeof children === 'string' || typeof children === 'number' ? (
          <Text size="xs" weight="medium" numberOfLines={1} style={[sheet[`${variant}Text`], slots?.label]}>
            {children}
          </Text>
        ) : (
          children
        )}
      </View>
    </ThemeScope>
  );
};
