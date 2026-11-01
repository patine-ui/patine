import { PickerField } from '@/overlays/sheet';
import { splitFieldProps } from '@/overlays/sheet/sheet.utils';
import { TimeRangePickerSheet } from './TimeRangePickerSheet';
import type { TimeRangePickerFieldProps } from './time.types';
import { formatTimeRange } from './time.utils';

/** A field that opens a TimeRangePickerSheet and shows the confirmed range, such as "9:00 AM – 5:00 PM". */
export const TimeRangePickerField = (props: TimeRangePickerFieldProps) => {
  const { field, sheet } = splitFieldProps(props);
  return (
    <PickerField {...field} displayValue={field.displayValue ?? (props.value ? formatTimeRange(props.value, props) : '')}>
      {(state) => <TimeRangePickerSheet title={field.label} {...sheet} {...state} />}
    </PickerField>
  );
};
