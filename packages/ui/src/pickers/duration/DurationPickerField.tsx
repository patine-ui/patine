import { PickerField } from '@/overlays/sheet';
import { useFieldValue } from '@/overlays/sheet/hooks/useFieldValue';
import { splitFieldProps } from '@/overlays/sheet/sheet.utils';
import { DurationPickerSheet } from './DurationPickerSheet';
import type { DurationPickerFieldProps, DurationPickerSheetProps } from './duration.types';
import { formatDuration } from './duration.utils';

/** A field that opens a DurationPickerSheet and shows the confirmed duration, like "1 h 30 min". */
export const DurationPickerField = (props: DurationPickerFieldProps) => {
  const { field, sheet } = splitFieldProps(props);
  const v = useFieldValue(props);
  return (
    <PickerField {...field} onClear={v.clear} displayValue={field.displayValue ?? (v.value != null ? formatDuration(v.value, props) : '')}>
      {(state) => (
        <DurationPickerSheet
          title={field.label}
          {...({ ...sheet, ...state, value: v.value, onConfirm: v.confirm } as DurationPickerSheetProps)}
        />
      )}
    </PickerField>
  );
};
