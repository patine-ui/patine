import { startAlign } from '@/core/core.styles';
import { Text } from '@/core/primitives/Text';
import { View } from '@/core/primitives/View';
import { useDirection } from '@/core/theme/ThemeProvider';
import { styles } from '@/inputs/select/select.styles';
import type { GroupHeaderProps } from '@/inputs/select/select.types';

export const GroupHeader = ({ group, renderGroupHeader, theme, slots }: GroupHeaderProps) => {
  const dir = useDirection();
  if (renderGroupHeader) return renderGroupHeader(group, theme);
  return (
    <View
      style={[{ paddingHorizontal: theme.spacing.lg, paddingTop: theme.spacing.md, paddingBottom: theme.spacing.xs }, slots?.groupHeader]}
    >
      <Text
        theme={theme}
        size="xs"
        weight="bold"
        color="textSecondary"
        style={[startAlign[dir], styles.groupHeaderText, slots?.groupHeaderText]}
      >
        {group}
      </Text>
    </View>
  );
};
