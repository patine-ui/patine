import type { Theme } from '@/core/theme/theme.types';
import { BADGE_VARIANT } from './badge.constants';
import type { BadgeColors, BadgeVariant } from './badge.types';

const TRANSPARENT = 'transparent';

/** Status badges are tinted, not filled, so the colored text keeps its contrast on light and dark themes. */
const tinted = (color: string): BadgeColors => ({
  background: `${color}1F`,
  text: color,
  border: TRANSPARENT,
});

export const getBadgeColors = (colors: Theme['colors'], variant: BadgeVariant): BadgeColors => {
  switch (variant) {
    case BADGE_VARIANT.secondary:
      return {
        background: colors.surface,
        text: colors.text,
        border: TRANSPARENT,
      };
    case BADGE_VARIANT.outline:
      return {
        background: TRANSPARENT,
        text: colors.text,
        border: colors.border,
      };
    case BADGE_VARIANT.destructive:
      return {
        background: colors.danger,
        text: colors.onDanger,
        border: TRANSPARENT,
      };
    case BADGE_VARIANT.success:
      return tinted(colors.success);
    case BADGE_VARIANT.warning:
      return tinted(colors.warning);
    default:
      return {
        background: colors.primary,
        text: colors.onPrimary,
        border: TRANSPARENT,
      };
  }
};
