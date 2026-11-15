import { View } from 'react-native';

import type { Theme } from '@/core';
import { styles } from '@/pickers/color/color.styles';
import { Checkerboard } from './Checkerboard';

const SHAPES = {
  circle: styles.previewCircle,
  large: styles.previewLarge,
};

/** The colour being picked, over checks so its opacity shows. */
export const ColorPreview = ({ color, shape, theme }: { color: string; shape: keyof typeof SHAPES; theme: Theme }) => (
  <View
    style={[styles.pad, SHAPES[shape], { borderColor: theme.colors.border }, shape === 'large' && { borderRadius: theme.radius.md }]}
    accessibilityElementsHidden
    importantForAccessibility="no-hide-descendants"
  >
    <Checkerboard />
    <View style={[styles.layer, { backgroundColor: color }]} />
  </View>
);
