import type { NumberRange } from './field.types';

/** How many decimals a step has, so 0.1 + 0.2 lands on 0.3 rather than 0.30000000000000004. */
export const stepDecimals = (step: number) => {
  const text = String(step);
  const exp = /e-(\d+)$/.exec(text);
  if (exp) return Number(exp[1]);
  return (text.split('.')[1] ?? '').length;
};

/** Keeps a value within the range, rounded to the step's decimals. */
export const clampValue = (value: number, { min = Number.NEGATIVE_INFINITY, max = Number.POSITIVE_INFINITY, step = 1 }: NumberRange) =>
  Number(Math.min(max, Math.max(min, value)).toFixed(stepDecimals(step)));

/** The value one step up (1) or down (-1), within the range. An empty field starts from `min`, or 0. */
export const stepValue = (value: number | null, direction: 1 | -1, range: NumberRange) => {
  const step = range.step ?? 1;
  if (value === null) return clampValue(range.min ?? 0, range);
  return clampValue(value + direction * step, range);
};

/** Whether stepping that way would change the value. */
export const canStep = (value: number | null, direction: 1 | -1, range: NumberRange) =>
  value === null || stepValue(value, direction, range) !== value;

/**
 * The number typed in a field: commas as decimal points are fine, spaces and grouping are dropped. Empty text is null;
 * text that isn't a number gives `fallback`, so a typo puts back the last value.
 */
export const parseNumber = (text: string, fallback: number | null): number | null => {
  const trimmed = text.trim();
  if (trimmed === '') return null;
  const normalized = trimmed
    .replace(/[\s_]/g, '')
    .replace(/,(?=\d{1,2}$)/, '.')
    .replace(/,/g, '');
  const parsed = Number(normalized);
  return Number.isFinite(parsed) ? parsed : fallback;
};
