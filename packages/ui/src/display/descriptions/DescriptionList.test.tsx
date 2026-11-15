import { render, screen } from '@testing-library/react-native';

import { DescriptionList } from './DescriptionList';

const ITEMS = [
  { term: 'Order', details: '#1042' },
  { term: 'Placed', details: 'March 3, 2026' },
];

describe('DescriptionList', () => {
  it('reads each term with its details', async () => {
    await render(<DescriptionList items={ITEMS} />);
    expect(screen.getByLabelText('Order, #1042')).toBeTruthy();
    expect(screen.getByLabelText('Placed, March 3, 2026')).toBeTruthy();
  });

  it('puts the term above its details when vertical', async () => {
    await render(<DescriptionList items={ITEMS} orientation="vertical" />);
    expect(screen.getByLabelText('Order, #1042')).toHaveStyle({ flexDirection: 'column' });
  });
});
