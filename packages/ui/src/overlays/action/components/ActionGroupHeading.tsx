import { View } from '@/core/primitives/View';
import { Heading } from '@/foundations/text/Heading';
import { themed } from '@/overlays/action/action.styles';
import type { ActionGroupHeadingProps } from '@/overlays/action/action.types';

/** A small heading over a group of actions, lined up with the rows' text. */
export const ActionGroupHeading = ({ group, compact = false, theme, slots }: ActionGroupHeadingProps) => {
  const sheet = themed(theme);
  return (
    <View style={[sheet.groupHeading, compact && sheet.compactHeader, slots?.groupHeading]}>
      <Heading level={3} theme={theme} size="xs" weight="semibold" color="textSecondary" font="body" numberOfLines={1}>
        {group}
      </Heading>
    </View>
  );
};
