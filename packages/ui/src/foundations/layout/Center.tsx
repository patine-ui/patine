import { View } from '@/core/primitives/View';
import { styles } from './layout.styles';
import type { CenterProps } from './layout.types';

/** Puts its children in the middle, both ways. `fill` stretches it over its parent first. */
export const Center = ({ fill = false, theme: _theme, style, ...rest }: CenterProps) => (
  <View style={[styles.center, fill && styles.fill, style]} {...rest} />
);
