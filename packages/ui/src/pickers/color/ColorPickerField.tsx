import { View } from '@/core/primitives/View';
import { ThemeScope, useComponentTheme } from '@/core/theme/ThemeProvider';
import { fillOf } from '@/core/utils/style.utils';
import { PickerField } from '@/overlays/sheet';
import { useFieldValue } from '@/overlays/sheet/hooks/useFieldValue';
import { splitFieldProps } from '@/overlays/sheet/sheet.utils';
import { ColorPickerSheet } from './ColorPickerSheet';
import { styles, themed } from './color.styles';
import type { ColorPickerFieldProps, ColorPickerSheetProps } from './color.types';
import { normalizeHex } from './color.utils';

/** A field that opens a ColorPickerSheet and shows the confirmed colour: a swatch and its hex code. */
export const ColorPickerField = (props: ColorPickerFieldProps) => {
  const { field, sheet } = splitFieldProps(props);
  const v = useFieldValue(props);
  const { theme, themeOverride } = useComponentTheme(props.theme, props.design);
  const hex = v.value ? normalizeHex(v.value) : null;
  return (
    <ThemeScope theme={themeOverride}>
      <PickerField
        {...field}
        onClear={v.clear}
        displayValue={field.displayValue ?? hex ?? ''}
        icon={hex ? <View style={[styles.fieldSwatch, themed(theme).small, fillOf(hex)]} /> : null}
      >
        {(state) => (
          <ColorPickerSheet
            title={field.label}
            {...({ ...sheet, ...state, value: v.value, onConfirm: v.confirm } as ColorPickerSheetProps)}
          />
        )}
      </PickerField>
    </ThemeScope>
  );
};
