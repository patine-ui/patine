import { Text } from '@/core/primitives/Text';
import { Touchable } from '@/core/primitives/Touchable';
import { View } from '@/core/primitives/View';
import { useTheme } from '@/core/theme/ThemeProvider';
import { TABBAR_DESIGN } from '@/navigation/tabbar/tabbar.constants';
import { styles, themed } from '@/navigation/tabbar/tabbar.styles';
import type { TabBarButtonProps } from '@/navigation/tabbar/tabbar.types';
import { formatBadge, getTabLabel } from '@/navigation/tabbar/tabbar.utils';

/** One destination: its icon over its label, a badge on the icon, and the design's selected look. A link with `href`. */
export const TabBarButton = ({ item, selected, tab, onPress, rail }: TabBarButtonProps) => {
  const theme = useTheme();
  const look = TABBAR_DESIGN[theme.design];
  const sheet = themed(theme);
  const tone = selected ? sheet.selected : sheet.unselected;
  const badge = formatBadge(item.badge);
  const icon = typeof item.icon === 'function' ? item.icon({ selected, color: String(tone.color) }) : item.icon;
  return (
    <Touchable
      role={tab ? 'tab' : 'button'}
      aria-selected={tab ? selected : undefined}
      disabled={item.disabled}
      aria-label={getTabLabel(item.label, item.badge)}
      onPress={onPress}
      href={item.href}
      external={item.external}
      ripple={!look.indicator}
      style={[styles.item, sheet.item, rail ? sheet.itemInRail : styles.itemInBar]}
    >
      <View style={[styles.icon, look.indicator && [styles.pill, selected && sheet.pillOn]]}>
        {icon}
        {badge !== null ? (
          <View aria-hidden style={[badge === '' ? styles.dot : styles.badge, sheet.badge]}>
            {badge === '' ? null : (
              <Text size="xs" weight="bold" style={[styles.badgeText, sheet.badgeText]}>
                {badge}
              </Text>
            )}
          </View>
        ) : null}
      </View>
      <Text size={look.labelSize} weight={selected && look.indicator ? 'bold' : 'medium'} numberOfLines={1} style={tone}>
        {item.label}
      </Text>
    </Touchable>
  );
};
