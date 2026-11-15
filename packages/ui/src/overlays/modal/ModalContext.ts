import { createContext, useContext } from 'react';

import { MODAL_LAYOUT } from './modal.constants';
import type { ModalLayout } from './modal.types';

/** How the open panel is laid out, so the body knows whether to fill the height (full screen, drawer) or fit its content. */
export const ModalLayoutContext = createContext<ModalLayout>(MODAL_LAYOUT.centered);

export const useModalLayout = () => useContext(ModalLayoutContext);
