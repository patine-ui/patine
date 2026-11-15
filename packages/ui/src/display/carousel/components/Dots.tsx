import { Animated, Pressable, View } from 'react-native';

import { IS_WEB } from '@/core/core.constants';
import { adjustableProps } from '@/core/utils/adjustable.utils';
import { CAROUSEL_DESIGN } from '@/display/carousel/carousel.constants';
import { styles } from '@/display/carousel/carousel.styles';
import type { DotsProps } from '@/display/carousel/carousel.types';
import { formatSlideLabel, stepIndex } from '@/display/carousel/carousel.utils';

/**
 * A row of dots with the current page's mark sliding along under the finger. Screen readers on phones get one adjustable
 * control ("Slide 2 of 5", swipe up or down); on the web the carousel's own keys and arrows do that, so the dots are
 * pointer-only there.
 */
export const Dots = ({ count, position, value, label, theme, onValueChange, style, testID }: DotsProps) => {
  const look = CAROUSEL_DESIGN[theme.design].indicator;
  const valueText = formatSlideLabel(label, value + 1, count);
  const a11y = IS_WEB
    ? { 'aria-hidden': true }
    : onValueChange
      ? adjustableProps({ valueText, onStep: (direction) => onValueChange(stepIndex(value, direction, count, false)) })
      : { accessible: true, accessibilityLabel: valueText };
  return (
    <View style={[styles.dots, style]} testID={testID} {...a11y}>
      {Array.from({ length: count }, (_, i) => (
        <Pressable
          // biome-ignore lint/suspicious/noArrayIndexKey: dots are positions, the index is their identity.
          key={i}
          accessible={false}
          tabIndex={-1}
          disabled={!onValueChange}
          onPress={() => onValueChange?.(i)}
          style={[styles.dotSlot, { width: look.slot }]}
          testID={testID ? `${testID}-${i}` : undefined}
        >
          <View
            style={{
              width: look.dot,
              height: look.dot,
              borderRadius: look.dot / 2,
              backgroundColor: theme.colors[look.inactiveColor],
              opacity: look.inactiveOpacity,
            }}
          />
        </Pressable>
      ))}
      <Animated.View
        pointerEvents="none"
        style={[
          styles.activeDot,
          {
            left: (look.slot - look.activeWidth) / 2,
            width: look.activeWidth,
            height: look.dot,
            borderRadius: look.dot / 2,
            backgroundColor: theme.colors[look.activeColor],
            transform: [{ translateX: Animated.multiply(position, look.slot) }],
          },
        ]}
      />
    </View>
  );
};
