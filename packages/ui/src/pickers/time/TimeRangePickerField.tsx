import { PickerField } from '@/overlays/sheet';
import { useFieldValue } from '@/overlays/sheet/hooks/useFieldValue';
import { splitFieldProps } from '@/overlays/sheet/sheet.utils';
import { TimeRangePickerSheet } from './TimeRangePickerSheet';
import type { TimeRangePickerFieldProps, TimeRangePickerSheetProps } from './time.types';
import { formatTimeRange } from './time.utils';

/** A field that opens a TimeRangePickerSheet and shows the confirmed range, such as "9:00 AM – 5:00 PM". */
export const TimeRangePickerField = (props: TimeRangePickerFieldProps) => {
  const { field, sheet } = splitFieldProps(props);
  const v = useFieldValue(props);
  return (
    <PickerField {...field} onClear={v.clear} displayValue={field.displayValue ?? (v.value ? formatTimeRange(v.value, props) : '')}>
      {(state) => (
        <TimeRangePickerSheet
          title={field.label}
          {...({ ...sheet, ...state, value: v.value, onConfirm: v.confirm } as TimeRangePickerSheetProps)}
        />
      )}
    </PickerField>
  );
};
