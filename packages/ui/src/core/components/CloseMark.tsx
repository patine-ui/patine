import { View } from '@/core/primitives/View';
import { fillOf } from '@/core/utils/style.utils';
import { styles } from './components.styles';

/** A drawn ✕ for close and clear buttons: two crossed bars, so it's the same crisp mark in every font and on every platform. */
export const CloseMark = ({ color, size = 'md' }: { color: string; size?: 'sm' | 'md' }) => (
  <View aria-hidden pointerEvents="none" style={styles[`closeMark_${size}`]}>
    <View style={[styles[`closeBar_${size}`], styles.closeBarDown, fillOf(color)]} />
    <View style={[styles[`closeBar_${size}`], styles.closeBarUp, fillOf(color)]} />
  </View>
);
