import { View } from 'react-native';

import type { CenterProps } from './layout.types';

/** Puts its children in the middle, both ways. `fill` stretches it over its parent first. */
export const Center = ({ fill = false, theme: _theme, style, ...rest }: CenterProps) => (
  <View style={[{ alignItems: 'center', justifyContent: 'center' }, fill && { flex: 1, alignSelf: 'stretch' }, style]} {...rest} />
);
