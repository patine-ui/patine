import { View } from '@/core/primitives/View';
import { fillOf, strokeOf } from '@/core/utils/style.utils';
import { styles } from './components.styles';

/** A magnifier drawn with views, so it needs no icon font: a ring and its handle. */
export const SearchIcon = ({ color }: { color: string }) => (
  <View style={styles.searchIcon}>
    <View style={[styles.searchLens, strokeOf(color)]} />
    <View style={[styles.searchHandle, fillOf(color)]} />
  </View>
);
