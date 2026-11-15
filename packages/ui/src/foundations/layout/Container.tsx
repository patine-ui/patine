import { View } from 'react-native';

import { useTheme } from '@/core/theme/ThemeProvider';
import { toSpace } from '@/foundations/stack/stack.utils';
import { CONTAINER_WIDTH } from './layout.constants';
import type { ContainerProps } from './layout.types';

/** Keeps content to a readable width, centered, with space at the sides: full width on a phone, a column on a desktop. */
export const Container = ({ size = 'lg', padding = 'lg', theme: themeProp, style, ...rest }: ContainerProps) => {
  const theme = useTheme(themeProp);
  return (
    <View
      style={[
        { width: '100%', maxWidth: CONTAINER_WIDTH[size], alignSelf: 'center', paddingHorizontal: toSpace(theme.spacing, padding) },
        style,
      ]}
      {...rest}
    />
  );
};
