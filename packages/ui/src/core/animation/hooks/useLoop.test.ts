import { Animated } from 'react-native';

import { renderHook } from '@testing-library/react-native';

import { blinkLoop } from '@/core/animation/animation.utils';
import { useBlink } from './useBlink';
import { useLoop } from './useLoop';

const mockLoop = () => {
  const stop = jest.fn();
  const loop = jest.spyOn(Animated, 'loop').mockReturnValue({
    start: jest.fn(),
    stop,
    reset: jest.fn(),
  });
  return {
    loop,
    stop,
  };
};

describe('useLoop', () => {
  afterEach(() => jest.restoreAllMocks());

  it('loops while active, restarts on a new key, and stops when inactive', async () => {
    const { loop, stop } = mockLoop();
    const { rerender } = await renderHook(({ active, step }: { active: boolean; step: number }) => useBlink(active, step), {
      initialProps: { active: true, step: 0 },
    });
    expect(loop).toHaveBeenCalledTimes(1);
    await rerender({ active: true, step: 1 });
    expect(stop).toHaveBeenCalledTimes(1);
    expect(loop).toHaveBeenCalledTimes(2);
    await rerender({ active: false, step: 1 });
    expect(stop).toHaveBeenCalledTimes(2);
    expect(loop).toHaveBeenCalledTimes(2);
  });

  it('rests the value at 1', async () => {
    const { result } = await renderHook(() => useLoop((value) => blinkLoop(value, 10), false));
    expect((result.current as unknown as { __getValue: () => number }).__getValue()).toBe(1);
  });
});
