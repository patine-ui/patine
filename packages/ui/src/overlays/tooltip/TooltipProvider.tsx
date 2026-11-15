import { useMemo, useRef } from 'react';

import { TooltipContext } from './hooks/useTooltip';
import { DEFAULT_DELAY_MS, DEFAULT_SKIP_DELAY_MS } from './tooltip.constants';
import type { TooltipProviderProps } from './tooltip.types';

/** Optional: sets the hover delay for the tooltips inside it, and lets them open at once one after another. */
export const TooltipProvider = ({
  children,
  delayDuration = DEFAULT_DELAY_MS,
  skipDelayDuration = DEFAULT_SKIP_DELAY_MS,
}: TooltipProviderProps) => {
  const closedAt = useRef(0);
  const value = useMemo(
    () => ({
      delayDuration,
      skipDelayDuration,
      closedAt,
    }),
    [delayDuration, skipDelayDuration]
  );
  return <TooltipContext.Provider value={value}>{children}</TooltipContext.Provider>;
};
