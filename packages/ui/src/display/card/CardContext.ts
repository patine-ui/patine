import { createContext, useContext } from 'react';

import type { DeepPartial } from '@/core/core.types';
import type { Theme } from '@/core/theme/theme.types';

/** The Card's theme override, with its `design` folded in, so composed parts draw like the Card they sit in. */
export const CardThemeContext = createContext<DeepPartial<Theme> | undefined>(undefined);

/** A part's own `theme`, else its Card's. */
export const useCardTheme = (theme: DeepPartial<Theme> | undefined) => {
  const card = useContext(CardThemeContext);
  return theme ?? card;
};
