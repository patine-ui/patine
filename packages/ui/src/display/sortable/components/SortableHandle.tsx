import { Pressable, View } from '@/core/primitives/View';
import { useComponentTheme } from '@/core/theme/ThemeProvider';
import { useSortableRow } from '@/display/sortable/SortableContext';
import { SORTABLE_DESIGN } from '@/display/sortable/sortable.constants';
import { styles, themed } from '@/display/sortable/sortable.styles';
import type { SortableHandleProps } from '@/display/sortable/sortable.types';

/**
 * Put it in a SortableList row: pressing it lifts the row at once, with no long press. iOS's three-line reorder control,
 * or the six-dot drag indicator of Material and the web. Hidden from screen readers, which move rows with actions instead.
 */
export const SortableHandle = ({
  'aria-label': accessibilityLabel = 'Drag to reorder',
  theme: themeProp,
  design,
  style,
  testID,
}: SortableHandleProps) => {
  const row = useSortableRow();
  const { theme: own } = useComponentTheme(themeProp, design);
  const theme = themeProp || design ? own : (row?.theme ?? own);
  const look = SORTABLE_DESIGN[theme.design];
  const mark = themed(theme).mark;
  return (
    <Pressable
      accessible={false}
      tabIndex={-1}
      aria-hidden
      aria-label={accessibilityLabel}
      disabled={!row || row.disabled}
      onPressIn={row?.lift}
      onPressOut={row?.release}
      hitSlop={4}
      style={[styles.handle, style]}
      testID={testID}
    >
      {look.handle === 'lines' ? (
        <View style={styles.lines}>
          {[0, 1, 2].map((i) => (
            <View key={i} style={[styles.line, mark]} />
          ))}
        </View>
      ) : (
        <View style={styles.dots}>
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <View key={i} style={[styles.dot, mark]} />
          ))}
        </View>
      )}
    </Pressable>
  );
};
