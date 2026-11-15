import { StyleSheet, View } from 'react-native';

import { Button } from '@/actions/button/Button';
import { ChevronMark } from '@/core/components/ChevronMark';
import { useComponentTheme } from '@/core/theme/ThemeProvider';
import { Text } from '@/foundations/text/Text';
import { CENTER_TITLE_INSET, HEADER_DESIGN, HEADER_SIZE } from './header.constants';
import { styles } from './header.styles';
import type { HeaderProps } from './header.types';
import { getTitlePlacement } from './header.utils';

/**
 * A screen's top bar: a back button, the title and actions. A centred 44pt bar with a "Back" label on iOS, a 64dp top app bar
 * in Material, a bordered bar on the web; `size="large"` adds a big title under it. Leaves the safe area to the screen.
 */
export const Header = ({
  title,
  subtitle,
  onBack,
  backLabel = 'Back',
  leading,
  actions,
  size = HEADER_SIZE.default,
  theme: themeProp,
  design,
  style,
  titleStyle,
  ...rest
}: HeaderProps) => {
  const { theme, themeOverride } = useComponentTheme(themeProp, design);
  const look = HEADER_DESIGN[theme.design];
  const placement = getTitlePlacement(look, size);
  const titleText = title ? (
    <View style={placement.centered ? { alignItems: 'center' } : undefined}>
      <Text
        theme={themeOverride}
        accessibilityRole="header"
        size={look.titleSize}
        weight={look.titleWeight}
        numberOfLines={1}
        style={[styles.heading, titleStyle]}
      >
        {title}
      </Text>
      {subtitle ? (
        <Text theme={themeOverride} size="xs" color="textSecondary" numberOfLines={1}>
          {subtitle}
        </Text>
      ) : null}
    </View>
  ) : null;
  const back = onBack ? (
    <Button
      theme={themeOverride}
      variant="ghost"
      size={look.backLabel ? 'sm' : 'icon'}
      accessibilityLabel={backLabel}
      onPress={onBack}
      startIcon={look.backLabel ? <ChevronMark direction="back" color={theme.colors.primary} /> : undefined}
      labelStyle={{ color: theme.colors.primary }}
    >
      {look.backLabel ? backLabel : <ChevronMark direction="back" color={theme.colors.text} />}
    </Button>
  ) : null;
  return (
    <View
      style={[
        { backgroundColor: theme.colors.background },
        look.border && { borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: theme.colors.border },
        style,
      ]}
      {...rest}
    >
      <View style={[styles.bar, { minHeight: look.height, paddingHorizontal: theme.spacing.xs, gap: theme.spacing.xs }]}>
        {placement.inBar && placement.centered ? (
          <View pointerEvents="none" style={[styles.centered, { paddingHorizontal: CENTER_TITLE_INSET }]}>
            {titleText}
          </View>
        ) : null}
        <View style={styles.side}>{leading ?? back}</View>
        <View style={[styles.title, { paddingHorizontal: leading || back ? 0 : theme.spacing.md }]}>
          {placement.inBar && !placement.centered ? titleText : null}
        </View>
        {actions ? <View style={[styles.side, { gap: theme.spacing.xs }]}>{actions}</View> : null}
      </View>
      {size === HEADER_SIZE.large && title ? (
        <View style={{ paddingHorizontal: theme.spacing.lg, paddingBottom: theme.spacing.sm }}>
          <Text theme={themeOverride} accessibilityRole="header" size={look.largeSize} weight="bold" style={[styles.heading, titleStyle]}>
            {title}
          </Text>
          {subtitle ? (
            <Text theme={themeOverride} size="sm" color="textSecondary">
              {subtitle}
            </Text>
          ) : null}
        </View>
      ) : null}
    </View>
  );
};
