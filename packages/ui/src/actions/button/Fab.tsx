import { Text } from '@/core/primitives/Text';
import { Touchable } from '@/core/primitives/Touchable';
import { View } from '@/core/primitives/View';
import { ThemeScope, useComponentTheme } from '@/core/theme/ThemeProvider';
import { fabStyles, styles } from './button.styles';
import { DEFAULT_FAB_OFFSET, FAB_DESIGN } from './link.constants';
import type { FabProps } from './link.types';
import { getFabBox, getFabPlacement } from './link.utils';

/**
 * A floating action button for a screen's main action: compose, add, scan. Material 3's rounded square on its tonal
 * container, or a raised primary circle; with `label` it extends into a pill. `placement` floats it in a corner.
 */
export const Fab = ({
  icon,
  label,
  size = 'md',
  placement,
  offset = DEFAULT_FAB_OFFSET,
  disabled,
  theme: themeProp,
  design,
  style,
  styles: slots,
  ...rest
}: FabProps) => {
  const { theme, themeOverride } = useComponentTheme(themeProp, design);
  const look = FAB_DESIGN[theme.design];
  const sheet = fabStyles(theme);
  return (
    <ThemeScope theme={themeOverride}>
      <Touchable
        role="button"
        disabled={disabled}
        {...rest}
        style={[styles.fab, getFabBox(look, size), sheet.root, label && sheet.extended, getFabPlacement(placement, offset), style]}
      >
        {icon ? (
          <View style={styles[`fabIcon_${size}`]}>{typeof icon === 'function' ? icon({ color: theme.colors[look.onFill] }) : icon}</View>
        ) : null}
        {label ? (
          <Text weight="medium" numberOfLines={1} style={[sheet.label, slots?.label]}>
            {label}
          </Text>
        ) : null}
      </Touchable>
    </ThemeScope>
  );
};
