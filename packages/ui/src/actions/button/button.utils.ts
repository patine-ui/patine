import type { Theme } from '@/core/theme/theme.types';
import { BUTTON_SIZE, BUTTON_VARIANT } from './button.constants';
import type { ButtonColors, ButtonDesign, ButtonSize, ButtonVariant } from './button.types';

const TRANSPARENT = 'transparent';

/** Fill, text and border colors for a variant. */
export const getButtonColors = (colors: Theme['colors'], variant: ButtonVariant): ButtonColors => {
  switch (variant) {
    case BUTTON_VARIANT.secondary:
      return {
        background: colors.surface,
        text: colors.text,
        border: TRANSPARENT,
      };
    case BUTTON_VARIANT.outline:
      return {
        background: TRANSPARENT,
        text: colors.text,
        border: colors.border,
      };
    case BUTTON_VARIANT.ghost:
      return {
        background: TRANSPARENT,
        text: colors.text,
        border: TRANSPARENT,
      };
    case BUTTON_VARIANT.destructive:
      return {
        background: colors.danger,
        text: colors.onDanger,
        border: TRANSPARENT,
      };
    case BUTTON_VARIANT.link:
      return {
        background: TRANSPARENT,
        text: colors.primary,
        border: TRANSPARENT,
      };
    default:
      return {
        background: colors.primary,
        text: colors.onPrimary,
        border: TRANSPARENT,
      };
  }
};

/** Ghost and link buttons sit flat on the surface; the others take the design's lift. */
export const isRaisedVariant = (variant: ButtonVariant) => variant !== BUTTON_VARIANT.ghost && variant !== BUTTON_VARIANT.link;

/** Height and side padding for a size. An icon button is a square of the default height. */
export const getButtonBox = (design: ButtonDesign, size: ButtonSize) => {
  if (size === BUTTON_SIZE.icon) {
    const side = design.heights.default;
    return {
      height: side,
      width: side,
      paddingHorizontal: 0,
    };
  }
  return {
    height: design.heights[size],
    width: undefined,
    paddingHorizontal: design.paddingX[size],
  };
};
