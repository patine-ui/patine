import type { ViewStyle } from 'react-native';

import { FOCUS_OUTLINE } from '@/core/core.constants';

/** The keyboard focus ring: an outline just outside the control, so it never shifts the layout. */
export const focusOutline = (color: string): ViewStyle => ({
  outlineColor: color,
  outlineStyle: 'solid',
  outlineWidth: FOCUS_OUTLINE.width,
  outlineOffset: FOCUS_OUTLINE.offset,
});
