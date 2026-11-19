import { StyleSheet } from 'react-native';

import { createStyles } from '@/core/theme/theme.utils';

export const styles = StyleSheet.create({
  ripple: { position: 'absolute' },
});

export const themed = createStyles((t) => ({
  hover: { backgroundColor: t.colors.hover },
  press: { backgroundColor: t.colors.ripple },
}));
