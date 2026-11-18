import { Pressable, Text } from 'react-native';

import { act, fireEvent, render, screen } from '@testing-library/react-native';

import { DropdownMenu } from './DropdownMenu';

describe('DropdownMenu', () => {
  // The preset's View mock shares these instance methods; measureInWindow never calls back unless told to.
  const { measureInWindow }: { measureInWindow: jest.Mock } = jest.requireActual(
    '@react-native/jest-preset/jest/MockNativeMethods'
  ).default;
  beforeEach(() => {
    jest.useFakeTimers();
    measureInWindow.mockImplementation((callback: (...rect: number[]) => void) => callback(300, 100, 40, 40));
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

  it('opens from its trigger and runs the action after closing', async () => {
    const onPress = jest.fn();
    const onOpenChange = jest.fn();
    await render(
      <DropdownMenu actions={[{ label: 'Rename', onPress }]} onOpenChange={onOpenChange} accessibilityLabel="More options">
        <Text>⋯</Text>
      </DropdownMenu>
    );
    expect(screen.queryByRole('button', { name: 'Rename' })).toBeNull();
    await fireEvent.press(screen.getByRole('button', { name: 'More options' }));
    expect(screen.getByRole('button', { name: 'More options', expanded: true })).toBeTruthy();
    expect(onOpenChange).toHaveBeenLastCalledWith(true);
    await fireEvent.press(screen.getByRole('button', { name: 'Rename' }));
    expect(onOpenChange).toHaveBeenLastCalledWith(false);
    expect(onOpenChange).toHaveBeenCalledTimes(2);
    expect(onPress).not.toHaveBeenCalled();
    await finishAnimations();
    expect(onPress).toHaveBeenCalledTimes(1);
    expect(screen.queryByRole('button', { name: 'Rename' })).toBeNull();
  });

  it('opens on a long press as a context menu', async () => {
    await render(
      <DropdownMenu actions={[{ label: 'Copy' }]} openOnLongPress accessibilityLabel="Message">
        <Text>Hello</Text>
      </DropdownMenu>
    );
    await fireEvent.press(screen.getByRole('button', { name: 'Message' }));
    expect(screen.queryByRole('button', { name: 'Copy' })).toBeNull();
    await fireEvent(screen.getByRole('button', { name: 'Message' }), 'longPress');
    expect(screen.getByRole('button', { name: 'Copy' })).toBeTruthy();
  });

  it('hands a function trigger open()', async () => {
    await render(
      <DropdownMenu actions={[{ label: 'Share' }]} title="Photo">
        {({ open }) => (
          <Pressable onPress={open} accessibilityRole="button">
            <Text>Options</Text>
          </Pressable>
        )}
      </DropdownMenu>
    );
    await fireEvent.press(screen.getByText('Options'));
    expect(screen.getByRole('header', { name: 'Photo' })).toBeTruthy();
    expect(screen.getByRole('button', { name: 'Share' })).toBeTruthy();
  });

  it('opens from `open` when controlled', async () => {
    const { rerender } = await render(
      <DropdownMenu actions={[{ label: 'Share' }]} open={false} accessibilityLabel="More">
        <Text>⋯</Text>
      </DropdownMenu>
    );
    expect(screen.queryByRole('button', { name: 'Share' })).toBeNull();
    await rerender(
      <DropdownMenu actions={[{ label: 'Share' }]} open accessibilityLabel="More">
        <Text>⋯</Text>
      </DropdownMenu>
    );
    expect(screen.getByRole('button', { name: 'More', expanded: true })).toBeTruthy();
  });

  it('stays shut while disabled', async () => {
    const onOpenChange = jest.fn();
    await render(
      <DropdownMenu actions={[{ label: 'Share' }]} disabled onOpenChange={onOpenChange} accessibilityLabel="More">
        <Text>⋯</Text>
      </DropdownMenu>
    );
    await fireEvent.press(screen.getByRole('button', { name: 'More' }));
    expect(onOpenChange).not.toHaveBeenCalled();
  });

  it('opens as an action sheet', async () => {
    await render(
      <DropdownMenu actions={[{ label: 'Share' }]} presentation="sheet" design="ios" accessibilityLabel="More">
        <Text>⋯</Text>
      </DropdownMenu>
    );
    await fireEvent.press(screen.getByRole('button', { name: 'More' }));
    expect(screen.getByRole('button', { name: 'Cancel' })).toBeTruthy();
  });
});
