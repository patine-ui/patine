import { useControllableState } from '@/core/hooks/useControllableState';
import { useComponentTheme } from '@/core/theme/ThemeProvider';
import { Button } from './Button';
import { TOGGLE_DESIGN, TOGGLE_VARIANT } from './toggle.constants';
import type { ToggleButtonProps } from './toggle.types';
import { getToggleColors } from './toggle.utils';

/**
 * A button that stays pressed, like Bold in a toolbar or a favorite star: shadcn's Toggle. Drawn in the design's toggle
 * colors, announced as a pressed or unpressed button.
 */
export const ToggleButton = ({
  pressed: pressedProp,
  defaultPressed = false,
  onPressedChange,
  variant = TOGGLE_VARIANT.default,
  onPress,
  theme: themeProp,
  design,
  style,
  labelStyle,
  ...rest
}: ToggleButtonProps) => {
  const { theme, themeOverride } = useComponentTheme(themeProp, design);
  const [pressed, setPressed] = useControllableState(pressedProp, defaultPressed, onPressedChange);
  const colors = getToggleColors(theme.colors, TOGGLE_DESIGN[theme.design], variant, pressed);
  return (
    <Button
      variant="ghost"
      aria-pressed={pressed}
      theme={themeOverride}
      onPress={(e) => {
        setPressed(!pressed);
        onPress?.(e);
      }}
      style={[{ backgroundColor: colors.background, borderColor: colors.border }, style]}
      labelStyle={[{ color: colors.text }, labelStyle]}
      {...rest}
    />
  );
};
