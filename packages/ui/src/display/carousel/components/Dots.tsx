import { adjustableProps } from '@/core/a11y/adjustable.utils';
import { animatedMultiply } from '@/core/animation/animated';
import { IS_WEB } from '@/core/core.constants';
import { Touchable } from '@/core/primitives/Touchable';
import { AnimatedView, View } from '@/core/primitives/View';
import { CAROUSEL_DESIGN } from '@/display/carousel/carousel.constants';
import { styles, themed } from '@/display/carousel/carousel.styles';
import type { DotsProps } from '@/display/carousel/carousel.types';
import { formatSlideLabel, stepIndex } from '@/display/carousel/carousel.utils';

/**
 * A row of dots with the current page's mark sliding along under the finger. Screen readers on phones get one adjustable
 * control ("Slide 2 of 5", swipe up or down); on the web the carousel's own keys and arrows do that, so the dots are
 * pointer-only there.
 */
export const Dots = ({ count, position, value, label, theme, onValueChange, style, testID }: DotsProps) => {
  const look = CAROUSEL_DESIGN[theme.design].indicator;
  const sheet = themed(theme);
  // An animated value: the mark follows the scroll.
  const slide = { transform: [{ translateX: animatedMultiply(position, look.slot) }] };
  const valueText = formatSlideLabel(label, value + 1, count);
  const a11y = IS_WEB
    ? { 'aria-hidden': true }
    : onValueChange
      ? adjustableProps({ valueText, onStep: (direction) => onValueChange(stepIndex(value, direction, count, false)) })
      : { accessible: true, 'aria-label': valueText };
  return (
    <View style={[styles.dots, style]} testID={testID} {...a11y}>
      {Array.from({ length: count }, (_, i) => (
        <Touchable
          // biome-ignore lint/suspicious/noArrayIndexKey: dots are positions, the index is their identity.
          key={i}
          // Pointer-only: the dots' one adjustable control (or the carousel's keys on the web) is what assistive tech gets.
          role="none"
          accessible={false}
          tabIndex={-1}
          focusRing={false}
          ripple={false}
          disabled={!onValueChange}
          onPress={() => onValueChange?.(i)}
          style={[styles.dotSlot, sheet.slot, !onValueChange && styles.undimmed]}
          testID={testID ? `${testID}-${i}` : undefined}
        >
          <View style={sheet.dot} />
        </Touchable>
      ))}
      <AnimatedView pointerEvents="none" style={[styles.activeDot, sheet.activeDot, slide]} />
    </View>
  );
};
