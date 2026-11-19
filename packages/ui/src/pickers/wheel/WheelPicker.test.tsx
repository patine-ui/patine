import { FlatList } from 'react-native';

import { act, fireEvent, render, screen } from '@testing-library/react-native';

import { WheelPicker } from './WheelPicker';

const H = 40;
const scrollTo = async (y: number) => {
  await fireEvent.scroll(screen.getByTestId('wheel-list'), { nativeEvent: { contentOffset: { y } } });
  await act(() => jest.advanceTimersByTime(500));
};
const currentLabel = () => screen.getByTestId('wheel').props['aria-valuetext'];

describe('WheelPicker', () => {
  let scrollToOffset: jest.SpyInstance;

  beforeEach(() => {
    jest.useFakeTimers();
    scrollToOffset = jest.spyOn(FlatList.prototype, 'scrollToOffset');
  });
  afterEach(() => {
    scrollToOffset.mockRestore();
    jest.useRealTimers();
  });

  it('starts on the default value', async () => {
    await render(<WheelPicker items={[1, 2, 3]} defaultValue={2} testID="wheel" />);
    expect(currentLabel()).toBe('2');
  });

  it('accepts item objects with labels', async () => {
    const items = [
      { label: 'Small', value: 's' },
      { label: 'Large', value: 'l' },
    ];
    await render(<WheelPicker items={items} defaultValue="l" testID="wheel" />);
    expect(currentLabel()).toBe('Large');
  });

  it('commits the row it settles on', async () => {
    const onValueChange = jest.fn();
    const onValueChanging = jest.fn();
    await render(<WheelPicker items={[1, 2, 3, 4]} onValueChange={onValueChange} onValueChanging={onValueChanging} testID="wheel" />);
    await scrollTo(2 * H);
    expect(onValueChanging).toHaveBeenCalledWith(3, 2);
    expect(onValueChange).toHaveBeenCalledTimes(1);
    expect(onValueChange).toHaveBeenCalledWith(3, 2);
    expect(currentLabel()).toBe('3');
  });

  it('does not commit when it settles back on the current row', async () => {
    const onValueChange = jest.fn();
    await render(<WheelPicker items={[1, 2, 3]} defaultValue={2} onValueChange={onValueChange} testID="wheel" />);
    await scrollTo(H);
    expect(onValueChange).not.toHaveBeenCalled();
  });

  it('snaps off a disabled row instead of committing it', async () => {
    const onValueChange = jest.fn();
    const items = [
      { label: 'A', value: 'a' },
      { label: 'B', value: 'b', disabled: true },
      { label: 'C', value: 'c' },
    ];
    await render(<WheelPicker items={items} onValueChange={onValueChange} testID="wheel" />);
    await scrollTo(H);
    expect(onValueChange).not.toHaveBeenCalled();
    expect(scrollToOffset).toHaveBeenLastCalledWith({ offset: 2 * H, animated: true });
  });

  it('follows a controlled value without reporting it back', async () => {
    const onValueChange = jest.fn();
    const { rerender } = await render(<WheelPicker items={[1, 2, 3]} value={1} onValueChange={onValueChange} testID="wheel" />);
    await rerender(<WheelPicker items={[1, 2, 3]} value={3} onValueChange={onValueChange} testID="wheel" />);
    expect(currentLabel()).toBe('3');
    expect(onValueChange).not.toHaveBeenCalled();
  });

  it('steps with the accessibility increment and decrement actions', async () => {
    await render(<WheelPicker items={[1, 2, 3]} defaultValue={2} testID="wheel" />);
    await fireEvent(screen.getByTestId('wheel'), 'accessibilityAction', { nativeEvent: { actionName: 'increment' } });
    expect(scrollToOffset).toHaveBeenLastCalledWith({ offset: 2 * H, animated: true });
    await fireEvent(screen.getByTestId('wheel'), 'accessibilityAction', { nativeEvent: { actionName: 'decrement' } });
    expect(scrollToOffset).toHaveBeenLastCalledWith({ offset: H, animated: true });
  });

  it('steps with the arrow keys, quickly pressed too, and jumps to the ends with Home and End', async () => {
    await render(<WheelPicker items={[1, 2, 3]} defaultValue={2} testID="wheel" />);
    const press = (key: string) =>
      fireEvent(screen.getByTestId('wheel'), 'keyDown', { nativeEvent: { key }, preventDefault: jest.fn(), stopPropagation: jest.fn() });
    expect(screen.getByTestId('wheel').props.focusable).toBe(true);
    await press('End');
    expect(scrollToOffset).toHaveBeenLastCalledWith({ offset: 2 * H, animated: true });
    // Pressed again before the wheel gets there, each step goes on from where the last is heading.
    await press('ArrowUp');
    await press('ArrowUp');
    expect(scrollToOffset).toHaveBeenLastCalledWith({ offset: 0, animated: true });
  });

  it('jumps to a typed value after tapping the selected row', async () => {
    const minutes = ['00', '15', '30', '45'];
    await render(<WheelPicker items={minutes} defaultValue="00" accessibilityLabel="Minutes" testID="wheel" />);
    await fireEvent.press(screen.getByText('00'));
    await fireEvent.changeText(screen.getByDisplayValue(''), '30');
    expect(scrollToOffset).toHaveBeenLastCalledWith({ offset: 2 * H, animated: true });
  });

  it('does not open the keyboard when keyboard input is off', async () => {
    await render(<WheelPicker items={[1, 2, 3]} keyboardInput={false} testID="wheel" />);
    await fireEvent.press(screen.getByText('1'));
    expect(screen.queryByDisplayValue('')).toBeNull();
  });
});
