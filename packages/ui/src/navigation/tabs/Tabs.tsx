import { View } from '@/core/primitives/View';
import { ThemeScope, useComponentTheme } from '@/core/theme/ThemeProvider';
import { useTabsState } from './hooks/useTabsState';
import { TabsContent } from './TabsContent';
import { TabsContext } from './TabsContext';
import { TabsList } from './TabsList';
import { TabsTrigger } from './TabsTrigger';
import { TABS_DESIGN, TABS_ORIENTATION } from './tabs.constants';
import { styles, themed } from './tabs.styles';
import type { TabsProps } from './tabs.types';
import { firstEnabledValue } from './tabs.utils';

/**
 * Panels of content shown one at a time. Give it `items` ({ value, label, content }), or compose a TabsList of TabsTriggers
 * and a TabsContent for each for full control.
 */
export const Tabs = ({
  value,
  defaultValue,
  onValueChange,
  orientation = TABS_ORIENTATION.horizontal,
  variant,
  theme: themeProp,
  design,
  style,
  items,
  children,
  ...rest
}: TabsProps) => {
  const { theme, themeOverride } = useComponentTheme(themeProp, design);
  const vertical = orientation === TABS_ORIENTATION.vertical;
  const ctx = useTabsState({
    value,
    defaultValue: defaultValue ?? firstEnabledValue(items),
    onValueChange,
    theme,
    variant: variant ?? TABS_DESIGN[theme.design].variant,
    vertical,
  });
  return (
    <ThemeScope theme={themeOverride}>
      <TabsContext.Provider value={ctx}>
        <View style={[vertical && styles.row, themed(theme).root, style]} {...rest}>
          {items ? (
            <>
              <TabsList>
                {items.map((item) => (
                  <TabsTrigger key={item.value} value={item.value} icon={item.icon} disabled={item.disabled}>
                    {item.label}
                  </TabsTrigger>
                ))}
              </TabsList>
              {items.map((item) => (
                <TabsContent key={item.value} value={item.value}>
                  {item.content}
                </TabsContent>
              ))}
            </>
          ) : (
            children
          )}
        </View>
      </TabsContext.Provider>
    </ThemeScope>
  );
};
