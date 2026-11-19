import { Text } from '@/core/primitives/Text';
import { Touchable } from '@/core/primitives/Touchable';
import { View } from '@/core/primitives/View';
import { VirtualList } from '@/core/primitives/VirtualList';
import { useTimePanelColumn } from '@/pickers/time/hooks/useTimePanelColumn';
import { styles, themed } from '@/pickers/time/time.styles';
import type { TimePanelColumnProps } from '@/pickers/time/time.types';
import { getColumnHeight, getPanelCellLabel } from '@/pickers/time/time.utils';

/** One column of a time panel: hours, minutes, seconds or AM/PM, each a cell to click, under its unit when it has one. */
export const TimePanelColumn = ({ column, visibleRows, theme }: TimePanelColumnProps) => {
  const list = useTimePanelColumn(column, visibleRows);
  return (
    <View style={styles.panelColumn}>
      {column.suffix ? (
        <Text theme={theme} size="sm" color="textSecondary" style={styles.panelHeader} aria-hidden>
          {column.suffix}
        </Text>
      ) : null}
      <VirtualList
        ref={list.ref}
        data={list.items}
        keyExtractor={(item) => String(item.value)}
        getItemLayout={list.getItemLayout}
        initialScrollIndex={list.initialIndex}
        showsVerticalScrollIndicator={false}
        style={[styles.panelList, getColumnHeight(visibleRows)]}
        testID={column.testID}
        renderItem={({ item }) => {
          const selected = item.value === list.selected;
          return (
            <Touchable
              theme={theme}
              disabled={item.disabled}
              onPress={() => column.onValueChange(item.value)}
              role="button"
              aria-label={getPanelCellLabel(column, item.label)}
              aria-selected={selected}
              aria-disabled={item.disabled}
              style={[styles.cell, themed(theme).cell, selected && themed(theme).cellOn]}
            >
              <Text theme={theme} weight={selected ? 'bold' : 'regular'} color={selected ? 'onPrimary' : 'text'}>
                {item.label}
              </Text>
            </Touchable>
          );
        }}
      />
    </View>
  );
};
