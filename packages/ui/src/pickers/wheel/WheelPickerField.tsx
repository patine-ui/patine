import { PickerField } from '@/overlays/sheet';
import { useFieldValue } from '@/overlays/sheet/hooks/useFieldValue';
import { splitFieldProps } from '@/overlays/sheet/sheet.utils';
import { WheelPickerSheet } from './WheelPickerSheet';
import type { WheelPickerFieldProps, WheelPickerSheetProps } from './wheel.types';
import { getItemLabel } from './wheel.utils';

/** A field that opens a WheelPickerSheet and shows the confirmed item's label. */
export const WheelPickerField = <T,>(props: WheelPickerFieldProps<T>) => {
  const { field, sheet } = splitFieldProps(props);
  const v = useFieldValue<T>(props);
  return (
    <PickerField
      {...field}
      onClear={v.clear}
      displayValue={field.displayValue ?? getItemLabel(props.items, v.value ?? undefined, props.isEqual)}
    >
      {(state) => (
        <WheelPickerSheet<T>
          title={field.label}
          {...({ ...sheet, ...state, value: v.value ?? undefined, onConfirm: v.confirm } as WheelPickerSheetProps<T>)}
        />
      )}
    </PickerField>
  );
};
