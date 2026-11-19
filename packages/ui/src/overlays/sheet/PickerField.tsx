import { View } from '@/core/primitives/View';
import { ThemeScope, useComponentTheme, useLabels } from '@/core/theme/ThemeProvider';
import { FieldFrame } from './components/FieldFrame';
import { FieldTrigger } from './components/FieldTrigger';
import { FieldSheetContext } from './hooks/useFieldSheet';
import { usePickerField } from './hooks/usePickerField';
import type { PickerFieldProps } from './sheet.types';

/** A labelled field that opens the sheet `children` renders (by default, a dropdown under it on the web and a bottom sheet on native), and shows `displayValue` once it closes. */
export const PickerField = ({
  label,
  placeholder: placeholderProp,
  displayValue = '',
  icon,
  disabled = false,
  clearable = false,
  onClear,
  renderTrigger,
  renderChevron,
  open,
  defaultOpen,
  onOpenChange,
  presentation,
  error,
  helperText,
  required,
  style,
  styles: slots,
  theme: themeProp,
  design,
  testID,
  children,
}: PickerFieldProps) => {
  const words = useLabels();
  const placeholder = placeholderProp ?? words.select;
  const { theme, themeOverride } = useComponentTheme(themeProp, design);
  const field = usePickerField({ disabled, presentation, open, defaultOpen, onOpenChange });

  return (
    <ThemeScope theme={themeOverride}>
      <View style={style}>
        <FieldFrame
          label={label}
          error={error}
          helperText={helperText}
          required={required}
          customTrigger={!!renderTrigger}
          theme={theme}
          slots={slots}
        >
          <View ref={field.anchor.ref} collapsable={false}>
            {renderTrigger ? (
              renderTrigger({ open: field.toggle, displayValue, disabled, error })
            ) : (
              <FieldTrigger
                displayValue={displayValue}
                icon={icon}
                placeholder={placeholder}
                label={label}
                open={field.open}
                disabled={disabled}
                clearable={clearable}
                error={error}
                required={required}
                onOpen={field.toggle}
                onClear={onClear}
                renderChevron={renderChevron}
                theme={theme}
                slots={slots}
                testID={testID}
              />
            )}
          </View>
        </FieldFrame>
        <FieldSheetContext.Provider value={field.sheet}>
          {children({ open: field.open, onOpenChange: field.hide })}
        </FieldSheetContext.Provider>
      </View>
    </ThemeScope>
  );
};
