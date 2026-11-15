import { useMemo } from 'react';

import type { DialogContextValue } from '@/overlays/dialog/dialog.types';
import { useDialog } from '@/overlays/dialog/hooks/useDialog';
import { MODAL_DESIGN } from '@/overlays/modal/modal.constants';
import type { ModalProps } from '@/overlays/modal/modal.types';

/**
 * A modal's state is a dialog's (open, ids, focus, how it closes), drawn with the modal's design, so Dialog's title,
 * description, trigger and close work inside it unchanged.
 */
export const useModal = (props: ModalProps): DialogContextValue => {
  const ctx = useDialog(props, false);
  return useMemo(
    () => ({
      ...ctx,
      look: MODAL_DESIGN[ctx.theme.design],
    }),
    [ctx]
  );
};
