import { Animated, StyleSheet, View } from 'react-native';

import { coreStyles } from '@/core/core.styles';
import type { TouchFeedbackProps } from '@/core/core.types';

/** The hover tint, press dim and ripple, drawn behind the content of the view it's placed in. Each one fades rather than snaps. */
export const TouchFeedback = ({ hover, press, ripple, scale, opacity, theme, borderRadius }: TouchFeedbackProps) => (
  <View pointerEvents="none" style={[StyleSheet.absoluteFill, coreStyles.clip, { borderRadius }]}>
    <Animated.View style={[StyleSheet.absoluteFill, { backgroundColor: theme.colors.hover, opacity: hover }]} />
    <Animated.View style={[StyleSheet.absoluteFill, { backgroundColor: theme.colors.ripple, opacity: press }]} />
    {ripple ? (
      <Animated.View
        style={[
          coreStyles.ripple,
          {
            left: ripple.x - ripple.radius,
            top: ripple.y - ripple.radius,
            width: ripple.radius * 2,
            height: ripple.radius * 2,
            borderRadius: ripple.radius,
            backgroundColor: theme.colors.ripple,
            opacity,
            transform: [{ scale }],
          },
        ]}
      />
    ) : null}
  </View>
);
