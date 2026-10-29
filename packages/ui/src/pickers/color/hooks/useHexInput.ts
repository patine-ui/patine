import { useState } from 'react';

import { normalizeHex } from '@/pickers/color/color.utils';

const FULL_HEX = /^#?([0-9a-f]{6}|[0-9a-f]{8})$/i;

/** The hex field's text: the colour, or what's being typed. Six or eight digits apply as typed; a short code like 'f80' on leaving the field. */
export const useHexInput = (color: string, onValueChange: (color: string) => void) => {
  const [typed, setTyped] = useState<string | null>(null);
  return {
    text: typed ?? color,
    onChangeText: (text: string) => {
      setTyped(text);
      const next = FULL_HEX.test(text) ? normalizeHex(text) : null;
      if (next) onValueChange(next);
    },
    onBlur: () => {
      const next = typed === null ? null : normalizeHex(typed);
      if (next) onValueChange(next);
      setTyped(null);
    },
  };
};
