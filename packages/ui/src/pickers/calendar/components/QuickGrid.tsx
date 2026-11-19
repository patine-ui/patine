import { Text } from '@/core/primitives/Text';
import { Touchable } from '@/core/primitives/Touchable';
import { View } from '@/core/primitives/View';
import { styles, themed } from '@/pickers/calendar/calendar.styles';
import type { QuickGridProps } from '@/pickers/calendar/calendar.types';
import { chunkRows, getGridHeight } from '@/pickers/calendar/calendar.utils';

/** The 4×3 month or year grid shown after tapping the title. */
export const QuickGrid = ({ cells, height, onSelect, theme, slots }: QuickGridProps) => (
  <View style={[styles.quickGrid, getGridHeight(height), themed(theme).quickGrid]}>
    {chunkRows(cells).map((row) => (
      <View key={row[0]?.key} style={styles.week}>
        {row.map((cell) => (
          <Touchable
            key={cell.key}
            theme={theme}
            disabled={cell.disabled}
            onPress={() => onSelect(cell.value)}
            style={[styles.quickCell, themed(theme).round, cell.selected && themed(theme).quickOn, slots?.gridCell]}
            role="button"
            aria-selected={cell.selected}
          >
            <Text
              theme={theme}
              weight={cell.selected ? 'semibold' : 'regular'}
              color={cell.selected ? 'onPrimary' : 'text'}
              style={slots?.gridCellText}
            >
              {cell.label}
            </Text>
          </Touchable>
        ))}
      </View>
    ))}
  </View>
);
