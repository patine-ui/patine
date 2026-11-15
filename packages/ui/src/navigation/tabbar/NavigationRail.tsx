import { StyleSheet, View } from 'react-native';

import { useComponentTheme } from '@/core/theme/ThemeProvider';
import { ARROW_FOCUS } from '@/core/utils/keyboard.utils';
import { TabBarButton } from './components/TabBarButton';
import { useTabBar } from './hooks/useTabBar';
import { DEFAULT_TABBAR_LABEL, TABBAR_DESIGN } from './tabbar.constants';
import type { NavigationRailProps } from './tabbar.types';

/**
 * The bottom tab bar's items down the side of a tablet or desktop window, as Material 3's navigation rail: an optional
 * header (a menu button or a FAB), then the destinations. Swap it in for BottomTabBar on wide screens.
 */
export const NavigationRail = <T extends string>(props: NavigationRailProps<T>) => {
  const {
    items,
    header,
    topInset = 0,
    accessibilityLabel = DEFAULT_TABBAR_LABEL,
    theme: themeProp,
    design,
    style,
    value: _value,
    defaultValue: _defaultValue,
    onValueChange: _onValueChange,
    ...rest
  } = props;
  const { theme } = useComponentTheme(themeProp, design);
  const bar = useTabBar(props);
  const look = TABBAR_DESIGN[theme.design];
  return (
    <View
      style={[
        {
          width: look.railWidth,
          alignItems: 'center',
          gap: theme.spacing.lg,
          paddingTop: topInset + theme.spacing.md,
          backgroundColor: theme.colors[look.background],
        },
        look.border && { borderEndWidth: StyleSheet.hairlineWidth, borderEndColor: theme.colors.border },
        style,
      ]}
      {...rest}
    >
      {header}
      <View role="tablist" aria-label={accessibilityLabel} aria-orientation="vertical" style={{ gap: theme.spacing.xs }} {...ARROW_FOCUS}>
        {items.map((item) => (
          <TabBarButton
            key={item.value}
            item={item}
            selected={item.value === bar.selected}
            onPress={() => bar.select(item.value)}
            look={look}
            theme={theme}
            rail
          />
        ))}
      </View>
    </View>
  );
};
