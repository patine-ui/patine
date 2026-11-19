import { View } from '@/core/primitives/View';
import { useTheme } from '@/core/theme/ThemeProvider';
import { CONTAINER_WIDTH } from './layout.constants';
import { styles } from './layout.styles';
import type { ContainerProps } from './layout.types';
import { getContainerStyle } from './layout.utils';

/** Keeps content to a readable width, centered, with space at the sides: full width on a phone, a column on a desktop. */
export const Container = ({ size = 'lg', padding = 'lg', theme: themeProp, style, ...rest }: ContainerProps) => {
  const theme = useTheme(themeProp);
  return <View style={[styles.container, getContainerStyle(theme, CONTAINER_WIDTH[size], padding), style]} {...rest} />;
};
