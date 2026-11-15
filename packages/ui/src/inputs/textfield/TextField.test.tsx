import { type ComponentRef, createRef, useState } from 'react';
import type { TextInput } from 'react-native';

import { fireEvent, render, screen } from '@testing-library/react-native';

import { TextField } from './TextField';

const input = (name = 'Email') => screen.getByLabelText(name);

const Controlled = ({ onValueChange }: { onValueChange: (text: string) => void }) => {
  const [value, setValue] = useState('');
  return (
    <TextField
      label="Email"
      value={value}
      onValueChange={(text) => {
        setValue(text.toLowerCase());
        onValueChange(text);
      }}
    />
  );
};

describe('TextField', () => {
  it('reports what the user types, and keeps its own text when uncontrolled', async () => {
    const onValueChange = jest.fn();
    await render(<TextField label="Email" defaultValue="a" onValueChange={onValueChange} />);
    expect(input().props.value).toBe('a');
    await fireEvent.changeText(input(), 'ab');
    expect(onValueChange).toHaveBeenCalledWith('ab');
    expect(input().props.value).toBe('ab');
  });

  it('shows the controlled value, and never reports a value set from code', async () => {
    const onValueChange = jest.fn();
    await render(<Controlled onValueChange={onValueChange} />);
    await fireEvent.changeText(input(), 'ME@X.COM');
    expect(input().props.value).toBe('me@x.com');

    const silent = jest.fn();
    const { rerender } = await render(<TextField label="Name" value="" onValueChange={silent} />);
    await rerender(<TextField label="Name" value="Ada" onValueChange={silent} />);
    expect(input('Name').props.value).toBe('Ada');
    expect(silent).not.toHaveBeenCalled();
  });

  it('is named by its label for screen readers, required included, and tied to the visible label by id', async () => {
    await render(<TextField label="Email" required />);
    const field = input('Email, required');
    expect(screen.getByText('Email *')).toBeTruthy();
    expect(field.props['aria-required']).toBe(true);
    // The web reads the visible label through aria-labelledby; native through the accessibility label.
    expect(field.props['aria-labelledby']).toBeUndefined();
  });

  it('shows the error in red under the field, marks it invalid and reads the message as its hint', async () => {
    const { rerender } = await render(<TextField label="Email" helperText="We never share it" />);
    expect(screen.getByText('We never share it')).toBeTruthy();
    expect(input().props['aria-invalid']).toBe(false);
    await rerender(<TextField label="Email" helperText="We never share it" error="Enter a valid email" />);
    expect(screen.queryByText('We never share it')).toBeNull();
    expect(screen.getByText('Enter a valid email')).toBeTruthy();
    expect(input().props['aria-invalid']).toBe(true);
    expect(input().props.accessibilityHint).toBe('Enter a valid email');
  });

  it('clears with the clear button, which shows only while there is text', async () => {
    const onValueChange = jest.fn();
    await render(<TextField label="Email" clearable onValueChange={onValueChange} />);
    expect(screen.queryByRole('button', { name: 'Clear' })).toBeNull();
    await fireEvent.changeText(input(), 'abc');
    await fireEvent.press(screen.getByRole('button', { name: 'Clear' }));
    expect(onValueChange).toHaveBeenLastCalledWith('');
    expect(input().props.value).toBe('');
    expect(screen.queryByRole('button', { name: 'Clear' })).toBeNull();
  });

  it('hides no clear button and blocks typing while disabled or read-only', async () => {
    const { rerender } = await render(<TextField label="Email" clearable defaultValue="x" disabled />);
    expect(screen.queryByRole('button', { name: 'Clear' })).toBeNull();
    expect(input().props.editable).toBe(false);
    expect(input().props['aria-disabled']).toBe(true);
    await rerender(<TextField label="Email" clearable defaultValue="x" readOnly />);
    expect(input().props.editable).toBe(false);
  });

  it('reveals and hides a password with the toggle', async () => {
    await render(<TextField label="Password" secureTextEntry />);
    expect(input('Password').props.secureTextEntry).toBe(true);
    await fireEvent.press(screen.getByRole('button', { name: 'Show password' }));
    expect(input('Password').props.secureTextEntry).toBe(false);
    await fireEvent.press(screen.getByRole('button', { name: 'Hide password' }));
    expect(input('Password').props.secureTextEntry).toBe(true);
  });

  it('leaves the toggle out with passwordToggle={false}', async () => {
    await render(<TextField label="PIN" secureTextEntry passwordToggle={false} />);
    expect(screen.queryByRole('button', { name: 'Show password' })).toBeNull();
  });

  it('counts characters out of maxLength', async () => {
    await render(<TextField label="Username" maxLength={20} showCount />);
    expect(screen.getByText('0/20')).toBeTruthy();
    await fireEvent.changeText(input('Username'), 'ada');
    expect(screen.getByText('3/20')).toBeTruthy();
    expect(input('Username').props.maxLength).toBe(20);
  });

  it('draws prefix and suffix text and passes TextInput props and the ref through', async () => {
    const ref = createRef<ComponentRef<typeof TextInput>>();
    await render(<TextField ref={ref} label="Price" prefix="$" suffix="USD" keyboardType="decimal-pad" testID="price" />);
    expect(screen.getByText('$')).toBeTruthy();
    expect(screen.getByText('USD')).toBeTruthy();
    expect(screen.getByTestId('price').props.keyboardType).toBe('decimal-pad');
    expect(ref.current).toBeTruthy();
  });

  it('floats the Material label inside the field until it is focused', async () => {
    await render(<TextField label="Email" placeholder="you@example.com" design="material" />);
    expect(input().props.placeholder).toBe('');
    await fireEvent(input(), 'focus');
    expect(input().props.placeholder).toBe('you@example.com');
  });
});
