import { Platform, StyleSheet } from 'react-native';

import { createStyles } from '@/core/theme/theme.utils';
import { KBD_DESIGN, KBD_SIZE, MONO_FONT } from './kbd.constants';

export const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center', alignSelf: 'flex-start', gap: 2 },
  key: { alignItems: 'center', justifyContent: 'center' },
  text: { fontFamily: Platform.select({ ios: 'Menlo', android: 'monospace', default: MONO_FONT }), lineHeight: undefined },
  sm: { height: KBD_SIZE.sm.height, minWidth: KBD_SIZE.sm.minWidth, paddingHorizontal: KBD_SIZE.sm.paddingX },
  md: { height: KBD_SIZE.md.height, minWidth: KBD_SIZE.md.minWidth, paddingHorizontal: KBD_SIZE.md.paddingX },
});

export const themed = createStyles((t) => {
  const look = KBD_DESIGN[t.design];
  return {
    key: {
      borderRadius: look.radius,
      backgroundColor: t.colors[look.fill],
      ...(look.keycap ? { borderWidth: StyleSheet.hairlineWidth, borderBottomWidth: 2, borderColor: t.colors.border } : null),
    },
  };
});
