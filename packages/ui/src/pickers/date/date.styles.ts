import { StyleSheet } from 'react-native';

import { createStyles } from '@/core/theme/theme.utils';
import { HEADLINE_FONT_SIZE } from './date.constants';

export const styles = StyleSheet.create({
  headline: { borderBottomWidth: StyleSheet.hairlineWidth },
  headlineText: { fontSize: HEADLINE_FONT_SIZE },
});

export const themed = createStyles((t) => ({
  headline: { borderBottomColor: t.colors.border, paddingHorizontal: t.spacing.sm, paddingBottom: t.spacing.md },
}));
