import { PICKER_DISPLAY } from '@/core/core.constants';
import { useDesignOverride, useTheme } from '@/core/theme/ThemeProvider';
import { PickerSheet, useDraft } from '@/overlays/sheet';
import { SheetContent } from '@/overlays/sheet/SheetContent';
import { snapTime } from '@/pickers/time/time.utils';
import { DateTimePicker } from './DateTimePicker';
import { DATETIME_DESIGN } from './datetime.constants';
import type { DateTimePickerSheetProps } from './datetime.types';

export const DateTimePickerSheet = ({
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
}: DateTimePickerSheetProps) => {
  const theme = useDesignOverride(themeProp, design);
  const onClose = () => onOpenChange?.(false);
  const commit = (next: Date) => onConfirm(snapTime(next, rest));
  const [draft, setDraft] = useDraft(value ?? new Date(), visible, { commit });
  const { design: resolvedDesign } = useTheme(theme);
  const display = rest.display ?? DATETIME_DESIGN[resolvedDesign].display;
  return (
    <PickerSheet
      {...{ open: visible, onOpenChange: onClose, title, confirmLabel, cancelLabel, showCancel, presentation, sheetProps, theme }}
      onConfirm={() => {
        commit(draft);
        onClose();
      }}
    >
      <SheetContent compact={display === PICKER_DISPLAY.calendar}>
        <DateTimePicker {...rest} theme={theme} value={draft} onValueChange={setDraft} />
      </SheetContent>
    </PickerSheet>
  );
};
