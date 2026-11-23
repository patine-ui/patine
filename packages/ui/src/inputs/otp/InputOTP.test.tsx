import { act, createRef } from 'react';
import { StyleSheet, TextInput } from 'react-native';

import { fireEvent, render, screen } from '@testing-library/react-native';

import { PatineProvider } from '@/core/theme/ThemeProvider';
import { InputOTP } from './InputOTP';
import type { InputOTPHandle } from './otp.types';

const input = () => screen.getByLabelText('Verification code');
const cellText = (index: number) => screen.getByTestId(`otp-cell-${index}`, { includeHiddenElements: true });

describe('InputOTP', () => {
  it('reports what is typed and completes on the last character', async () => {
    const onValueChange = jest.fn();
    const onComplete = jest.fn();
    await render(<InputOTP length={4} onValueChange={onValueChange} onComplete={onComplete} testID="otp" />);
    await fireEvent.changeText(input(), '12');
    expect(onValueChange).toHaveBeenLastCalledWith('12');
    expect(onComplete).not.toHaveBeenCalled();
    await fireEvent.changeText(input(), '1234');
    expect(onComplete).toHaveBeenCalledWith('1234');
    expect(cellText(3)).toHaveTextContent('4');
  });

  it('shows the helper text, replaced by the error message, which screen readers hear on the field', async () => {
    const { rerender } = await render(<InputOTP helperText="Sent to •••• 0123" />);
    expect(screen.getByText('Sent to •••• 0123')).toBeTruthy();
    await rerender(<InputOTP helperText="Sent to •••• 0123" error="That code didn’t match" />);
    expect(screen.queryByText('Sent to •••• 0123')).toBeNull();
    expect(screen.getByText('That code didn’t match')).toBeTruthy();
    expect(input().props.accessibilityHint).toBe('That code didn’t match');
  });

  it('takes the code out of a pasted message and ignores letters on a numeric field', async () => {
    const onValueChange = jest.fn();
    await render(<InputOTP onValueChange={onValueChange} />);
    await fireEvent.changeText(input(), 'Your code is 482-913');
    expect(onValueChange).toHaveBeenLastCalledWith('482913');
    onValueChange.mockClear();
    await fireEvent.changeText(input(), '482913x');
    expect(onValueChange).not.toHaveBeenCalled();
  });

  it('shows dots when secure', async () => {
    await render(<InputOTP length={4} defaultValue="12" secureTextEntry testID="otp" />);
    expect(cellText(0)).toHaveTextContent('•');
    expect(cellText(1)).toHaveTextContent('•');
  });

  it('follows a controlled value without reporting it back', async () => {
    const onValueChange = jest.fn();
    const onComplete = jest.fn();
    const { rerender } = await render(<InputOTP length={4} value="" onValueChange={onValueChange} onComplete={onComplete} testID="otp" />);
    await rerender(<InputOTP length={4} value="5678" onValueChange={onValueChange} onComplete={onComplete} testID="otp" />);
    expect(input().props.value).toBe('5678');
    expect(onValueChange).not.toHaveBeenCalled();
    expect(onComplete).not.toHaveBeenCalled();
  });

  it('offers the code from a text message on a number pad', async () => {
    await render(<InputOTP />);
    expect(input().props).toMatchObject({ textContentType: 'oneTimeCode', keyboardType: 'number-pad', maxLength: 6 });
  });

  it('focuses and clears through its ref, without reporting the clear', async () => {
    const ref = createRef<InputOTPHandle>();
    const onValueChange = jest.fn();
    await render(<InputOTP ref={ref} defaultValue="1234" onValueChange={onValueChange} />);
    // The jest preset's TextInput shares one mock focus across instances.
    const { focus } = TextInput.prototype as unknown as { focus: jest.Mock };
    focus.mockClear();
    act(() => ref.current?.focus());
    expect(focus).toHaveBeenCalled();
    await act(async () => ref.current?.clear());
    expect(input().props.value).toBe('');
    expect(onValueChange).not.toHaveBeenCalled();
  });

  it('fills its cells left to right in a right-to-left app, as codes read', async () => {
    await render(
      <PatineProvider dir="rtl">
        <InputOTP length={4} testID="otp" />
      </PatineProvider>
    );
    const row = cellText(0).parent;
    expect(StyleSheet.flatten(row?.props.style).direction).toBe('ltr');
  });
});
