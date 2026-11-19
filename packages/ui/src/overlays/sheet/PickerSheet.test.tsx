import { Text } from 'react-native';

import { fireEvent, render, screen } from '@testing-library/react-native';

import { BottomSheet } from './BottomSheet';
import { FieldSheetContext } from './hooks/useFieldSheet';
import { PickerSheet } from './PickerSheet';
import type { FieldSheetContextValue } from './sheet.types';

const inDropdownField: FieldSheetContextValue = {
  presentation: 'dropdown',
  anchor: {
    x: 16,
    y: 100,
    width: 300,
    height: 48,
  },
};

describe('BottomSheet', () => {
  it('renders nothing until visible', async () => {
    const { rerender } = await render(
      <BottomSheet open={false} onOpenChange={jest.fn()} title="Pick">
        <Text>Body</Text>
      </BottomSheet>
    );
    expect(screen.queryByText('Body')).toBeNull();
    await rerender(
      <BottomSheet open onOpenChange={jest.fn()} title="Pick">
        <Text>Body</Text>
      </BottomSheet>
    );
    expect(screen.getByText('Body')).toBeTruthy();
    expect(screen.getByRole('header', { name: 'Pick' })).toBeTruthy();
  });

  it('has a ✕ as a centered modal only, which closes it', async () => {
    const onOpenChange = jest.fn();
    const { rerender } = await render(
      <BottomSheet open onOpenChange={onOpenChange} title="Class" presentation="modal">
        <Text>Body</Text>
      </BottomSheet>
    );
    const [, closeButton] = screen.getAllByRole('button', { name: 'Close' });
    if (closeButton) await fireEvent.press(closeButton);
    expect(onOpenChange).toHaveBeenCalledWith(false);
    await rerender(
      <BottomSheet open onOpenChange={onOpenChange} title="Class" presentation="bottomSheet">
        <Text>Body</Text>
      </BottomSheet>
    );
    expect(screen.getAllByRole('button', { name: 'Close' })).toHaveLength(1);
  });

  it('closes on backdrop press unless disabled', async () => {
    const onClose = jest.fn();
    const { rerender } = await render(
      <BottomSheet open onOpenChange={onClose}>
        <Text>Body</Text>
      </BottomSheet>
    );
    await fireEvent.press(screen.getByLabelText('Close'));
    expect(onClose).toHaveBeenCalledTimes(1);
    await rerender(
      <BottomSheet open onOpenChange={onClose} closeOnBackdropPress={false}>
        <Text>Body</Text>
      </BottomSheet>
    );
    // A backdrop that doesn't close isn't announced as a Close button.
    expect(screen.queryByLabelText('Close')).toBeNull();
  });

  it('calls onOpenChange with false when the user closes it', async () => {
    const onOpenChange = jest.fn();
    await render(
      <BottomSheet open onOpenChange={onOpenChange}>
        <Text>Body</Text>
      </BottomSheet>
    );
    await fireEvent.press(screen.getByLabelText('Close'));
    expect(onOpenChange).toHaveBeenCalledWith(false);
  });

  it('is a modal dialog named by its title, closes on the escape gesture, and takes a translated backdrop label', async () => {
    const onClose = jest.fn();
    await render(
      <BottomSheet open onOpenChange={onClose} title="Pick" closeLabel="Fermer">
        <Text>Body</Text>
      </BottomSheet>
    );
    const sheet = screen.getByLabelText('Pick');
    expect(sheet.props.role).toBe('dialog');
    await fireEvent(sheet, 'accessibilityEscape');
    expect(onClose).toHaveBeenCalledTimes(1);
    expect(screen.getByRole('button', { name: 'Fermer' })).toBeTruthy();
  });
});

describe('PickerSheet', () => {
  it('puts Cancel and Done beside the title on iOS, and Cancel and OK after the content in Material', async () => {
    const sheet = (design: 'ios' | 'material') => (
      <PickerSheet open onOpenChange={jest.fn()} onConfirm={jest.fn()} title="Pick" design={design}>
        <Text>Body</Text>
      </PickerSheet>
    );
    const { rerender } = await render(sheet('ios'));
    expect(screen.getByRole('button', { name: 'Done' })).toBeTruthy();
    const iosText = screen.getAllByText(/Pick|Body|Cancel|Done/).map((node) => node.props.children);
    expect(iosText).toEqual(['Cancel', 'Pick', 'Done', 'Body']);

    await rerender(sheet('material'));
    const materialText = screen.getAllByText(/Pick|Body|Cancel|OK/).map((node) => node.props.children);
    expect(materialText).toEqual(['Pick', 'Body', 'Cancel', 'OK']);
  });

  it('cancels and confirms from the header', async () => {
    const onClose = jest.fn();
    const onConfirm = jest.fn();
    await render(
      <PickerSheet open onOpenChange={onClose} onConfirm={onConfirm} confirmLabel="Save">
        <Text>Body</Text>
      </PickerSheet>
    );
    await fireEvent.press(screen.getByRole('button', { name: 'Cancel' }));
    expect(onClose).toHaveBeenCalled();
    await fireEvent.press(screen.getByRole('button', { name: 'Save' }));
    expect(onConfirm).toHaveBeenCalled();
  });

  it('ignores a disabled confirm and can hide cancel', async () => {
    const onConfirm = jest.fn();
    await render(
      <PickerSheet open onOpenChange={jest.fn()} onConfirm={onConfirm} confirmDisabled showCancel={false}>
        <Text>Body</Text>
      </PickerSheet>
    );
    expect(screen.queryByRole('button', { name: 'Cancel' })).toBeNull();
    await fireEvent.press(screen.getByRole('button', { name: 'Done' }));
    expect(onConfirm).not.toHaveBeenCalled();
  });
});

describe('PickerSheet in a field', () => {
  it('opens as a dropdown under the field: no title, Cancel and Done below the content', async () => {
    const onClose = jest.fn();
    const onConfirm = jest.fn();
    await render(
      <FieldSheetContext.Provider value={inDropdownField}>
        <PickerSheet open onOpenChange={onClose} onConfirm={onConfirm} title="Due">
          <Text>Body</Text>
        </PickerSheet>
      </FieldSheetContext.Provider>
    );
    expect(screen.getByText('Body')).toBeTruthy();
    expect(screen.queryByRole('header', { name: 'Due' })).toBeNull();
    await fireEvent.press(screen.getByRole('button', { name: 'Done' }));
    expect(onConfirm).toHaveBeenCalled();
    await fireEvent.press(screen.getByRole('button', { name: 'Cancel' }));
    expect(onClose).toHaveBeenCalled();
  });

  it('follows a field set to a sheet presentation', async () => {
    await render(
      <FieldSheetContext.Provider value={{ ...inDropdownField, presentation: 'bottomSheet' }}>
        <PickerSheet open onOpenChange={jest.fn()} title="Due">
          <Text>Body</Text>
        </PickerSheet>
      </FieldSheetContext.Provider>
    );
    expect(screen.getByRole('header', { name: 'Due' })).toBeTruthy();
  });

  it('keeps its own presentation over the field', async () => {
    await render(
      <FieldSheetContext.Provider value={inDropdownField}>
        <PickerSheet open onOpenChange={jest.fn()} title="Due" presentation="bottomSheet">
          <Text>Body</Text>
        </PickerSheet>
      </FieldSheetContext.Provider>
    );
    expect(screen.getByRole('header', { name: 'Due' })).toBeTruthy();
  });

  it('does not pass the field on to a sheet opened inside it', async () => {
    await render(
      <FieldSheetContext.Provider value={inDropdownField}>
        <PickerSheet open onOpenChange={jest.fn()}>
          <PickerSheet open onOpenChange={jest.fn()} title="Nested">
            <Text>Inner</Text>
          </PickerSheet>
        </PickerSheet>
      </FieldSheetContext.Provider>
    );
    expect(screen.getByRole('header', { name: 'Nested' })).toBeTruthy();
  });
});
