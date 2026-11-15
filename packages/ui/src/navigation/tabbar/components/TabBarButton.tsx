import { View } from 'react-native';

import { PickerText } from '@/core/components/PickerText';
import { Touchable } from '@/core/components/Touchable';
import { DISABLED_OPACITY } from '@/core/core.constants';
import { INDICATOR } from '@/navigation/tabbar/tabbar.constants';
import type { TabBarButtonProps } from '@/navigation/tabbar/tabbar.types';
import { formatBadge, getTabLabel } from '@/navigation/tabbar/tabbar.utils';

/** One destination: its icon over its label, a badge on the icon, and the design's selected look. */
export const TabBarButton = ({ item, selected, onPress, look, theme, rail }: TabBarButtonProps) => {
  const c = theme.colors;
  const color = selected ? c[look.selectedColor] : c.textSecondary;
  const badge = formatBadge(item.badge);
  const icon = typeof item.icon === 'function' ? item.icon({ selected, color }) : item.icon;
  return (
    <Touchable
      theme={theme}
      role="tab"
      aria-selected={selected}
      aria-disabled={item.disabled}
      disabled={item.disabled}
      accessibilityLabel={getTabLabel(item.label, item.badge)}
      onPress={onPress}
      ripple={!look.indicator}
      style={[
        { alignItems: 'center', justifyContent: 'center', gap: look.indicator ? 4 : 2, borderRadius: theme.radius.md },
        rail ? { width: look.railWidth, paddingVertical: theme.spacing.sm } : { flex: 1, alignSelf: 'stretch' },
        item.disabled && { opacity: DISABLED_OPACITY },
      ]}
    >
      <View
        style={[
          { alignItems: 'center', justifyContent: 'center', minWidth: 28, minHeight: 28 },
          look.indicator && {
            width: INDICATOR.width,
            height: INDICATOR.height,
            borderRadius: INDICATOR.height / 2,
            backgroundColor: selected ? c.primaryMuted : 'transparent',
          },
        ]}
      >
        {icon}
        {badge !== null ? (
          <View
            aria-hidden
            style={{
              position: 'absolute',
              top: badge === '' ? 2 : -4,
              start: look.indicator ? INDICATOR.width / 2 + 4 : 18,
              minWidth: badge === '' ? 8 : 16,
              height: badge === '' ? 8 : 16,
              paddingHorizontal: badge === '' ? 0 : 4,
              borderRadius: 8,
              backgroundColor: c.danger,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {badge === '' ? null : (
              <PickerText theme={theme} size="xs" weight="bold" style={{ color: c.onDanger, fontSize: 10, lineHeight: 14 }}>
                {badge}
              </PickerText>
            )}
          </View>
        ) : null}
      </View>
      <PickerText
        theme={theme}
        size={look.labelSize}
        weight={selected ? (look.indicator ? 'bold' : 'medium') : 'medium'}
        numberOfLines={1}
        style={{ color }}
      >
        {item.label}
      </PickerText>
    </Touchable>
  );
};
