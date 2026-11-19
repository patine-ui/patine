import { View } from '@/core/primitives/View';
import { SLIDER_THUMB } from '@/inputs/slider/slider.constants';
import { styles, themed } from '@/inputs/slider/slider.styles';
import type { SliderThumbProps } from '@/inputs/slider/slider.types';
import { getThumbBox } from '@/inputs/slider/slider.utils';

/** A knob, bar or dot centred on its value. It takes keys and screen-reader steps; touches go to the track under it. */
export const SliderThumb = ({ thumb, design, theme, slots, testID }: SliderThumbProps) => (
  <View
    pointerEvents="none"
    style={[
      styles.thumb,
      design.thumb === SLIDER_THUMB.knob ? themed(theme).knob : themed(theme).fill,
      getThumbBox(thumb.x, thumb.width, design.thumbHeight),
      slots?.thumb,
    ]}
    {...thumb.adjustable}
    onFocus={thumb.onFocus}
    onBlur={thumb.onBlur}
    testID={testID}
  />
);
