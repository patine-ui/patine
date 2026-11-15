import { Animated, StyleSheet, Text, View } from 'react-native';

import { usePop } from '@/core/animation/hooks/usePop';
import { ChoiceRow } from '@/core/components/ChoiceRow';
import { CHECK_MARK } from '@/core/core.constants';
import type { CheckedState } from '@/core/core.types';
import { useControllableState } from '@/core/hooks/useControllableState';
import { useComponentTheme } from '@/core/theme/ThemeProvider';
import { CHECKBOX_DESIGN, DASH, MIXED } from './checkbox.constants';
import { styles } from './checkbox.styles';
import type { CheckboxProps } from './checkbox.types';
import { nextChecked } from './checkbox.utils';

/** A checkbox with an optional label; the whole row toggles it. Controlled with `checked` + `onCheckedChange`, or uncontrolled with `defaultChecked`. */
export const Checkbox = ({
  checked: checkedProp,
  defaultChecked = false,
  onCheckedChange,
  theme: themeProp,
  design,
  boxStyle,
  ...rest
}: CheckboxProps) => {
  const { theme } = useComponentTheme(themeProp, design);
  const [checked, setChecked] = useControllableState<CheckedState>(checkedProp, defaultChecked, (next) => onCheckedChange?.(next === true));
  const look = CHECKBOX_DESIGN[theme.design];
  const on = checked !== false;
  const pop = usePop(on);
  const c = theme.colors;

  return (
    <ChoiceRow
      theme={theme}
      role="checkbox"
      checked={checked}
      onPress={() => setChecked(nextChecked(checked))}
      control={
        <View
          aria-hidden
          style={[
            styles.box,
            {
              width: look.size,
              height: look.size,
              borderRadius: look.radius === 'full' ? look.size / 2 : look.radius,
              borderColor: on ? c.primary : c[look.offColor],
            },
            boxStyle,
          ]}
        >
          {/* The fill and mark pop in and out rather than snap. */}
          <Animated.View style={[StyleSheet.absoluteFill, styles.fill, { backgroundColor: c.primary }, pop]}>
            <Text style={[styles.mark, { color: c.onPrimary }]}>{checked === MIXED ? DASH : CHECK_MARK}</Text>
          </Animated.View>
        </View>
      }
      {...rest}
    />
  );
};
