import { useControllableState } from '@/core/hooks/useControllableState';
import { Scroll } from '@/core/primitives/Scroll';
import { Text } from '@/core/primitives/Text';
import { Touchable } from '@/core/primitives/Touchable';
import { View } from '@/core/primitives/View';
import { ThemeScope, useComponentTheme, useDirection, useLabels } from '@/core/theme/ThemeProvider';
import { Heading } from '@/foundations/text/Heading';
import { HeaderTitle } from './components/HeaderTitle';
import { TABLE_DESIGN } from './table.constants';
import { styles, themed } from './table.styles';
import type { TableColumn, TableProps, TableSort } from './table.types';
import {
  getAriaSort,
  getCellFont,
  getCellValue,
  getColumnBox,
  getRowKey,
  getTableWidth,
  getTextAlign,
  nextSort,
  sortRows,
} from './table.utils';

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
  emptyText: emptyTextProp,
  minWidth,
  theme: themeProp,
  design,
  style,
  styles: slots,
  ...rest
}: TableProps<T>) => {
  const words = useLabels();
  const dir = useDirection();
  const emptyText = emptyTextProp ?? words.table.empty;
  const { theme, themeOverride } = useComponentTheme(themeProp, design);
  const [sort, setSort] = useControllableState<TableSort | null>(sortProp, defaultSort, onSortChange);
  const look = TABLE_DESIGN[theme.design];
  const sheet = themed(theme);
  const rows = manualSort ? [...data] : sortRows(data, columns, sort);
  const cellBox = (column: TableColumn<T>) => [getColumnBox(column), styles.cell, sheet.cell, styles[column.align ?? 'start']];

  const headerTitle = (column: TableColumn<T>) => (
    <HeaderTitle
      title={column.title}
      align={column.align}
      sort={column.sortable && sort?.key === column.key ? sort : null}
      style={slots?.headerCell}
    />
  );

  const header = (
    <View role="row" style={[styles.row, sheet.header, sheet.hairline, slots?.header]}>
      {columns.map((column) =>
        column.sortable ? (
          <Touchable
            key={column.key}
            role="columnheader"
            aria-sort={getAriaSort(sort, column.key)}
            onPress={() => setSort(nextSort(sort, column.key))}
            style={cellBox(column)}
          >
            {headerTitle(column)}
          </Touchable>
        ) : (
          <View key={column.key} role="columnheader" accessible style={cellBox(column)}>
            {headerTitle(column)}
          </View>
        )
      )}
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
            <Text
              size={look.cellSize}
              font={getCellFont(value, column.align)}
              style={[getTextAlign(column.align, dir), styles.numbers, slots?.cell]}
            >
              {value === null || value === undefined ? '' : String(value)}
            </Text>
          )}
        </View>
      );
    });
    const rowStyle = [
      styles.row,
      sheet.row,
      index < rows.length - 1 && sheet.hairline,
      striped && index % 2 === 1 && sheet.stripe,
      slots?.row,
    ];
    const key = getRowKey(row, index, keyExtractor);
    return onRowPress ? (
      <Touchable key={key} role="row" onPress={() => onRowPress(row, index)} style={rowStyle}>
        {cells}
      </Touchable>
    ) : (
      <View key={key} role="row" style={rowStyle}>
        {cells}
      </View>
    );
  });

  const table = (
    <View role="table" style={[getTableWidth(minWidth), sheet.box, slots?.table]}>
      {header}
      {rows.length > 0 ? (
        body
      ) : (
        <View style={[styles.empty, sheet.empty]}>
          {typeof emptyText === 'string' ? (
            <Text size="sm" color="textSecondary">
              {emptyText}
            </Text>
          ) : (
            emptyText
          )}
        </View>
      )}
    </View>
  );

  return (
    <ThemeScope theme={themeOverride}>
      <View style={[sheet.root, style]} {...rest}>
        {typeof caption === 'string' ? (
          <Heading level={3} weight="medium" style={slots?.caption}>
            {caption}
          </Heading>
        ) : (
          caption
        )}
        {minWidth ? (
          <Scroll horizontal contentContainerStyle={styles.scrollContent}>
            {table}
          </Scroll>
        ) : (
          table
        )}
      </View>
    </ThemeScope>
  );
};
