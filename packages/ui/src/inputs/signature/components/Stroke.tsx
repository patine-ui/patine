import { memo } from 'react';
import { View } from 'react-native';

import { styles } from '@/inputs/signature/signature.styles';
import type { SignatureStroke } from '@/inputs/signature/signature.types';
import { strokeSegments } from '@/inputs/signature/signature.utils';

interface Props {
  stroke: SignatureStroke;
  color: string;
  width: number;
}

/** One stroke as rounded bars, one per segment: no SVG or canvas needed. Memoized, so finished strokes don't redraw. */
export const Stroke = memo(({ stroke, color, width }: Props) => (
  <>
    {strokeSegments(stroke, width).map((s, i) => (
      <View
        // biome-ignore lint/suspicious/noArrayIndexKey: a stroke's segments only grow at the end.
        key={i}
        style={[
          styles.segment,
          {
            left: s.left,
            top: s.top,
            width: s.width,
            height: s.height,
            borderRadius: width / 2,
            backgroundColor: color,
            transform: [{ rotate: `${s.angle}deg` }],
          },
        ]}
      />
    ))}
  </>
));
