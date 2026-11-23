import { Pressable, Text } from 'react-native';

import { act, fireEvent, render, screen } from '@testing-library/react-native';

import { Button } from '@/actions/button/Button';
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
      <DropdownMenu actions={[{ label: 'Rename', onPress }]} onOpenChange={onOpenChange} aria-label="More options">
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
      <DropdownMenu actions={[{ label: 'Copy' }]} openOnLongPress aria-label="Message">
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
    expect(screen.getByRole('heading', { name: 'Photo' })).toBeTruthy();
    expect(screen.getByRole('button', { name: 'Share' })).toBeTruthy();
  });

  it('opens from `open` when controlled', async () => {
    const { rerender } = await render(
      <DropdownMenu actions={[{ label: 'Share' }]} open={false} aria-label="More">
        <Text>⋯</Text>
      </DropdownMenu>
    );
    expect(screen.queryByRole('button', { name: 'Share' })).toBeNull();
    await rerender(
      <DropdownMenu actions={[{ label: 'Share' }]} open aria-label="More">
        <Text>⋯</Text>
      </DropdownMenu>
    );
    expect(screen.getByRole('button', { name: 'More', expanded: true })).toBeTruthy();
  });

  it('stays shut while disabled', async () => {
    const onOpenChange = jest.fn();
    await render(
      <DropdownMenu actions={[{ label: 'Share' }]} disabled onOpenChange={onOpenChange} aria-label="More">
        <Text>⋯</Text>
      </DropdownMenu>
    );
    await fireEvent.press(screen.getByRole('button', { name: 'More' }));
    expect(onOpenChange).not.toHaveBeenCalled();
  });

  it('opens as an action sheet', async () => {
    await render(
      <DropdownMenu actions={[{ label: 'Share' }]} presentation="sheet" design="ios" aria-label="More">
        <Text>⋯</Text>
      </DropdownMenu>
    );
    await fireEvent.press(screen.getByRole('button', { name: 'More' }));
    expect(screen.getByRole('button', { name: 'Cancel' })).toBeTruthy();
  });

  it('merges into a Button child instead of wrapping it in a second button', async () => {
    const onPress = jest.fn();
    await render(
      <DropdownMenu actions={[{ label: 'Share' }]}>
        <Button aria-label="More" onPress={onPress}>
          ⋯
        </Button>
      </DropdownMenu>
    );
    expect(screen.getAllByRole('button')).toHaveLength(1);
    await fireEvent.press(screen.getByRole('button', { name: 'More', expanded: false }));
    expect(onPress).toHaveBeenCalledTimes(1);
    expect(screen.getByRole('button', { name: 'More', expanded: true })).toBeTruthy();
    expect(screen.getByRole('button', { name: 'Share' })).toBeTruthy();
  });

  it('puts grouped actions under their group heading, in order of first appearance', async () => {
    const actions = [
      { label: 'Copy', group: 'Edit' },
      { label: 'Share', group: 'Send' },
      { label: 'Paste', group: 'Edit' },
    ];
    await render(
      <DropdownMenu actions={actions} aria-label="More">
        <Text>⋯</Text>
      </DropdownMenu>
    );
    await fireEvent.press(screen.getByRole('button', { name: 'More' }));
    expect(screen.getByRole('heading', { name: 'Edit' })).toBeTruthy();
    expect(screen.getByRole('heading', { name: 'Send' })).toBeTruthy();
    const order = screen.getAllByText(/^(Edit|Send|Copy|Paste|Share)$/).map((node) => node.props.children);
    expect(order).toEqual(['Edit', 'Copy', 'Paste', 'Send', 'Share']);
  });

  it('keeps group headings when it opens as an action sheet', async () => {
    await render(
      <DropdownMenu actions={[{ label: 'Copy', group: 'Edit' }]} presentation="sheet" aria-label="More">
        <Text>⋯</Text>
      </DropdownMenu>
    );
    await fireEvent.press(screen.getByRole('button', { name: 'More' }));
    expect(screen.getByRole('heading', { name: 'Edit' })).toBeTruthy();
  });
});
