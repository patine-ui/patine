import { StyleSheet } from 'react-native';

import { MIN_TOUCH_TARGET } from '@/core/a11y/a11y.constants';
import { createStyles } from '@/core/theme/theme.utils';
import { SEARCH_CLEAR_SPACE } from './textfield.constants';

export const styles = StyleSheet.create({
  /** The box grows to the input's height; icons and buttons sit on its first line. */
  multilineField: { alignItems: 'flex-start' },
  /** Padding sits on the box, so a TextArea's content height is its text's alone. */
  input: { flex: 1, minWidth: 0, alignSelf: 'stretch', padding: 0, margin: 0 },
  multilineInput: { alignSelf: 'auto', textAlignVertical: 'top' },
  action: { paddingHorizontal: 6 },
  footer: { flexDirection: 'row', alignItems: 'flex-start' },
  message: { flex: 1 },
  counter: { marginTop: 4, marginStart: 'auto' },
  searchRow: { flexDirection: 'row', alignItems: 'center' },
  searchInput: { flex: 1 },
  searchClear: { position: 'absolute' },
  searchInputPad: { paddingEnd: SEARCH_CLEAR_SPACE },
  cancel: { minHeight: MIN_TOUCH_TARGET, justifyContent: 'center' },
});

export const themed = createStyles((t) => ({
  button: { borderRadius: t.radius.sm },
  searchRow: { gap: t.spacing.sm },
  searchClear: { end: t.spacing.xs },
  cancel: { borderRadius: t.radius.sm, paddingHorizontal: t.spacing.xs },
  counterFloating: { paddingEnd: t.spacing.md },
}));
