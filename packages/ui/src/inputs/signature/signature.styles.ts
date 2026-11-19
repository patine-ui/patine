import { Platform, StyleSheet } from 'react-native';

import { MIN_TOUCH_TARGET } from '@/core/a11y/a11y.constants';
import { createStyles } from '@/core/theme/theme.utils';
import { SIGNATURE_DESIGN } from './signature.constants';

export const styles = StyleSheet.create({
  pad: { overflow: 'hidden' },
  canvas: { ...StyleSheet.absoluteFill },
  segment: { position: 'absolute' },
  drawable: Platform.select({ web: { cursor: 'crosshair', touchAction: 'none' } as object, default: {} }),
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

export const themed = createStyles((t) => {
  const look = SIGNATURE_DESIGN[t.design];
  return {
    pad: {
      backgroundColor: t.colors[look.fill],
      borderRadius: t.radius[look.radius],
      borderWidth: look.border === 'none' ? 0 : 1.5,
      borderStyle: look.border === 'dashed' ? 'dashed' : 'solid',
      borderColor: t.colors[look.borderColor],
    },
    baseline: { backgroundColor: t.colors.border },
  };
});
