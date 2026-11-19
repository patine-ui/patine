import { Text } from '@/core/primitives/Text';
import { View } from '@/core/primitives/View';
import { Heading } from '@/foundations/text/Heading';
import { styles, themed } from '@/overlays/action/action.styles';
import type { ActionSheetHeaderProps } from '@/overlays/action/action.types';

export const ActionSheetHeader = ({ title, message, grouped, theme, slots }: ActionSheetHeaderProps) => {
  if (!title && !message) return null;
  const align = grouped && styles.centered;
  return (
    <View
      style={[styles.header, grouped && styles.groupedHeader, themed(theme).header, grouped && themed(theme).groupedHeader, slots?.header]}
    >
      {title ? (
        <Heading
          level={2}
          theme={theme}
          size={grouped ? 'sm' : 'md'}
          weight="bold"
          color={grouped ? 'textSecondary' : 'text'}
          style={[align, slots?.title]}
        >
          {title}
        </Heading>
      ) : null}
      {message ? (
        <Text size="sm" color="textSecondary" style={[align, slots?.message]}>
          {message}
        </Text>
      ) : null}
    </View>
  );
};
