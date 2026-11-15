import { fireEvent, render, screen } from '@testing-library/react-native';

import { CheckboxGroup } from './CheckboxGroup';

const TOPPINGS = [
  { value: 'cheese', label: 'Cheese' },
  { value: 'olives', label: 'Olives' },
  { value: 'basil', label: 'Basil' },
];

describe('CheckboxGroup', () => {
  it('checks and unchecks options, in their order', async () => {
    const onValueChange = jest.fn();
    await render(<CheckboxGroup options={TOPPINGS} defaultValue={['basil']} onValueChange={onValueChange} />);
    await fireEvent.press(screen.getByRole('checkbox', { name: 'Cheese' }));
    expect(onValueChange).toHaveBeenLastCalledWith(['cheese', 'basil']);
    expect(screen.getByRole('checkbox', { name: 'Cheese', checked: true })).toBeTruthy();
  });

  it('has a select-all box that shows mixed and checks them all', async () => {
    const onValueChange = jest.fn();
    await render(<CheckboxGroup options={TOPPINGS} value={['olives']} onValueChange={onValueChange} selectAllLabel="All toppings" />);
    expect(screen.getByRole('checkbox', { name: 'All toppings', checked: 'mixed' })).toBeTruthy();
    await fireEvent.press(screen.getByRole('checkbox', { name: 'All toppings' }));
    expect(onValueChange).toHaveBeenCalledWith(['cheese', 'olives', 'basil']);
  });
});
