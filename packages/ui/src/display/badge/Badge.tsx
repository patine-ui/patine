import { Text } from '@/core/primitives/Text';
import { View } from '@/core/primitives/View';
import { ContentColor } from '@/core/theme/ContentColor';
import { ThemeScope, useComponentTheme } from '@/core/theme/ThemeProvider';
import { isTextContent } from '@/core/utils/text.utils';
import { BADGE_VARIANT } from './badge.constants';
import { styles, themed } from './badge.styles';
import type { BadgeProps } from './badge.types';
import { getBadgeColors } from './badge.utils';

/** A small label for a status, count or category. */
export const Badge = ({
  variant = BADGE_VARIANT.default,
  theme: themeProp,
  design,
  style,
  styles: slots,
  startIcon,
  children,
  ...rest
}: BadgeProps) => {
  const { theme, themeOverride } = useComponentTheme(themeProp, design);
  const sheet = themed(theme);
  return (
    <ThemeScope theme={themeOverride}>
      <View style={[styles.badge, sheet.shape, sheet[variant], style]} {...rest}>
        <ContentColor color={getBadgeColors(theme.colors, variant).text}>
          {startIcon}
          {isTextContent(children) ? (
            <Text size="xs" weight="medium" numberOfLines={1} style={[sheet[`${variant}Text`], slots?.label]}>
              {children}
            </Text>
          ) : (
            children
          )}
        </ContentColor>
      </View>
    </ThemeScope>
  );
};
