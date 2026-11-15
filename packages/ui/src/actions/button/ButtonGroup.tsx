import { Children, cloneElement, isValidElement, type ReactElement } from 'react';
import { View } from 'react-native';

import { useComponentTheme } from '@/core/theme/ThemeProvider';
import type { ButtonProps } from './button.types';
import { BUTTON_GROUP_DESIGN, FILLED_DIVIDER, FILLED_VARIANTS } from './toggle.constants';
import type { ButtonGroupProps } from './toggle.types';
import { getJoinedStyle } from './toggle.utils';

/**
 * Buttons joined into one bar: only the outer corners round, and touching borders overlap into one line. Material 3
 * leaves a 2pt gap and softens the inner corners, as its connected button groups do.
 */
export const ButtonGroup = ({
  children,
  variant,
  size,
  orientation = 'horizontal',
  theme: themeProp,
  design,
  style,
  ...rest
}: ButtonGroupProps) => {
  const { theme, themeOverride } = useComponentTheme(themeProp, design);
  const vertical = orientation === 'vertical';
  const look = BUTTON_GROUP_DESIGN[theme.design];
  const buttons = Children.toArray(children).filter(isValidElement) as ReactElement<ButtonProps>[];
  return (
    <View
      role="group"
      aria-orientation={orientation}
      style={[{ flexDirection: vertical ? 'column' : 'row', alignItems: vertical ? 'stretch' : 'center', gap: look.gap }, style]}
      {...rest}
    >
      {buttons.map((button, i) => {
        const own = button.props.variant ?? variant ?? 'default';
        // Filled buttons have no edge to share, so a light line marks where one ends.
        const divider = i > 0 && look.gap === 0 && FILLED_VARIANTS.includes(own);
        return cloneElement(button, {
          variant: own,
          size: button.props.size ?? size,
          theme: button.props.theme ?? themeOverride,
          style: [
            getJoinedStyle(i, buttons.length, vertical, look),
            divider && (vertical ? { borderTopColor: FILLED_DIVIDER } : { borderStartColor: FILLED_DIVIDER }),
            button.props.style,
          ],
        });
      })}
    </View>
  );
};
