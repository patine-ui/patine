import { textStyle } from '@/core';
import { AnimatedText, View } from '@/core/primitives/View';
import { useFloatingLabel } from '@/overlays/sheet/hooks/useFloatingLabel';
import { REQUIRED_MARK } from '@/overlays/sheet/sheet.constants';
import { sheetStyles, styles } from '@/overlays/sheet/sheet.styles';
import type { FloatingLabelProps } from '@/overlays/sheet/sheet.types';

/** A Material label: inside the empty field like a placeholder, raised onto the border once the field opens or has a value. */
export const FloatingLabel = ({ label, raised, open, invalid, required, borderWidth, theme, style }: FloatingLabelProps) => {
  const floating = useFloatingLabel(raised, borderWidth, theme);
  const sheet = sheetStyles(theme);
  // An animated value: the label moves up onto the border and shrinks.
  const move = { transform: floating.transform };
  return (
    <View pointerEvents="none" style={[styles.fill, styles.floatingLabelBox]} onLayout={floating.onBoxLayout}>
      <AnimatedText
        numberOfLines={1}
        onLayout={floating.onTextLayout}
        style={[
          textStyle(theme, 'md'),
          styles.floatingLabel,
          sheet.label,
          invalid ? sheet.labelInvalid : open && sheet.labelOpen,
          move,
          style,
        ]}
      >
        {label}
        {required ? REQUIRED_MARK : null}
      </AnimatedText>
    </View>
  );
};
