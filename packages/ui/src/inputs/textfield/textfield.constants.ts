import type { TextFieldLabels } from './textfield.types';

export const DEFAULT_TEXT_FIELD_LABELS: TextFieldLabels = {
  clear: 'Clear',
  show: 'Show',
  hide: 'Hide',
  showPassword: 'Show password',
  hidePassword: 'Hide password',
};

export const CLEAR_GLYPH = '×';
export const DEFAULT_MIN_ROWS = 3;
/** A TextArea's line height, as a multiple of its font size; its rows are this tall. */
export const LINE_HEIGHT_RATIO = 1.4;
/** Extra touch area around the clear and Show / Hide buttons, to reach 44pt. */
export const ACTION_HIT_SLOP = 10;

export const DEFAULT_SEARCH_FIELD_LABELS = {
  clear: 'Clear search',
  cancel: 'Cancel',
};

/** Room at the end of a search field for its clear button. */
export const SEARCH_CLEAR_SPACE = 36;
