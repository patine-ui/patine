import { fireEvent, render, screen } from '@testing-library/react-native';

import { Table } from './Table';

type Invoice = { id: string; customer: string; amount: number };
const DATA: Invoice[] = [
  { id: 'INV-2', customer: 'Bea', amount: 250 },
  { id: 'INV-1', customer: 'Ana', amount: 90 },
];
const COLUMNS = [
  { key: 'id', title: 'Invoice' },
  { key: 'customer', title: 'Customer', sortable: true },
  { key: 'amount', title: 'Amount', align: 'end' as const, sortable: true, accessor: (r: Invoice) => r.amount * 100 },
];

describe('Table', () => {
  it('draws a header and a row per item', async () => {
    await render(<Table columns={COLUMNS} data={DATA} caption="Invoices" />);
    expect(screen.getAllByRole('columnheader')).toHaveLength(3);
    expect(screen.getAllByRole('cell')).toHaveLength(6);
    expect(screen.getByText('25000')).toBeTruthy();
    expect(screen.getByRole('heading', { name: 'Invoices' })).toBeTruthy();
  });

  it('sorts when a sortable header is pressed, and reports it', async () => {
    const onSortChange = jest.fn();
    await render(<Table columns={COLUMNS} data={DATA} onSortChange={onSortChange} />);
    await fireEvent.press(screen.getByText('Customer'));
    expect(onSortChange).toHaveBeenLastCalledWith({ key: 'customer', direction: 'asc' });
    expect(screen.getAllByText(/INV-/).map((t) => t.props.children)).toEqual(['INV-1', 'INV-2']);
    expect(screen.getByText('Customer ↑')).toBeTruthy();
  });

  it('keeps the given order with manualSort', async () => {
    await render(<Table columns={COLUMNS} data={DATA} sort={{ key: 'customer', direction: 'asc' }} manualSort />);
    expect(screen.getAllByText(/INV-/).map((t) => t.props.children)).toEqual(['INV-2', 'INV-1']);
  });

  it('presses rows and shows the empty text', async () => {
    const onRowPress = jest.fn();
    await render(<Table columns={COLUMNS} data={DATA} onRowPress={onRowPress} />);
    await fireEvent.press(screen.getByText('Bea'));
    expect(onRowPress).toHaveBeenCalledWith(DATA[0], 0);
    await screen.rerender(<Table columns={COLUMNS} data={[]} />);
    expect(screen.getByText('No results.')).toBeTruthy();
  });
});
