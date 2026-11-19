import type { GestureResponderEvent, PanResponderCallbacks, PanResponderGestureState } from 'react-native';
import { PanResponder } from 'react-native';

import { act, fireEvent, render, screen } from '@testing-library/react-native';

import { SignaturePad } from './SignaturePad';

const at = (x: number, y: number) => ({ nativeEvent: { locationX: x, locationY: y } }) as unknown as GestureResponderEvent;
const moved = (dx: number, dy: number) =>
  ({
    dx,
    dy,
  }) as PanResponderGestureState;

describe('SignaturePad', () => {
  afterEach(() => jest.restoreAllMocks());

  it('commits a stroke when the pen lifts, and clears from its button and the screen-reader action', async () => {
    const create = jest.spyOn(PanResponder, 'create');
    const onValueChange = jest.fn();
    const onBegin = jest.fn();
    await render(<SignaturePad onValueChange={onValueChange} onBegin={onBegin} />);
    const pad = screen.getByLabelText('Signature');
    expect(pad.props['aria-valuetext']).toBe('Empty');
    expect(screen.getByText('Sign here')).toBeTruthy();
    const responder = create.mock.calls[0]?.[0] as PanResponderCallbacks;
    await act(() => {
      responder.onPanResponderGrant?.(at(10, 20), moved(0, 0));
      responder.onPanResponderMove?.(at(0, 0), moved(30, 0));
      responder.onPanResponderMove?.(at(0, 0), moved(30.5, 0));
      responder.onPanResponderRelease?.(at(0, 0), moved(30, 10));
    });
    expect(onBegin).toHaveBeenCalled();
    expect(onValueChange).toHaveBeenLastCalledWith([
      [
        { x: 10, y: 20 },
        { x: 40, y: 20 },
      ],
    ]);
    expect(screen.getByLabelText('Signature').props['aria-valuetext']).toBe('Signed');
    await fireEvent(screen.getByLabelText('Signature'), 'accessibilityAction', { nativeEvent: { actionName: 'clear' } });
    expect(onValueChange).toHaveBeenLastCalledWith([]);
  });

  it('shows a controlled value without reporting it, and draws nothing when disabled', async () => {
    const create = jest.spyOn(PanResponder, 'create');
    const onValueChange = jest.fn();
    await render(<SignaturePad disabled value={[[{ x: 1, y: 1 }]]} onValueChange={onValueChange} />);
    expect(screen.queryByText('Sign here')).toBeNull();
    expect(screen.queryByRole('button', { name: 'Clear' })).toBeNull();
    const responder = create.mock.calls[0]?.[0] as PanResponderCallbacks;
    expect(responder.onStartShouldSetPanResponder?.(at(0, 0), moved(0, 0))).toBe(false);
    expect(onValueChange).not.toHaveBeenCalled();
  });

  it('clears from the Clear button', async () => {
    const onValueChange = jest.fn();
    await render(<SignaturePad defaultValue={[[{ x: 1, y: 1 }]]} onValueChange={onValueChange} />);
    await fireEvent.press(screen.getByRole('button', { name: 'Clear' }));
    expect(onValueChange).toHaveBeenCalledWith([]);
    expect(screen.getByText('Sign here')).toBeTruthy();
  });
});
