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

  it('hides the ring on a pointer press while focused, and shows it again on a plain key', async () => {
    const handlers: Record<string, (event: object) => void> = {};
    const fire = (type: string, event: object = {}) => handlers[type]?.(event);
    Reflect.set(globalThis, 'document', {
      addEventListener: (type: string, listener: (event: object) => void) => {
        handlers[type] = listener;
      },
    });
    try {
      const { result } = await renderHook(() => useFocusVisible());
      await act(() => fire('keydown'));
      await act(() => result.current.onFocus());
      expect(result.current.focusVisible).toBe(true);
      await act(() => fire('pointerdown'));
      expect(result.current.focusVisible).toBe(false);
      await act(() => fire('keydown', { metaKey: true }));
      expect(result.current.focusVisible).toBe(false);
      await act(() => fire('keydown'));
      expect(result.current.focusVisible).toBe(true);
    } finally {
      Reflect.deleteProperty(globalThis, 'document');
    }
  });

  it('shows no ring for a focus that follows a press (a tap with a keyboard attached on native)', async () => {
    const { result } = await renderHook(() => useFocusVisible());
    await act(() => result.current.onPressIn());
    await act(() => result.current.onFocus());
    expect(result.current.focusVisible).toBe(false);
  });
});
