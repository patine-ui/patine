import { View } from 'react-native';

import { Touchable } from '@/core/components/Touchable';
import { DISABLED_OPACITY } from '@/core/core.constants';
import { useFocusVisible } from '@/core/hooks/useFocusVisible';
import { useComponentTheme } from '@/core/theme/ThemeProvider';
import { focusOutline } from '@/core/utils/focus.utils';
import { Text } from '@/foundations/text/Text';
import { DEFAULT_FAB_OFFSET, FAB_DESIGN, FAB_SIZE } from './link.constants';
import type { FabProps } from './link.types';
import { getFabPlacement } from './link.utils';

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
  labelStyle,
  onFocus,
  onBlur,
  ...rest
}: FabProps) => {
  const { theme, themeOverride } = useComponentTheme(themeProp, design);
  const look = FAB_DESIGN[theme.design];
  const box = FAB_SIZE[size];
  const focus = useFocusVisible();
  const radius = look.shape === 'circle' ? box.side / 2 : box.radius;
  return (
    <Touchable
      theme={theme}
      role="button"
      disabled={disabled}
      aria-disabled={!!disabled}
      onFocus={(e) => {
        focus.onFocus();
        onFocus?.(e);
      }}
      onBlur={(e) => {
        focus.onBlur();
        onBlur?.(e);
      }}
      {...rest}
      style={[
        {
          height: box.side,
          minWidth: box.side,
          paddingHorizontal: label ? theme.spacing.lg : 0,
          borderRadius: radius,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          gap: theme.spacing.sm,
          backgroundColor: theme.colors[look.fill],
          boxShadow: theme.shadows[look.shadow],
        },
        getFabPlacement(placement, offset),
        disabled && { opacity: DISABLED_OPACITY },
        focus.focusVisible && focusOutline(theme.colors.primary),
        style,
      ]}
    >
      {icon ? (
        <View style={{ minWidth: box.icon, alignItems: 'center' }}>
          {typeof icon === 'function' ? icon({ color: theme.colors[look.onFill] }) : icon}
        </View>
      ) : null}
      {label ? (
        <Text theme={themeOverride} weight="medium" numberOfLines={1} style={[{ color: theme.colors[look.onFill] }, labelStyle]}>
          {label}
        </Text>
      ) : null}
    </Touchable>
  );
};
