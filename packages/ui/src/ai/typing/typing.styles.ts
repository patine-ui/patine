import { StyleSheet } from 'react-native';

import { TYPING_DOTS, TYPING_PADDING } from './typing.constants';

export const styles = StyleSheet.create({
  bubble: {
    alignSelf: 'flex-start',
    flexDirection: 'row',
    gap: TYPING_DOTS.gap,
    paddingHorizontal: TYPING_PADDING.horizontal,
    paddingVertical: TYPING_PADDING.vertical,
  },
  dot: { width: TYPING_DOTS.size, height: TYPING_DOTS.size, borderRadius: TYPING_DOTS.size / 2 },
});
