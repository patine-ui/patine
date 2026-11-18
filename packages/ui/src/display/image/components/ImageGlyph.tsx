import { View } from 'react-native';

import { GLYPH } from '@/display/image/image.constants';

/** A picture's outline, drawn with views (no SVG): a rounded frame with a sun in its corner. */
export const ImageGlyph = ({ color }: { color: string }) => (
  <View
    aria-hidden
    style={{
      width: GLYPH.width,
      height: GLYPH.height,
      borderRadius: GLYPH.inset,
      borderWidth: GLYPH.stroke,
      borderColor: color,
    }}
  >
    <View
      style={{
        position: 'absolute',
        top: GLYPH.inset,
        end: GLYPH.inset,
        width: GLYPH.sun,
        height: GLYPH.sun,
        borderRadius: GLYPH.sun / 2,
        backgroundColor: color,
      }}
    />
  </View>
);
