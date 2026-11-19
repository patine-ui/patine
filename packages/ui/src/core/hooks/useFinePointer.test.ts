import { renderHook } from '@testing-library/react-native';

import { hasFinePointer, useFinePointer } from './useFinePointer';

describe('useFinePointer', () => {
  it('is false off the web, where touch keeps full-size targets', async () => {
    expect(hasFinePointer()).toBe(false);
    const { result } = await renderHook(() => useFinePointer());
    expect(result.current).toBe(false);
  });
});
