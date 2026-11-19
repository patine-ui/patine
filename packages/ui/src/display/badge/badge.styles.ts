import { StyleSheet } from 'react-native';

import { createStyles } from '@/core/theme/theme.utils';
import { BADGE_VARIANT } from './badge.constants';
import { getBadgeColors } from './badge.utils';

export const styles = StyleSheet.create({
  badge: { alignSelf: 'flex-start', flexDirection: 'row', alignItems: 'center', borderWidth: 1, paddingVertical: 2 },
});

/** Each variant's fill and border (`default`…) and text (`defaultText`…). */
export const themed = createStyles((t) => ({
  shape: { borderRadius: t.radius.full, paddingHorizontal: t.spacing.sm },
  ...Object.fromEntries(
    Object.values(BADGE_VARIANT).flatMap((variant) => {
      const colors = getBadgeColors(t.colors, variant);
      return [
        [variant, { backgroundColor: colors.background, borderColor: colors.border }],
        [`${variant}Text`, { color: colors.text }],
      ];
    })
  ),
}));
