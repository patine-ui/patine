import { Scroll } from '@/core/primitives/Scroll';
import { AnimatedView, View } from '@/core/primitives/View';
import { useTabs } from './TabsContext';
import { TABS_DESIGN, TABS_VARIANT } from './tabs.constants';
import { styles, themed } from './tabs.styles';
import type { TabsListProps } from './tabs.types';

/** The row of tabs. It scrolls sideways when the tabs don't fit; vertical tabs stack in a column. */
export const TabsList = ({ style, children, ...rest }: TabsListProps) => {
  const { theme, variant, vertical, indicator } = useTabs();
  const look = TABS_DESIGN[theme.design];
  const sheet = themed(theme);
  const pills = variant === TABS_VARIANT.pills;
  const frame = pills ? [styles.track, sheet.track] : vertical ? sheet.lineDown : sheet.lineAcross;
  const content = [pills && styles.trackContent, !vertical && look.fullWidth && styles.fill];
  const bar = pills ? (
    <AnimatedView style={[styles.pill, vertical ? styles.pillVertical : styles.pillHorizontal, sheet.pill, indicator.style]} />
  ) : (
    <AnimatedView
      style={[
        styles.underline,
        vertical ? [styles.underlineVertical, sheet.underlineDown] : [styles.underlineHorizontal, sheet.underlineAcross],
        sheet.underline,
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
    <Scroll
      horizontal
      showsHorizontalScrollIndicator={false}
      role="tablist"
      aria-orientation="horizontal"
      style={[styles.list, frame, style]}
      contentContainerStyle={[styles.listContent, content]}
      {...rest}
    >
      {items}
    </Scroll>
  );
};
