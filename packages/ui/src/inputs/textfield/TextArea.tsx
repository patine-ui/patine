import { FieldInput } from './components/FieldInput';
import type { TextAreaProps } from './textfield.types';

/** A multiline TextField that grows with its text from `minRows` to `maxRows` lines (or stays at `rows`), with an optional character count. */
export const TextArea = (props: TextAreaProps) => <FieldInput {...props} multiline />;
