import { Animated, Pressable, StyleSheet, View } from 'react-native';

import { useFocusVisible } from '@/core/hooks/useFocusVisible';
import { useComponentTheme } from '@/core/theme/ThemeProvider';
import { focusOutline } from '@/core/utils/focus.utils';
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
  const { theme } = useComponentTheme(themeProp, design);
  const swipe = useSwipeable({ leadingActions, trailingActions, fullSwipe, disabled, onOpenChange, theme });
  const focus = useFocusVisible();
  const fill = backgroundColor ?? theme.colors[LIST_DESIGN[theme.design].fill];
  const actions = { armed: swipe.armed, look: swipe.look, theme, onRun: swipe.run };
  return (
    <View style={[styles.root, focus.focusVisible && focusOutline(theme.colors.primary), style]} onLayout={swipe.onLayout} testID={testID}>
      <SwipeActions side={SWIPE_SIDE.leading} actions={leadingActions ?? []} visible={swipe.revealed === SWIPE_SIDE.leading} {...actions} />
      <SwipeActions
        side={SWIPE_SIDE.trailing}
        actions={trailingActions ?? []}
        visible={swipe.revealed === SWIPE_SIDE.trailing}
        {...actions}
      />
      <Animated.View
        style={[styles.front, { backgroundColor: fill, transform: [{ translateX: swipe.x }] }]}
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
            style={StyleSheet.absoluteFill}
            testID={testID ? `${testID}-close` : undefined}
          />
        ) : null}
      </Animated.View>
    </View>
  );
};
