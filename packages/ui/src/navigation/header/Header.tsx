import { Button } from '@/actions/button/Button';
import { ChevronMark } from '@/core/components/ChevronMark';
import { colorStyles } from '@/core/core.styles';
import { Text } from '@/core/primitives/Text';
import { View } from '@/core/primitives/View';
import { ThemeScope, useComponentTheme, useLabels } from '@/core/theme/ThemeProvider';
import { Heading } from '@/foundations/text/Heading';
import { HEADER_DESIGN, HEADER_SIZE } from './header.constants';
import { styles, themed } from './header.styles';
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
  backLabel: backLabelProp,
  leading,
  actions,
  size = HEADER_SIZE.default,
  theme: themeProp,
  design,
  style,
  styles: slots,
  ...rest
}: HeaderProps) => {
  const { theme, themeOverride } = useComponentTheme(themeProp, design);
  const look = HEADER_DESIGN[theme.design];
  const sheet = themed(theme);
  const words = useLabels();
  const backLabel = backLabelProp ?? words.back;
  const placement = getTitlePlacement(look, size);
  const titleText = title ? (
    <View style={placement.centered && styles.center}>
      <Heading level={1} size={look.titleSize} weight={look.titleWeight} numberOfLines={1} style={[styles.heading, slots?.title]}>
        {title}
      </Heading>
      {subtitle ? (
        <Text size="xs" color="textSecondary" numberOfLines={1}>
          {subtitle}
        </Text>
      ) : null}
    </View>
  ) : null;
  const back = onBack ? (
    <Button
      variant="ghost"
      size={look.backLabel ? 'sm' : 'icon'}
      aria-label={backLabel}
      onPress={onBack}
      startIcon={look.backLabel ? <ChevronMark direction="back" color={theme.colors.primary} /> : undefined}
      styles={{ label: colorStyles(theme).primary }}
    >
      {look.backLabel ? backLabel : <ChevronMark direction="back" color={theme.colors.text} />}
    </Button>
  ) : null;
  return (
    <ThemeScope theme={themeOverride}>
      <View
        // A <header> landmark on the web, so assistive tech and crawlers find the page's title bar.
        role="banner"
        style={[sheet.root, style]}
        {...rest}
      >
        <View style={[styles.bar, sheet.bar]}>
          {placement.inBar && placement.centered ? (
            <View pointerEvents="none" style={[styles.centered, styles.centerInset]}>
              {titleText}
            </View>
          ) : null}
          <View style={styles.side}>{leading ?? back}</View>
          <View style={[styles.title, !(leading || back) && sheet.titleAlone]}>
            {placement.inBar && !placement.centered ? titleText : null}
          </View>
          {actions ? <View style={[styles.side, sheet.actions]}>{actions}</View> : null}
        </View>
        {size === HEADER_SIZE.large && title ? (
          <View style={sheet.large}>
            <Heading level={1} size={look.largeSize} weight="bold" style={[styles.heading, slots?.title]}>
              {title}
            </Heading>
            {subtitle ? (
              <Text size="sm" color="textSecondary">
                {subtitle}
              </Text>
            ) : null}
          </View>
        ) : null}
      </View>
    </ThemeScope>
  );
};
