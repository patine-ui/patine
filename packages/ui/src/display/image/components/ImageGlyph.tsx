import { View } from '@/core/primitives/View';
import { useTheme } from '@/core/theme/ThemeProvider';
import { styles, themed } from '@/display/image/image.styles';

/** A picture's outline, drawn with views (no SVG): a rounded frame with a sun in its corner. */
export const ImageGlyph = () => {
  const sheet = themed(useTheme());
  return (
    <View aria-hidden style={[styles.glyph, sheet.glyph]}>
      <View style={[styles.sun, sheet.sun]} />
    </View>
  );
};
