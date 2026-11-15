import type { ReactNode } from 'react';
import { StyleSheet, View } from 'react-native';

import { PickerText } from '@/core/components/PickerText';
import { useComponentTheme } from '@/core/theme/ThemeProvider';
import { STAT_DESIGN, TREND_ARROW, TREND_WORD } from './stat.constants';
import type { StatProps } from './stat.types';
import { formatChange, getTrend, getTrendColor } from './stat.utils';

const textOf = (node: ReactNode) => (typeof node === 'string' || typeof node === 'number' ? String(node) : '');

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
  const { theme } = useComponentTheme(themeProp, design);
  const look = STAT_DESIGN[theme.design];
  const trend = trendProp ?? getTrend(change);
  const color = getTrendColor(theme.colors, trend, invertTrend);
  const changeText = change === undefined ? null : formatChange(change);
  const spoken = [label, textOf(value), changeText && `${TREND_WORD[trend]} ${changeText.replace(/^[+\-−]/, '')}`, textOf(description)]
    .filter(Boolean)
    .join(', ');
  return (
    <View accessible accessibilityLabel={spoken} style={[{ gap: theme.spacing.xs }, style]} {...rest}>
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: theme.spacing.sm }}>
        <PickerText theme={theme} size="sm" weight="medium" color="textSecondary" style={slots?.label}>
          {label}
        </PickerText>
        {icon}
      </View>
      <PickerText theme={theme} size={look.valueSize} weight={look.valueWeight} style={[{ fontVariant: ['tabular-nums'] }, slots?.value]}>
        {value}
      </PickerText>
      {changeText !== null || description ? (
        <View style={{ flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap', gap: theme.spacing.xs }}>
          {changeText !== null ? (
            <View
              style={
                look.changePill
                  ? { paddingHorizontal: 6, paddingVertical: 1, borderRadius: theme.radius.full, overflow: 'hidden' }
                  : undefined
              }
            >
              {look.changePill ? <View style={[StyleSheet.absoluteFill, { backgroundColor: color, opacity: 0.12 }]} /> : null}
              <PickerText theme={theme} size="sm" weight="medium" style={[{ color }, slots?.change]}>
                {`${TREND_ARROW[trend]} ${changeText}`}
              </PickerText>
            </View>
          ) : null}
          {description ? (
            <PickerText theme={theme} size="sm" color="textSecondary" style={slots?.description}>
              {description}
            </PickerText>
          ) : null}
        </View>
      ) : null}
      {children}
    </View>
  );
};
