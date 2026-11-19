import { View } from '@/core/primitives/View';
import { styles, themed } from '@/inputs/slider/slider.styles';
import type { SliderTrackProps } from '@/inputs/slider/slider.types';
import { getMarkBox, getRailBox, getSegmentBox } from '@/inputs/slider/slider.utils';

/** The track in pieces around the thumbs, active ones in the primary colour, with the step and stop marks on it. */
export const SliderTrack = ({ segments, marks, design, theme, slots }: SliderTrackProps) => {
  const sheet = themed(theme);
  return (
    <View pointerEvents="none" style={[styles.rail, getRailBox(design.trackHeight)]}>
      {segments.map((segment) => (
        <View
          key={segment.key}
          style={[
            styles.segment,
            getSegmentBox(segment, design.trackHeight, design.innerRadius),
            segment.active ? sheet.fill : sheet.inactive,
            slots?.track,
            segment.active && slots?.activeTrack,
          ]}
        />
      ))}
      {marks.map((mark) => (
        <View
          key={mark.key}
          style={[
            styles.mark,
            getMarkBox(mark.x, design.markSize, design.trackHeight),
            mark.active ? sheet.markOn : sheet.fill,
            slots?.mark,
          ]}
        />
      ))}
    </View>
  );
};
