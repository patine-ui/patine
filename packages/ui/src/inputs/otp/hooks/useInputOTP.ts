import { useFocus } from '@/core/a11y/hooks/useFocus';
import { useBlink } from '@/core/animation';
import { useControllableState } from '@/core/hooks/useControllableState';
import { DEFAULT_OTP_LENGTH, OTP_INPUT_MODE } from '@/inputs/otp/otp.constants';
import type { InputOTPProps, InputOTPState } from '@/inputs/otp/otp.types';
import { getCells, sanitizeCode } from '@/inputs/otp/otp.utils';

/** The code the cells show, and the handler that turns typing and pasting into it. `onComplete` fires when the user fills the last cell. */
export const useInputOTP = ({
  length = DEFAULT_OTP_LENGTH,
  value,
  defaultValue = '',
  onValueChange,
  onComplete,
  inputMode = OTP_INPUT_MODE.numeric,
  secureTextEntry = false,
}: InputOTPProps): InputOTPState => {
  const [raw, setCode] = useControllableState(value, defaultValue, onValueChange);
  const code = sanitizeCode(raw, length, inputMode);
  const focus = useFocus();
  const cells = getCells(code, length, focus.focused, secureTextEntry);
  const caretOpacity = useBlink(
    cells.some((cell) => cell.caret),
    code.length
  );

  const changeText = (text: string) => {
    const next = sanitizeCode(text, length, inputMode);
    if (next === code) return;
    setCode(next);
    if (next.length === length) onComplete?.(next);
  };

  return {
    code,
    length,
    cells,
    caretOpacity,
    changeText,
    onFocus: focus.onFocus,
    onBlur: focus.onBlur,
  };
};
