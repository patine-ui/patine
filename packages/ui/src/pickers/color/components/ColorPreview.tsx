import type { Theme } from '@/core';
import { View } from '@/core/primitives/View';
import { fillOf } from '@/core/utils/style.utils';
import { styles, themed } from '@/pickers/color/color.styles';
import { Checkerboard } from './Checkerboard';

const SHAPES = {
  circle: styles.previewCircle,
  large: styles.previewLarge,
};

/** The colour being picked, over checks so its opacity shows. */
export const ColorPreview = ({ color, shape, theme }: { color: string; shape: keyof typeof SHAPES; theme: Theme }) => (
  <View style={[styles.pad, SHAPES[shape], themed(theme).border, shape === 'large' && themed(theme).large]} aria-hidden>
    <Checkerboard />
    <View style={[styles.layer, fillOf(color)]} />
  </View>
);
