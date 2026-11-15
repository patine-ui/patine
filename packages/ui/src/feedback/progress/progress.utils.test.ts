import { getProgressRatio } from './progress.utils';

describe('getProgressRatio', () => {
  it('turns a value into a share of max', () => {
    expect(getProgressRatio(25, 100)).toBe(0.25);
    expect(getProgressRatio(3, 4)).toBe(0.75);
  });

  it('clamps to 0–1', () => {
    expect(getProgressRatio(-5, 100)).toBe(0);
    expect(getProgressRatio(150, 100)).toBe(1);
    expect(getProgressRatio(5, 0)).toBe(0);
  });

  it('is null while indeterminate', () => {
    expect(getProgressRatio(undefined, 100)).toBeNull();
    expect(getProgressRatio(null, 100)).toBeNull();
    expect(getProgressRatio(Number.NaN, 100)).toBeNull();
  });
});
