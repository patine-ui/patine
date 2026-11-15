import { createContext, useContext } from 'react';

import type { SortableRowContext } from './sortable.types';

export const SortableRowCtx = createContext<SortableRowContext | null>(null);

/** The row a SortableHandle sits in; null outside a SortableList. */
export const useSortableRow = () => useContext(SortableRowCtx);
