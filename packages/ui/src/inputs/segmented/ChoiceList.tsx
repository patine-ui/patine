import { ARROW_FOCUS } from '@/core/a11y/keyboard.utils';
import { Scroll } from '@/core/primitives/Scroll';
import { AnimatedView, View } from '@/core/primitives/View';
import { ThemeScope, useComponentTheme } from '@/core/theme/ThemeProvider';
import { ListItem } from './components/ListItem';
import { ScrollArrow } from './components/ScrollArrow';
import { useChoiceList } from './hooks/useChoiceList';
import { useChoiceSelection } from './hooks/useChoiceSelection';
import { useSegmentThumb } from './hooks/useSegmentThumb';
import { ARROW_POSITION, CHOICE_ICON_POSITION, CHOICE_VARIANT, LIST_DESIGN, SCROLL_ARROW_SIDES } from './segmented.constants';
import { styles, themed } from './segmented.styles';
import type { ChoiceListAnyProps } from './segmented.types';

/**
 * A row of choices that scrolls sideways, one selected (radios) or with `type: 'multiple'` any number (checkboxes). Pressing
 * an item at the edge scrolls the next one into view, so the user sees there's more.
 */
export const ChoiceList = <T,>({
  items,
  type,
  value,
  defaultValue,
  onValueChange,
  isEqual,
  variant = CHOICE_VARIANT.segmented,
  iconPosition = CHOICE_ICON_POSITION.left,
  showArrows = false,
  arrowPosition = ARROW_POSITION.outside,
  renderArrow,
  renderItem,
  'aria-label': accessibilityLabel,
  style,
  styles: slots,
  theme: themeProp,
  design,
  testID,
}: ChoiceListAnyProps<T>) => {
  const { theme, themeOverride } = useComponentTheme(themeProp, design);
  const sheet = themed(theme);
  const selection = useChoiceSelection<T>({ items, type, value, defaultValue, onValueChange, isEqual });
  const list = useChoiceList<T>((_, item) => selection.select(item), theme.spacing.lg);
  const thumb = useSegmentThumb(selection.selectedIndex, theme.animation.duration);
  const segmented = variant === CHOICE_VARIANT.segmented;
  const { outlined } = LIST_DESIGN[theme.design];
  const overlay = arrowPosition === ARROW_POSITION.overlay;
  const scroller = (
    <Scroll
      ref={list.scrollRef}
      horizontal
      showsHorizontalScrollIndicator={false}
      onLayout={list.onLayout}
      onContentSizeChange={list.onContentSizeChange}
      onScroll={list.onScroll}
      scrollEventThrottle={16}
      role={selection.multiple ? 'group' : 'radiogroup'}
      aria-label={accessibilityLabel}
      style={[
        styles.list,
        segmented && [styles.track, outlined && styles.outlinedTrack, sheet.track],
        !showArrows && style,
        showArrows && !overlay && styles.arrowFrameList,
        slots?.container,
      ]}
      contentContainerStyle={[
        styles.content,
        segmented ? (outlined ? styles.outlinedContent : styles.trackContent) : sheet.chips,
        slots?.content,
      ]}
      {...ARROW_FOCUS}
      testID={testID}
    >
      {segmented && !outlined && thumb.placed ? <AnimatedView style={[styles.thumb, thumb.style, sheet.thumb, slots?.thumb]} /> : null}
      {items.map((item, index) => (
        <ListItem
          key={item.label}
          item={item}
          selected={selection.isSelected(item, index)}
          multiple={selection.multiple}
          divided={index > 0}
          variant={variant}
          iconPosition={iconPosition}
          renderItem={renderItem}
          onPress={() => list.press(item, index)}
          onLayout={(layout) => {
            list.onItemLayout(index, layout);
            thumb.onItemLayout(index, layout);
          }}
          theme={theme}
          slots={slots}
          testID={testID ? `${testID}-item-${index}` : undefined}
        />
      ))}
    </Scroll>
  );
  if (!showArrows) return <ThemeScope theme={themeOverride}>{scroller}</ThemeScope>;
  // Beside the list, both arrows show while it overflows, so it doesn't change width as it scrolls. Overlaid, only where items hide.
  const overflows = list.hidden.left || list.hidden.right;
  const [left, right] = SCROLL_ARROW_SIDES.map((side) =>
    (overlay ? list.hidden[side] : overflows) ? (
      <ScrollArrow
        key={side}
        side={side}
        disabled={!list.hidden[side]}
        overlay={overlay}
        renderArrow={renderArrow}
        onPress={() => list.scrollPage(side, overlay)}
        theme={theme}
        slots={slots}
        testID={testID ? `${testID}-arrow-${side}` : undefined}
      />
    ) : null
  );
  // The arrows need a frame around the scroll view; `style` lays out that frame.
  return (
    <ThemeScope theme={themeOverride}>
      {overlay ? (
        <View style={style}>
          {scroller}
          {left}
          {right}
        </View>
      ) : (
        <View style={[styles.arrowFrame, sheet.arrowFrame, style]}>
          {left}
          {scroller}
          {right}
        </View>
      )}
    </ThemeScope>
  );
};
