import { Animated, StyleSheet, View } from 'react-native';

import { useAnimatedToggle } from '@/core/animation/hooks/useAnimatedToggle';
import { ChoiceRow } from '@/core/components/ChoiceRow';
import { useControllableState } from '@/core/hooks/useControllableState';
import { useComponentTheme } from '@/core/theme/ThemeProvider';
import { SWITCH_DESIGN, SWITCH_OUTLINE_WIDTH } from './switch.constants';
import { styles } from './switch.styles';
import type { SwitchProps } from './switch.types';
import { getThumbTravel } from './switch.utils';

/**
 * An on/off switch drawn in the active design, with an optional label; the whole row flips it. The thumb slides and the
 * "on" color fades in on the native driver (opacity and transform only).
 */
export const Switch = ({
  checked: checkedProp,
  defaultChecked = false,
  onCheckedChange,
  controlAtStart = false,
  theme: themeProp,
  design,
  ...rest
}: SwitchProps) => {
  const { theme } = useComponentTheme(themeProp, design);
  const [checked, setChecked] = useControllableState(checkedProp, defaultChecked, onCheckedChange);
  const progress = useAnimatedToggle(checked, theme.animation.duration);
  const look = SWITCH_DESIGN[theme.design];
  const travel = getThumbTravel(look);
  const c = theme.colors;
  const thumbSize = (on: boolean) => (on ? look.thumbOn : look.thumbOff);
  // An absolute child is placed inside the border, so the outlined track's border shifts the thumb back by its width.
  const border = look.outlinedOff ? SWITCH_OUTLINE_WIDTH : 0;

  return (
    <ChoiceRow
      theme={theme}
      role="switch"
      checked={checked}
      controlAtEnd={!controlAtStart}
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
          <Animated.View
            style={[
              styles.thumb,
              {
                width: thumbSize(checked),
                height: thumbSize(checked),
                borderRadius: thumbSize(checked) / 2,
                boxShadow: theme.shadows.sm,
                top: (look.trackHeight - thumbSize(checked)) / 2 - border,
                backgroundColor: look.outlinedOff && !checked ? c.textSecondary : c.onPrimary,
                transform: [
                  {
                    translateX: progress.interpolate({
                      inputRange: [0, 1],
                      outputRange: [travel.off - border, travel.on - border],
                    }),
                  },
                ],
              },
            ]}
          />
        </View>
      }
      {...rest}
    />
  );
};
