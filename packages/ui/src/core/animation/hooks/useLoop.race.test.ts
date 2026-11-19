import { Animated } from 'react-native';

import { renderHook } from '@testing-library/react-native';

import { useBlink } from './useBlink';
import { useCycle } from './useCycle';

// The render saw motion allowed; by the effect the OS answer says reduce. A loop built then has zero-length steps.
jest.mock('./useReducedMotion', () => ({ useReducedMotion: () => false }));
jest.mock('@/core/animation/motion.utils', () => ({
  isReducedMotion: () => true,
  subscribeReducedMotion: () => () => {},
}));

describe('loops when reduce motion arrives between render and effect', () => {
  afterEach(() => jest.restoreAllMocks());

  it("don't start, so Animated.loop can't restart itself forever", async () => {
    const loop = jest.spyOn(Animated, 'loop');
    const timing = jest.spyOn(Animated, 'timing');
    await renderHook(() => useBlink(true));
    await renderHook(() => useCycle(true));
    expect(loop).not.toHaveBeenCalled();
    expect(timing).not.toHaveBeenCalled();
  });
});
