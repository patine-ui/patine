import type { Animated, NativeScrollEvent, NativeSyntheticEvent } from 'react-native';

import { renderHook } from '@testing-library/react-native';

import { useScrollPosition } from './useScrollPosition';

// On a device the native driver moves the value; here the JS-driven event does, so the test can read it.
jest.mock('@/core/animation/animation.constants', () => ({
  ...jest.requireActual('@/core/animation/animation.constants'),
  USE_NATIVE_DRIVER: false,
}));

const currentValue = (value: Animated.Value) => (value as unknown as { __getValue: () => number }).__getValue();
/** With the native driver the handler is an AnimatedEvent; its JS handler is what the scroll view would call. */
const handler = (onScroll: unknown) =>
  typeof onScroll === 'function' ? onScroll : (onScroll as { __getHandler: () => (e: unknown) => void }).__getHandler();
const scrollEvent = (x: number, y: number) => ({ nativeEvent: { contentOffset: { x, y } } }) as NativeSyntheticEvent<NativeScrollEvent>;

describe('useScrollPosition', () => {
  it('follows the offset on its axis and passes each event to the latest listener', async () => {
    const first = jest.fn();
    const listener = jest.fn();
    const { result, rerender } = await renderHook(
      ({ horizontal, onEvent }: { horizontal: boolean; onEvent: jest.Mock }) => useScrollPosition(horizontal, onEvent),
      { initialProps: { horizontal: true, onEvent: first } }
    );
    await rerender({ horizontal: true, onEvent: listener });
    handler(result.current.onScroll)(scrollEvent(120, 40));
    expect(currentValue(result.current.position)).toBe(120);
    expect(listener).toHaveBeenCalledTimes(1);
    expect(first).not.toHaveBeenCalled();
    await rerender({ horizontal: false, onEvent: listener });
    handler(result.current.onScroll)(scrollEvent(10, 300));
    expect(currentValue(result.current.position)).toBe(300);
  });
});
