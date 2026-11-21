import { useCallback } from 'react';
import type { HostInstance, PressableStateCallbackType, StyleProp, ViewStyle } from 'react-native';
import { Animated, Pressable, StyleSheet } from 'react-native';

import { hitSlopFor, focusRing as ringStyle } from '@/core/a11y/a11y.utils';
import { useFocusVisible } from '@/core/a11y/hooks/useFocusVisible';
import { cs } from '@/core/core.styles';
import type { TouchableProps, TouchableState } from '@/core/core.types';
import { useTouchFeedback } from '@/core/hooks/useTouchFeedback';
import { usePlatform, useTheme } from '@/core/theme/ThemeProvider';
import { getAnchorProps, openHref } from '@/core/utils/href.utils';
import { touchSize } from '@/core/utils/touch.utils';
import { TouchFeedback } from './TouchFeedback';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

/**
 * Anything pressable. Built in: the theme's hover tint (unless `hover` is false) and press dim or ripple, clipped to its own corners; with
 * `pressScale` a slight shrink while held; a focus ring on keyboard focus; the disabled state, announced and dimmed; and on
 * phones a touch area of at least 44pt.
 */
export const Touchable = ({
  ref,
  theme: themeProp,
  ripple = true,
  hover = true,
  feedbackColor,
  pressScale = false,
  focusRing = true,
  minTarget = true,
  href,
  external = false,
  role,
  onPress,
  disabled,
  hitSlop,
  style,
  children,
  onPressIn,
  onPressOut,
  onHoverIn,
  onHoverOut,
  onFocus,
  onBlur,
  ...rest
}: TouchableProps) => {
  const theme = useTheme(themeProp);
  const touch = useTouchFeedback(theme, !!disabled, ripple, pressScale, hover);
  const focus = useFocusVisible();
  const web = usePlatform() === 'web';
  // The ripple measures the view through the internal ref; the caller's ref gets the same view.
  const setRef = useCallback(
    (node: HostInstance | null) => {
      touch.ref.current = node;
      if (typeof ref === 'function') ref(node);
      else if (ref) ref.current = node;
    },
    [ref, touch.ref]
  );
  const withFocus = (state: PressableStateCallbackType): TouchableState => ({
    ...state,
    focusVisible: focus.focusVisible,
  });
  const callerStyle = (state: PressableStateCallbackType) => (typeof style === 'function' ? style(withFocus(state)) : style);
  // Defaults first, so the caller's style can change any of them.
  const styleFor = (state: PressableStateCallbackType): StyleProp<ViewStyle> => [
    disabled && cs.disabled,
    focusRing && focus.focusVisible && ringStyle(theme.colors.primary),
    focusRing === 'inset' && focus.focusVisible && cs.insetRing,
    callerStyle(state),
  ];
  const slop =
    hitSlop ?? (minTarget && !web ? hitSlopFor(...touchSize(StyleSheet.flatten(callerStyle({ pressed: false })) ?? undefined)) : undefined);
  // Animated only reads a style object, so the shrink resolves the style here and adds its scale to the caller's transform.
  const Host = pressScale ? AnimatedPressable : Pressable;
  const scaled = pressScale ? StyleSheet.flatten(styleFor({ pressed: touch.pressed })) : null;
  const scaleTransform = [...(scaled?.transform ?? []), { scale: touch.pressScale }] as unknown as ViewStyle['transform'];

  return (
    <Host
      ref={setRef}
      disabled={disabled}
      aria-disabled={!!disabled}
      hitSlop={slop}
      role={href ? 'link' : role}
      {...getAnchorProps(href, external, !!disabled)}
      {...rest}
      onPress={
        onPress || href
          ? (e) => {
              onPress?.(e);
              openHref(e, href);
            }
          : undefined
      }
      onPressIn={(e) => {
        focus.onPressIn();
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
      onFocus={(e) => {
        focus.onFocus();
        onFocus?.(e);
      }}
      onBlur={(e) => {
        focus.onBlur();
        onBlur?.(e);
      }}
      style={pressScale ? [scaled, { transform: scaleTransform }] : styleFor}
    >
      {(state) => {
        return (
          <>
            <TouchFeedback {...touch.feedback} feedbackColor={feedbackColor} shape={StyleSheet.flatten(callerStyle(state)) ?? undefined} />
            {typeof children === 'function' ? children(withFocus(state)) : children}
          </>
        );
      }}
    </Host>
  );
};
