import { StyleSheet } from 'react-native';

import { createStyles } from '@/core/theme/theme.utils';
import { GROUP_RING } from './avatar.constants';

export const styles = StyleSheet.create({
  avatar: { alignItems: 'center', justifyContent: 'center', overflow: 'hidden' },
  group: { flexDirection: 'row', alignItems: 'center' },
  more: { alignItems: 'center', justifyContent: 'center' },
});

export const themed = createStyles((t) => ({
  fill: { backgroundColor: t.colors.primaryMuted },
  ring: { borderWidth: GROUP_RING, borderColor: t.colors.background },
  moreFill: { backgroundColor: t.colors.surface },
}));
