import { Scroll } from '@/core/primitives/Scroll';
import { View } from '@/core/primitives/View';
import { ThemeScope, useComponentTheme, useLabels } from '@/core/theme/ThemeProvider';
import { SortableRow } from './components/SortableRow';
import { useSortable } from './hooks/useSortable';
import { SORT_ACTIVATION } from './sortable.constants';
import { styles } from './sortable.styles';
import type { SortableListProps } from './sortable.types';

/**
 * A list you reorder by dragging: hold a row (or press its SortableHandle) to lift it, drag, and the others make way; the
 * list scrolls when you drag near its edge. On the web, focus a row, press Space, move it with the arrow keys and press
 * Space again. Screen readers get Move up and Move down actions. Not virtualized: for lists up to a few hundred rows.
 */
export const SortableList = <T,>({
  data,
  keyExtractor,
  renderItem,
  onReorder,
  activation = SORT_ACTIVATION.longPress,
  getItemLabel,
  disabled = false,
  labels: labelsProp,
  onDragStart,
  theme: themeProp,
  design,
  scrollEnabled = true,
  style,
  ...rest
}: SortableListProps<T>) => {
  const { theme, themeOverride } = useComponentTheme(themeProp, design);
  const words = useLabels();
  const labels = { ...words.sortable, ...labelsProp };
  const sortable = useSortable({ data, keyExtractor, onReorder, onDragStart, disabled, theme, labels });
  return (
    <ThemeScope theme={themeOverride}>
      <View ref={sortable.rootRef} style={[style, sortable.active && styles.dragging]} {...sortable.panHandlers}>
        <Scroll
          ref={sortable.scrollRef}
          role="list"
          scrollEnabled={scrollEnabled && !sortable.active}
          scrollEventThrottle={16}
          {...rest}
          onScroll={sortable.onScroll}
          onContentSizeChange={sortable.onContentSizeChange}
          onLayout={sortable.onLayout}
        >
          {data.map((item, index) => {
            const key = sortable.keys[index] as string;
            const active = sortable.active?.key === key;
            return (
              <SortableRow
                key={key}
                itemKey={key}
                index={index}
                count={data.length}
                shift={sortable.shiftOf(index)}
                active={active}
                dragging={!!sortable.active}
                grabbed={sortable.grabbed === key}
                drag={sortable.drag}
                label={getItemLabel?.(item)}
                labels={labels}
                activation={activation}
                disabled={disabled}
                theme={theme}
                onLayout={sortable.onRowLayout}
                onLift={sortable.lift}
                onRelease={sortable.release}
                onMove={sortable.move}
                onGrab={sortable.grab}
              >
                {renderItem({ item, index, isActive: active || sortable.grabbed === key })}
              </SortableRow>
            );
          })}
        </Scroll>
      </View>
    </ThemeScope>
  );
};
