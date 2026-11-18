import { SWITCH_DESIGN } from './switch.constants';
import { getThumbMotion, getThumbTravel } from './switch.utils';

describe('getThumbTravel', () => {
  it('keeps an even inset at both ends', () => {
    expect(getThumbTravel(SWITCH_DESIGN.ios)).toEqual({ off: 2, on: 22 });
  });

  it('accounts for a thumb that grows when on', () => {
    expect(getThumbTravel(SWITCH_DESIGN.material)).toEqual({ off: 8, on: 24 });
  });
});

describe('getThumbMotion', () => {
  it('draws the thumb at its on size and scales it down about the same centre while off', () => {
    const motion = getThumbMotion(SWITCH_DESIGN.material);
    expect(motion).toEqual({ size: 24, x: { off: 4, on: 24 }, scaleOff: 16 / 24 });
    // The off thumb's centre: 8 + 16 / 2 = 4 + 24 / 2.
    expect(motion.x.off + motion.size / 2).toBe(getThumbTravel(SWITCH_DESIGN.material).off + 16 / 2);
  });

  it('leaves a thumb that keeps its size unscaled', () => {
    expect(getThumbMotion(SWITCH_DESIGN.ios)).toEqual({ size: 27, x: { off: 2, on: 22 }, scaleOff: 1 });
  });
});
