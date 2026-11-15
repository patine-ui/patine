import { clampStep, formatStep, stepStatus } from './steps.utils';

describe('steps utils', () => {
  it('marks steps before the current one done, and errors over all', () => {
    const step = { title: 'Pay' };
    expect([0, 1, 2].map((i) => stepStatus(step, i, 1))).toEqual(['complete', 'current', 'upcoming']);
    expect(stepStatus({ title: 'Pay', error: true }, 0, 2)).toBe('error');
  });

  it('fills the caption and holds the step to the list', () => {
    expect(formatStep('Step {page} of {count}', 2, 4)).toBe('Step 2 of 4');
    expect(clampStep(9, 4)).toBe(4);
    expect(clampStep(-1, 4)).toBe(0);
  });
});
