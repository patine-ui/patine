import { StyleSheet } from 'react-native';

import { MIN_TOUCH_TARGET } from '@/core/core.constants';

export const styles = StyleSheet.create({
  pad: { overflow: 'hidden' },
  canvas: { ...StyleSheet.absoluteFill },
  segment: { position: 'absolute' },
  baseline: { position: 'absolute', left: 24, right: 24, bottom: 40, height: StyleSheet.hairlineWidth * 2 },
  cross: { position: 'absolute', left: 24, bottom: 46 },
  placeholder: { position: 'absolute', left: 0, right: 0, top: 0, bottom: 0, textAlign: 'center', textAlignVertical: 'center' },
  placeholderBox: { ...StyleSheet.absoluteFill, alignItems: 'center', justifyContent: 'center' },
  clear: {
    position: 'absolute',
    top: 0,
    right: 0,
    minWidth: MIN_TOUCH_TARGET,
    minHeight: MIN_TOUCH_TARGET,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 12,
  },
});
