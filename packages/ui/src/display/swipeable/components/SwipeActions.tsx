import { Pressable, StyleSheet, View } from 'react-native';

import { IS_WEB } from '@/core/core.constants';
import type { Theme } from '@/core/theme/theme.types';
import { SWIPE_SIDE } from '@/display/swipeable/swipeable.constants';
import { styles } from '@/display/swipeable/swipeable.styles';
import type { SwipeAction, SwipeDesign, SwipeSide } from '@/display/swipeable/swipeable.types';
import { Text } from '@/foundations/text/Text';

interface Props {
  side: SwipeSide;
  actions: readonly SwipeAction[];
  /** This side is showing */
  visible: boolean;
  /** A full swipe is armed: the edge action fills the row */
  armed: boolean;
  look: SwipeDesign;
  theme: Theme;
  onRun: (action: SwipeAction) => void;
}

const fill = (action: SwipeAction, look: SwipeDesign, theme: Theme) =>
  action.color ??
  (action.variant === 'destructive'
    ? theme.colors.danger
    : action.variant === 'primary'
      ? theme.colors.primary
      : theme.colors[look.neutral]);

/**
 * One side's actions behind the row, the outermost at the edge, on a fill of the outermost's colour so a long swipe shows
 * it growing. Screen readers on phones always reach them; on the web they're hidden until the row opens.
 */
export const SwipeActions = ({ side, actions, visible, armed, look, theme, onRun }: Props) => {
  if (!actions.length) return null;
  const leading = side === SWIPE_SIDE.leading;
  const edge = actions[0] as SwipeAction;
  // Leading actions read from the edge inwards; trailing ones are laid out inwards to the edge.
  const ordered = leading ? actions : [...actions].reverse();
  const shown = armed ? [edge] : ordered;
  const hidden = IS_WEB && !visible;
  return (
    <View
      style={[
        StyleSheet.absoluteFill,
        styles.panel,
        { backgroundColor: fill(edge, look, theme), zIndex: visible ? 1 : 0 },
        leading ? styles.start : styles.end,
      ]}
      pointerEvents={visible ? 'box-none' : 'none'}
      aria-hidden={hidden}
    >
      {shown.map((action) => (
        <Pressable
          key={action.label}
          role="button"
          accessibilityLabel={action.label}
          tabIndex={hidden ? -1 : 0}
          onPress={() => onRun(action)}
          style={[styles.action, { width: look.actionWidth, backgroundColor: fill(action, look, theme) }]}
        >
          {action.icon}
          <Text size={look.labelSize} weight="medium" numberOfLines={1} style={styles.label}>
            {action.label}
          </Text>
        </Pressable>
      ))}
    </View>
  );
};
