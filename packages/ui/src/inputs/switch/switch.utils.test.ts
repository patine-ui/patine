import { SWITCH_DESIGN } from './switch.constants';
import { getThumbTravel } from './switch.utils';

describe('getThumbTravel', () => {
  it('keeps an even inset at both ends', () => {
    expect(getThumbTravel(SWITCH_DESIGN.ios)).toEqual({ off: 2, on: 22 });
  });

  it('accounts for a thumb that grows when on', () => {
    expect(getThumbTravel(SWITCH_DESIGN.material)).toEqual({ off: 8, on: 24 });
  });
});
