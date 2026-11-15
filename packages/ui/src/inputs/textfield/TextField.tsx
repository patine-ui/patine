import { FieldInput } from './components/FieldInput';
import type { TextFieldProps } from './textfield.types';

/**
 * A single-line text input that looks like the design's picker fields: label, outline, helper text and error. Controlled with
 * `value` + `onValueChange`, or uncontrolled with `defaultValue`. Adds a clear button, a password Show / Hide toggle, icons,
 * prefix and suffix text and a character count; other `TextInput` props pass through.
 */
export const TextField = (props: TextFieldProps) => <FieldInput {...props} />;
