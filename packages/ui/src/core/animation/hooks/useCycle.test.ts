import { Animated } from 'react-native';

import { act, renderHook } from '@testing-library/react-native';

import { useCycle } from './useCycle';

describe('useCycle', () => {
  afterEach(() => jest.restoreAllMocks());

  it('finishes the current lap, then loops while active', async () => {
    const loop = jest.spyOn(Animated, 'loop').mockReturnValue({
      start: jest.fn(),
      stop: jest.fn(),
      reset: jest.fn(),
    });
    const timing = jest.spyOn(Animated, 'timing').mockImplementation(
      () =>
        ({
          start: (done?: (r: { finished: boolean }) => void) => done?.({ finished: true }),
          stop: jest.fn(),
          reset: jest.fn(),
        }) as unknown as Animated.CompositeAnimation
    );
    const { result, rerender } = await renderHook(({ active }: { active: boolean }) => useCycle(active, 1000), {
      initialProps: { active: true },
    });
    expect(timing).toHaveBeenCalledWith(result.current, expect.objectContaining({ toValue: 1, duration: 1000 }));
    expect(loop).toHaveBeenCalledTimes(1);
    await act(async () => rerender({ active: false }));
    expect(loop).toHaveBeenCalledTimes(1);
  });

  it('resumes from where it stopped', async () => {
    const timing = jest.spyOn(Animated, 'timing').mockReturnValue({
      start: jest.fn(),
      stop: jest.fn(),
      reset: jest.fn(),
    });
    const { result, rerender } = await renderHook(({ active }: { active: boolean }) => useCycle(active, 1000), {
      initialProps: { active: false },
    });
    result.current.setValue(0.75);
    await act(async () => rerender({ active: true }));
    expect(timing).toHaveBeenCalledWith(result.current, expect.objectContaining({ toValue: 1, duration: 250 }));
  });
});
