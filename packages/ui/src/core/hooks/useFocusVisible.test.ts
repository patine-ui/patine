import { act, renderHook } from '@testing-library/react-native';

import { useFocusVisible } from './useFocusVisible';

describe('useFocusVisible', () => {
  it('shows the ring while focused on native, where focus only comes from a keyboard', async () => {
    const { result } = await renderHook(() => useFocusVisible());
    expect(result.current.focusVisible).toBe(false);
    await act(() => result.current.onFocus());
    expect(result.current.focusVisible).toBe(true);
    await act(() => result.current.onBlur());
    expect(result.current.focusVisible).toBe(false);
  });
});
