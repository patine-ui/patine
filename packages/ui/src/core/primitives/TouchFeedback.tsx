import { cs } from '@/core/core.styles';
import type { TouchFeedbackProps } from '@/core/core.types';
import { getRippleBox, roundOf } from '@/core/utils/touch.utils';
import { styles as primStyles, themed } from './primitives.styles';
import { AnimatedView, View } from './View';

/** The hover tint, press dim and ripple, drawn behind the content of the view it's placed in. Each one fades rather than snaps. */
export const TouchFeedback = ({ hover, press, ripple, scale, opacity, theme, borderRadius }: TouchFeedbackProps) => {
  const sheet = themed(theme);
  // Animated values: each layer fades in and out, and the ripple grows.
  const hoverFade = { opacity: hover };
  const pressFade = { opacity: press };
  const spread = { opacity, transform: [{ scale }] };
  return (
    <View pointerEvents="none" style={[cs.fill, cs.clip, roundOf(borderRadius)]}>
      <AnimatedView style={[cs.fill, sheet.hover, hoverFade]} />
      <AnimatedView style={[cs.fill, sheet.press, pressFade]} />
      {ripple ? <AnimatedView style={[primStyles.ripple, getRippleBox(ripple), sheet.press, spread]} /> : null}
    </View>
  );
};
