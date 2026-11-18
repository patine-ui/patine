import { useDesignOverride } from '@/core/theme/ThemeProvider';
import { PickerSheet, useDraft } from '@/overlays/sheet';
import { SheetContent } from '@/overlays/sheet/SheetContent';
import { TimeRangePicker } from './TimeRangePicker';
import type { TimeRange, TimeRangePickerSheetProps } from './time.types';
import { getDefaultTimeRange, snapTime } from './time.utils';

export const TimeRangePickerSheet = ({
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
}: TimeRangePickerSheetProps) => {
  const theme = useDesignOverride(themeProp, design);
  const onClose = () => onOpenChange?.(false);
  const commit = (next: TimeRange) =>
    onConfirm({
      start: snapTime(next.start, rest),
      end: snapTime(next.end, rest),
    });
  const [draft, setDraft] = useDraft(value ?? getDefaultTimeRange(new Date(), rest), visible, { commit });
  return (
    <PickerSheet
      {...{ open: visible, onOpenChange: onClose, title, confirmLabel, cancelLabel, showCancel, presentation, sheetProps, theme }}
      onConfirm={() => {
        commit(draft);
        onClose();
      }}
    >
      <SheetContent>
        <TimeRangePicker {...rest} theme={theme} value={draft} onValueChange={setDraft} />
      </SheetContent>
    </PickerSheet>
  );
};
