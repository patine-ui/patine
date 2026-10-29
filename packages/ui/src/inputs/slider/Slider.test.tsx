import type { GestureResponderEvent, PanResponderCallbacks, PanResponderGestureState } from 'react-native';
import { PanResponder } from 'react-native';

import { act, fireEvent, render, screen } from '@testing-library/react-native';

import { Slider } from './Slider';

const touchAt = (x: number) => ({ nativeEvent: { locationX: x, locationY: 22 } }) as unknown as GestureResponderEvent;
const moved = (dx: number) =>
  ({
    dx,
    dy: 0,
  }) as PanResponderGestureState;
const key = (k: string) => ({
  nativeEvent: { key: k },
  preventDefault: jest.fn(),
  stopPropagation: jest.fn(),
});

/** Renders with the track laid out 228 px wide: iOS's 28 px knob leaves 200 px of travel, 2 px per step of 0–100. */
const renderSlider = async (ui: React.ReactElement) => {
  const spy = jest.spyOn(PanResponder, 'create');
  await render(ui);
  await fireEvent(screen.getByTestId('slider-track'), 'layout', { nativeEvent: { layout: { x: 0, y: 0, width: 228, height: 44 } } });
  return spy.mock.calls[0]?.[0] as PanResponderCallbacks;
};

describe('Slider', () => {
  afterEach(() => jest.restoreAllMocks());

  it('reports each step while dragging and commits once on release', async () => {
    const onValueChange = jest.fn();
    const onValueChanging = jest.fn();
    const pan = await renderSlider(
      <Slider design="ios" defaultValue={10} onValueChange={onValueChange} onValueChanging={onValueChanging} testID="slider" />
    );
    const start = touchAt(114);
    await act(() => pan.onPanResponderGrant?.(start, moved(0)));
    expect(onValueChanging).toHaveBeenLastCalledWith(50);
    await act(() => pan.onPanResponderMove?.(start, moved(40)));
    expect(onValueChanging).toHaveBeenLastCalledWith(70);
    expect(onValueChange).not.toHaveBeenCalled();
    expect(screen.getByTestId('slider-thumb-0').props.accessibilityValue).toEqual({ text: '70' });
    await act(() => pan.onPanResponderRelease?.(start, moved(40)));
    expect(onValueChange).toHaveBeenCalledTimes(1);
    expect(onValueChange).toHaveBeenCalledWith(70);
  });

  it('does not report a tap on the current value', async () => {
    const onValueChange = jest.fn();
    const pan = await renderSlider(<Slider design="ios" value={50} onValueChange={onValueChange} testID="slider" />);
    await act(() => pan.onPanResponderGrant?.(touchAt(114), moved(0)));
    await act(() => pan.onPanResponderRelease?.(touchAt(114), moved(0)));
    expect(onValueChange).not.toHaveBeenCalled();
  });

  it('steps with keys and screen-reader actions, in steps, within min and max', async () => {
    const onValueChange = jest.fn();
    await render(<Slider design="ios" defaultValue={20} min={0} max={50} step={10} onValueChange={onValueChange} testID="slider" />);
    const thumb = screen.getByTestId('slider-thumb-0');
    await fireEvent(thumb, 'keyDown', key('ArrowRight'));
    expect(onValueChange).toHaveBeenLastCalledWith(30);
    await fireEvent(thumb, 'accessibilityAction', { nativeEvent: { actionName: 'decrement' } });
    expect(onValueChange).toHaveBeenLastCalledWith(20);
    await fireEvent(thumb, 'keyDown', key('End'));
    expect(onValueChange).toHaveBeenLastCalledWith(50);
    await fireEvent(thumb, 'keyDown', key('ArrowUp'));
    expect(onValueChange).toHaveBeenCalledTimes(3);
  });

  it('moves the nearest of two thumbs and keeps the range in order', async () => {
    const onValueChange = jest.fn();
    const pan = await renderSlider(<Slider design="ios" range defaultValue={[20, 80]} onValueChange={onValueChange} testID="slider" />);
    const start = touchAt(164);
    await act(() => pan.onPanResponderGrant?.(start, moved(0)));
    await act(() => pan.onPanResponderMove?.(start, moved(-160)));
    await act(() => pan.onPanResponderRelease?.(start, moved(-160)));
    expect(onValueChange).toHaveBeenCalledWith([20, 20]);
    expect(screen.getByTestId('slider-thumb-0').props.accessibilityLabel).toBe('Minimum');
  });

  it('follows a controlled value without reporting it', async () => {
    const onValueChange = jest.fn();
    await render(<Slider design="ios" value={30} onValueChange={onValueChange} formatValue={(v) => `${v}%`} testID="slider" />);
    expect(screen.getByTestId('slider-thumb-0').props.accessibilityValue).toEqual({ text: '30%' });
    await screen.rerender(<Slider design="ios" value={60} onValueChange={onValueChange} formatValue={(v) => `${v}%`} testID="slider" />);
    expect(screen.getByTestId('slider-thumb-0').props.accessibilityValue).toEqual({ text: '60%' });
    expect(onValueChange).not.toHaveBeenCalled();
  });

  it('shows Material’s value bubble only while dragging', async () => {
    const pan = await renderSlider(<Slider defaultValue={10} design="material" testID="slider" />);
    expect(screen.queryByText('50')).toBeNull();
    await act(() => pan.onPanResponderGrant?.(touchAt(114), moved(0)));
    expect(screen.getByText('50')).toBeTruthy();
    await act(() => pan.onPanResponderRelease?.(touchAt(114), moved(0)));
    expect(screen.queryByText('50')).toBeNull();
  });

  it('ignores touches and keys while disabled', async () => {
    const onValueChange = jest.fn();
    await render(<Slider design="ios" defaultValue={20} disabled onValueChange={onValueChange} testID="slider" />);
    const thumb = screen.getByTestId('slider-thumb-0');
    await fireEvent(thumb, 'keyDown', key('ArrowRight'));
    expect(onValueChange).not.toHaveBeenCalled();
    expect(thumb.props.accessibilityState).toEqual({ disabled: true });
    expect(screen.getByTestId('slider-track').props.onResponderGrant).toBeUndefined();
  });

  it('draws a halo behind each thumb in the web design only', async () => {
    await render(<Slider range defaultValue={[20, 80]} design="web" testID="slider" />);
    expect(screen.getByTestId('slider-halo-0')).toBeTruthy();
    expect(screen.getByTestId('slider-halo-1')).toBeTruthy();
    await screen.rerender(<Slider range defaultValue={[20, 80]} design="ios" testID="slider" />);
    expect(screen.queryByTestId('slider-halo-0')).toBeNull();
  });

  it('keeps to the marks with snapToMarks, by drag and by key, and labels them', async () => {
    const onValueChange = jest.fn();
    const marks = [0, { value: 20, label: '20°C' }, { value: 37, label: '37°C' }, { value: 100, label: '100°C' }];
    const pan = await renderSlider(
      <Slider design="ios" defaultValue={20} marks={marks} snapToMarks onValueChange={onValueChange} testID="slider" />
    );
    expect(screen.getByText('37°C')).toBeTruthy();
    await act(() => pan.onPanResponderGrant?.(touchAt(114), moved(0)));
    await act(() => pan.onPanResponderRelease?.(touchAt(114), moved(0)));
    expect(onValueChange).toHaveBeenLastCalledWith(37);
    await fireEvent(screen.getByTestId('slider-thumb-0'), 'keyDown', key('ArrowRight'));
    expect(onValueChange).toHaveBeenLastCalledWith(100);
  });

  it('shows the value bubble always, on every thumb, with valueLabel="always"', async () => {
    await render(<Slider range defaultValue={[20, 80]} valueLabel="always" design="ios" testID="slider" />);
    expect(screen.getByText('20')).toBeTruthy();
    expect(screen.getByText('80')).toBeTruthy();
  });
});
