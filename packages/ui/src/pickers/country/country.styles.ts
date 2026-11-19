import { StyleSheet } from 'react-native';

import { createStyles } from '@/core/theme/theme.utils';
import { FLAG_SIZE } from './country.constants';

export const styles = StyleSheet.create({
  flag: { fontSize: FLAG_SIZE },
  phoneRow: { flex: 1, flexDirection: 'row', alignItems: 'center' },
  phoneInput: { flex: 1, minWidth: 0, alignSelf: 'stretch' },
  // opacity: the phone field around it dims as a whole when disabled.
  countryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'stretch',
    gap: 4,
    borderEndWidth: StyleSheet.hairlineWidth,
    opacity: 1,
  },
});

export const themed = createStyles((t) => ({
  countryButton: { borderColor: t.colors.border, paddingEnd: t.spacing.sm, marginEnd: t.spacing.sm },
}));
