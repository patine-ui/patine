import { useCallback } from 'react';
import type { HostInstance, PressableStateCallbackType, ViewStyle } from 'react-native';
import { Animated, Pressable, StyleSheet } from 'react-native';

import type { TouchableProps } from '@/core/core.types';
import { useTouchFeedback } from '@/core/hooks/useTouchFeedback';
import { TouchFeedback } from './TouchFeedback';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

/**
 * A Pressable with the theme's hover tint and press dim or ripple, clipped to its own corners, and with `pressScale` a
 * slight shrink while held.
 */
export const Touchable = ({
  ref,
  theme,
  ripple = true,
  pressScale = false,
  disabled,
  style,
  children,
  onPressIn,
  onPressOut,
  onHoverIn,
  onHoverOut,
  ...rest
}: TouchableProps) => {
  const touch = useTouchFeedback(theme, !!disabled, ripple, pressScale);
  // The ripple measures the view through the internal ref; the caller's ref gets the same view.
  const setRef = useCallback(
    (node: HostInstance | null) => {
      touch.ref.current = node;
      if (typeof ref === 'function') ref(node);
      else if (ref) ref.current = node;
    },
    [ref, touch.ref]
  );
  const styleFor = (state: PressableStateCallbackType) => (typeof style === 'function' ? style(state) : style);
  // Animated only reads a style object, so the shrink resolves the caller's style here and adds its scale to their transform.
  const Host = pressScale ? AnimatedPressable : Pressable;
  const scaled = pressScale ? StyleSheet.flatten(styleFor({ pressed: touch.pressed })) : null;
  const scaleTransform = [...(scaled?.transform ?? []), { scale: touch.pressScale }] as unknown as ViewStyle['transform'];

  return (
    <Host
      ref={setRef}
      disabled={disabled}
      {...rest}
      onPressIn={(e) => {
        touch.handlers.onPressIn(e);
        onPressIn?.(e);
      }}
      onPressOut={(e) => {
        touch.handlers.onPressOut();
        onPressOut?.(e);
      }}
      onHoverIn={(e) => {
        touch.handlers.onHoverIn();
        onHoverIn?.(e);
      }}
      onHoverOut={(e) => {
        touch.handlers.onHoverOut();
        onHoverOut?.(e);
      }}
      style={pressScale ? [scaled, { transform: scaleTransform }] : styleFor}
    >
      {(state) => {
        const borderRadius = StyleSheet.flatten(styleFor(state))?.borderRadius;
        return (
          <>
            <TouchFeedback {...touch.feedback} borderRadius={typeof borderRadius === 'number' ? borderRadius : undefined} />
            {typeof children === 'function' ? children(state) : children}
          </>
        );
      }}
    </Host>
  );
};
