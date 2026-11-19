import { IS_WEB } from '@/core/core.constants';
import { Text } from '@/core/primitives/Text';
import { Touchable } from '@/core/primitives/Touchable';
import { View } from '@/core/primitives/View';
import type { Theme } from '@/core/theme/theme.types';
import { SWIPE_SIDE } from '@/display/swipeable/swipeable.constants';
import { styles, themed } from '@/display/swipeable/swipeable.styles';
import type { SwipeAction, SwipeDesign, SwipeSide } from '@/display/swipeable/swipeable.types';
import { getActionBox, getActionFill } from '@/display/swipeable/swipeable.utils';

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
  // The panel shows the edge action's colour, which may be the app's own.
  const panelFill = { backgroundColor: getActionFill(edge, look, theme.colors) };
  return (
    <View
      style={[styles.fill, styles.panel, visible ? styles.above : styles.below, panelFill, leading ? styles.start : styles.end]}
      pointerEvents={visible ? 'box-none' : 'none'}
      aria-hidden={hidden}
    >
      {shown.map((action) => (
        <Touchable
          key={action.label}
          theme={theme}
          role="button"
          aria-label={action.label}
          tabIndex={hidden ? -1 : 0}
          onPress={() => onRun(action)}
          style={[styles.action, getActionBox(action, look, theme.colors)]}
        >
          {action.icon}
          <Text size={look.labelSize} weight="medium" numberOfLines={1} style={themed(theme).label}>
            {action.label}
          </Text>
        </Touchable>
      ))}
    </View>
  );
};
