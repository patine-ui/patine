import { Text } from '@/core/primitives/Text';
import { View } from '@/core/primitives/View';
import { ThemeScope, useComponentTheme } from '@/core/theme/ThemeProvider';
import { STAT_DESIGN, TREND_ARROW } from './stat.constants';
import { styles, themed } from './stat.styles';
import type { StatProps } from './stat.types';
import { formatChange, getStatLabel, getTrend, getTrendTone } from './stat.utils';

/**
 * A key figure with its label and how it moved: a KPI tile for a dashboard. The change is green when good and red when
 * bad (`invertTrend` for costs), with an arrow, so color isn't the only cue. Screen readers read it as one sentence.
 */
export const Stat = ({
  label,
  value,
  change,
  trend: trendProp,
  invertTrend = false,
  description,
  icon,
  children,
  theme: themeProp,
  design,
  style,
  styles: slots,
  ...rest
}: StatProps) => {
  const { theme, themeOverride } = useComponentTheme(themeProp, design);
  const look = STAT_DESIGN[theme.design];
  const sheet = themed(theme);
  const trend = trendProp ?? getTrend(change);
  const tone = getTrendTone(trend, invertTrend);
  const changeText = change === undefined ? null : formatChange(change);
  return (
    <ThemeScope theme={themeOverride}>
      <View accessible aria-label={getStatLabel(label, value, changeText, trend, description)} style={[sheet.root, style]} {...rest}>
        <View style={[styles.header, sheet.header]}>
          <Text size="sm" weight="medium" color="textSecondary" style={slots?.label}>
            {label}
          </Text>
          {icon}
        </View>
        <Text size={look.valueSize} weight={look.valueWeight} font="numeric" style={slots?.value}>
          {value}
        </Text>
        {changeText !== null || description ? (
          <View style={[styles.footer, sheet.footer]}>
            {changeText !== null ? (
              <View style={look.changePill ? [styles.pill, sheet.pill] : undefined}>
                {look.changePill ? <View style={[styles.pillTint, sheet[`${tone}Tint`]]} /> : null}
                <Text size="sm" weight="medium" style={[sheet[tone], slots?.change]}>
                  {`${TREND_ARROW[trend]} ${changeText}`}
                </Text>
              </View>
            ) : null}
            {description ? (
              <Text size="sm" color="textSecondary" style={slots?.description}>
                {description}
              </Text>
            ) : null}
          </View>
        ) : null}
        {children}
      </View>
    </ThemeScope>
  );
};
