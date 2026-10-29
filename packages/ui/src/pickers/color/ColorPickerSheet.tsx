import { useDesignOverride } from '@/core/theme/ThemeProvider';
import { PickerSheet, useDraft } from '@/overlays/sheet';
import { SheetContent } from '@/overlays/sheet/SheetContent';
import { ColorPicker } from './ColorPicker';
import { DEFAULT_COLOR } from './color.constants';
import type { ColorPickerSheetProps } from './color.types';
import { normalizeHex } from './color.utils';

export const ColorPickerSheet = ({
  visible,
  onClose,
  title,
  confirmLabel,
  cancelLabel,
  showCancel,
  presentation,
  sheetProps,
  theme: themeProp,
  design,
  value,
  onConfirm,
  ...rest
}: ColorPickerSheetProps) => {
  const theme = useDesignOverride(themeProp, design);
  const [draft, setDraft] = useDraft((value && normalizeHex(value)) ?? DEFAULT_COLOR, visible, { commit: onConfirm });
  return (
    <PickerSheet
      {...{ visible, onClose, title, confirmLabel, cancelLabel, showCancel, presentation, sheetProps, theme }}
      onConfirm={() => {
        onConfirm(draft);
        onClose();
      }}
    >
      <SheetContent>
        <ColorPicker {...rest} theme={theme} value={draft} onValueChange={setDraft} />
      </SheetContent>
    </PickerSheet>
  );
};
