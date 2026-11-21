import { PickerField } from '@/overlays/sheet';
import { useFieldValue } from '@/overlays/sheet/hooks/useFieldValue';
import type { FieldValueProps } from '@/overlays/sheet/sheet.types';
import { splitFieldProps } from '@/overlays/sheet/sheet.utils';
import { DatePickerSheet } from './DatePickerSheet';
import type { DateDraft, DatePickerFieldProps, DatePickerSheetProps } from './date.types';
import { formatDateValue } from './date.utils';

/** A field that opens a DatePickerSheet and shows the confirmed date, range or dates. */
export const DatePickerField = (props: DatePickerFieldProps) => {
  const { field, sheet } = splitFieldProps(props);
  const v = useFieldValue(props as FieldValueProps<DateDraft>);
  return (
    <PickerField
      {...field}
      onClear={v.clear}
      displayValue={field.displayValue ?? formatDateValue((v.value ?? undefined) as DatePickerFieldProps['value'], props.locale)}
    >
      {(state) => (
        <DatePickerSheet title={field.label} {...({ ...sheet, ...state, value: v.value, onConfirm: v.confirm } as DatePickerSheetProps)} />
      )}
    </PickerField>
  );
};
