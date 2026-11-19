import { StyleSheet } from 'react-native';

import { createStyles } from '@/core/theme/theme.utils';
import { PROGRESS_DESIGN } from './progress.constants';

export const styles = StyleSheet.create({
  track: { width: '100%', overflow: 'hidden', flexDirection: 'row' },
  fill: { position: 'absolute', top: 0, bottom: 0, left: 0 },
});

export const themed = createStyles((t) => ({
  track: { backgroundColor: t.colors[PROGRESS_DESIGN[t.design].track] },
  indicator: { backgroundColor: t.colors.primary },
}));
