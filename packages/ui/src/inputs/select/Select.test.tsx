import React from 'react';
import { Text } from 'react-native';

import { act, fireEvent, render, screen, waitFor } from '@testing-library/react-native';

import { Select } from './Select';
import type { SelectOption } from './select.types';

const options: SelectOption<string>[] = ['React', 'TypeScript', 'Expo'].map((label) => ({
  label,
  value: label.toLowerCase(),
}));

const CreatablePicker = ({ onClose }: { onClose: () => void }) => {
  const [value, setValue] = React.useState<string | null>(null);
  return (
    <Select
      label="Stack"
      options={options}
      searchable
      value={value}
      onValueChange={setValue}
      onCreate={(text) => ({
        label: text,
        value: text.toLowerCase(),
      })}
      onOpenChange={onClose}
    />
  );
};

describe('Select', () => {
  it('shows the placeholder until something is selected', async () => {
    const { rerender } = await render(<Select label="Stack" placeholder="Pick one" options={options} value={null} />);
    expect(screen.getByText('Pick one')).toBeTruthy();
    await rerender(<Select label="Stack" placeholder="Pick one" options={options} value="expo" />);
    expect(screen.getByText('Expo')).toBeTruthy();
  });

  it('shows the error message under the field and announces it', async () => {
    await render(<Select label="Stack" options={options} value={null} required error="Pick a stack" />);
    expect(screen.getByText('Pick a stack')).toBeTruthy();
    expect(screen.getByRole('button', { name: 'Stack, required' }).props.accessibilityHint).toBe('Pick a stack');
  });

  it('opens the sheet, selects and closes in single mode', async () => {
    const onValueChange = jest.fn();
    const onOpenChange = jest.fn();
    await render(<Select label="Stack" options={options} onValueChange={onValueChange} onOpenChange={onOpenChange} />);
    await fireEvent.press(screen.getByRole('button', { name: 'Stack' }));
    expect(onOpenChange).toHaveBeenLastCalledWith(true);
    await fireEvent.press(screen.getByLabelText('TypeScript'));
    expect(onValueChange).toHaveBeenCalledWith('typescript', options[1]);
    await waitFor(() => expect(onOpenChange).toHaveBeenLastCalledWith(false));
  });

  it('keeps its own value when uncontrolled, starting from defaultValue, and clears it', async () => {
    const onValueChange = jest.fn();
    await render(<Select label="Stack" options={options} defaultValue="expo" onValueChange={onValueChange} clearable />);
    expect(screen.getByText('Expo')).toBeTruthy();
    await fireEvent.press(screen.getByRole('button', { name: 'Stack' }));
    await fireEvent.press(screen.getByLabelText('React'));
    expect(onValueChange).toHaveBeenCalledWith('react', options[0]);
    await waitFor(() => expect(screen.getByText('React')).toBeTruthy());
    await fireEvent.press(screen.getByRole('button', { name: 'Clear' }));
    expect(screen.queryByText('React')).toBeNull();
  });

  it('keeps its own values in multiple mode', async () => {
    await render(<Select label="Stack" multiple options={options} defaultValue={['react']} />);
    const field = () => screen.getByRole('button', { name: 'Stack' });
    expect(field().props.accessibilityHint).toBe('React');
    await fireEvent.press(field());
    await fireEvent.press(screen.getByLabelText('Expo'));
    expect(field().props.accessibilityHint).toBe('React, Expo');
  });

  it('creates an option from the search, selects it and shows it before options include it', async () => {
    const onClose = jest.fn();
    await render(<CreatablePicker onClose={onClose} />);
    await fireEvent.press(screen.getByRole('button', { name: 'Stack' }));
    await fireEvent.changeText(screen.getByLabelText('Search'), 'Svelte');
    await fireEvent.press(screen.getByRole('button', { name: 'Add "Svelte"' }));
    await waitFor(() => expect(onClose).toHaveBeenCalled());
    expect(screen.getByText('Svelte')).toBeTruthy();
  });

  it('keeps the selected label when new options no longer include it', async () => {
    const { rerender } = await render(<Select options={options} value="expo" />);
    await rerender(<Select options={options.slice(0, 1)} value="expo" />);
    expect(screen.getByText('Expo')).toBeTruthy();
  });

  it('does not open when disabled', async () => {
    const onOpenChange = jest.fn();
    await render(<Select label="Stack" options={options} disabled onOpenChange={onOpenChange} />);
    await fireEvent.press(screen.getByRole('button', { name: 'Stack' }));
    expect(onOpenChange).not.toHaveBeenCalled();
  });

  it('opens from `open` when controlled, and reports the user closing it', async () => {
    const onOpenChange = jest.fn();
    const { rerender } = await render(<Select label="Stack" options={options} open={false} onOpenChange={onOpenChange} />);
    expect(screen.queryByLabelText('React')).toBeNull();
    await rerender(<Select label="Stack" options={options} open onOpenChange={onOpenChange} />);
    expect(screen.getByLabelText('React')).toBeTruthy();
    expect(onOpenChange).not.toHaveBeenCalled();
    await fireEvent.press(screen.getByLabelText('React'));
    expect(onOpenChange).toHaveBeenCalledWith(false);
  });

  it('removes a chip in multiple mode', async () => {
    const onValueChange = jest.fn();
    await render(<Select multiple options={options} value={['react', 'expo']} onValueChange={onValueChange} />);
    await fireEvent.press(screen.getByLabelText('Remove React'));
    expect(onValueChange).toHaveBeenCalledWith(['expo'], [options[2]]);
  });

  it('clears everything with the clear button', async () => {
    const onValueChange = jest.fn();
    const onClear = jest.fn();
    await render(<Select multiple clearable options={options} value={['react']} onValueChange={onValueChange} onClear={onClear} />);
    await fireEvent.press(screen.getByLabelText('Clear'));
    expect(onValueChange).toHaveBeenCalledWith([], []);
    expect(onClear).toHaveBeenCalled();
  });

  it('renders a custom trigger that can open the sheet', async () => {
    const onOpenChange = jest.fn();
    await render(
      <Select
        options={options}
        onOpenChange={onOpenChange}
        renderTrigger={({ open, selected }) => <Text onPress={open}>{selected.length} selected</Text>}
        value="react"
      />
    );
    await fireEvent.press(screen.getByText('1 selected'));
    expect(onOpenChange).toHaveBeenCalledWith(true);
  });

  it('passes the open state to a custom chevron', async () => {
    await render(
      <Select label="Stack" options={options} renderChevron={({ open }) => <Text>{open ? 'chevron open' : 'chevron closed'}</Text>} />
    );
    expect(screen.getByText('chevron closed')).toBeTruthy();
    await fireEvent.press(screen.getByRole('button', { name: 'Stack' }));
    expect(screen.getByText('chevron open')).toBeTruthy();
  });

  describe('dropdown', () => {
    // The preset's View mock shares these instance methods; measureInWindow never calls back unless told to.
    const { measureInWindow }: { measureInWindow: jest.Mock } = jest.requireActual(
      '@react-native/jest-preset/jest/MockNativeMethods'
    ).default;
    beforeEach(() => measureInWindow.mockImplementation((callback: (...rect: number[]) => void) => callback(16, 100, 300, 48)));
    afterEach(() => measureInWindow.mockReset());

    it('opens under the field, selects and closes', async () => {
      const onValueChange = jest.fn();
      const onClose = jest.fn();
      await render(<Select label="Stack" presentation="dropdown" options={options} onValueChange={onValueChange} onOpenChange={onClose} />);
      expect(screen.queryByLabelText('Expo')).toBeNull();
      await fireEvent.press(screen.getByRole('button', { name: 'Stack' }));
      await fireEvent.press(screen.getByLabelText('Expo'));
      expect(onValueChange).toHaveBeenCalledWith('expo', options[2]);
      await waitFor(() => expect(onClose).toHaveBeenCalled());
      await waitFor(() => expect(screen.queryByLabelText('Expo')).toBeNull());
    });

    it('filters as the user types in the field, and clears the query on close', async () => {
      const onValueChange = jest.fn();
      await render(<Select label="Stack" presentation="dropdown" options={options} value="react" onValueChange={onValueChange} />);
      await fireEvent.press(screen.getByRole('button', { name: 'Stack' }));
      await fireEvent.changeText(screen.getByPlaceholderText('React'), 'type');
      expect(screen.queryByLabelText('Expo')).toBeNull();
      await fireEvent.press(screen.getByLabelText('TypeScript'));
      expect(onValueChange).toHaveBeenCalledWith('typescript', options[1]);
      await waitFor(() => expect(screen.queryByLabelText('TypeScript')).toBeNull());
      await fireEvent.press(screen.getByRole('button', { name: 'Stack' }));
      expect(screen.getByLabelText('Expo')).toBeTruthy();
    });

    it('loads options as the user types in the field, and keeps the chosen label after closing', async () => {
      const loadOptions = jest.fn((query: string) => Promise.resolve([{ label: `${query} City`, value: query }]));
      const onValueChange = jest.fn();
      const { rerender } = await render(
        <Select label="City" presentation="dropdown" loadOptions={loadOptions} searchDebounce={0} onValueChange={onValueChange} />
      );
      await fireEvent.press(screen.getByRole('button', { name: 'City' }));
      await fireEvent.changeText(screen.getByPlaceholderText('Search'), 'par');
      await act(() => new Promise<void>((resolve) => setTimeout(resolve, 0)));
      await fireEvent.press(screen.getByLabelText('par City'));
      expect(onValueChange).toHaveBeenCalledWith('par', { label: 'par City', value: 'par' });
      await rerender(<Select label="City" presentation="dropdown" loadOptions={loadOptions} searchDebounce={0} value="par" />);
      await waitFor(() => expect(screen.getByText('par City')).toBeTruthy());
    });

    it('keeps the field read-only with searchable={false}', async () => {
      await render(<Select label="Stack" presentation="dropdown" searchable={false} options={options} />);
      await fireEvent.press(screen.getByRole('button', { name: 'Stack' }));
      expect(screen.queryByPlaceholderText('Search')).toBeNull();
      expect(screen.getByLabelText('Expo')).toBeTruthy();
    });

    it('closes on a tap outside without changing the value', async () => {
      const onValueChange = jest.fn();
      await render(<Select label="Stack" presentation="dropdown" multiple options={options} onValueChange={onValueChange} />);
      await fireEvent.press(screen.getByRole('button', { name: 'Stack' }));
      expect(screen.getByLabelText('React')).toBeTruthy();
      await fireEvent.press(screen.getByLabelText('Close'));
      await waitFor(() => expect(screen.queryByLabelText('React')).toBeNull());
      expect(onValueChange).not.toHaveBeenCalled();
    });
  });
});
