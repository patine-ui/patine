import { useState } from 'react';

import { act, fireEvent, render, screen } from '@testing-library/react-native';

import { Button } from '@/actions/button/Button';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from './Dialog';
import type { DialogProps } from './dialog.types';

const finishAnimations = async () => {
  await act(async () => {
    jest.runAllTimers();
  });
};

const Example = (props: DialogProps) => (
  <Dialog {...props}>
    <DialogTrigger>
      <Button>Edit profile</Button>
    </DialogTrigger>
    <DialogContent testID="dialog">
      <DialogHeader>
        <DialogTitle>Edit profile</DialogTitle>
        <DialogDescription>Change your name.</DialogDescription>
      </DialogHeader>
      <DialogFooter>
        <DialogClose>
          <Button>Done</Button>
        </DialogClose>
      </DialogFooter>
    </DialogContent>
  </Dialog>
);

const Controlled = () => {
  const [open, setOpen] = useState(true);
  return <Example open={open} onOpenChange={setOpen} />;
};

const isOpen = () => screen.queryByTestId('dialog') !== null;

describe('Dialog', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });
  afterEach(() => {
    jest.useRealTimers();
  });

  it('opens from its trigger and closes from DialogClose when uncontrolled', async () => {
    const onOpenChange = jest.fn();
    await render(<Example onOpenChange={onOpenChange} />);
    expect(isOpen()).toBe(false);
    await fireEvent.press(screen.getByRole('button', { name: 'Edit profile' }));
    expect(isOpen()).toBe(true);
    expect(onOpenChange).toHaveBeenLastCalledWith(true);
    await fireEvent.press(screen.getByRole('button', { name: 'Done' }));
    await finishAnimations();
    expect(isOpen()).toBe(false);
    expect(onOpenChange).toHaveBeenLastCalledWith(false);
  });

  it('starts open with defaultOpen', async () => {
    await render(<Example defaultOpen />);
    expect(isOpen()).toBe(true);
  });

  it('follows `open` when controlled, and reports only what the user does', async () => {
    const onOpenChange = jest.fn();
    const { rerender } = await render(<Example open={false} onOpenChange={onOpenChange} />);
    await rerender(<Example open onOpenChange={onOpenChange} />);
    expect(isOpen()).toBe(true);
    await rerender(<Example open={false} onOpenChange={onOpenChange} />);
    await finishAnimations();
    expect(isOpen()).toBe(false);
    expect(onOpenChange).not.toHaveBeenCalled();

    await fireEvent.press(screen.getByRole('button', { name: 'Edit profile' }));
    expect(onOpenChange).toHaveBeenCalledWith(true);
    expect(isOpen()).toBe(false);
  });

  it('closes on a backdrop press, Escape and Android back', async () => {
    await render(<Controlled />);
    await fireEvent(screen.getByTestId('dialog-backdrop'), 'responderRelease');
    await finishAnimations();
    expect(isOpen()).toBe(false);

    await fireEvent.press(screen.getByRole('button', { name: 'Edit profile' }));
    await fireEvent(screen.getByTestId('dialog-modal'), 'requestClose');
    await finishAnimations();
    expect(isOpen()).toBe(false);
  });

  it('stays open on the backdrop, Escape and back when not dismissible', async () => {
    const onOpenChange = jest.fn();
    await render(<Example defaultOpen dismissible={false} onOpenChange={onOpenChange} />);
    expect(screen.getByTestId('dialog-backdrop').props.onStartShouldSetResponder()).toBe(false);
    await fireEvent(screen.getByTestId('dialog-modal'), 'requestClose');
    await fireEvent(screen.getByTestId('dialog'), 'accessibilityEscape');
    await finishAnimations();
    expect(isOpen()).toBe(true);
    expect(onOpenChange).not.toHaveBeenCalled();
  });

  it('is a modal dialog labelled by its title and described by its description', async () => {
    await render(<Example defaultOpen />);
    const dialog = screen.getByTestId('dialog');
    expect(dialog.props.role).toBe('dialog');
    expect(dialog.props['aria-modal']).toBe(true);
    expect(dialog.props.accessibilityViewIsModal).toBe(true);
    const title = screen.getByRole('heading', { name: 'Edit profile' });
    expect(title.props.nativeID).toBe(dialog.props['aria-labelledby']);
    expect(screen.getByText('Change your name.').props.nativeID).toBe(dialog.props['aria-describedby']);
  });

  it('marks its trigger expanded while open', async () => {
    await render(<Example />);
    expect(screen.getByRole('button', { name: 'Edit profile', expanded: false })).toBeTruthy();
    await fireEvent.press(screen.getByRole('button', { name: 'Edit profile' }));
    expect(screen.getByRole('button', { name: 'Edit profile', expanded: true })).toBeTruthy();
  });

  it("still runs the trigger child's own onPress", async () => {
    const onPress = jest.fn();
    await render(
      <Dialog>
        <DialogTrigger>
          <Button onPress={onPress}>Open</Button>
        </DialogTrigger>
      </Dialog>
    );
    await fireEvent.press(screen.getByRole('button', { name: 'Open' }));
    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it('throws when a part is outside a Dialog', async () => {
    jest.spyOn(console, 'error').mockImplementation(() => {});
    await expect(render(<DialogTitle>Lost</DialogTitle>)).rejects.toThrow('inside <Dialog>');
    jest.restoreAllMocks();
  });
});

describe('Dialog shorthand', () => {
  beforeEach(() => jest.useFakeTimers());
  afterEach(() => jest.useRealTimers());

  it('draws its trigger, title, description, body and actions from props', async () => {
    const save = jest.fn();
    const onOpenChange = jest.fn();
    await render(
      <Dialog
        trigger={<Button>Edit profile</Button>}
        title="Edit profile"
        description="Change your name."
        actions={[
          { label: 'Cancel', variant: 'outline' },
          { label: 'Save', onPress: save },
        ]}
        onOpenChange={onOpenChange}
      >
        <Button>Body</Button>
      </Dialog>
    );
    expect(screen.queryByRole('heading', { name: 'Edit profile' })).toBeNull();
    await fireEvent.press(screen.getByRole('button', { name: 'Edit profile' }));
    expect(screen.getByRole('heading', { name: 'Edit profile' })).toBeTruthy();
    expect(screen.getByText('Change your name.')).toBeTruthy();
    expect(screen.getByRole('button', { name: 'Body' })).toBeTruthy();
    await fireEvent.press(screen.getByRole('button', { name: 'Save' }));
    expect(save).toHaveBeenCalledTimes(1);
    expect(onOpenChange).toHaveBeenLastCalledWith(false);
    await finishAnimations();
    expect(screen.queryByRole('heading', { name: 'Edit profile' })).toBeNull();
  });

  it('renders its children as they are without shorthand props', async () => {
    await render(<Example defaultOpen />);
    expect(screen.getByTestId('dialog')).toBeTruthy();
  });
});
