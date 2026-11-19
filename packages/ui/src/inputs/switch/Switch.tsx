import { useAnimatedToggle } from '@/core/animation/hooks/useAnimatedToggle';
import { ChoiceRow } from '@/core/components/ChoiceRow';
import { CONTROL_POSITION } from '@/core/core.constants';
import { useControllableState } from '@/core/hooks/useControllableState';
import { AnimatedView, View } from '@/core/primitives/View';
import { ThemeScope, useComponentTheme, useDirection } from '@/core/theme/ThemeProvider';
import { ThumbBusy } from './components/ThumbBusy';
import { SWITCH_DESIGN, SWITCH_OUTLINE_WIDTH } from './switch.constants';
import { styles, themed } from './switch.styles';
import type { SwitchProps } from './switch.types';
import { getThumbMotion } from './switch.utils';

/**
 * An on/off switch drawn in the active design, with an optional label; the whole row flips it. The thumb slides and the
 * "on" color fades in on the native driver (opacity and transform only). While `loading`, a spinner turns in the thumb and
 * presses are ignored.
 */
export const Switch = ({
  checked: checkedProp,
  defaultChecked = false,
  onCheckedChange,
  loading = false,
  controlPosition = CONTROL_POSITION.end,
  theme: themeProp,
  design,
  styles: slots,
  ...rest
}: SwitchProps) => {
  const { theme, themeOverride } = useComponentTheme(themeProp, design);
  const [checked, setChecked] = useControllableState(checkedProp, defaultChecked, onCheckedChange);
  const progress = useAnimatedToggle(checked, theme.animation.duration);
  const look = SWITCH_DESIGN[theme.design];
  const thumb = getThumbMotion(look);
  // Transforms don't flip with the layout, so in right to left the thumb slides the other way.
  const toEnd = useDirection() === 'rtl' ? -1 : 1;
  const sheet = themed(theme);
  const border = look.outlinedOff ? SWITCH_OUTLINE_WIDTH : 0;
  // Animated values: the on colour fades in, and the thumb slides and (in Material) grows, both on the native driver.
  const fade = { opacity: progress };
  const slide = {
    transform: [
      {
        translateX: progress.interpolate({
          inputRange: [0, 1],
          outputRange: [toEnd * (thumb.x.off - border), toEnd * (thumb.x.on - border)],
        }),
      },
      { scale: progress.interpolate({ inputRange: [0, 1], outputRange: [thumb.scaleOff, 1] }) },
    ],
  };

  return (
    <ThemeScope theme={themeOverride}>
      <ChoiceRow
        theme={theme}
        role="switch"
        checked={checked}
        controlAtEnd={controlPosition === CONTROL_POSITION.end}
        aria-busy={loading}
        onPress={loading ? undefined : () => setChecked(!checked)}
        control={
          <View aria-hidden style={[styles.track, sheet.track]}>
            <AnimatedView style={[styles.fill, sheet.on, fade]} />
            {/* Slides and, in Material, grows: both transforms, so the size animates on the native driver too */}
            <AnimatedView style={[styles.thumb, sheet.thumb, slide]}>
              {/* Material's off thumb is grey: the on color fades in over it rather than switching at once */}
              {look.outlinedOff ? <AnimatedView style={[styles.fill, sheet.thumbOn, fade]} /> : null}
              {loading ? <ThumbBusy checked={checked} sheet={sheet} /> : null}
            </AnimatedView>
          </View>
        }
        labelStyle={slots?.label}
        {...rest}
      />
    </ThemeScope>
  );
};
