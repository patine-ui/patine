import { PickerField } from '@/overlays/sheet';
import { splitFieldProps } from '@/overlays/sheet/sheet.utils';
import { EmojiPickerSheet } from './EmojiPickerSheet';
import type { EmojiPickerFieldProps } from './emoji.types';

/** A field that opens an EmojiPickerSheet and shows `value`, the picked emoji. */
export const EmojiPickerField = ({ value, ...props }: EmojiPickerFieldProps) => {
  const { field, sheet } = splitFieldProps(props);
  return (
    <PickerField {...field} displayValue={field.displayValue ?? value ?? ''}>
      {(state) => <EmojiPickerSheet title={field.label} {...sheet} {...state} />}
    </PickerField>
  );
};
