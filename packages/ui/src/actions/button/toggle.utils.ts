import type { ViewStyle } from 'react-native';

import type { Theme } from '@/core/theme/theme.types';
import { BUTTON_BORDER, TOGGLE_VARIANT } from './toggle.constants';
import type { ButtonGroupDesign, ToggleDesign, ToggleVariant } from './toggle.types';

const TRANSPARENT = 'transparent';

/** A toggle's fill, text and border for its state. */
export const getToggleColors = (colors: Theme['colors'], look: ToggleDesign, variant: ToggleVariant, pressed: boolean) => {
  const outline = variant === TOGGLE_VARIANT.outline;
  if (pressed) {
    return {
      background: colors[look.onFill],
      text: colors[look.onText],
      border: outline ? colors.border : TRANSPARENT,
    };
  }
  return {
    background: !outline && look.offFill ? colors[look.offFill] : TRANSPARENT,
    text: colors.text,
    border: outline ? colors.border : TRANSPARENT,
  };
};

/** The pressed values after the user presses `value`: single keeps at most one, multiple adds or removes it. */
export const toggleValue = (type: 'single' | 'multiple', current: readonly string[], value: string): string[] => {
  const on = current.includes(value);
  if (type === 'single') return on ? [] : [value];
  return on ? current.filter((v) => v !== value) : [...current, value];
};

/**
 * Corners and edges of the `index`th of `count` joined buttons: only the outer corners keep the button's radius, and
 * every button after the first tucks its border under the one before when they touch.
 */
export const getJoinedStyle = (index: number, count: number, vertical: boolean, look: ButtonGroupDesign): ViewStyle => {
  const first = index === 0;
  const last = index === count - 1;
  const r = look.innerRadius;
  const corners: ViewStyle = vertical
    ? {
        ...(first ? {} : { borderTopLeftRadius: r, borderTopRightRadius: r }),
        ...(last ? {} : { borderBottomLeftRadius: r, borderBottomRightRadius: r }),
      }
    : {
        ...(first ? {} : { borderTopStartRadius: r, borderBottomStartRadius: r }),
        ...(last ? {} : { borderTopEndRadius: r, borderBottomEndRadius: r }),
      };
  if (first || look.gap !== 0) return corners;
  const overlap: ViewStyle = vertical ? { marginTop: -BUTTON_BORDER } : { marginStart: -BUTTON_BORDER };
  return {
    ...corners,
    ...overlap,
  };
};
