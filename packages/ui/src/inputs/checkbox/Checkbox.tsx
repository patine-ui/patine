import { usePop } from '@/core/animation/hooks/usePop';
import { ChoiceRow } from '@/core/components/ChoiceRow';
import { CHECK_MARK, CONTROL_POSITION } from '@/core/core.constants';
import type { CheckedState } from '@/core/core.types';
import { useControllableState } from '@/core/hooks/useControllableState';
import { Text } from '@/core/primitives/Text';
import { AnimatedView, View } from '@/core/primitives/View';
import { ThemeScope, useComponentTheme } from '@/core/theme/ThemeProvider';
import { DASH, MIXED } from './checkbox.constants';
import { styles, themed } from './checkbox.styles';
import type { CheckboxProps } from './checkbox.types';
import { nextChecked } from './checkbox.utils';

/** A checkbox with an optional label; the whole row toggles it. Controlled with `checked` + `onCheckedChange`, or uncontrolled with `defaultChecked`. */
export const Checkbox = ({
  checked: checkedProp,
  defaultChecked = false,
  onCheckedChange,
  theme: themeProp,
  design,
  controlPosition = CONTROL_POSITION.start,
  styles: slots,
  ...rest
}: CheckboxProps) => {
  const { theme, themeOverride } = useComponentTheme(themeProp, design);
  const [checked, setChecked] = useControllableState<CheckedState>(checkedProp, defaultChecked, (next) => onCheckedChange?.(next === true));
  const on = checked !== false;
  const pop = usePop(on);
  const sheet = themed(theme);

  return (
    <ThemeScope theme={themeOverride}>
      <ChoiceRow
        theme={theme}
        role="checkbox"
        checked={checked}
        controlAtEnd={controlPosition === CONTROL_POSITION.end}
        onPress={() => setChecked(nextChecked(checked))}
        control={
          <View aria-hidden style={[styles.box, sheet.box, on ? sheet.on : sheet.off]}>
            {/* The fill and mark pop in and out rather than snap. */}
            <AnimatedView style={[styles.fill, sheet.fill, pop]}>
              <Text style={[styles.mark, sheet.mark]}>{checked === MIXED ? DASH : CHECK_MARK}</Text>
            </AnimatedView>
          </View>
        }
        labelStyle={slots?.label}
        {...rest}
      />
    </ThemeScope>
  );
};
