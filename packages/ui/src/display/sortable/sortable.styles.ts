import { Platform, StyleSheet } from 'react-native';

import { MIN_TOUCH_TARGET } from '@/core/core.constants';

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
  // On the web the live region is read, never seen.
  visuallyHidden: { position: 'absolute', width: 1, height: 1, overflow: 'hidden', opacity: 0 },
});
