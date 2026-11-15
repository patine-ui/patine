import type { Theme } from '@/core/theme/theme.types';
import { ALERT_VARIANT } from './alert.constants';
import type { AlertVariant } from './alert.types';

/** The accent an alert's border, icon and title take. */
export const getAlertAccent = (colors: Theme['colors'], variant: AlertVariant) => {
  switch (variant) {
    case ALERT_VARIANT.destructive:
      return colors.danger;
    case ALERT_VARIANT.success:
      return colors.success;
    case ALERT_VARIANT.warning:
      return colors.warning;
    default:
      return colors.text;
  }
};
