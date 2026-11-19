import { StyleSheet } from 'react-native';

import { MIN_TOUCH_TARGET } from '@/core/a11y/a11y.constants';
import { createStyles } from '@/core/theme/theme.utils';
import { DESCRIPTION_LIST_DESIGN } from './descriptions.constants';

export const styles = StyleSheet.create({
  row: { minHeight: MIN_TOUCH_TARGET },
  side: { flexDirection: 'row', alignItems: 'center' },
  stacked: { flexDirection: 'column', alignItems: 'stretch', gap: 2 },
  details: { flex: 1 },
  end: { alignItems: 'flex-end' },
  start: { alignItems: 'flex-start' },
  endText: { textAlign: 'right' },
});

export const themed = createStyles((t) => ({
  row: { paddingVertical: t.spacing.md },
  side: { gap: t.spacing.md },
  divider: { borderTopWidth: StyleSheet.hairlineWidth, borderTopColor: t.colors.border },
  term: { width: DESCRIPTION_LIST_DESIGN[t.design].termWidth },
}));
