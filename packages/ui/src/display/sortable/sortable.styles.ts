import { Platform, StyleSheet } from 'react-native';

import { MIN_TOUCH_TARGET } from '@/core/a11y/a11y.constants';
import { createStyles } from '@/core/theme/theme.utils';
import { SORTABLE_DESIGN } from './sortable.constants';

export const styles = StyleSheet.create({
  raised: { zIndex: 1 },
  // Mid-drag the mouse would select the rows' text on the web.
  dragging: Platform.select({ web: { userSelect: 'none' } as object, default: {} }),
  press: Platform.select({ web: { cursor: 'grab' } as object, default: {} }),
  handle: {
    minWidth: MIN_TOUCH_TARGET,
    minHeight: MIN_TOUCH_TARGET,
    alignItems: 'center',
    justifyContent: 'center',
    ...Platform.select({ web: { cursor: 'grab', touchAction: 'none' } as object, default: {} }),
  },
  lines: { gap: 3 },
  line: { width: 18, height: 2, borderRadius: 1 },
  dots: { flexDirection: 'row', flexWrap: 'wrap', width: 10, gap: 2 },
  dot: { width: 4, height: 4, borderRadius: 2 },
});

export const themed = createStyles((t) => {
  const look = SORTABLE_DESIGN[t.design];
  return {
    mark: { backgroundColor: t.colors.textSecondary },
    raised: { backgroundColor: t.colors[look.fill], boxShadow: t.shadows[look.shadow] },
  };
});
