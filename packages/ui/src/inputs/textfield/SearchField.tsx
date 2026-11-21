import { useState } from 'react';
import { Keyboard } from 'react-native';

import { useFocus } from '@/core/a11y/hooks/useFocus';
import { SearchInput } from '@/core/components/SearchInput';
import { cs } from '@/core/core.styles';
import { useControllableState } from '@/core/hooks/useControllableState';
import { Text } from '@/core/primitives/Text';
import { Touchable } from '@/core/primitives/Touchable';
import { View } from '@/core/primitives/View';
import { ThemeScope, useComponentTheme, useLabels } from '@/core/theme/ThemeProvider';
import { FieldButton } from './components/FieldButton';
import { styles, themed } from './textfield.styles';
import type { SearchFieldProps } from './textfield.types';

/**
 * A search box drawn as the design's own: iOS's gray search bar, Material's pill, an outlined web input. A magnifier,
 * a clear button while there's text, the keyboard's Search key, and an optional iOS-style Cancel.
 */
export const SearchField = ({
  value: valueProp,
  defaultValue = '',
  onValueChange,
  onSubmit,
  onCancel,
  placeholder = 'Search',
  disabled = false,
  autoFocus,
  labels: labelsProp,
  style,
  styles: slots,
  theme: themeProp,
  design,
  onFocus,
  onBlur,
  ...rest
}: SearchFieldProps) => {
  const { theme, themeOverride } = useComponentTheme(themeProp, design);
  const sheet = themed(theme);
  const [value, setValue] = useControllableState(valueProp, defaultValue, onValueChange);
  const focus = useFocus();
  const words = useLabels();
  const labels = { ...words.searchField, ...labelsProp };
  const showClear = !disabled && value !== '';
  // A press on Cancel blurs the field first (on the web, on pointer down), so it stays while held, or it'd vanish mid-press.
  const [holding, setHolding] = useState(false);
  const showCancel = !!onCancel && (focus.focused || holding);
  return (
    <ThemeScope theme={themeOverride}>
      <View style={[styles.searchRow, sheet.searchRow, disabled && cs.disabled, style]}>
        <SearchInput
          theme={theme}
          value={value}
          onChangeText={setValue}
          placeholder={placeholder}
          autoFocus={autoFocus}
          containerStyle={styles.searchInput}
          style={[styles.searchInputPad, slots?.input]}
          inputProps={{
            returnKeyType: 'search',
            enterKeyHint: 'search',
            clearButtonMode: 'never',
            editable: !disabled,
            ...rest,
            onSubmitEditing: () => onSubmit?.(value),
            onFocus: (e) => {
              focus.onFocus();
              onFocus?.(e);
            },
            onBlur: (e) => {
              focus.onBlur();
              onBlur?.(e);
            },
          }}
        >
          {showClear ? (
            <View style={[styles.searchClear, sheet.searchClear]}>
              <FieldButton spokenLabel={labels.clear} onPress={() => setValue('')} theme={theme} />
            </View>
          ) : null}
        </SearchInput>
        {showCancel ? (
          <Touchable
            theme={theme}
            role="button"
            onPressIn={() => setHolding(true)}
            onPressOut={() => setHolding(false)}
            onPress={() => {
              setValue('');
              Keyboard.dismiss();
              onCancel?.();
            }}
            style={[styles.cancel, sheet.cancel]}
          >
            <Text color="primary">{labels.cancel}</Text>
          </Touchable>
        ) : null}
      </View>
    </ThemeScope>
  );
};
