import { StyleSheet } from 'react-native';

import { createStyles } from '@/core/theme/theme.utils';
import { GLYPH, IMAGE_DESIGN } from './image.constants';

export const styles = StyleSheet.create({
  frame: { overflow: 'hidden' },
  fill: { position: 'absolute', top: 0, right: 0, bottom: 0, left: 0 },
  glyph: { width: GLYPH.width, height: GLYPH.height, borderRadius: GLYPH.inset, borderWidth: GLYPH.stroke },
  sun: { position: 'absolute', top: GLYPH.inset, end: GLYPH.inset, width: GLYPH.sun, height: GLYPH.sun, borderRadius: GLYPH.sun / 2 },
  layer: {
    position: 'absolute',
    inset: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export const themed = createStyles((t) => {
  const look = IMAGE_DESIGN[t.design];
  return {
    frame: { backgroundColor: t.colors.surface, borderWidth: look.border ? StyleSheet.hairlineWidth : 0, borderColor: t.colors.border },
    glyph: { borderColor: t.colors.textSecondary },
    sun: { backgroundColor: t.colors.textSecondary },
  };
});
