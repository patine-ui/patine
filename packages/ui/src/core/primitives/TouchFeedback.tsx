import { cs } from '@/core/core.styles';
import type { TouchFeedbackProps } from '@/core/core.types';
import { getRippleBox, shapeOf } from '@/core/utils/touch.utils';
import { styles as primStyles, themed } from './primitives.styles';
import { AnimatedView, View } from './View';

/** The hover tint, press dim and ripple, drawn behind the content of the view it's placed in. Each one fades rather than snaps. */
export const TouchFeedback = ({ hover, press, ripple, scale, opacity, theme, borderRadius, shape, feedbackColor }: TouchFeedbackProps) => {
  const sheet = themed(theme);
  // A feedback color paints both layers in one color and fades the whole layer to its strength instead.
  const fill = feedbackColor ? { backgroundColor: feedbackColor } : null;
  // Animated values: each layer fades in and out, and the ripple grows.
  const hoverFade = { opacity: hover };
  const pressFade = { opacity: press };
  const spread = { opacity, transform: [{ scale }] };
  const box = shapeOf(shape ?? { borderRadius });
  return (
    <View pointerEvents="none" style={[cs.fill, cs.clip, box]}>
      <View style={[cs.fill, fill && primStyles.tintHover]}>
        <AnimatedView style={[cs.fill, sheet.hover, fill, hoverFade]} />
      </View>
      <View style={[cs.fill, fill && primStyles.tintPress]}>
        <AnimatedView style={[cs.fill, sheet.press, fill, pressFade]} />
        {ripple ? <AnimatedView style={[primStyles.ripple, getRippleBox(ripple), sheet.press, fill, spread]} /> : null}
      </View>
    </View>
  );
};
