import { useControllableState } from '@/core/hooks/useControllableState';
import { useComponentTheme } from '@/core/theme/ThemeProvider';
import { Button } from './Button';
import { toggleStyles } from './button.styles';
import { TOGGLE_VARIANT } from './toggle.constants';
import type { ToggleButtonProps } from './toggle.types';

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
  styles: slots,
  ...rest
}: ToggleButtonProps) => {
  const { theme, themeOverride } = useComponentTheme(themeProp, design);
  const [pressed, setPressed] = useControllableState(pressedProp, defaultPressed, onPressedChange);
  const key = `${variant}_${pressed ? 'on' : 'off'}`;
  const sheet = toggleStyles(theme);
  return (
    <Button
      variant="ghost"
      aria-pressed={pressed}
      theme={themeOverride}
      onPress={(e) => {
        setPressed(!pressed);
        onPress?.(e);
      }}
      style={[sheet[key], style]}
      styles={{ ...slots, label: [sheet[`${key}_label`], slots?.label] }}
      {...rest}
    />
  );
};
