import { StyleSheet, type ViewStyle } from 'react-native';

import { createStyles } from '@/core/theme/theme.utils';
import { TOOLTIP_DESIGN, TOOLTIP_MAX_WIDTH } from './tooltip.constants';

export const styles = StyleSheet.create({
  // On the web the tooltip isn't in a modal (it would take focus from the trigger), so it's fixed to the viewport instead.
  // React Native's types leave out 'fixed', which react-native-web passes to the DOM.
  webFixed: { position: 'fixed' as ViewStyle['position'] },
  raised: { borderWidth: StyleSheet.hairlineWidth },
});

export const themed = createStyles((t) => {
  const look = TOOLTIP_DESIGN[t.design];
  return {
    raised: { borderColor: t.colors.border, boxShadow: t.shadows.md },
    bubble: {
      maxWidth: TOOLTIP_MAX_WIDTH,
      backgroundColor: t.colors[look.background],
      borderRadius: t.radius[look.radius],
      paddingHorizontal: look.paddingX,
      paddingVertical: look.paddingY,
    },
  };
});
