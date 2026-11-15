import { StyleSheet } from 'react-native';

import { act, fireEvent, render, screen } from '@testing-library/react-native';

import { lightTheme } from '@/core/theme/theme.constants';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from './AlertDialog';
import type { AlertDialogProps } from './dialog.types';

const finishAnimations = async () => {
  await act(async () => {
    jest.runAllTimers();
  });
};

const Example = ({ onAction, ...props }: AlertDialogProps & { onAction?: () => void }) => (
  <AlertDialog defaultOpen {...props}>
    <AlertDialogContent testID="alert">
      <AlertDialogHeader>
        <AlertDialogTitle>Delete note?</AlertDialogTitle>
        <AlertDialogDescription>This can't be undone.</AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel>Cancel</AlertDialogCancel>
        <AlertDialogAction variant="destructive" onPress={onAction}>
          Delete
        </AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
);

const isOpen = () => screen.queryByTestId('alert') !== null;
const labelColor = (name: string) => StyleSheet.flatten(screen.getByText(name).props.style).color;

describe('AlertDialog', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });
  afterEach(() => {
    jest.useRealTimers();
  });

  it('is an alertdialog', async () => {
    await render(<Example />);
    expect(screen.getByTestId('alert').props.role).toBe('alertdialog');
  });

  it("doesn't close on a backdrop press", async () => {
    const onOpenChange = jest.fn();
    await render(<Example onOpenChange={onOpenChange} />);
    expect(screen.getByTestId('alert-backdrop').props.onStartShouldSetResponder()).toBe(false);
    expect(onOpenChange).not.toHaveBeenCalled();
  });

  it('cancels on Escape and Android back', async () => {
    const onOpenChange = jest.fn();
    await render(<Example onOpenChange={onOpenChange} />);
    await fireEvent(screen.getByTestId('alert-modal'), 'requestClose');
    await finishAnimations();
    expect(onOpenChange).toHaveBeenCalledWith(false);
    expect(isOpen()).toBe(false);
  });

  it('runs the action, then closes', async () => {
    const onAction = jest.fn();
    const onOpenChange = jest.fn();
    await render(<Example onAction={onAction} onOpenChange={onOpenChange} />);
    await fireEvent.press(screen.getByRole('button', { name: 'Delete' }));
    expect(onAction).toHaveBeenCalledTimes(1);
    expect(onOpenChange).toHaveBeenCalledWith(false);
    await finishAnimations();
    expect(isOpen()).toBe(false);
  });

  it('closes on Cancel without running the action', async () => {
    const onAction = jest.fn();
    await render(<Example onAction={onAction} />);
    await fireEvent.press(screen.getByRole('button', { name: 'Cancel' }));
    await finishAnimations();
    expect(onAction).not.toHaveBeenCalled();
    expect(isOpen()).toBe(false);
  });

  it('draws a destructive action filled in brand, and as red text in iOS', async () => {
    const { rerender } = await render(<Example />);
    const box = StyleSheet.flatten(screen.getByRole('button', { name: 'Delete' }).props.style);
    expect(box.backgroundColor).toBe(lightTheme.colors.danger);
    await rerender(<Example design="ios" />);
    expect(labelColor('Delete')).toBe(lightTheme.colors.danger);
    expect(labelColor('Cancel')).toBe(lightTheme.colors.primary);
  });

  it('centers the text in iOS', async () => {
    await render(<Example design="ios" />);
    expect(StyleSheet.flatten(screen.getByRole('heading', { name: 'Delete note?' }).props.style).textAlign).toBe('center');
  });
});

describe('AlertDialog shorthand', () => {
  beforeEach(() => jest.useFakeTimers());
  afterEach(() => jest.useRealTimers());

  it('confirms or cancels from props, with default labels', async () => {
    const onConfirm = jest.fn();
    const onCancel = jest.fn();
    const onOpenChange = jest.fn();
    await render(
      <AlertDialog
        defaultOpen
        title="Delete file?"
        description="This can't be undone."
        destructive
        onConfirm={onConfirm}
        onCancel={onCancel}
        onOpenChange={onOpenChange}
      />
    );
    expect(screen.getByRole('heading', { name: 'Delete file?' })).toBeTruthy();
    await fireEvent.press(screen.getByRole('button', { name: 'Continue' }));
    expect(onConfirm).toHaveBeenCalledTimes(1);
    expect(onOpenChange).toHaveBeenLastCalledWith(false);
    await finishAnimations();

    await render(<AlertDialog defaultOpen title="Delete file?" confirmLabel="Delete" cancelLabel="Keep" onCancel={onCancel} />);
    await fireEvent.press(screen.getByRole('button', { name: 'Keep' }));
    expect(onCancel).toHaveBeenCalledTimes(1);
  });
});
