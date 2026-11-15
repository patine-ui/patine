import { HEADER_DESIGN } from './header.constants';
import { getTitlePlacement } from './header.utils';

describe('getTitlePlacement', () => {
  it('centres the title in the iOS bar and starts it in Material', () => {
    expect(getTitlePlacement(HEADER_DESIGN.ios, 'default')).toEqual({ inBar: true, centered: true });
    expect(getTitlePlacement(HEADER_DESIGN.material, 'default')).toEqual({ inBar: true, centered: false });
  });

  it('moves the title under the bar when large', () => {
    expect(getTitlePlacement(HEADER_DESIGN.ios, 'large')).toEqual({ inBar: false, centered: false });
  });
});
