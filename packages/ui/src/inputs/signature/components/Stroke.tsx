import { memo } from 'react';

import { View } from '@/core/primitives/View';
import { styles } from '@/inputs/signature/signature.styles';
import type { SignatureStroke } from '@/inputs/signature/signature.types';
import { getSegmentStyle, strokeSegments } from '@/inputs/signature/signature.utils';

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
        style={[styles.segment, getSegmentStyle(s, width, color)]}
      />
    ))}
  </>
));
