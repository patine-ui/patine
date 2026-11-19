import { StyleSheet } from 'react-native';

import { createStyles } from '@/core/theme/theme.utils';
import { ARROW_SIDE, POPOVER_DESIGN } from './popover.constants';

export const styles = StyleSheet.create({
  // Placed before the backdrop, so the web's modal focus lands inside it rather than on the backdrop; zIndex lifts it above.
  panel: { position: 'absolute', zIndex: 1 },
  arrowClip: { position: 'absolute', overflow: 'hidden' },
  arrow: { position: 'absolute', width: ARROW_SIDE, height: ARROW_SIDE, transform: [{ rotate: '45deg' }] },
});

export const themed = createStyles((t) => {
  const look = POPOVER_DESIGN[t.design];
  return {
    panel: {
      width: look.width,
      padding: look.padding,
      backgroundColor: t.colors.sheet,
      borderRadius: t.radius[look.radius],
      borderWidth: look.border ? 1 : 0,
      borderColor: t.colors.border,
      boxShadow: t.shadows.lg,
    },
  };
});
