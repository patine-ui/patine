import { StyleSheet } from 'react-native';

import { createStyles } from '@/core/theme/theme.utils';
import { ALERT_VARIANT } from './alert.constants';
import { getAlertAccent } from './alert.utils';

export const styles = StyleSheet.create({
  alert: { flexDirection: 'row', alignItems: 'flex-start', borderWidth: StyleSheet.hairlineWidth },
  body: { flex: 1, gap: 2 },
});

/** The alert's box, and each variant's border and title color. */
export const themed = createStyles((t) => ({
  alert: { gap: t.spacing.md, padding: t.spacing.lg, borderRadius: t.radius.lg, backgroundColor: t.colors.background },
  ...Object.fromEntries(
    Object.values(ALERT_VARIANT).flatMap((variant) => {
      const accent = getAlertAccent(t.colors, variant);
      return [
        [variant, { borderColor: variant === ALERT_VARIANT.default ? t.colors.border : accent }],
        [`${variant}Title`, { color: accent }],
      ];
    })
  ),
}));
