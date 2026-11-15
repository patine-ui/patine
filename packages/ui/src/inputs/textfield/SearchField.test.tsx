import { fireEvent, render, screen } from '@testing-library/react-native';

import { SearchField } from './SearchField';

describe('SearchField', () => {
  it('types, clears with its button, and submits the text', async () => {
    const onValueChange = jest.fn();
    const onSubmit = jest.fn();
    await render(<SearchField onValueChange={onValueChange} onSubmit={onSubmit} />);
    const input = screen.getByLabelText('Search');
    expect(screen.queryByRole('button', { name: 'Clear search' })).toBeNull();
    await fireEvent.changeText(input, 'tacos');
    expect(onValueChange).toHaveBeenLastCalledWith('tacos');
    await fireEvent(input, 'submitEditing');
    expect(onSubmit).toHaveBeenCalledWith('tacos');
    await fireEvent.press(screen.getByRole('button', { name: 'Clear search' }));
    expect(onValueChange).toHaveBeenLastCalledWith('');
  });

  it('shows Cancel while focused, which clears and calls onCancel', async () => {
    const onCancel = jest.fn();
    await render(<SearchField defaultValue="pizza" onCancel={onCancel} />);
    expect(screen.queryByRole('button', { name: 'Cancel' })).toBeNull();
    await fireEvent(screen.getByLabelText('Search'), 'focus');
    await fireEvent.press(screen.getByRole('button', { name: 'Cancel' }));
    expect(onCancel).toHaveBeenCalled();
    expect(screen.getByLabelText('Search').props.value).toBe('');
  });

  it('does not call onValueChange when value changes from outside', async () => {
    const onValueChange = jest.fn();
    await render(<SearchField value="a" onValueChange={onValueChange} />);
    await screen.rerender(<SearchField value="b" onValueChange={onValueChange} />);
    expect(onValueChange).not.toHaveBeenCalled();
  });
});
