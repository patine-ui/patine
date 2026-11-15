import { renderHook } from '@testing-library/react-native';

import { REPEAT_INTERVAL } from '@/inputs/field/field.constants';
import { useRepeatPress } from './useRepeatPress';

describe('useRepeatPress', () => {
  afterEach(() => jest.useRealTimers());

  it('steps once on a tap', async () => {
    const onStep = jest.fn();
    const { result } = await renderHook(() => useRepeatPress(onStep, false));
    result.current.onPress();
    expect(onStep).toHaveBeenCalledTimes(1);
  });

  it('repeats while held, and stops on release', async () => {
    const onStep = jest.fn();
    const { result } = await renderHook(() => useRepeatPress(onStep, false));
    jest.useFakeTimers();
    result.current.onLongPress();
    jest.advanceTimersByTime(REPEAT_INTERVAL * 3);
    expect(onStep).toHaveBeenCalledTimes(4);
    result.current.onPressOut();
    jest.advanceTimersByTime(REPEAT_INTERVAL * 5);
    expect(onStep).toHaveBeenCalledTimes(4);
  });

  it('does nothing while disabled', async () => {
    const onStep = jest.fn();
    const { result } = await renderHook(() => useRepeatPress(onStep, true));
    result.current.onPress();
    result.current.onLongPress();
    expect(onStep).not.toHaveBeenCalled();
  });
});
