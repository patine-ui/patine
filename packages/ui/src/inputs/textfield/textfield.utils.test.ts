import {
  formatCount,
  getLineHeight,
  getTextAreaHeight,
  getTextFieldAccessibility,
  isLabelRaised,
  measureTextArea,
  resolveRows,
} from './textfield.utils';

describe('resolveRows', () => {
  it('starts at 3 lines and grows without a limit by default', () => {
    expect(resolveRows()).toEqual({ min: 3, max: Number.POSITIVE_INFINITY });
  });

  it('fixes both ends with rows, and never lets max drop below min', () => {
    expect(resolveRows(4, 2, 8)).toEqual({ min: 4, max: 4 });
    expect(resolveRows(undefined, 5, 2)).toEqual({ min: 5, max: 5 });
    expect(resolveRows(undefined, 0)).toEqual({ min: 1, max: Number.POSITIVE_INFINITY });
  });
});

describe('getTextAreaHeight', () => {
  const lineHeight = getLineHeight(16);

  it('rounds the line height', () => {
    expect(lineHeight).toBe(22);
  });

  it('keeps the text height between the first and last row', () => {
    const rows = { min: 2, max: 4 };
    expect(getTextAreaHeight(0, lineHeight, rows)).toBe(44);
    expect(getTextAreaHeight(66, lineHeight, rows)).toBe(66);
    expect(getTextAreaHeight(500, lineHeight, rows)).toBe(88);
  });
});

describe('measureTextArea', () => {
  it('reads the text height at no height, then puts the height back', () => {
    const style = { height: '110px' };
    // A textarea's scrollHeight is never below its own height.
    const node = {
      style,
      get scrollHeight() {
        return Math.max(22, Number.parseFloat(style.height));
      },
    };
    expect(measureTextArea(node)).toBe(22);
    expect(style.height).toBe('110px');
  });
});

describe('formatCount', () => {
  it('counts out of maxLength when there is one', () => {
    expect(formatCount(12, 200)).toBe('12/200');
    expect(formatCount(12)).toBe('12');
  });
});

describe('isLabelRaised', () => {
  const resting = { focused: false, filled: false, hasStart: false, multiline: false };

  it('rests only in an empty, unfocused, single-line field with nothing before the text', () => {
    expect(isLabelRaised(resting)).toBe(false);
    expect(isLabelRaised({ ...resting, focused: true })).toBe(true);
    expect(isLabelRaised({ ...resting, filled: true })).toBe(true);
    expect(isLabelRaised({ ...resting, hasStart: true })).toBe(true);
    expect(isLabelRaised({ ...resting, multiline: true })).toBe(true);
  });
});

describe('getTextFieldAccessibility', () => {
  it('names the field by its label, with required, and hints the error over the helper text', () => {
    expect(
      getTextFieldAccessibility({ label: 'Email', required: true, error: 'Enter an email', helperText: 'Work email', disabled: false })
    ).toEqual({
      'aria-label': 'Email, required',
      accessibilityHint: 'Enter an email',
      'aria-labelledby': undefined,
      'aria-invalid': true,
      'aria-required': true,
      'aria-disabled': false,
    });
  });

  it('falls back to the placeholder for its name and the helper text for its hint', () => {
    expect(getTextFieldAccessibility({ placeholder: 'Search', helperText: 'By name', disabled: true, labelledBy: 'id' })).toMatchObject({
      'aria-label': 'Search',
      accessibilityHint: 'By name',
      'aria-labelledby': 'id',
      'aria-invalid': false,
      'aria-disabled': true,
    });
  });

  it('reads Invalid for an error without a message', () => {
    expect(getTextFieldAccessibility({ label: 'Name', error: true, disabled: false }).accessibilityHint).toBe('Invalid');
  });
});
