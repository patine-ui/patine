import { StyleSheet } from 'react-native';

import { createStyles } from '@/core/theme/theme.utils';
import { CHECKBOX_DESIGN } from './checkbox.constants';

export const styles = StyleSheet.create({
  box: { alignItems: 'center', justifyContent: 'center', borderWidth: 1.5, overflow: 'hidden' },
  fill: { position: 'absolute', top: 0, right: 0, bottom: 0, left: 0, alignItems: 'center', justifyContent: 'center' },
  groupRow: { flexDirection: 'row', flexWrap: 'wrap' },
  mark: { fontSize: 13, lineHeight: 15, fontWeight: '700', textAlign: 'center' },
});

export const themed = createStyles((t) => {
  const look = CHECKBOX_DESIGN[t.design];
  return {
    box: { width: look.size, height: look.size, borderRadius: look.radius === 'full' ? look.size / 2 : look.radius },
    on: { borderColor: t.colors.primary },
    off: { borderColor: t.colors[look.offColor] },
    fill: { backgroundColor: t.colors.primary },
    mark: { color: t.colors.onPrimary },
    groupRow: { columnGap: t.spacing.lg },
    groupGap: { gap: t.spacing.lg },
    indented: { paddingStart: t.spacing.xl },
  };
});
