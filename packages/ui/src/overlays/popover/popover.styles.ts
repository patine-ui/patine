import { StyleSheet } from 'react-native';

import { ARROW_SIZE } from './popover.constants';

export const styles = StyleSheet.create({
  // Placed before the backdrop, so the web's modal focus lands inside it rather than on the backdrop; zIndex lifts it above.
  panel: { position: 'absolute', zIndex: 1 },
  arrow: {
    position: 'absolute',
    width: 0,
    height: 0,
    borderLeftWidth: ARROW_SIZE,
    borderRightWidth: ARROW_SIZE,
    borderBottomWidth: ARROW_SIZE,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
  },
});
