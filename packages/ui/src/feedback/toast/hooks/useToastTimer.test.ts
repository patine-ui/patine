import { act, renderHook } from '@testing-library/react-native';

import { useToastTimer } from './useToastTimer';

describe('useToastTimer', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });
  afterEach(() => {
    jest.useRealTimers();
  });

  it('expires after the duration, keeping the time left across a pause', async () => {
    const onExpire = jest.fn();
    const { rerender } = await renderHook(({ paused }: { paused: boolean }) => useToastTimer(1000, paused, 'a', onExpire), {
      initialProps: { paused: false },
    });
    await act(() => jest.advanceTimersByTime(600));
    await rerender({ paused: true });
    await act(() => jest.advanceTimersByTime(5000));
    expect(onExpire).not.toHaveBeenCalled();
    await rerender({ paused: false });
    await act(() => jest.advanceTimersByTime(399));
    expect(onExpire).not.toHaveBeenCalled();
    await act(() => jest.advanceTimersByTime(1));
    expect(onExpire).toHaveBeenCalledTimes(1);
  });

  it('starts over on restart, and never expires at Infinity', async () => {
    const onExpire = jest.fn();
    const { rerender } = await renderHook(
      ({ restart, duration }: { restart: string; duration: number }) => useToastTimer(duration, false, restart, onExpire),
      { initialProps: { restart: 'a', duration: 1000 } }
    );
    await act(() => jest.advanceTimersByTime(800));
    await rerender({ restart: 'b', duration: 1000 });
    await act(() => jest.advanceTimersByTime(800));
    expect(onExpire).not.toHaveBeenCalled();
    await rerender({ restart: 'c', duration: Number.POSITIVE_INFINITY });
    await act(() => jest.advanceTimersByTime(100000));
    expect(onExpire).not.toHaveBeenCalled();
  });
});
