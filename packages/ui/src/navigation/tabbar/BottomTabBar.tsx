import { StyleSheet, View } from 'react-native';

import { useComponentTheme } from '@/core/theme/ThemeProvider';
import { ARROW_FOCUS } from '@/core/utils/keyboard.utils';
import { TabBarButton } from './components/TabBarButton';
import { useTabBar } from './hooks/useTabBar';
import { DEFAULT_TABBAR_LABEL, TABBAR_DESIGN } from './tabbar.constants';
import type { TabBarProps } from './tabbar.types';

/**
 * The bar of an app's main destinations along the bottom of the screen: iOS's tab bar, Material 3's navigation bar with
 * its pill indicator, or a web bottom nav. Icons over labels, with count or dot badges. It draws the bar; your navigator
 * shows the screen.
 */
export const BottomTabBar = <T extends string>(props: TabBarProps<T>) => {
  const {
    items,
    bottomInset = 0,
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
      role="tablist"
      aria-label={accessibilityLabel}
      style={[
        {
          flexDirection: 'row',
          height: look.height + bottomInset,
          paddingBottom: bottomInset,
          paddingHorizontal: theme.spacing.xs,
          backgroundColor: theme.colors[look.background],
        },
        look.border && { borderTopWidth: StyleSheet.hairlineWidth, borderTopColor: theme.colors.border },
        style,
      ]}
      {...ARROW_FOCUS}
      {...rest}
    >
      {items.map((item) => (
        <TabBarButton
          key={item.value}
          item={item}
          selected={item.value === bar.selected}
          onPress={() => bar.select(item.value)}
          look={look}
          theme={theme}
          rail={false}
        />
      ))}
    </View>
  );
};
