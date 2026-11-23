import { cs } from '@/core/core.styles';
import { Input } from '@/core/primitives/Input';
import { View } from '@/core/primitives/View';
import { ThemeScope, useComponentTheme, useLabels } from '@/core/theme/ThemeProvider';
import { FieldFrame } from '@/overlays/sheet/components/FieldFrame';
import { getFieldAccessibility } from '@/overlays/sheet/sheet.utils';
import { OtpCell } from './components/OtpCell';
import { useInputOTP } from './hooks/useInputOTP';
import { OTP_AUTO_COMPLETE, OTP_INPUT_MODE } from './otp.constants';
import { styles, themed } from './otp.styles';
import type { InputOTPProps } from './otp.types';

/** A one-time code in a box per character. One text field underneath takes typing, pasting and the code the OS reads from a text message. */
export const InputOTP = (props: InputOTPProps) => {
  const {
    inputMode = OTP_INPUT_MODE.numeric,
    secureTextEntry = false,
    autoFocus,
    disabled = false,
    error,
    helperText,
    'aria-label': accessibilityLabelProp,
    style,
    styles: slots,
    theme: themeProp,
    design,
    testID,
  } = props;
  const words = useLabels();
  const accessibilityLabel = accessibilityLabelProp ?? words.otp;
  const { theme, themeOverride } = useComponentTheme(themeProp, design);
  const otp = useInputOTP(props);

  return (
    <ThemeScope theme={themeOverride}>
      <View style={[disabled && cs.disabled, style]}>
        <FieldFrame error={error} helperText={helperText} centered theme={theme} slots={slots}>
          <View style={[styles.row, themed(theme).row, slots?.container]} aria-hidden>
            {otp.cells.map((cell) => (
              <OtpCell
                key={cell.key}
                cell={cell}
                caretOpacity={otp.caretOpacity}
                invalid={!!error}
                theme={theme}
                slots={slots}
                testID={testID ? `${testID}-cell-${cell.key}` : undefined}
              />
            ))}
          </View>
        </FieldFrame>
        <Input
          ref={otp.inputRef}
          theme={theme}
          value={otp.code}
          onChangeText={otp.changeText}
          onFocus={otp.onFocus}
          onBlur={otp.onBlur}
          maxLength={otp.length}
          keyboardType={inputMode === OTP_INPUT_MODE.numeric ? 'number-pad' : 'default'}
          autoCapitalize="none"
          autoCorrect={false}
          textContentType="oneTimeCode"
          autoComplete={OTP_AUTO_COMPLETE}
          secureTextEntry={secureTextEntry}
          autoFocus={autoFocus}
          editable={!disabled}
          {...getFieldAccessibility({ name: accessibilityLabel, error }, words)}
          style={[styles.input, cs.noOutline]}
          testID={testID}
        />
      </View>
    </ThemeScope>
  );
};
