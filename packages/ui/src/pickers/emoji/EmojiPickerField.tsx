import { PickerField } from '@/overlays/sheet';
import { useFieldValue } from '@/overlays/sheet/hooks/useFieldValue';
import { splitFieldProps } from '@/overlays/sheet/sheet.utils';
import { EmojiPickerSheet } from './EmojiPickerSheet';
import type { EmojiPickerFieldProps } from './emoji.types';

/** A field that opens an EmojiPickerSheet and shows `value`, the picked emoji. */
export const EmojiPickerField = (props: EmojiPickerFieldProps) => {
  const { field, sheet } = splitFieldProps(props);
  const v = useFieldValue<string>(props);
  return (
    <PickerField {...field} onClear={v.clear} displayValue={field.displayValue ?? v.value ?? ''}>
      {(state) => (
        <EmojiPickerSheet
          title={field.label}
          {...sheet}
          {...state}
          onSelect={(emoji, data) => {
            v.confirm(emoji);
            props.onSelect?.(emoji, data);
          }}
        />
      )}
    </PickerField>
  );
};
