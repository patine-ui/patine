import { StyleSheet, Text } from 'react-native';

import { act, fireEvent, render, screen } from '@testing-library/react-native';

import { Button } from '@/actions/button/Button';
import { Drawer, DrawerContent, DrawerTitle, DrawerTrigger } from './Drawer';
import { Modal, ModalBody, ModalClose, ModalContent, ModalFooter, ModalHeader, ModalTitle, ModalTrigger } from './Modal';
import type { ModalContentProps, ModalProps } from './modal.types';

const finishAnimations = () =>
  act(async () => {
    jest.runAllTimers();
  });

const Example = ({ content, ...props }: ModalProps & { content?: Omit<ModalContentProps, 'children'> }) => (
  <Modal {...props}>
    <ModalTrigger>
      <Button>Open</Button>
    </ModalTrigger>
    <ModalContent testID="modal" {...content}>
      <ModalHeader>
        <ModalTitle>Edit profile</ModalTitle>
      </ModalHeader>
      <ModalBody>
        <Text>Body</Text>
      </ModalBody>
      <ModalFooter>
        <ModalClose>
          <Button>Save</Button>
        </ModalClose>
      </ModalFooter>
    </ModalContent>
  </Modal>
);

const isOpen = () => screen.queryByTestId('modal') !== null;

describe('Modal', () => {
  beforeEach(() => jest.useFakeTimers());
  afterEach(() => jest.useRealTimers());

  it('opens from its trigger, is a labelled dialog, and closes from ModalClose', async () => {
    const onOpenChange = jest.fn();
    await render(<Example onOpenChange={onOpenChange} />);
    await fireEvent.press(screen.getByRole('button', { name: 'Open' }));
    expect(onOpenChange).toHaveBeenLastCalledWith(true);
    await finishAnimations();
    expect(screen.getByTestId('modal').props.role).toBe('dialog');
    expect(screen.getByRole('heading', { name: 'Edit profile' })).toBeTruthy();
    await fireEvent.press(screen.getByRole('button', { name: 'Save' }));
    await finishAnimations();
    expect(isOpen()).toBe(false);
    expect(onOpenChange).toHaveBeenLastCalledWith(false);
  });

  it('closes from the ✕, the backdrop and Android back, unless not dismissible', async () => {
    const onOpenChange = jest.fn();
    const { rerender } = await render(<Example defaultOpen onOpenChange={onOpenChange} />);
    await fireEvent.press(screen.getByRole('button', { name: 'Close' }));
    expect(onOpenChange).toHaveBeenLastCalledWith(false);

    onOpenChange.mockClear();
    await rerender(<Example open onOpenChange={onOpenChange} dismissible={false} content={{ showCloseButton: false }} />);
    expect(screen.queryByRole('button', { name: 'Close' })).toBeNull();
    await fireEvent(screen.getByTestId('modal-backdrop'), 'responderRelease');
    await fireEvent(screen.getByTestId('modal-modal'), 'requestClose');
    expect(onOpenChange).not.toHaveBeenCalled();

    await rerender(<Example open onOpenChange={onOpenChange} />);
    await fireEvent(screen.getByTestId('modal-backdrop'), 'responderRelease');
    expect(onOpenChange).toHaveBeenLastCalledWith(false);
  });

  it('caps its width by size on a wide screen, and fills the screen when asked', async () => {
    // The test window is 750pt wide: wider than a phone.
    const { rerender } = await render(<Example open content={{ size: 'lg' }} />);
    expect(StyleSheet.flatten(screen.getByTestId('modal').props.style)).toMatchObject({ maxWidth: 720 });
    await rerender(<Example open content={{ size: 'full' }} />);
    expect(StyleSheet.flatten(screen.getByTestId('modal').props.style)).toMatchObject({ flex: 1 });
    await rerender(<Example open content={{ size: 'sm', fullScreen: true }} />);
    expect(StyleSheet.flatten(screen.getByTestId('modal').props.style)).toMatchObject({ flex: 1 });
  });

  it('opens a modal from inside another', async () => {
    await render(
      <Modal defaultOpen>
        <ModalContent testID="outer">
          <Modal>
            <ModalTrigger>
              <Button>More</Button>
            </ModalTrigger>
            <ModalContent testID="inner">
              <ModalTitle>Nested</ModalTitle>
            </ModalContent>
          </Modal>
        </ModalContent>
      </Modal>
    );
    await fireEvent.press(screen.getByRole('button', { name: 'More' }));
    expect(screen.getByTestId('outer')).toBeTruthy();
    expect(screen.getByTestId('inner')).toBeTruthy();
  });

  it('draws every design', async () => {
    for (const design of ['brand', 'ios', 'material', 'web'] as const) {
      await render(<Example open design={design} />);
      await finishAnimations();
      expect(screen.getByTestId('modal').props.role).toBe('dialog');
    }
  });
});

describe('Drawer', () => {
  beforeEach(() => jest.useFakeTimers());
  afterEach(() => jest.useRealTimers());

  it('slides a side panel in from its edge at its width', async () => {
    await render(
      <Drawer>
        <DrawerTrigger>
          <Button>Menu</Button>
        </DrawerTrigger>
        <DrawerContent testID="drawer" side="start">
          <DrawerTitle>Navigation</DrawerTitle>
        </DrawerContent>
      </Drawer>
    );
    await fireEvent.press(screen.getByRole('button', { name: 'Menu' }));
    await finishAnimations();
    expect(screen.getByRole('heading', { name: 'Navigation' })).toBeTruthy();
    expect(StyleSheet.flatten(screen.getByTestId('drawer').props.style)).toMatchObject({ width: 320, height: '100%' });
  });
});

describe('Modal and Drawer shorthand', () => {
  beforeEach(() => jest.useFakeTimers());
  afterEach(() => jest.useRealTimers());

  it('draws a modal from props, with the body between header and footer', async () => {
    const save = jest.fn();
    await render(
      <Modal trigger={<Button>Open</Button>} title="Edit profile" actions={[{ label: 'Save', onPress: save }]}>
        <Text>Body</Text>
      </Modal>
    );
    await fireEvent.press(screen.getByRole('button', { name: 'Open' }));
    await finishAnimations();
    expect(screen.getByRole('heading', { name: 'Edit profile' })).toBeTruthy();
    expect(screen.getByText('Body')).toBeTruthy();
    await fireEvent.press(screen.getByRole('button', { name: 'Save' }));
    expect(save).toHaveBeenCalledTimes(1);
    await finishAnimations();
    expect(screen.queryByText('Body')).toBeNull();
  });

  it('draws a drawer from props on its side', async () => {
    await render(<Drawer trigger={<Button>Menu</Button>} title="Navigation" side="start" />);
    await fireEvent.press(screen.getByRole('button', { name: 'Menu' }));
    await finishAnimations();
    expect(screen.getByRole('heading', { name: 'Navigation' })).toBeTruthy();
  });

  it('draws any footer node, with the actions after it, in a modal and a drawer', async () => {
    const footer = <Text>Edited 2 min ago</Text>;
    const { rerender } = await render(
      <Modal defaultOpen footer={footer} actions={[{ label: 'Done' }]}>
        <Text>Body</Text>
      </Modal>
    );
    await finishAnimations();
    expect(screen.getByText('Edited 2 min ago')).toBeTruthy();
    expect(screen.getByRole('button', { name: 'Done' })).toBeTruthy();
    await rerender(<Drawer defaultOpen footer={footer} />);
    await finishAnimations();
    expect(screen.getByText('Edited 2 min ago')).toBeTruthy();
  });
});
