import { View } from '@/core/primitives/View';
import { useTabs } from './TabsContext';
import { styles } from './tabs.styles';
import type { TabsContentProps } from './tabs.types';
import { tabIds } from './tabs.utils';

/** The panel shown while its tab is active. Only the active one is mounted, unless `forceMount` keeps it, hidden. */
export const TabsContent = ({ value, forceMount = false, style, children, ...rest }: TabsContentProps) => {
  const { value: active, baseId, vertical } = useTabs();
  const selected = active === value;
  if (!selected && !forceMount) return null;
  const ids = tabIds(baseId, value);
  return (
    <View
      role="tabpanel"
      id={ids.panel}
      aria-labelledby={ids.tab}
      aria-hidden={!selected}
      style={[vertical && styles.fill, !selected && styles.hidden, style]}
      {...rest}
    >
      {children}
    </View>
  );
};
