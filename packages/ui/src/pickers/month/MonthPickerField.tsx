import { formatMonthYear } from '@/core/utils/date.utils';
import { PickerField } from '@/overlays/sheet';
import { useFieldValue } from '@/overlays/sheet/hooks/useFieldValue';
import { splitFieldProps } from '@/overlays/sheet/sheet.utils';
import { MonthPickerSheet } from './MonthPickerSheet';
import type { MonthPickerFieldProps, MonthPickerSheetProps } from './month.types';

/** A field that opens a MonthPickerSheet and shows the confirmed month, like "October 2026". */
export const MonthPickerField = (props: MonthPickerFieldProps) => {
  const { field, sheet } = splitFieldProps(props);
  const v = useFieldValue(props);
  return (
    <PickerField {...field} onClear={v.clear} displayValue={field.displayValue ?? (v.value ? formatMonthYear(v.value, props.locale) : '')}>
      {(state) => (
        <MonthPickerSheet
          title={field.label}
          {...({ ...sheet, ...state, value: v.value, onConfirm: v.confirm } as MonthPickerSheetProps)}
        />
      )}
    </PickerField>
  );
};
