import { Animated } from 'react-native';

import { renderHook } from '@testing-library/react-native';

import { useSweep } from './useSweep';

describe('useSweep', () => {
  afterEach(() => jest.restoreAllMocks());

  it('loops only while active', async () => {
    const loop = jest.spyOn(Animated, 'loop').mockReturnValue({
      start: jest.fn(),
      stop: jest.fn(),
      reset: jest.fn(),
    });
    const { rerender } = await renderHook(({ active }: { active: boolean }) => useSweep(active), { initialProps: { active: true } });
    expect(loop).toHaveBeenCalledTimes(1);
    await rerender({ active: false });
    expect(loop).toHaveBeenCalledTimes(1);
  });
});
