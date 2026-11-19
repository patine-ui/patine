import { AnimatedView } from '@/core/primitives/View';
import { useHaloStyle } from '@/inputs/slider/hooks/useHaloStyle';
import { styles, themed } from '@/inputs/slider/slider.styles';
import type { SliderHaloProps } from '@/inputs/slider/slider.types';
import { getHaloBox } from '@/inputs/slider/slider.utils';

/** The web design's ring of colour behind a thumb: faint on hover or focus, grown in and stronger while pressed. */
export const SliderHalo = ({ x, level, size, theme, testID }: SliderHaloProps) => {
  const animated = useHaloStyle(level, theme.animation.duration);
  return <AnimatedView pointerEvents="none" style={[styles.halo, getHaloBox(x, size), themed(theme).fill, animated]} testID={testID} />;
};
