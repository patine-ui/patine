import { useDesignOverride } from '@/core/theme/ThemeProvider';
import { PickerSheet, useDraft } from '@/overlays/sheet';
import { SheetContent } from '@/overlays/sheet/SheetContent';
import { TimePicker } from './TimePicker';
import type { TimePickerSheetProps } from './time.types';
import { snapTime } from './time.utils';

export const TimePickerSheet = ({
  open: visible = false,
  onOpenChange,
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
}: TimePickerSheetProps) => {
  const theme = useDesignOverride(themeProp, design);
  const onClose = () => onOpenChange?.(false);
  const commit = (next: Date) => onConfirm(snapTime(next, rest));
  const [draft, setDraft] = useDraft(value ?? new Date(), visible, { commit });
  return (
    <PickerSheet
      {...{ open: visible, onOpenChange: onClose, title, confirmLabel, cancelLabel, showCancel, presentation, sheetProps, theme }}
      onConfirm={() => {
        commit(draft);
        onClose();
      }}
    >
      <SheetContent>
        <TimePicker {...rest} theme={theme} value={draft} onValueChange={setDraft} />
      </SheetContent>
    </PickerSheet>
  );
};
