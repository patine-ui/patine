import { useState } from 'react';

import { COLOR_TAB } from '@/pickers/color/color.constants';
import type { ColorTab } from '@/pickers/color/color.types';

/** The tab iOS shows, and whether Material's custom colour is open. */
export const useColorView = (customOpen: boolean) => {
  const [tab, setTab] = useState<ColorTab>(COLOR_TAB.grid);
  const [open, setOpen] = useState(customOpen);
  return {
    tab,
    setTab,
    customOpen: open,
    toggleCustom: () => setOpen((current) => !current),
  };
};
