import { act, renderHook } from '@testing-library/react-native';

import { useAutoplay } from './useAutoplay';

let mockReduced = false;
jest.mock('@/core/animation', () => ({
  ...jest.requireActual('@/core/animation'),
  useReducedMotion: () => mockReduced,
}));

describe('useAutoplay', () => {
  beforeEach(() => jest.useFakeTimers());
  afterEach(() => jest.useRealTimers());

  it('advances on its interval and restarts the timer when the slide changes', async () => {
    const advance = jest.fn();
    const { rerender } = await renderHook(({ index }: { index: number }) => useAutoplay(1000, index, 3, advance), {
      initialProps: { index: 0 },
    });
    await act(() => jest.advanceTimersByTime(800));
    await rerender({ index: 1 });
    await act(() => jest.advanceTimersByTime(800));
    expect(advance).not.toHaveBeenCalled();
    await act(() => jest.advanceTimersByTime(200));
    expect(advance).toHaveBeenCalledTimes(1);
  });

  it('pauses while touched or hovered, and is off for a single slide or without autoplay', async () => {
    const advance = jest.fn();
    const { result } = await renderHook(() => useAutoplay(true, 0, 3, advance));
    await act(() => result.current.handlers.onTouchStart());
    expect(result.current.running).toBe(false);
    await act(() => jest.advanceTimersByTime(10000));
    expect(advance).not.toHaveBeenCalled();
    await act(() => result.current.handlers.onTouchEnd());
    await act(() => result.current.handlers.onPointerEnter());
    expect(result.current.running).toBe(false);
    await act(() => result.current.handlers.onPointerLeave());
    expect(result.current.running).toBe(true);

    const single = await renderHook(() => useAutoplay(true, 0, 1, advance));
    expect(single.result.current.running).toBe(false);
    const off = await renderHook(() => useAutoplay(false, 0, 3, advance));
    expect(off.result.current.running).toBe(false);
  });

  it('never runs when the OS asks to reduce motion', async () => {
    mockReduced = true;
    const { result } = await renderHook(() => useAutoplay(true, 0, 3, jest.fn()));
    expect(result.current.running).toBe(false);
    mockReduced = false;
  });
});
