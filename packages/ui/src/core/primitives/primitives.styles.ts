import { StyleSheet } from 'react-native';

import { TINT_HOVER_OPACITY, TINT_PRESS_OPACITY } from '@/core/core.constants';
import { createStyles } from '@/core/theme/theme.utils';

export const styles = StyleSheet.create({
  ripple: { position: 'absolute' },
  tintHover: { opacity: TINT_HOVER_OPACITY },
  tintPress: { opacity: TINT_PRESS_OPACITY },
});

export const themed = createStyles((t) => ({
  hover: { backgroundColor: t.colors.hover },
  press: { backgroundColor: t.colors.ripple },
}));
