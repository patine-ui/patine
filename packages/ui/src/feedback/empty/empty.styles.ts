import { StyleSheet } from 'react-native';

import { createStyles } from '@/core/theme/theme.utils';

export const styles = StyleSheet.create({
  root: { alignItems: 'center', justifyContent: 'center' },
  icon: { width: 64, height: 64, alignItems: 'center', justifyContent: 'center' },
  iconText: { fontSize: 28 },
  text: { alignItems: 'center', maxWidth: 360 },
  center: { textAlign: 'center' },
  // On the web a heading is an <h3>, which a page's stylesheet may give margins.
  heading: { margin: 0 },
  actions: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center' },
});

export const themed = createStyles((t) => ({
  root: { padding: t.spacing.xl, gap: t.spacing.md },
  icon: { backgroundColor: t.colors.surface, borderRadius: t.radius.full },
  text: { gap: t.spacing.xs },
  actions: { gap: t.spacing.sm, marginTop: t.spacing.xs },
}));
