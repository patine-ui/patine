import { StyleSheet } from 'react-native';

import { createStyles } from '@/core/theme/theme.utils';
import { ACCORDION_DESIGN } from './accordion.constants';

export const styles = StyleSheet.create({
  trigger: { flexDirection: 'row', alignItems: 'center' },
  collapse: { overflow: 'hidden' },
});

export const themed = createStyles((t) => ({
  trigger: { minHeight: ACCORDION_DESIGN[t.design].minHeight, gap: t.spacing.sm, paddingVertical: t.spacing.sm, borderRadius: t.radius.sm },
  content: { paddingBottom: t.spacing.lg },
}));
