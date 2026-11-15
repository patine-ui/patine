import { useState } from 'react';
import { Keyboard, View } from 'react-native';

import { PickerText } from '@/core/components/PickerText';
import { SearchInput } from '@/core/components/SearchInput';
import { Touchable } from '@/core/components/Touchable';
import { DISABLED_OPACITY } from '@/core/core.constants';
import { useControllableState } from '@/core/hooks/useControllableState';
import { useFocus } from '@/core/hooks/useFocus';
import { useComponentTheme } from '@/core/theme/ThemeProvider';
import { FieldButton } from './components/FieldButton';
import { CLEAR_GLYPH, DEFAULT_SEARCH_FIELD_LABELS, SEARCH_CLEAR_SPACE } from './textfield.constants';
import { styles } from './textfield.styles';
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
  inputStyle,
  theme: themeProp,
  design,
  onFocus,
  onBlur,
  ...rest
}: SearchFieldProps) => {
  const { theme } = useComponentTheme(themeProp, design);
  const [value, setValue] = useControllableState(valueProp, defaultValue, onValueChange);
  const focus = useFocus();
  const labels = { ...DEFAULT_SEARCH_FIELD_LABELS, ...labelsProp };
  const showClear = !disabled && value !== '';
  // A press on Cancel blurs the field first (on the web, on pointer down), so it stays while held, or it'd vanish mid-press.
  const [holding, setHolding] = useState(false);
  const showCancel = !!onCancel && (focus.focused || holding);
  return (
    <View style={[styles.searchRow, { gap: theme.spacing.sm }, disabled && { opacity: DISABLED_OPACITY }, style]}>
      <SearchInput
        theme={theme}
        value={value}
        onChangeText={setValue}
        placeholder={placeholder}
        autoFocus={autoFocus}
        containerStyle={styles.searchInput}
        style={[{ paddingEnd: SEARCH_CLEAR_SPACE }, inputStyle]}
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
          <View style={[styles.searchClear, { end: theme.spacing.xs }]}>
            <FieldButton label={CLEAR_GLYPH} glyph accessibilityLabel={labels.clear} onPress={() => setValue('')} theme={theme} />
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
          style={{ borderRadius: theme.radius.sm, paddingHorizontal: theme.spacing.xs, minHeight: 44, justifyContent: 'center' }}
        >
          <PickerText theme={theme} color="primary">
            {labels.cancel}
          </PickerText>
        </Touchable>
      ) : null}
    </View>
  );
};
