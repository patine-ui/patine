import { Text } from '@/core/primitives/Text';
import { Touchable } from '@/core/primitives/Touchable';
import { View } from '@/core/primitives/View';
import { ContentColor } from '@/core/theme/ContentColor';
import { isTextContent } from '@/core/utils/text.utils';
import { useTabsTrigger } from './hooks/useTabsTrigger';
import { TABS_VARIANT } from './tabs.constants';
import { styles, themed } from './tabs.styles';
import type { TabsTriggerProps } from './tabs.types';

/** One tab. Only the active tab is in the Tab order; arrow keys, Home and End move between tabs and select them. */
export const TabsTrigger = ({ value, disabled = false, icon, children, style, styles: slots, ...rest }: TabsTriggerProps) => {
  const { tabs, ref, look, selected, ids, onTabLayout, onContentLayout, keys } = useTabsTrigger(value, disabled);
  const { theme } = tabs;
  const sheet = themed(theme);
  const pills = tabs.variant === TABS_VARIANT.pills;
  const labelColor = selected ? (pills ? sheet.pillsActive : sheet.underlineActive) : sheet.idle;

  return (
    <Touchable
      ref={ref}
      theme={theme}
      role="tab"
      // Inset, since the list clips anything drawn outside a tab.
      focusRing="inset"
      id={ids.tab}
      aria-controls={ids.panel}
      aria-selected={selected}
      disabled={disabled}
      onPress={() => tabs.select(value)}
      onLayout={onTabLayout}
      {...keys}
      // ponytail: with nothing selected every tab is in the Tab order; the pattern wants only the first.
      focusable={!disabled && (selected || tabs.value === undefined)}
      {...rest}
      style={[styles.trigger, pills ? sheet.pillsTab : sheet.underlineTab, !tabs.vertical && look.fullWidth && styles.fill, style]}
    >
      <View onLayout={onContentLayout} style={[styles.label, sheet.label]}>
        <ContentColor color={labelColor.color}>{icon}</ContentColor>
        {isTextContent(children) ? (
          <Text size="sm" weight="medium" numberOfLines={1} style={[labelColor, slots?.label]}>
            {children}
          </Text>
        ) : (
          children
        )}
      </View>
    </Touchable>
  );
};
