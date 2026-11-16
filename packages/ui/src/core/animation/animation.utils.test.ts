import { Animated } from 'react-native';

import { EASE_STANDARD, USE_NATIVE_DRIVER } from './animation.constants';
import { afterPaint, hoverTransition, spring, timing } from './animation.utils';

describe('animation utils', () => {
  afterEach(() => jest.restoreAllMocks());

  it('times with the standard ease and the native driver by default', () => {
    const spy = jest.spyOn(Animated, 'timing');
    const value = new Animated.Value(0);
    timing(value, 1, { duration: 100 });
    expect(spy).toHaveBeenCalledWith(value, {
      toValue: 1,
      duration: 100,
      easing: EASE_STANDARD,
      delay: undefined,
      useNativeDriver: USE_NATIVE_DRIVER,
    });
  });

  it('lets layout animations opt out of the native driver', () => {
    const spy = jest.spyOn(Animated, 'timing');
    timing(new Animated.Value(0), 1, { duration: 100, native: false });
    expect(spy).toHaveBeenCalledWith(expect.anything(), expect.objectContaining({ useNativeDriver: false }));
  });

  it('springs with the native driver by default', () => {
    const spy = jest.spyOn(Animated, 'spring');
    const value = new Animated.Value(0);
    spring(value, 0, { bounciness: 4 });
    expect(spy).toHaveBeenCalledWith(value, {
      toValue: 0,
      bounciness: 4,
      speed: undefined,
      delay: undefined,
      useNativeDriver: USE_NATIVE_DRIVER,
    });
  });

  it('eases shadow and lift only when asked, as on the web without reduce motion', () => {
    expect(hoverTransition(false, 200)).toEqual({});
    expect(hoverTransition(true, 200)).toMatchObject({ transitionProperty: 'box-shadow, transform', transitionDuration: '200ms' });
  });

  it('runs after the next frame is painted, unless cancelled', () => {
    const frames = new Map<number, (time: number) => void>();
    jest.spyOn(globalThis, 'requestAnimationFrame').mockImplementation((cb: (time: number) => void) => {
      frames.set(frames.size + 1, cb);
      return frames.size;
    });
    jest.spyOn(globalThis, 'cancelAnimationFrame').mockImplementation((id) => {
      if (id != null) frames.delete(id);
    });
    const runFrame = (id: number) => frames.get(id)?.(id * 16);

    const callback = jest.fn();
    afterPaint(callback);
    runFrame(1);
    expect(callback).not.toHaveBeenCalled();
    runFrame(2);
    expect(callback).toHaveBeenCalledTimes(1);

    const cancelled = jest.fn();
    const stop = afterPaint(cancelled);
    runFrame(3);
    stop();
    runFrame(4);
    expect(cancelled).not.toHaveBeenCalled();
  });
});
