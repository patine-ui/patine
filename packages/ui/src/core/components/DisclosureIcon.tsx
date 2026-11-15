import { Animated, View } from 'react-native';

import { useAnimatedToggle } from '@/core/animation/hooks/useAnimatedToggle';
import { coreStyles } from '@/core/core.styles';
import type { DisclosureIconProps } from '@/core/core.types';

/**
 * The icon that shows whether something is open: a drawn chevron by default, or any node, turned between two angles as it
 * opens. `renderIcon` draws it from the open state instead, unturned. Hidden from screen readers; the trigger says expanded.
 */
export const DisclosureIcon = ({ open, theme, icon, renderIcon, rotation, defaultRotation }: DisclosureIconProps) => {
  const progress = useAnimatedToggle(open, theme.animation.duration);
  if (renderIcon)
    return (
      <View aria-hidden style={coreStyles.disclosureIcon}>
        {renderIcon({ open })}
      </View>
    );
  if (icon === null) return null;
  const node = icon ?? <View style={[coreStyles.disclosureChevron, { borderColor: theme.colors.textSecondary }]} />;
  const turn = rotation === undefined ? defaultRotation : rotation;
  if (!turn)
    return (
      <View aria-hidden style={coreStyles.disclosureIcon}>
        {node}
      </View>
    );
  const rotate = progress.interpolate({
    inputRange: [0, 1],
    outputRange: [`${turn.closed}deg`, `${turn.open}deg`],
  });
  return (
    <Animated.View aria-hidden style={[coreStyles.disclosureIcon, { transform: [{ rotate }] }]}>
      {node}
    </Animated.View>
  );
};
