import { PickerText } from '@/core/components/PickerText';
import { Touchable } from '@/core/components/Touchable';
import { DISABLED_OPACITY } from '@/core/core.constants';
import { STEP_GLYPH } from '@/inputs/field/field.constants';
import { styles } from '@/inputs/field/field.styles';
import type { StepButtonProps } from '@/inputs/field/field.types';
import { useRepeatPress } from '@/inputs/field/hooks/useRepeatPress';

/** A − or + button that steps on a tap and keeps stepping while held. */
export const StepButton = ({ direction, label, disabled, onStep, theme, style, glyph, focusable, hitSlop }: StepButtonProps) => {
  const repeat = useRepeatPress(onStep, disabled);
  return (
    <Touchable
      theme={theme}
      role="button"
      aria-label={label}
      aria-disabled={disabled}
      disabled={disabled}
      focusable={focusable}
      hitSlop={hitSlop}
      {...repeat}
      style={[styles.stepButton, disabled && { opacity: DISABLED_OPACITY }, style]}
    >
      <PickerText theme={theme} size={glyph ? 'sm' : 'lg'} weight="medium" color="text" style={styles.glyph}>
        {glyph ?? STEP_GLYPH[direction]}
      </PickerText>
    </Touchable>
  );
};
