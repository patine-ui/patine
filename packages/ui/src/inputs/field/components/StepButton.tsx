import { Text } from '@/core/primitives/Text';
import { Touchable } from '@/core/primitives/Touchable';
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
      disabled={disabled}
      focusable={focusable}
      hitSlop={hitSlop}
      {...repeat}
      style={[styles.stepButton, style]}
    >
      <Text size={glyph ? 'sm' : 'lg'} weight="medium" color="text" style={styles.glyph}>
        {glyph ?? STEP_GLYPH[direction]}
      </Text>
    </Touchable>
  );
};
