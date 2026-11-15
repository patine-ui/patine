import { fireEvent, render, screen } from '@testing-library/react-native';

import { RadioGroup } from './RadioGroup';
import { RadioGroupItem } from './RadioGroupItem';

const keyDown = (key: string) => ({
  nativeEvent: { key },
  preventDefault: jest.fn(),
  stopPropagation: jest.fn(),
});

const Plans = (props: Partial<React.ComponentProps<typeof RadioGroup>>) => (
  <RadioGroup aria-label="Plan" {...props}>
    <RadioGroupItem value="free" label="Free" />
    <RadioGroupItem value="pro" label="Pro" />
    <RadioGroupItem value="team" label="Team" disabled />
  </RadioGroup>
);

describe('RadioGroup', () => {
  it('selects the pressed item and reports its value', async () => {
    const onValueChange = jest.fn();
    await render(<Plans defaultValue="free" onValueChange={onValueChange} />);
    expect(screen.getByLabelText('Plan').props.role).toBe('radiogroup');
    expect(screen.getByRole('radio', { name: 'Free' })).toBeChecked();
    await fireEvent.press(screen.getByRole('radio', { name: 'Pro' }));
    expect(onValueChange).toHaveBeenCalledWith('pro');
    expect(screen.getByRole('radio', { name: 'Pro' })).toBeChecked();
    expect(screen.getByRole('radio', { name: 'Free' })).not.toBeChecked();
  });

  it('moves with the arrow keys, skipping disabled items and wrapping', async () => {
    const onValueChange = jest.fn();
    await render(<Plans defaultValue="pro" onValueChange={onValueChange} />);
    await fireEvent(screen.getByRole('radio', { name: 'Pro' }), 'keyDown', keyDown('ArrowDown'));
    expect(onValueChange).toHaveBeenLastCalledWith('free');
    await fireEvent(screen.getByRole('radio', { name: 'Free' }), 'keyDown', keyDown('ArrowUp'));
    expect(onValueChange).toHaveBeenLastCalledWith('pro');
  });

  it('keeps only the selected item in the Tab order', async () => {
    await render(<Plans defaultValue="pro" />);
    expect(screen.getByRole('radio', { name: 'Pro' }).props.focusable).toBe(true);
    expect(screen.getByRole('radio', { name: 'Free' }).props.focusable).toBe(false);
  });

  it('does not select a disabled item', async () => {
    const onValueChange = jest.fn();
    await render(<Plans onValueChange={onValueChange} />);
    await fireEvent.press(screen.getByRole('radio', { name: 'Team' }));
    expect(onValueChange).not.toHaveBeenCalled();
  });
});

describe('RadioGroup shorthand', () => {
  it('draws a radio for each option', async () => {
    const onValueChange = jest.fn();
    await render(
      <RadioGroup
        defaultValue="free"
        onValueChange={onValueChange}
        options={[
          { value: 'free', label: 'Free' },
          { value: 'pro', label: 'Pro', description: '$8 a month' },
          { value: 'team', label: 'Team', disabled: true },
        ]}
      />
    );
    expect(screen.getByRole('radio', { name: 'Free' })).toBeChecked();
    await fireEvent.press(screen.getByRole('radio', { name: 'Pro' }));
    expect(onValueChange).toHaveBeenCalledWith('pro');
    expect(screen.getByRole('radio', { name: 'Team' })).toBeDisabled();
  });
});
