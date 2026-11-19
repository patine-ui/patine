import { useId } from 'react';

import { useDirection, useTheme } from 'patine-ui';

import { DEFAULT_STROKE_WIDTH } from '../icons.constants';
import type { GlyphProps } from '../icons.types';
import { resolveColor, resolveIconSize, splitCut, toSvgId } from '../icons.utils';

/** Everything `Glyph` draws: size, color, strokes, the mask id, mirroring and what screen readers hear. */
export const useGlyph = ({
  icon,
  size = 'md',
  color,
  strokeWidth = DEFAULT_STROKE_WIDTH,
  accessibilityLabel,
  mirror: mirrorProp,
}: GlyphProps) => {
  const theme = useTheme();
  const rtl = useDirection() === 'rtl';
  const mirror = mirrorProp ?? (Boolean(icon.rtl) && rtl);
  const id = toSvgId(useId());
  const px = resolveIconSize(size);
  return {
    px,
    id,
    strokeWidth,
    ...splitCut(icon.paths),
    stroke: resolveColor(theme.colors as unknown as Record<string, string>, color, theme.colors.textSecondary),
    box: {
      width: px,
      height: px,
      transform: mirror ? [{ scaleX: -1 }] : undefined,
    },
    a11y: accessibilityLabel ? { accessible: true, role: 'img' as const, 'aria-label': accessibilityLabel } : { 'aria-hidden': true },
  };
};
