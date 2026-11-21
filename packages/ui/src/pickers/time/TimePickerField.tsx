import { PickerField } from '@/overlays/sheet';
import { useFieldValue } from '@/overlays/sheet/hooks/useFieldValue';
import { splitFieldProps } from '@/overlays/sheet/sheet.utils';
import { TimePickerSheet } from './TimePickerSheet';
import type { TimePickerFieldProps, TimePickerSheetProps } from './time.types';
import { formatTimeValue } from './time.utils';

/** A field that opens a TimePickerSheet and shows the confirmed time. */
export const TimePickerField = (props: TimePickerFieldProps) => {
  const { field, sheet } = splitFieldProps(props);
  const v = useFieldValue(props);
  return (
    <PickerField {...field} onClear={v.clear} displayValue={field.displayValue ?? (v.value ? formatTimeValue(v.value, props) : '')}>
      {(state) => (
        <TimePickerSheet title={field.label} {...({ ...sheet, ...state, value: v.value, onConfirm: v.confirm } as TimePickerSheetProps)} />
      )}
    </PickerField>
  );
};
