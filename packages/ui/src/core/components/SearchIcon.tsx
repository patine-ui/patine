import { View } from 'react-native';

import { coreStyles } from '@/core/core.styles';

/** A magnifier drawn with views, so it needs no icon font: a ring and its handle. */
export const SearchIcon = ({ color }: { color: string }) => (
  <View style={coreStyles.searchIcon}>
    <View style={[coreStyles.searchLens, { borderColor: color }]} />
    <View style={[coreStyles.searchHandle, { backgroundColor: color }]} />
  </View>
);
