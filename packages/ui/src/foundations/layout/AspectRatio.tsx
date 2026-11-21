import { StyleSheet } from 'react-native';

import { View } from '@/core/primitives/View';
import { styles } from './layout.styles';
import type { AspectRatioProps } from './layout.types';
import { getAspectBox } from './layout.utils';

/** A box that keeps a width-to-height ratio as it resizes; its children fill it. For images, video and maps. */
export const AspectRatio = ({ ratio = 1, width = '100%', theme: _theme, style, children, ...rest }: AspectRatioProps) => (
  <View style={[getAspectBox(width, ratio), styles.clip, style]} {...rest}>
    <View style={StyleSheet.absoluteFill}>{children}</View>
  </View>
);
