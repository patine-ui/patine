import { StyleSheet } from 'react-native';

import { BUTTON_DESIGN } from '@/actions/button/button.constants';
import { createStyles } from '@/core/theme/theme.utils';
import { PAGINATION_DESIGN } from './pagination.constants';

export const styles = StyleSheet.create({
  root: { flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap' },
  ellipsis: { textAlign: 'center' },
});

/** Page buttons at least the design's button height square, round where the design rounds them. */
export const themed = createStyles((t) => {
  const side = BUTTON_DESIGN[t.design].heights.default;
  return {
    root: { gap: t.spacing.xs },
    status: { paddingHorizontal: t.spacing.sm },
    page: {
      minWidth: side,
      width: undefined,
      paddingHorizontal: t.spacing.xs,
      borderRadius: PAGINATION_DESIGN[t.design].round ? side / 2 : undefined,
    },
    ellipsis: { width: side },
  };
});
