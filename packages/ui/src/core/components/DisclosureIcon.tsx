import { useAnimatedToggle } from '@/core/animation/hooks/useAnimatedToggle';
import type { DisclosureIconProps } from '@/core/core.types';
import { AnimatedView, View } from '@/core/primitives/View';
import { styles, themed } from './components.styles';

/**
 * The icon that shows whether something is open: a drawn chevron by default, or any node, turned between two angles as it
 * opens. `renderIcon` draws it from the open state instead, unturned. Hidden from screen readers; the trigger says expanded.
 */
export const DisclosureIcon = ({ open, theme, icon, renderIcon, rotation, defaultRotation }: DisclosureIconProps) => {
  const progress = useAnimatedToggle(open, theme.animation.duration);
  if (renderIcon)
    return (
      <View aria-hidden style={styles.disclosureIcon}>
        {renderIcon({ open })}
      </View>
    );
  if (icon === null) return null;
  const node = icon ?? <View style={[styles.disclosureChevron, themed(theme).disclosureChevron]} />;
  const turn = rotation === undefined ? defaultRotation : rotation;
  if (!turn)
    return (
      <View aria-hidden style={styles.disclosureIcon}>
        {node}
      </View>
    );
  const rotate = progress.interpolate({
    inputRange: [0, 1],
    outputRange: [`${turn.closed}deg`, `${turn.open}deg`],
  });
  // An animated value: the icon turns as it opens.
  const spin = { transform: [{ rotate }] };
  return (
    <AnimatedView aria-hidden style={[styles.disclosureIcon, spin]}>
      {node}
    </AnimatedView>
  );
};
