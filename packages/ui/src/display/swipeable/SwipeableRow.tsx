import { focusRing } from '@/core/a11y/a11y.utils';
import { useFocusVisible } from '@/core/a11y/hooks/useFocusVisible';
import { AnimatedView, Pressable, View } from '@/core/primitives/View';
import { ThemeScope, useComponentTheme } from '@/core/theme/ThemeProvider';
import { LIST_DESIGN } from '@/display/list/list.constants';
import { SwipeActions } from './components/SwipeActions';
import { useSwipeable } from './hooks/useSwipeable';
import { SWIPE_SIDE } from './swipeable.constants';
import { styles } from './swipeable.styles';
import type { SwipeableRowProps } from './swipeable.types';

/**
 * A row you swipe to reveal actions, as in Mail: trailing ones from the right, leading ones from the left, and with
 * `fullSwipe` a long swipe runs the outermost. Opening one row closes the others; tapping an open row closes it. Wrap a
 * ListItem in it, inside a List. On the web, focus it and press the left or right arrow to open it, Escape to close.
 */
export const SwipeableRow = ({
  children,
  leadingActions,
  trailingActions,
  fullSwipe,
  backgroundColor,
  disabled,
  onOpenChange,
  theme: themeProp,
  design,
  style,
  testID,
}: SwipeableRowProps) => {
  const { theme, themeOverride } = useComponentTheme(themeProp, design);
  const swipe = useSwipeable({ leadingActions, trailingActions, fullSwipe, disabled, onOpenChange, theme });
  const focus = useFocusVisible();
  const fill = backgroundColor ?? theme.colors[LIST_DESIGN[theme.design].fill];
  // The row's fill may be the app's own colour, and it follows the swipe.
  const front = { backgroundColor: fill, transform: [{ translateX: swipe.x }] };
  const actions = { armed: swipe.armed, look: swipe.look, theme, onRun: swipe.run };
  return (
    <ThemeScope theme={themeOverride}>
      <View style={[styles.root, focus.focusVisible && focusRing(theme.colors.primary), style]} onLayout={swipe.onLayout} testID={testID}>
        <SwipeActions
          side={SWIPE_SIDE.leading}
          actions={leadingActions ?? []}
          visible={swipe.revealed === SWIPE_SIDE.leading}
          {...actions}
        />
        <SwipeActions
          side={SWIPE_SIDE.trailing}
          actions={trailingActions ?? []}
          visible={swipe.revealed === SWIPE_SIDE.trailing}
          {...actions}
        />
        <AnimatedView
          style={[styles.front, front]}
          {...swipe.panHandlers}
          {...swipe.keys}
          onFocus={focus.onFocus}
          onBlur={focus.onBlur}
          testID={testID ? `${testID}-content` : undefined}
        >
          {children}
          {swipe.open ? (
            <Pressable
              accessible={false}
              tabIndex={-1}
              onPress={swipe.close}
              style={styles.fill}
              testID={testID ? `${testID}-close` : undefined}
            />
          ) : null}
        </AnimatedView>
      </View>
    </ThemeScope>
  );
};
