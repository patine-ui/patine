import { View } from 'react-native';

import { PickerText } from '@/core/components/PickerText';
import { Touchable } from '@/core/components/Touchable';
import { DISABLED_OPACITY, FOCUS_OUTLINE } from '@/core/core.constants';
import { focusOutline } from '@/core/utils/focus.utils';
import { useTabsTrigger } from './hooks/useTabsTrigger';
import { TABS_VARIANT } from './tabs.constants';
import { styles } from './tabs.styles';
import type { TabsTriggerProps } from './tabs.types';
import { touchSlop } from './tabs.utils';

/** One tab. Only the active tab is in the Tab order; arrow keys, Home and End move between tabs and select them. */
export const TabsTrigger = ({ value, disabled = false, icon, children, style, labelStyle, onFocus, onBlur, ...rest }: TabsTriggerProps) => {
  const { tabs, ref, focus, look, selected, ids, onTabLayout, onContentLayout, keys } = useTabsTrigger(value, disabled);
  const { theme } = tabs;
  const c = theme.colors;
  const pills = tabs.variant === TABS_VARIANT.pills;
  const height = pills ? look.pillHeight : look.underlineHeight;
  const labelColor = selected ? (pills ? c.text : c[look.activeLabel]) : c.textSecondary;

  return (
    <Touchable
      ref={ref}
      theme={theme}
      role="tab"
      id={ids.tab}
      aria-controls={ids.panel}
      aria-selected={selected}
      aria-disabled={disabled}
      disabled={disabled}
      hitSlop={touchSlop(height)}
      onPress={() => tabs.select(value)}
      onLayout={onTabLayout}
      {...keys}
      // ponytail: with nothing selected every tab is in the Tab order; the pattern wants only the first.
      focusable={!disabled && (selected || tabs.value === undefined)}
      onFocus={(e) => {
        focus.onFocus();
        onFocus?.(e);
      }}
      onBlur={(e) => {
        focus.onBlur();
        onBlur?.(e);
      }}
      {...rest}
      style={[
        styles.trigger,
        {
          minHeight: height,
          paddingHorizontal: pills ? theme.spacing.md : theme.spacing.lg,
          borderRadius: pills ? theme.radius.sm : 0,
        },
        !tabs.vertical && look.fullWidth && styles.fill,
        disabled && { opacity: DISABLED_OPACITY },
        // Inset, since the list clips anything drawn outside a tab.
        focus.focusVisible && [focusOutline(c.primary), { outlineOffset: -FOCUS_OUTLINE.width }],
        style,
      ]}
    >
      <View onLayout={onContentLayout} style={[styles.label, { gap: theme.spacing.xs }]}>
        {icon}
        {typeof children === 'string' || typeof children === 'number' ? (
          <PickerText theme={theme} size="sm" weight="medium" numberOfLines={1} style={[{ color: labelColor }, labelStyle]}>
            {children}
          </PickerText>
        ) : (
          children
        )}
      </View>
    </Touchable>
  );
};
