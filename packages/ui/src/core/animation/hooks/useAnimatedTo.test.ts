import type { Animated } from 'react-native';

import { renderHook } from '@testing-library/react-native';

import * as utils from '@/core/animation/animation.utils';
import { useAnimatedTo } from './useAnimatedTo';

const currentValue = (value: Animated.Value) => (value as unknown as { __getValue: () => number }).__getValue();

describe('useAnimatedTo', () => {
  afterEach(() => jest.restoreAllMocks());

  it('animates to a new target, or jumps there when instant', async () => {
    const timing = jest.spyOn(utils, 'timing');
    const { result, rerender } = await renderHook(
      ({ target, instant }: { target: number; instant: boolean }) => useAnimatedTo(target, { duration: 100, instant }),
      {
        initialProps: { target: 0, instant: false },
      }
    );
    await rerender({ target: 10, instant: false });
    expect(timing).toHaveBeenLastCalledWith(result.current, 10, expect.objectContaining({ duration: 100 }));
    const calls = timing.mock.calls.length;
    await rerender({ target: 20, instant: true });
    expect(timing).toHaveBeenCalledTimes(calls);
    expect(currentValue(result.current)).toBe(20);
  });
});
