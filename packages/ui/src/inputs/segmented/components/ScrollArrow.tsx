import { StyleSheet } from 'react-native';

import { ChevronMark } from '@/core/components/ChevronMark';
import { Touchable } from '@/core/primitives/Touchable';
import { View } from '@/core/primitives/View';
import { useDirection, useLabels } from '@/core/theme/ThemeProvider';
import { SCROLL_ARROW_SIDE } from '@/inputs/segmented/segmented.constants';
import { styles, themed } from '@/inputs/segmented/segmented.styles';
import type { ScrollArrowProps } from '@/inputs/segmented/segmented.types';

export const ScrollArrow = ({ side, disabled, overlay, renderArrow, onPress, theme, slots, testID }: ScrollArrowProps) => {
  const words = useLabels();
  // `side` is physical, so the chevron points that way whatever the reading direction.
  const back = (side === SCROLL_ARROW_SIDE.left) !== (useDirection() === 'rtl');
  const button = (
    <Touchable
      theme={theme}
      disabled={disabled}
      onPress={onPress}
      role="button"
      aria-label={words.scroll[side]}
      style={[styles.arrow, themed(theme).arrow, slots?.arrow]}
      testID={testID}
    >
      {renderArrow ? (
        renderArrow(side, disabled)
      ) : (
        <ChevronMark
          direction={back ? 'back' : 'forward'}
          color={String(StyleSheet.flatten(slots?.arrowText)?.color ?? theme.colors.text)}
        />
      )}
    </Touchable>
  );
  if (!overlay) return button;
  return (
    <View
      pointerEvents="box-none"
      style={[styles.arrowSlot, side === SCROLL_ARROW_SIDE.left ? styles.arrowSlotLeft : styles.arrowSlotRight]}
    >
      {button}
    </View>
  );
};
