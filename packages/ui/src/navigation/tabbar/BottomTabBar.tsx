import { ARROW_FOCUS } from '@/core/a11y/keyboard.utils';
import { View } from '@/core/primitives/View';
import { ThemeScope, useComponentTheme, useLabels } from '@/core/theme/ThemeProvider';
import { TabBarButton } from './components/TabBarButton';
import { useTabBar } from './hooks/useTabBar';
import { TABBAR_DESIGN } from './tabbar.constants';
import { styles, themed } from './tabbar.styles';
import type { TabBarProps } from './tabbar.types';
import { getInsetStyle } from './tabbar.utils';

/**
 * The bar of an app's main destinations along the bottom of the screen: iOS's tab bar, Material 3's navigation bar with
 * its pill indicator, or a web bottom nav. Icons over labels, with count or dot badges. It draws the bar; your navigator
 * shows the screen. A navigation landmark (`<nav>` on the web); items with `href` are real links.
 */
export const BottomTabBar = <T extends string>(props: TabBarProps<T>) => {
  const {
    items,
    bottomInset = 0,
    'aria-label': accessibilityLabelProp,
    theme: themeProp,
    design,
    style,
    value: _value,
    defaultValue: _defaultValue,
    onValueChange: _onValueChange,
    ...rest
  } = props;
  const words = useLabels();
  const { theme, themeOverride } = useComponentTheme(themeProp, design);
  const bar = useTabBar(props);
  const look = TABBAR_DESIGN[theme.design];
  return (
    <ThemeScope theme={themeOverride}>
      <View
        role="navigation"
        aria-label={accessibilityLabelProp ?? words.tabBar}
        style={[styles.bar, themed(theme).bar, getInsetStyle(bottomInset, 'bottom', look.height), style]}
        {...rest}
      >
        <View role={bar.tabs ? 'tablist' : undefined} style={styles.items} {...ARROW_FOCUS}>
          {items.map((item) => (
            <TabBarButton
              key={item.value}
              item={item}
              selected={item.value === bar.selected}
              tab={bar.tabs}
              onPress={() => bar.select(item.value)}
              rail={false}
            />
          ))}
        </View>
      </View>
    </ThemeScope>
  );
};
