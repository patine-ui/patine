import { useAnimatedToggle } from '@/core/animation/hooks/useAnimatedToggle';
import { AnimatedView, View } from '@/core/primitives/View';
import { FIELD_ARROW, FIELD_DESIGN } from '@/overlays/sheet/sheet.constants';
import { sheetStyles, styles } from '@/overlays/sheet/sheet.styles';
import type { ChevronProps } from '@/overlays/sheet/sheet.types';

/** A drawn chevron (a rotated corner, so no SVG dependency), or a filled triangle in Material, that flips up while the field is open; `renderChevron` swaps the icon, not the flip. */
export const Chevron = ({ open, renderChevron, theme, style }: ChevronProps) => {
  const progress = useAnimatedToggle(open, theme.animation.duration);
  const rotate = progress.interpolate({ inputRange: [0, 1], outputRange: ['0deg', '180deg'] });
  const tint = open ? sheetStyles(theme).chevronOpen : sheetStyles(theme).chevronClosed;
  // An animated value: the chevron turns as the field opens.
  const turn = { transform: [{ rotate }] };
  const triangle = FIELD_DESIGN[theme.design].arrow === FIELD_ARROW.triangle;

  return (
    <AnimatedView pointerEvents="none" style={[styles.chevron, turn]}>
      {renderChevron ? (
        renderChevron({ open, theme })
      ) : (
        <View style={[triangle ? styles.chevronTriangle : styles.chevronMark, tint, style]} />
      )}
    </AnimatedView>
  );
};
