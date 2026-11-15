import { Animated, ScrollView, StyleSheet, View } from 'react-native';

import { useTabs } from './TabsContext';
import { TABS_DESIGN, TABS_VARIANT } from './tabs.constants';
import { styles } from './tabs.styles';
import type { TabsListProps } from './tabs.types';

/** The row of tabs. It scrolls sideways when the tabs don't fit; vertical tabs stack in a column. */
export const TabsList = ({ style, children, ...rest }: TabsListProps) => {
  const { theme, variant, vertical, indicator } = useTabs();
  const look = TABS_DESIGN[theme.design];
  const c = theme.colors;
  const pills = variant === TABS_VARIANT.pills;
  const frame = pills
    ? [styles.track, { backgroundColor: c[look.track], borderRadius: theme.radius.md }]
    : { borderColor: c.border, [vertical ? 'borderStartWidth' : 'borderBottomWidth']: StyleSheet.hairlineWidth };
  const content = [pills && styles.trackContent, !vertical && look.fullWidth && styles.fill];
  const bar = pills ? (
    <Animated.View
      style={[
        styles.pill,
        vertical ? styles.pillVertical : styles.pillHorizontal,
        { backgroundColor: c.background, borderRadius: theme.radius.sm, boxShadow: theme.shadows.xs },
        indicator.style,
      ]}
    />
  ) : (
    <Animated.View
      style={[
        styles.underline,
        vertical
          ? [styles.underlineVertical, { width: look.indicatorSize }]
          : [
              styles.underlineHorizontal,
              { height: look.indicatorSize, borderTopLeftRadius: look.indicatorSize, borderTopRightRadius: look.indicatorSize },
            ],
        { backgroundColor: c.primary },
        indicator.style,
      ]}
    />
  );
  const items = (
    <>
      {indicator.placed ? bar : null}
      {children}
    </>
  );

  if (vertical) {
    return (
      <View role="tablist" aria-orientation="vertical" style={[frame, content, style]} {...rest}>
        {items}
      </View>
    );
  }
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      role="tablist"
      aria-orientation="horizontal"
      style={[styles.list, frame, style]}
      contentContainerStyle={[styles.listContent, content]}
      {...rest}
    >
      {items}
    </ScrollView>
  );
};
