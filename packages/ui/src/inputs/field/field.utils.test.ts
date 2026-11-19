import { canStep, clampValue, parseNumber, stepValue } from './field.utils';

describe('clampValue', () => {
  it('keeps the value in range and drops float noise', () => {
    expect(clampValue(12, { min: 0, max: 10 })).toBe(10);
    expect(clampValue(-1, { min: 0 })).toBe(0);
    expect(clampValue(0.1 + 0.2, { step: 0.1 })).toBe(0.3);
  });
});

describe('stepValue', () => {
  it('moves one step within the range', () => {
    expect(stepValue(4, 1, { max: 5 })).toBe(5);
    expect(stepValue(5, 1, { max: 5 })).toBe(5);
    expect(stepValue(0.2, 1, { step: 0.1 })).toBe(0.3);
    expect(stepValue(1, -1, { min: 1 })).toBe(1);
  });

  it('starts an empty field at the minimum, or zero', () => {
    expect(stepValue(null, 1, { min: 2 })).toBe(2);
    expect(stepValue(null, -1, {})).toBe(0);
  });
});

describe('canStep', () => {
  it('stops at the ends', () => {
    expect(canStep(5, 1, { max: 5 })).toBe(false);
    expect(canStep(5, -1, { max: 5 })).toBe(true);
    expect(canStep(null, 1, { max: 5 })).toBe(true);
  });
});

describe('parseNumber', () => {
  it('reads numbers, with a comma as decimal point or grouping', () => {
    expect(parseNumber('42', null)).toBe(42);
    expect(parseNumber(' 3,5 ', null)).toBe(3.5);
    expect(parseNumber('1,250', null)).toBe(1250);
    expect(parseNumber('1 000', null)).toBe(1000);
    expect(parseNumber('-2.75', null)).toBe(-2.75);
  });

  it('is null when empty, and the fallback when not a number', () => {
    expect(parseNumber('', 3)).toBeNull();
    expect(parseNumber('abc', 3)).toBe(3);
  });
});
