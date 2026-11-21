import { compareValues, getAriaSort, getCellFont, getColumnBox, getRowKey, getTableWidth, nextSort, sortRows } from './table.utils';

type Row = { name: string; amount: number | null };
const rows: Row[] = [
  { name: 'item 10', amount: 5 },
  { name: 'Item 2', amount: null },
  { name: 'item 1', amount: 20 },
  { name: 'item 3', amount: 5 },
];
const columns = [
  { key: 'name', title: 'Name' },
  { key: 'amount', title: 'Amount' },
];
const names = (list: Row[]) => list.map((r) => r.name);

describe('compareValues', () => {
  it('sorts numbers by size and text naturally', () => {
    expect(compareValues(2, 10)).toBeLessThan(0);
    expect(compareValues('item 2', 'item 10')).toBeLessThan(0);
    expect(compareValues('a', 'A')).toBe(0);
  });
});

describe('sortRows', () => {
  it('sorts by the column, either way, keeping empty values last', () => {
    expect(names(sortRows(rows, columns, { key: 'name', direction: 'asc' }))).toEqual(['item 1', 'Item 2', 'item 3', 'item 10']);
    expect(names(sortRows(rows, columns, { key: 'amount', direction: 'desc' }))).toEqual(['item 1', 'item 10', 'item 3', 'Item 2']);
    expect(names(sortRows(rows, columns, { key: 'amount', direction: 'asc' }))).toEqual(['item 10', 'item 3', 'item 1', 'Item 2']);
  });

  it('leaves the order alone without a sort', () => {
    expect(sortRows(rows, columns, null)).toEqual(rows);
  });

  it('uses the accessor when there is one', () => {
    const byLength = [{ key: 'name', title: 'Name', accessor: (r: Row) => r.name.length }];
    expect(names(sortRows(rows, byLength, { key: 'name', direction: 'desc' }))[0]).toBe('item 10');
  });
});

describe('nextSort', () => {
  it('cycles ascending, descending, none, and restarts on another column', () => {
    expect(nextSort(null, 'a')).toEqual({ key: 'a', direction: 'asc' });
    expect(nextSort({ key: 'a', direction: 'asc' }, 'a')).toEqual({ key: 'a', direction: 'desc' });
    expect(nextSort({ key: 'a', direction: 'desc' }, 'a')).toBeNull();
    expect(nextSort({ key: 'a', direction: 'desc' }, 'b')).toEqual({ key: 'b', direction: 'asc' });
  });
});

describe('getAriaSort', () => {
  it('names the sorted column', () => {
    expect(getAriaSort({ key: 'a', direction: 'desc' }, 'a')).toBe('descending');
    expect(getAriaSort({ key: 'a', direction: 'desc' }, 'b')).toBe('none');
  });
});

describe('getColumnBox, getRowKey and getTableWidth', () => {
  it('sizes a column by width or flex', () => {
    expect(getColumnBox({ key: 'a', title: 'A', width: 80 })).toEqual({ width: 80 });
    expect(getColumnBox({ key: 'a', title: 'A' })).toEqual({ flex: 1 });
  });

  it('keys a row by keyExtractor, id, then index', () => {
    expect(getRowKey({ id: 7 }, 0, (_row, i) => `r${i}`)).toBe('r0');
    expect(getRowKey({ id: 7 }, 0)).toBe('7');
    expect(getRowKey({}, 3)).toBe('3');
  });

  it('only widens a table given minWidth', () => {
    expect(getTableWidth(undefined)).toBeNull();
    expect(getTableWidth(600)).toEqual({ minWidth: 600, flexGrow: 1 });
  });
});

describe('getCellFont', () => {
  it('draws numbers and right-aligned cells in the numeric font', () => {
    expect(getCellFont(12, undefined)).toBe('numeric');
    expect(getCellFont('$1,200', 'end')).toBe('numeric');
    expect(getCellFont('Ana', 'start')).toBe('body');
  });
});
