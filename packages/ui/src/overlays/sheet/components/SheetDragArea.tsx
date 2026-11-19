import { StyleSheet } from 'react-native';

import { AnimatedScrollView, View } from '@/core/primitives/View';
import { styles } from '@/overlays/sheet/sheet.styles';
import type { SheetDragAreaProps } from '@/overlays/sheet/sheet.types';
import { getHeight } from '@/overlays/sheet/sheet.utils';

/** An invisible scroll view behind the sheet's handle and header: dragging scrolls it, and its offset moves the sheet natively. */
export const SheetDragArea = ({ contentHeight, initialOffset, snapToOffsets, onScroll, onDragEnd, style }: SheetDragAreaProps) => (
  <AnimatedScrollView
    style={[StyleSheet.absoluteFill, style]}
    contentOffset={{ x: 0, y: initialOffset }}
    snapToOffsets={snapToOffsets}
    decelerationRate="fast"
    bounces={false}
    overScrollMode="never"
    scrollsToTop={false}
    showsVerticalScrollIndicator={false}
    scrollEventThrottle={16}
    onScroll={onScroll}
    onScrollEndDrag={onDragEnd}
    onMomentumScrollEnd={onDragEnd}
    aria-hidden
  >
    <View style={[styles.dragContent, getHeight(contentHeight)]} />
  </AnimatedScrollView>
);
