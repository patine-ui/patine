import { TextInput, View } from 'react-native';

import { PickerText } from '@/core/components/PickerText';
import { IS_WEB } from '@/core/core.constants';
import { coreStyles } from '@/core/core.styles';
import { useComponentTheme } from '@/core/theme/ThemeProvider';
import { textStyle } from '@/core/theme/theme.utils';
import { useTextField } from '@/inputs/textfield/hooks/useTextField';
import { CLEAR_GLYPH, DEFAULT_TEXT_FIELD_LABELS } from '@/inputs/textfield/textfield.constants';
import { styles } from '@/inputs/textfield/textfield.styles';
import type { FieldInputProps } from '@/inputs/textfield/textfield.types';
import { formatCount, getTextFieldAccessibility, isLabelRaised } from '@/inputs/textfield/textfield.utils';
import { FieldLabel } from '@/overlays/sheet/components/FieldLabel';
import { FieldMessage } from '@/overlays/sheet/components/FieldMessage';
import { FloatingLabel } from '@/overlays/sheet/components/FloatingLabel';
import {
  DISABLED_TRIGGER_OPACITY,
  FIELD_DESIGN,
  FIELD_LABEL,
  FLOATING_LABEL_PADDING,
  FOCUS_RING_WIDTH,
} from '@/overlays/sheet/sheet.constants';
import { styles as sheetStyles } from '@/overlays/sheet/sheet.styles';
import { FieldButton } from './FieldButton';

/** The field TextField and TextArea draw: the picker fields' label, box and message, around a `TextInput`. */
export const FieldInput = (props: FieldInputProps) => {
  const {
    label,
    placeholder,
    error,
    helperText,
    required,
    disabled = false,
    readOnly = false,
    startIcon,
    endIcon,
    prefix,
    suffix,
    clearable = false,
    showCount = false,
    secureTextEntry,
    passwordToggle = true,
    multiline = false,
    maxLength,
    labels: labelsProp,
    style,
    styles: slots,
    theme: themeProp,
    design,
    ref,
    // Taken out of `rest`: the hook handles these.
    value: _value,
    defaultValue: _defaultValue,
    onValueChange: _onValueChange,
    onFocus: _onFocus,
    onBlur: _onBlur,
    onContentSizeChange: _onContentSizeChange,
    rows: _rows,
    minRows: _minRows,
    maxRows: _maxRows,
    ...rest
  } = props;
  const { theme } = useComponentTheme(themeProp, design);
  const field = useTextField(props, theme);
  const labels = { ...DEFAULT_TEXT_FIELD_LABELS, ...labelsProp };
  const look = FIELD_DESIGN[theme.design];
  const c = theme.colors;
  const editable = !disabled && !readOnly;
  const invalid = !!error;
  const borderWidth = field.focused ? look.openBorderWidth : 1;
  const floating = look.label === FIELD_LABEL.floating && !!label;
  const labelAbove = !!label && !floating;
  const raised = isLabelRaised({ focused: field.focused, filled: field.value !== '', hasStart: !!startIcon || !!prefix, multiline });

  return (
    <View style={style}>
      {labelAbove ? (
        <View nativeID={field.labelId}>
          <FieldLabel label={label} invalid={invalid} required={required} theme={theme} style={slots?.label} />
        </View>
      ) : null}
      <View
        style={[
          sheetStyles.trigger,
          {
            minHeight: look.minHeight,
            gap: theme.spacing.sm,
            backgroundColor: c.background,
            borderWidth,
            borderColor: invalid ? c.danger : field.focused ? c.primary : c[look.outline],
            borderRadius: theme.radius.md,
            // A thicker focused border grows inward, so the text doesn't shift.
            paddingHorizontal: theme.spacing.md - (borderWidth - 1),
            opacity: disabled ? DISABLED_TRIGGER_OPACITY : 1,
          },
          multiline && [styles.multilineField, { paddingVertical: theme.spacing.md - (borderWidth - 1) }],
          field.focused && look.focusRing && { boxShadow: `0px 0px 0px ${FOCUS_RING_WIDTH}px ${c.primaryMuted}` },
          slots?.field,
        ]}
      >
        {floating ? (
          <FloatingLabel
            label={label}
            raised={raised}
            open={field.focused}
            invalid={invalid}
            required={required}
            borderWidth={borderWidth}
            theme={theme}
            style={[{ marginStart: theme.spacing.md - FLOATING_LABEL_PADDING - (borderWidth - 1) }, slots?.label]}
          />
        ) : null}
        {startIcon}
        {prefix ? (
          <PickerText theme={theme} color="textSecondary" style={slots?.affix}>
            {prefix}
          </PickerText>
        ) : null}
        <TextInput
          ref={ref}
          value={field.value}
          onChangeText={field.changeText}
          onFocus={field.onFocus}
          onBlur={field.onBlur}
          placeholder={floating && !raised ? '' : placeholder}
          placeholderTextColor={c.textSecondary}
          selectionColor={c.primary}
          cursorColor={c.primary}
          editable={editable}
          maxLength={maxLength}
          multiline={multiline}
          secureTextEntry={field.hidden}
          autoCapitalize={secureTextEntry ? 'none' : undefined}
          autoCorrect={secureTextEntry ? false : undefined}
          {...getTextFieldAccessibility({
            label,
            placeholder,
            error,
            helperText,
            required,
            disabled,
            labelledBy: IS_WEB && labelAbove ? field.labelId : undefined,
          })}
          {...(multiline
            ? { scrollEnabled: field.multiline.scrollEnabled, onContentSizeChange: field.multiline.onContentSizeChange }
            : null)}
          {...rest}
          style={[
            textStyle(theme, 'md'),
            styles.input,
            coreStyles.noOutline,
            coreStyles.startAligned,
            { color: c.text },
            multiline && [styles.multilineInput, { lineHeight: field.multiline.lineHeight, height: field.multiline.height }],
            slots?.input,
          ]}
        />
        {suffix ? (
          <PickerText theme={theme} color="textSecondary" style={slots?.affix}>
            {suffix}
          </PickerText>
        ) : null}
        {clearable && editable && field.value !== '' ? (
          <FieldButton
            label={CLEAR_GLYPH}
            glyph
            accessibilityLabel={labels.clear}
            onPress={field.clear}
            theme={theme}
            style={slots?.action}
          />
        ) : null}
        {secureTextEntry && passwordToggle ? (
          <FieldButton
            label={field.hidden ? labels.show : labels.hide}
            accessibilityLabel={field.hidden ? labels.showPassword : labels.hidePassword}
            onPress={field.toggleRevealed}
            theme={theme}
            style={slots?.action}
          />
        ) : null}
        {endIcon}
      </View>
      <View style={styles.footer}>
        <FieldMessage error={error} helperText={helperText} theme={theme} style={[styles.message, slots?.helperText]} />
        {showCount ? (
          <PickerText
            theme={theme}
            size="sm"
            color="textSecondary"
            style={[styles.counter, { paddingEnd: floating ? theme.spacing.md : 0 }, slots?.counter]}
          >
            {formatCount(field.value.length, maxLength)}
          </PickerText>
        ) : null}
      </View>
    </View>
  );
};
