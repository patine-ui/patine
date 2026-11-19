import { StyleSheet } from 'react-native';

import { createStyles } from '@/core/theme/theme.utils';

export const styles = StyleSheet.create({
  trail: { flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center' },
  crumb: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 2 },
});

export const themed = createStyles((t) => ({
  trail: { columnGap: t.spacing.sm, rowGap: t.spacing.xs },
  crumb: { gap: t.spacing.xs, borderRadius: t.radius.sm },
}));
