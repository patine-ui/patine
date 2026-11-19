import { StyleSheet } from 'react-native';

import { createStyles } from '@/core/theme/theme.utils';
import { RADIO_DESIGN } from './radio.constants';

export const styles = StyleSheet.create({
  row: { flexDirection: 'row', flexWrap: 'wrap' },
  circle: { alignItems: 'center', justifyContent: 'center' },
  check: { fontSize: 17, fontWeight: '600', textAlign: 'center' },
});

export const themed = createStyles((t) => {
  const look = RADIO_DESIGN[t.design];
  return {
    checkSlot: { width: look.size },
    check: { color: t.colors.primary },
    circle: { width: look.size, height: look.size, borderRadius: look.size / 2, borderWidth: look.ringWidth },
    on: { borderColor: t.colors.primary },
    off: { borderColor: t.colors[look.offColor] },
    dot: { width: look.dot, height: look.dot, borderRadius: look.dot / 2, backgroundColor: t.colors.primary },
    row: { columnGap: t.spacing.lg },
  };
});
