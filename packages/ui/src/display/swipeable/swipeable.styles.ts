import { StyleSheet } from 'react-native';

import { createStyles } from '@/core/theme/theme.utils';

export const styles = StyleSheet.create({
  root: { overflow: 'hidden' },
  panel: { flexDirection: 'row' },
  start: { justifyContent: 'flex-start' },
  end: { justifyContent: 'flex-end' },
  action: { alignItems: 'center', justifyContent: 'center', gap: 4, paddingHorizontal: 8 },
  front: { zIndex: 2 },
  fill: { position: 'absolute', top: 0, right: 0, bottom: 0, left: 0 },
  above: { zIndex: 1 },
  below: { zIndex: 0 },
});

export const themed = createStyles((t) => ({
  label: { color: t.colors.onMedia },
}));
