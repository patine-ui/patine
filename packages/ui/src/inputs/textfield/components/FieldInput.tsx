import { IS_WEB } from '@/core/core.constants';
import { cs, startAlign } from '@/core/core.styles';
import { Input } from '@/core/primitives/Input';
import { Text } from '@/core/primitives/Text';
import { Pressable, View } from '@/core/primitives/View';
import { ThemeScope, useComponentTheme, useDirection, useLabels } from '@/core/theme/ThemeProvider';
import { useTextField } from '@/inputs/textfield/hooks/useTextField';
import { styles, themed } from '@/inputs/textfield/textfield.styles';
import type { FieldInputProps } from '@/inputs/textfield/textfield.types';
import { formatCount, getInputDirection, getNodeText, getTextFieldAccessibility, isLabelRaised } from '@/inputs/textfield/textfield.utils';
import { FieldLabel } from '@/overlays/sheet/components/FieldLabel';
import { FieldMessage } from '@/overlays/sheet/components/FieldMessage';
import { FloatingLabel } from '@/overlays/sheet/components/FloatingLabel';
import { FIELD_DESIGN, FIELD_LABEL } from '@/overlays/sheet/sheet.constants';
import { fieldStyles, styles as sheetStyles } from '@/overlays/sheet/sheet.styles';
import { FieldButton } from './FieldButton';

/** The field TextField and TextArea draw: the picker fields' label, box and message, around a `TextInput`. */
export const FieldInput = (props: FieldInputProps) => {
  const dir = useDirection();
  const {
    label,
    dir: textDir,
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
    // Taken out of `rest`: the hook handles these.
    value: _value,
    defaultValue: _defaultValue,
    onValueChange: _onValueChange,
    onFocus: _onFocus,
    onBlur: _onBlur,
    onContentSizeChange: _onContentSizeChange,
    onLayout: _onLayout,
    onKeyPress: _onKeyPress,
    onSubmit: _onSubmit,
    ref: _ref,
    rows: _rows,
    minRows: _minRows,
    maxRows: _maxRows,
    ...rest
  } = props;
  const { theme, themeOverride } = useComponentTheme(themeProp, design);
  const field = useTextField(props, theme);
  const words = useLabels();
  const labels = { ...words.textField, ...labelsProp };
  const look = FIELD_DESIGN[theme.design];
  const box = fieldStyles(theme);
  const tf = themed(theme);
  const editable = !disabled && !readOnly;
  const invalid = !!error;
  const borderWidth = field.focused ? look.openBorderWidth : 1;
  // A node label (with a tooltip or a tag) can't float, so it sits above in every design.
  const textLabel = typeof label === 'string' ? label : undefined;
  const floating = look.label === FIELD_LABEL.floating && !!textLabel;
  const labelAbove = !!label && !floating;
  const raised = isLabelRaised({ focused: field.focused, filled: field.value !== '', hasStart: !!startIcon || !!prefix, multiline });

  return (
    <ThemeScope theme={themeOverride}>
      <View style={style}>
        {labelAbove ? (
          <View nativeID={field.labelId} style={textLabel === undefined && sheetStyles.fieldLabel}>
            {textLabel === undefined ? (
              label
            ) : (
              <FieldLabel label={textLabel} invalid={invalid} required={required} theme={theme} style={slots?.label} />
            )}
          </View>
        ) : null}
        <Pressable
          // Only a wider press target for the input: screen readers and the Tab key reach the input itself.
          accessible={false}
          focusable={false}
          disabled={!editable}
          onPress={field.focusInput}
          onHoverIn={field.onHoverIn}
          onHoverOut={field.onHoverOut}
          style={[
            sheetStyles.trigger,
            box.box,
            field.hovered && editable && box.hover,
            field.focused && box.open,
            invalid && box.invalid,
            disabled && cs.disabled,
            multiline && [styles.multilineField, field.focused ? box.multilineOpen : box.multiline],
            slots?.field,
          ]}
        >
          {floating ? (
            <FloatingLabel
              label={textLabel ?? ''}
              raised={raised}
              open={field.focused}
              invalid={invalid}
              required={required}
              borderWidth={borderWidth}
              theme={theme}
              style={[field.focused ? box.floatingStartOpen : box.floatingStart, slots?.label]}
            />
          ) : null}
          {startIcon}
          {prefix ? (
            <Text color="textSecondary" style={slots?.affix}>
              {prefix}
            </Text>
          ) : null}
          <Input
            theme={theme}
            ref={field.ref}
            onLayout={field.onLayout}
            value={field.value}
            onChangeText={field.changeText}
            onFocus={field.onFocus}
            onBlur={field.onBlur}
            onKeyPress={field.onKeyPress}
            placeholder={floating && !raised ? '' : placeholder}
            editable={editable}
            maxLength={maxLength}
            multiline={multiline}
            secureTextEntry={field.hidden}
            autoCapitalize={secureTextEntry ? 'none' : undefined}
            autoCorrect={secureTextEntry ? false : undefined}
            {...getTextFieldAccessibility(
              {
                label: textLabel ?? (getNodeText(label) || undefined),
                placeholder,
                error,
                helperText,
                required,
                disabled,
                labelledBy: IS_WEB && labelAbove ? field.labelId : undefined,
                spokenName: rest['aria-label'] ?? rest.accessibilityLabel,
              },
              words
            )}
            {...(multiline
              ? { scrollEnabled: field.multiline.scrollEnabled, onContentSizeChange: field.multiline.onContentSizeChange }
              : null)}
            {...rest}
            {...(IS_WEB && textDir ? { dir: textDir } : null)}
            style={[
              styles.input,
              startAlign[dir],
              getInputDirection(textDir, dir, IS_WEB),
              multiline && [styles.multilineInput, field.multiline.style],
              slots?.input,
            ]}
          />
          {suffix ? (
            <Text color="textSecondary" style={slots?.affix}>
              {suffix}
            </Text>
          ) : null}
          {clearable && editable && field.value !== '' ? (
            <FieldButton spokenLabel={labels.clear} onPress={field.clear} theme={theme} style={slots?.action} />
          ) : null}
          {secureTextEntry && passwordToggle ? (
            <FieldButton
              label={field.hidden ? labels.show : labels.hide}
              spokenLabel={field.hidden ? labels.showPassword : labels.hidePassword}
              onPress={field.toggleRevealed}
              theme={theme}
              style={slots?.action}
            />
          ) : null}
          {endIcon}
        </Pressable>
        <View style={styles.footer}>
          <FieldMessage error={error} helperText={helperText} theme={theme} style={[styles.message, slots?.helperText]} />
          {showCount ? (
            <Text theme={theme} size="sm" color="textSecondary" style={[styles.counter, floating && tf.counterFloating, slots?.counter]}>
              {formatCount(field.value.length, maxLength)}
            </Text>
          ) : null}
        </View>
      </View>
    </ThemeScope>
  );
};
