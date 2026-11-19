import { Text } from '@/core/primitives/Text';
import { Touchable } from '@/core/primitives/Touchable';
import { View } from '@/core/primitives/View';
import { useLabels } from '@/core/theme/ThemeProvider';
import { SCROLL_ARROW_GLYPHS, SCROLL_ARROW_SIDE } from '@/inputs/segmented/segmented.constants';
import { styles, themed } from '@/inputs/segmented/segmented.styles';
import type { ScrollArrowProps } from '@/inputs/segmented/segmented.types';

export const ScrollArrow = ({ side, disabled, overlay, renderArrow, onPress, theme, slots, testID }: ScrollArrowProps) => {
  const words = useLabels();
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
        <Text size="lg" weight="semibold" color="text" style={[styles.arrowText, slots?.arrowText]}>
          {SCROLL_ARROW_GLYPHS[side]}
        </Text>
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
