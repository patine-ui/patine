import { ARROW_FOCUS } from '@/core/a11y/keyboard.utils';
import { View } from '@/core/primitives/View';
import { ThemeScope, useComponentTheme, useLabels } from '@/core/theme/ThemeProvider';
import { TabBarButton } from './components/TabBarButton';
import { useTabBar } from './hooks/useTabBar';
import { styles, themed } from './tabbar.styles';
import type { NavigationRailProps } from './tabbar.types';
import { getInsetStyle } from './tabbar.utils';

/**
 * The bottom tab bar's items down the side of a tablet or desktop window, as Material 3's navigation rail: an optional
 * header (a menu button or a FAB), then the destinations. Swap it in for BottomTabBar on wide screens.
 */
export const NavigationRail = <T extends string>(props: NavigationRailProps<T>) => {
  const {
    items,
    header,
    topInset = 0,
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
  const sheet = themed(theme);
  return (
    <ThemeScope theme={themeOverride}>
      <View
        role="navigation"
        aria-label={accessibilityLabelProp ?? words.tabBar}
        style={[styles.rail, sheet.rail, getInsetStyle(topInset + theme.spacing.md, 'top'), style]}
        {...rest}
      >
        {header}
        <View role={bar.tabs ? 'tablist' : undefined} aria-orientation="vertical" style={sheet.railItems} {...ARROW_FOCUS}>
          {items.map((item) => (
            <TabBarButton
              key={item.value}
              item={item}
              selected={item.value === bar.selected}
              tab={bar.tabs}
              onPress={() => bar.select(item.value)}
              rail
            />
          ))}
        </View>
      </View>
    </ThemeScope>
  );
};
