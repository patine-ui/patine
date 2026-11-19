import { Text } from 'react-native';

import { fontFace, useTheme } from 'patine-ui';

import { styles } from '../catalog.styles';

/** The DropdownMenu playground's trigger: a tinted pill in the theme. DropdownMenu makes it pressable. */
export const DropdownMenuTrigger = () => {
  const theme = useTheme();
  const { colors } = theme;
  return (
    <Text style={[styles.menuTrigger, { backgroundColor: colors.primaryMuted, color: colors.primary, ...fontFace(theme, 'semibold') }]}>
      ⋯ Options
    </Text>
  );
};
