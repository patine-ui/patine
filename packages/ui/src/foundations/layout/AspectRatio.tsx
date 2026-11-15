import { StyleSheet, View } from 'react-native';

import type { AspectRatioProps } from './layout.types';

/** A box that keeps a width-to-height ratio as it resizes; its children fill it. For images, video and maps. */
export const AspectRatio = ({ ratio = 1, width = '100%', theme: _theme, style, children, ...rest }: AspectRatioProps) => (
  <View style={[{ width, aspectRatio: ratio, overflow: 'hidden' }, style]} {...rest}>
    <View style={StyleSheet.absoluteFill}>{children}</View>
  </View>
);
