import { useMemo, useState } from 'react';

import { useHoverTransition } from '@/core/animation';
import type { ShadowLevel, Theme } from '@/core/theme/theme.types';
import { stepShadow } from '@/core/theme/theme.utils';
import type { CardDesign, CardPressState } from '@/display/card/card.types';

/**
 * Hover and keyboard focus raise an interactive card up the theme's shadow scale and lift it a little; a press settles it
 * back. The change eases on the web and is instant with reduce motion on. A keyboard focus also draws the ring.
 */
export const useCardPress = (theme: Theme, look: CardDesign, shadow: ShadowLevel): CardPressState => {
  const [hovered, setHovered] = useState(false);
  const transition = useHoverTransition(theme.animation.duration);
  const raised = theme.shadows[stepShadow(shadow, look.hoverSteps)];

  // The lift is the hover feedback in designs that lift; the tint stays for presses and Material's state layer.
  const feedbackTheme = useMemo(
    () => (look.hoverTint ? theme : { ...theme, colors: { ...theme.colors, hover: 'transparent' } }),
    [theme, look.hoverTint]
  );

  return {
    feedbackTheme,
    handlers: {
      onHoverIn: () => setHovered(true),
      onHoverOut: () => setHovered(false),
    },
    style: ({ pressed, focusVisible }) => {
      const up = (hovered || focusVisible) && !pressed;
      return [transition, up && { boxShadow: raised, transform: [{ translateY: -look.hoverLift }] }];
    },
  };
};
