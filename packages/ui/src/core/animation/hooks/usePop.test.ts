import { renderHook } from '@testing-library/react-native';

import * as utils from '@/core/animation/animation.utils';
import { usePop } from './usePop';

const currentValue = (value: unknown) => (value as { __getValue: () => number }).__getValue();

describe('usePop', () => {
  afterEach(() => jest.restoreAllMocks());

  it('starts where `on` is, grows from half size, and animates on change', async () => {
    const timing = jest.spyOn(utils, 'timing');
    const { result, rerender } = await renderHook(({ on }: { on: boolean }) => usePop(on), { initialProps: { on: false } });
    expect(currentValue(result.current.opacity)).toBe(0);
    expect(currentValue(result.current.transform[0]?.scale)).toBe(0.5);
    await rerender({ on: true });
    expect(timing).toHaveBeenLastCalledWith(result.current.opacity, 1, expect.anything());
  });
});
