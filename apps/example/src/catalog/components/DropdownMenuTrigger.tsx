import { Text } from 'react-native';

import { useTheme } from 'patine-ui';

import { styles } from '../catalog.styles';

/** The DropdownMenu playground's trigger: a tinted pill in the theme. DropdownMenu makes it pressable. */
export const DropdownMenuTrigger = () => {
  const { colors, typography } = useTheme();
  return (
    <Text
      style={[styles.menuTrigger, { backgroundColor: colors.primaryMuted, color: colors.primary, fontFamily: typography.fontFamilyMedium }]}
    >
      ⋯ Options
    </Text>
  );
};
