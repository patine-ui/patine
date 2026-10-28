import type { GestureResponderEvent, HostInstance } from 'react-native';

import { act, renderHook } from '@testing-library/react-native';

import * as animation from '@/core/animation/animation.utils';
import * as motion from '@/core/animation/motion.utils';
import { lightTheme } from '@/core/theme/theme.constants';
import { useTouchFeedback } from './useTouchFeedback';

const press = (pageX: number, pageY: number) => ({ nativeEvent: { pageX, pageY } }) as GestureResponderEvent;

/** An element 100×40 placed at (10, 20) on the page. */
const placeElement = (ref: { current: HostInstance | null }) => {
  ref.current = {
    measure: (callback: (x: number, y: number, width: number, height: number, pageX: number, pageY: number) => void) =>
      callback(0, 0, 100, 40, 10, 20),
  } as unknown as HostInstance;
};

const material = {
  ...lightTheme,
  design: 'material' as const,
};

/** The last value `timing` was sent to for this animated value. */
const lastCall = (timing: jest.SpyInstance, value: unknown) => timing.mock.calls.filter(([v]) => v === value).pop();
const lastTarget = (timing: jest.SpyInstance, value: unknown) => lastCall(timing, value)?.[1];

describe('useTouchFeedback', () => {
  afterEach(() => jest.restoreAllMocks());

  it('fades the hover tint in, and out when disabled', async () => {
    const timing = jest.spyOn(animation, 'timing');
    const { result, rerender } = await renderHook(({ disabled }: { disabled: boolean }) => useTouchFeedback(lightTheme, disabled), {
      initialProps: { disabled: false },
    });
    const { hover } = result.current.feedback;
    await act(() => result.current.handlers.onHoverIn());
    expect(lastTarget(timing, hover)).toBe(1);
    await rerender({ disabled: true });
    expect(lastTarget(timing, hover)).toBe(0);
    await rerender({ disabled: false });
    await act(() => result.current.handlers.onHoverOut());
    expect(lastTarget(timing, hover)).toBe(0);
  });

  it('starts the ripple where the element was touched, sized to reach its far corner, in Material', async () => {
    const { result } = await renderHook(() => useTouchFeedback(material));
    placeElement(result.current.ref);
    await act(() => result.current.handlers.onPressIn(press(60, 30)));
    expect(result.current.feedback.ripple).toEqual({ x: 50, y: 10, radius: Math.hypot(50, 30) });
  });

  it('has no ripple when press feedback is switched off, but still hovers', async () => {
    const { result } = await renderHook(() => useTouchFeedback(material, false, false));
    placeElement(result.current.ref);
    await act(() => result.current.handlers.onPressIn(press(60, 30)));
    expect(result.current.feedback.ripple).toBeNull();
    const timing = jest.spyOn(animation, 'timing');
    await act(() => result.current.handlers.onHoverIn());
    expect(lastTarget(timing, result.current.feedback.hover)).toBe(1);
  });

  it('dims while held instead of rippling on iOS, and not when switched off', async () => {
    const timing = jest.spyOn(animation, 'timing');
    const { result } = await renderHook(() => useTouchFeedback(lightTheme));
    const dim = result.current.feedback.press;
    placeElement(result.current.ref);
    await act(() => result.current.handlers.onPressIn(press(60, 30)));
    expect(result.current.pressed).toBe(true);
    expect(result.current.feedback.ripple).toBeNull();
    expect(lastTarget(timing, dim)).toBe(1);
    await act(() => result.current.handlers.onPressOut());
    expect(result.current.pressed).toBe(false);
    // A quick tap holds the dim until it has shown, then fades it.
    expect(lastCall(timing, dim)?.[2]).toMatchObject({ delay: expect.any(Number) });
    expect(lastTarget(timing, dim)).toBe(0);

    const off = await renderHook(() => useTouchFeedback(lightTheme, false, false));
    await act(() => off.result.current.handlers.onPressIn(press(60, 30)));
    expect(off.result.current.pressed).toBe(true);
    expect(lastTarget(timing, off.result.current.feedback.press)).toBeUndefined();
  });

  it('shrinks while held and springs back with pressScale, except in Material and with reduce motion', async () => {
    const timing = jest.spyOn(animation, 'timing');
    const spring = jest.spyOn(animation, 'spring');
    const { result } = await renderHook(() => useTouchFeedback(lightTheme, false, true, true));
    const { pressScale } = result.current;
    await act(() => result.current.handlers.onPressIn(press(60, 30)));
    expect(lastTarget(timing, pressScale)).toBe(0.97);
    await act(() => result.current.handlers.onPressOut());
    expect(spring).toHaveBeenLastCalledWith(pressScale, 1, expect.anything());

    const flat = await renderHook(() => useTouchFeedback(material, false, true, true));
    placeElement(flat.result.current.ref);
    await act(() => flat.result.current.handlers.onPressIn(press(60, 30)));
    expect(lastTarget(timing, flat.result.current.pressScale)).toBeUndefined();

    jest.spyOn(motion, 'isReducedMotion').mockReturnValue(true);
    const still = await renderHook(() => useTouchFeedback(lightTheme, false, true, true));
    await act(() => still.result.current.handlers.onPressIn(press(60, 30)));
    expect(lastTarget(timing, still.result.current.pressScale)).toBeUndefined();
  });

  it('has no ripple when disabled', async () => {
    const { result } = await renderHook(() => useTouchFeedback(material, true));
    placeElement(result.current.ref);
    await act(() => result.current.handlers.onPressIn(press(60, 30)));
    expect(result.current.feedback.ripple).toBeNull();
  });
});
