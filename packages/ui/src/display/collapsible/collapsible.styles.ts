import { StyleSheet } from 'react-native';

import { createStyles } from '@/core/theme/theme.utils';
import { COLLAPSIBLE_DESIGN } from './collapsible.constants';

export const styles = StyleSheet.create({
  trigger: { flexDirection: 'row', alignItems: 'center' },
  collapse: { overflow: 'hidden' },
});

export const themed = createStyles((t) => ({
  trigger: {
    minHeight: COLLAPSIBLE_DESIGN[t.design].minHeight,
    gap: t.spacing.sm,
    paddingVertical: t.spacing.sm,
    // The hover and focus fill reaches past the label, which stays in line with the content under it.
    paddingHorizontal: t.spacing.sm,
    marginHorizontal: -t.spacing.sm,
    borderRadius: t.radius.sm,
  },
  content: { paddingBottom: t.spacing.lg },
}));
