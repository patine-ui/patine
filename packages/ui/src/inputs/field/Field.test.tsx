import { fireEvent, render, screen } from '@testing-library/react-native';

import { NumberField } from './NumberField';
import { Stepper } from './Stepper';

describe('Stepper', () => {
  it('steps up and down within the range, and dims the end it reached', async () => {
    const onValueChange = jest.fn();
    await render(<Stepper defaultValue={1} min={1} max={2} onValueChange={onValueChange} aria-label="Guests" />);
    expect(screen.getByRole('button', { name: 'Decrease' })).toBeDisabled();
    await fireEvent.press(screen.getByRole('button', { name: 'Increase' }));
    expect(onValueChange).toHaveBeenLastCalledWith(2);
    expect(screen.getByRole('button', { name: 'Increase' })).toBeDisabled();
    expect(screen.getByText('2', { includeHiddenElements: true })).toBeTruthy();
  });

  it('answers screen-reader adjust actions', async () => {
    const onValueChange = jest.fn();
    await render(<Stepper value={5} onValueChange={onValueChange} aria-label="Quantity" />);
    const control = screen.getByRole('slider', { name: 'Quantity' });
    expect(control.props['aria-valuetext']).toEqual('5');
    await fireEvent(control, 'accessibilityAction', { nativeEvent: { actionName: 'decrement' } });
    expect(onValueChange).toHaveBeenCalledWith(4);
  });

  it('hides the value in the iOS design, as UIStepper does', async () => {
    await render(<Stepper defaultValue={3} design="ios" />);
    expect(screen.queryByText('3', { includeHiddenElements: true })).toBeNull();
  });
});

describe('NumberField', () => {
  it('reads typed text on blur, kept within the range', async () => {
    const onValueChange = jest.fn();
    await render(<NumberField label="Age" max={120} onValueChange={onValueChange} />);
    const input = screen.getByLabelText('Age');
    await fireEvent(input, 'focus');
    await fireEvent.changeText(input, '150');
    expect(onValueChange).not.toHaveBeenCalled();
    await fireEvent(input, 'blur');
    expect(onValueChange).toHaveBeenCalledWith(120);
    expect(screen.getByLabelText('Age').props.value).toBe('120');
  });

  it('steps with the buttons and clears to null', async () => {
    const onValueChange = jest.fn();
    await render(<NumberField label="Seats" defaultValue={2} step={2} onValueChange={onValueChange} design="brand" />);
    await fireEvent.press(screen.getByRole('button', { name: 'Increase' }));
    expect(onValueChange).toHaveBeenLastCalledWith(4);
    const input = screen.getByLabelText('Seats');
    await fireEvent(input, 'focus');
    await fireEvent.changeText(input, '');
    await fireEvent(input, 'submitEditing');
    expect(onValueChange).toHaveBeenLastCalledWith(null);
  });

  it('puts back the last value when the text is not a number, and formats it when not editing', async () => {
    await render(<NumberField label="Price" defaultValue={5} formatValue={(v) => `USD ${v}`} />);
    expect(screen.getByLabelText('Price').props.value).toBe('USD 5');
    await fireEvent(screen.getByLabelText('Price'), 'focus');
    expect(screen.getByLabelText('Price').props.value).toBe('5');
    await fireEvent.changeText(screen.getByLabelText('Price'), 'abc');
    await fireEvent(screen.getByLabelText('Price'), 'blur');
    expect(screen.getByLabelText('Price').props.value).toBe('USD 5');
  });

  it('steps with the arrow keys', async () => {
    const onValueChange = jest.fn();
    await render(<NumberField label="Qty" defaultValue={1} onValueChange={onValueChange} />);
    await fireEvent(screen.getByLabelText('Qty'), 'keyPress', { nativeEvent: { key: 'ArrowUp' }, preventDefault: () => {} });
    expect(onValueChange).toHaveBeenCalledWith(2);
  });
});
