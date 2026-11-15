import { ScrollView, StyleSheet, View } from 'react-native';

import { PickerText } from '@/core/components/PickerText';
import { Touchable } from '@/core/components/Touchable';
import { useControllableState } from '@/core/hooks/useControllableState';
import { useComponentTheme } from '@/core/theme/ThemeProvider';
import { DEFAULT_EMPTY_TEXT, SORT_ARROW, TABLE_DESIGN } from './table.constants';
import type { TableAlign, TableColumn, TableProps, TableSort } from './table.types';
import { getAriaSort, getCellValue, nextSort, sortRows } from './table.utils';

const JUSTIFY = { left: 'flex-start', center: 'center', right: 'flex-end' } as const;

const columnBox = <T,>(column: TableColumn<T>) => (column.width ? { width: column.width } : { flex: column.flex ?? 1 });

/**
 * Rows and columns of data: orders, invoices, users. Columns come as data, cells draw as text or any node, headers sort
 * when `sortable`, and rows can be pressed. Scrolls sideways below `minWidth`. For thousands of rows, use a virtualized list.
 */
export const Table = <T,>({
  columns,
  data,
  keyExtractor,
  onRowPress,
  caption,
  striped = false,
  sort: sortProp,
  defaultSort = null,
  onSortChange,
  manualSort = false,
  emptyText = DEFAULT_EMPTY_TEXT,
  minWidth,
  theme: themeProp,
  design,
  style,
  styles: slots,
  ...rest
}: TableProps<T>) => {
  const { theme } = useComponentTheme(themeProp, design);
  const [sort, setSort] = useControllableState<TableSort | null>(sortProp, defaultSort, onSortChange);
  const look = TABLE_DESIGN[theme.design];
  const c = theme.colors;
  const rows = manualSort ? [...data] : sortRows(data, columns, sort);
  const hairline = { borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: c.border };
  const cellBox = (column: TableColumn<T>) => [
    columnBox(column),
    { paddingHorizontal: theme.spacing.md, justifyContent: 'center' as const, alignItems: JUSTIFY[column.align ?? 'left'] },
  ];
  const textAlign = (align: TableAlign | undefined) => ({ textAlign: align ?? 'left' });

  const headerTitle = (column: TableColumn<T>) => {
    const sorted = column.sortable && sort?.key === column.key;
    return (
      <PickerText
        theme={theme}
        size={look.headerUppercase ? 'xs' : 'sm'}
        weight="medium"
        color="textSecondary"
        numberOfLines={1}
        style={[
          textAlign(column.align),
          look.headerUppercase && { textTransform: 'uppercase', letterSpacing: 0.4 },
          sorted && { color: c.text },
          slots?.headerCell,
        ]}
      >
        {sorted && sort ? `${column.title} ${SORT_ARROW[sort.direction]}` : column.title}
      </PickerText>
    );
  };

  const header = (
    <View
      role="row"
      style={[
        { flexDirection: 'row', minHeight: look.headerHeight },
        look.headerFill ? { backgroundColor: c[look.headerFill] } : null,
        hairline,
        slots?.header,
      ]}
    >
      {columns.map((column) => {
        const title = headerTitle(column);
        return column.sortable ? (
          <Touchable
            key={column.key}
            theme={theme}
            role="columnheader"
            aria-sort={getAriaSort(sort, column.key)}
            onPress={() => setSort(nextSort(sort, column.key))}
            style={cellBox(column)}
          >
            {title}
          </Touchable>
        ) : (
          <View key={column.key} role="columnheader" accessible style={cellBox(column)}>
            {title}
          </View>
        );
      })}
    </View>
  );

  const body = rows.map((row, index) => {
    const cells = columns.map((column) => {
      const value = getCellValue(row, column);
      return (
        <View key={column.key} role="cell" accessible={!onRowPress} style={cellBox(column)}>
          {column.render ? (
            column.render(row, index)
          ) : (
            <PickerText
              theme={theme}
              size={look.cellSize}
              style={[textAlign(column.align), { fontVariant: ['tabular-nums'] }, slots?.cell]}
            >
              {value === null || value === undefined ? '' : String(value)}
            </PickerText>
          )}
        </View>
      );
    });
    const rowStyle = [
      { flexDirection: 'row' as const, minHeight: look.rowHeight, paddingVertical: theme.spacing.xs },
      index < rows.length - 1 ? hairline : null,
      striped && index % 2 === 1 ? { backgroundColor: c.surface } : null,
      slots?.row,
    ];
    const key = keyExtractor?.(row, index) ?? String((row as { id?: string | number }).id ?? index);
    return onRowPress ? (
      <Touchable key={key} theme={theme} role="row" onPress={() => onRowPress(row, index)} style={rowStyle}>
        {cells}
      </Touchable>
    ) : (
      <View key={key} role="row" style={rowStyle}>
        {cells}
      </View>
    );
  });

  const table = (
    <View
      role="table"
      style={[
        minWidth ? { minWidth, flexGrow: 1 } : null,
        look.outlined
          ? { borderWidth: StyleSheet.hairlineWidth, borderColor: c.border, borderRadius: theme.radius[look.radius], overflow: 'hidden' }
          : null,
        slots?.table,
      ]}
    >
      {header}
      {rows.length > 0 ? (
        body
      ) : (
        <View style={{ minHeight: look.rowHeight * 2, alignItems: 'center', justifyContent: 'center' }}>
          {typeof emptyText === 'string' ? (
            <PickerText theme={theme} size="sm" color="textSecondary">
              {emptyText}
            </PickerText>
          ) : (
            emptyText
          )}
        </View>
      )}
    </View>
  );

  return (
    <View style={[{ gap: theme.spacing.sm }, style]} {...rest}>
      {typeof caption === 'string' ? (
        <PickerText theme={theme} weight="medium" role="heading" style={slots?.caption}>
          {caption}
        </PickerText>
      ) : (
        caption
      )}
      {minWidth ? (
        <ScrollView horizontal contentContainerStyle={{ flexGrow: 1 }}>
          {table}
        </ScrollView>
      ) : (
        table
      )}
    </View>
  );
};
