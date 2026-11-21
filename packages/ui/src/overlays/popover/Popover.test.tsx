import { useState } from 'react';
import { Pressable, Text } from 'react-native';

import { act, fireEvent, render, screen } from '@testing-library/react-native';

import { Popover, PopoverClose, PopoverContent, PopoverTrigger } from './Popover';
import type { PopoverProps } from './popover.types';

const Example = (props: Omit<PopoverProps, 'children'>) => (
  <Popover {...props}>
    <PopoverTrigger>
      <Pressable accessibilityRole="button" aria-label="Filters">
        <Text>Filters</Text>
      </Pressable>
    </PopoverTrigger>
    <PopoverContent aria-label="Filter options">
      <Text>Only unread</Text>
      <PopoverClose>
        <Pressable accessibilityRole="button" aria-label="Done">
          <Text>Done</Text>
        </Pressable>
      </PopoverClose>
    </PopoverContent>
  </Popover>
);

const Controlled = () => {
  const [open, setOpen] = useState(false);
  return <Example open={open} onOpenChange={setOpen} />;
};

describe('Popover', () => {
  const { measureInWindow }: { measureInWindow: jest.Mock } = jest.requireActual(
    '@react-native/jest-preset/jest/MockNativeMethods'
  ).default;
  beforeEach(() => {
    jest.useFakeTimers();
    measureInWindow.mockImplementation((callback: (...rect: number[]) => void) => callback(100, 100, 40, 40));
  });
  afterEach(() => {
    measureInWindow.mockReset();
    jest.useRealTimers();
  });

  const finishAnimations = async () => {
    await act(async () => {
      jest.runAllTimers();
    });
  };
  const trigger = () => screen.getByRole('button', { name: 'Filters' });

  it('opens from its trigger, uncontrolled, and reports expanded', async () => {
    const onOpenChange = jest.fn();
    await render(<Example onOpenChange={onOpenChange} />);
    expect(screen.queryByLabelText('Filter options')).toBeNull();
    expect(screen.getByRole('button', { name: 'Filters', expanded: false })).toBeTruthy();
    await fireEvent.press(trigger());
    // Not an accessibility element itself (that would merge its contents into one on iOS), so it's found by label.
    expect(screen.getByLabelText('Filter options').props.role).toBe('dialog');
    expect(screen.getByRole('button', { name: 'Filters', expanded: true })).toBeTruthy();
    expect(onOpenChange).toHaveBeenLastCalledWith(true);
  });

  it('closes from PopoverClose, a tap outside, and Escape or Back', async () => {
    const onOpenChange = jest.fn();
    await render(<Example defaultOpen onOpenChange={onOpenChange} />);
    await fireEvent.press(screen.getByRole('button', { name: 'Done' }));
    expect(onOpenChange).toHaveBeenLastCalledWith(false);
    await finishAnimations();
    expect(screen.queryByLabelText('Filter options')).toBeNull();

    await fireEvent.press(trigger());
    await fireEvent.press(screen.getByRole('button', { name: 'Close' }));
    expect(onOpenChange).toHaveBeenLastCalledWith(false);
    await finishAnimations();

    await fireEvent.press(trigger());
    // Escape on the web and Back on Android reach the modal's onRequestClose.
    await fireEvent(screen.getByLabelText('Filter options'), 'requestClose');
    expect(onOpenChange).toHaveBeenLastCalledWith(false);
    expect(onOpenChange).toHaveBeenCalledTimes(5);
  });

  it('follows `open` when controlled, without calling onOpenChange for it', async () => {
    const onOpenChange = jest.fn();
    const { rerender } = await render(<Example open={false} onOpenChange={onOpenChange} />);
    await rerender(<Example open onOpenChange={onOpenChange} />);
    expect(screen.getByLabelText('Filter options')).toBeTruthy();
    await rerender(<Example open={false} onOpenChange={onOpenChange} />);
    await finishAnimations();
    expect(screen.queryByLabelText('Filter options')).toBeNull();
    expect(onOpenChange).not.toHaveBeenCalled();

    // A press asks to open, but only the parent decides.
    await fireEvent.press(trigger());
    expect(onOpenChange).toHaveBeenCalledWith(true);
    expect(screen.queryByLabelText('Filter options')).toBeNull();
  });

  it('works with state held by the parent', async () => {
    await render(<Controlled />);
    await fireEvent.press(trigger());
    expect(screen.getByLabelText('Filter options')).toBeTruthy();
    await fireEvent.press(trigger());
    await finishAnimations();
    expect(screen.queryByLabelText('Filter options')).toBeNull();
  });

  it('keeps the trigger’s own onPress', async () => {
    const onPress = jest.fn();
    await render(
      <Popover>
        <PopoverTrigger>
          <Pressable accessibilityRole="button" aria-label="Filters" onPress={onPress} />
        </PopoverTrigger>
        <PopoverContent>
          <Text>Body</Text>
        </PopoverContent>
      </Popover>
    );
    await fireEvent.press(trigger());
    expect(onPress).toHaveBeenCalledTimes(1);
    expect(screen.getByText('Body')).toBeTruthy();
  });

  it('opens as a bottom sheet', async () => {
    await render(
      <Popover defaultOpen>
        <PopoverTrigger>
          <Pressable accessibilityRole="button" aria-label="Filters" />
        </PopoverTrigger>
        <PopoverContent presentation="sheet">
          <Text>In a sheet</Text>
        </PopoverContent>
      </Popover>
    );
    expect(screen.getByText('In a sheet')).toBeTruthy();
  });
});

describe('Popover shorthand', () => {
  const { measureInWindow }: { measureInWindow: jest.Mock } = jest.requireActual(
    '@react-native/jest-preset/jest/MockNativeMethods'
  ).default;
  beforeEach(() => {
    jest.useFakeTimers();
    measureInWindow.mockImplementation((callback: (...rect: number[]) => void) => callback(100, 100, 40, 40));
  });
  afterEach(() => {
    measureInWindow.mockReset();
    jest.useRealTimers();
  });

  it('draws its trigger and puts its children in the content', async () => {
    await render(
      <Popover
        aria-label="Filter options"
        trigger={
          <Pressable accessibilityRole="button" aria-label="Filters">
            <Text>Filters</Text>
          </Pressable>
        }
      >
        <Text>Only unread</Text>
      </Popover>
    );
    expect(screen.queryByText('Only unread')).toBeNull();
    await fireEvent.press(screen.getByRole('button', { name: 'Filters' }));
    expect(screen.getByText('Only unread')).toBeTruthy();
    expect(screen.getByRole('button', { name: 'Filters', expanded: true })).toBeTruthy();
  });
});
