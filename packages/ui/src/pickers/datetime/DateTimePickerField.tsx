import { PickerField } from '@/overlays/sheet';
import { useFieldValue } from '@/overlays/sheet/hooks/useFieldValue';
import { splitFieldProps } from '@/overlays/sheet/sheet.utils';
import { DateTimePickerSheet } from './DateTimePickerSheet';
import type { DateTimePickerFieldProps, DateTimePickerSheetProps } from './datetime.types';
import { formatDateTimeValue } from './datetime.utils';

/** A field that opens a DateTimePickerSheet and shows the confirmed date and time. */
export const DateTimePickerField = (props: DateTimePickerFieldProps) => {
  const { field, sheet } = splitFieldProps(props);
  const v = useFieldValue(props);
  return (
    <PickerField {...field} onClear={v.clear} displayValue={field.displayValue ?? (v.value ? formatDateTimeValue(v.value, props) : '')}>
      {(state) => (
        <DateTimePickerSheet
          title={field.label}
          {...({ ...sheet, ...state, value: v.value, onConfirm: v.confirm } as DateTimePickerSheetProps)}
        />
      )}
    </PickerField>
  );
};
