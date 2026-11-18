import { Animated, StyleSheet, View } from 'react-native';

import { useAnimatedToggle } from '@/core/animation/hooks/useAnimatedToggle';
import { ChoiceRow } from '@/core/components/ChoiceRow';
import { CONTROL_POSITION } from '@/core/core.constants';
import { useControllableState } from '@/core/hooks/useControllableState';
import { useComponentTheme } from '@/core/theme/ThemeProvider';
import { isControlAtEnd } from '@/core/utils/control.utils';
import { SWITCH_DESIGN, SWITCH_OUTLINE_WIDTH } from './switch.constants';
import { styles } from './switch.styles';
import type { SwitchProps } from './switch.types';
import { getThumbMotion } from './switch.utils';

/**
 * An on/off switch drawn in the active design, with an optional label; the whole row flips it. The thumb slides and the
 * "on" color fades in on the native driver (opacity and transform only).
 */
export const Switch = ({
  checked: checkedProp,
  defaultChecked = false,
  onCheckedChange,
  controlPosition,
  controlAtStart,
  theme: themeProp,
  design,
  ...rest
}: SwitchProps) => {
  const { theme } = useComponentTheme(themeProp, design);
  const [checked, setChecked] = useControllableState(checkedProp, defaultChecked, onCheckedChange);
  const progress = useAnimatedToggle(checked, theme.animation.duration);
  const look = SWITCH_DESIGN[theme.design];
  const thumb = getThumbMotion(look);
  const c = theme.colors;
  // An absolute child is placed inside the border, so the outlined track's border shifts the thumb back by its width.
  const border = look.outlinedOff ? SWITCH_OUTLINE_WIDTH : 0;

  return (
    <ChoiceRow
      theme={theme}
      role="switch"
      checked={checked}
      controlAtEnd={isControlAtEnd(controlPosition, controlAtStart ? CONTROL_POSITION.start : undefined, CONTROL_POSITION.end)}
      onPress={() => setChecked(!checked)}
      control={
        <View
          aria-hidden
          style={[
            styles.track,
            {
              width: look.trackWidth,
              height: look.trackHeight,
              borderRadius: look.trackHeight / 2,
              backgroundColor: look.outlinedOff ? c.surface : c.border,
              borderWidth: border,
              borderColor: c.textSecondary,
            },
          ]}
        >
          <Animated.View style={[StyleSheet.absoluteFill, { backgroundColor: c.primary, opacity: progress }]} />
          {/* Slides and, in Material, grows: both transforms, so the size animates on the native driver too */}
          <Animated.View
            style={[
              styles.thumb,
              {
                width: thumb.size,
                height: thumb.size,
                borderRadius: thumb.size / 2,
                boxShadow: theme.shadows.sm,
                top: (look.trackHeight - thumb.size) / 2 - border,
                backgroundColor: look.outlinedOff ? c.textSecondary : c.onPrimary,
                transform: [
                  {
                    translateX: progress.interpolate({
                      inputRange: [0, 1],
                      outputRange: [thumb.x.off - border, thumb.x.on - border],
                    }),
                  },
                  { scale: progress.interpolate({ inputRange: [0, 1], outputRange: [thumb.scaleOff, 1] }) },
                ],
              },
            ]}
          >
            {/* Material's off thumb is grey: the on color fades in over it rather than switching at once */}
            {look.outlinedOff ? (
              <Animated.View
                style={[StyleSheet.absoluteFill, { borderRadius: thumb.size / 2, backgroundColor: c.onPrimary, opacity: progress }]}
              />
            ) : null}
          </Animated.View>
        </View>
      }
      {...rest}
    />
  );
};
