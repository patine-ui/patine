import { useState } from 'react';
import { StyleSheet } from 'react-native';

import { fireEvent, render, screen } from '@testing-library/react-native';

import { Checkbox } from './Checkbox';

const Controlled = () => {
  const [checked, setChecked] = useState<boolean | 'mixed'>('mixed');
  return <Checkbox label="All" checked={checked} onCheckedChange={setChecked} />;
};

describe('Checkbox', () => {
  it('toggles on its own, named by its label', async () => {
    const onCheckedChange = jest.fn();
    await render(<Checkbox label="Accept terms" onCheckedChange={onCheckedChange} />);
    const box = screen.getByRole('checkbox', { name: 'Accept terms' });
    expect(box).not.toBeChecked();
    await fireEvent.press(box);
    expect(box).toBeChecked();
    expect(onCheckedChange).toHaveBeenCalledWith(true);
  });

  it('follows a controlled value, and goes from mixed to checked', async () => {
    await render(<Controlled />);
    const box = screen.getByRole('checkbox', { name: 'All' });
    expect(box).toBePartiallyChecked();
    await fireEvent.press(box);
    expect(box).toBeChecked();
  });

  it('ignores presses while disabled', async () => {
    const onCheckedChange = jest.fn();
    await render(<Checkbox label="Off" disabled onCheckedChange={onCheckedChange} />);
    await fireEvent.press(screen.getByRole('checkbox', { name: 'Off' }));
    expect(onCheckedChange).not.toHaveBeenCalled();
    expect(screen.getByRole('checkbox', { name: 'Off' })).toBeDisabled();
  });

  it('sits before its label by default, and after it with controlPosition="end"', async () => {
    const direction = (name: string) => StyleSheet.flatten(screen.getByRole('checkbox', { name }).props.style).flexDirection;
    await render(
      <>
        <Checkbox label="Default" />
        <Checkbox label="End" controlPosition="end" />
      </>
    );
    expect(direction('Default')).toBe('row');
    expect(direction('End')).toBe('row-reverse');
  });
});
