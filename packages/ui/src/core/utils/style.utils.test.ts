import { fillOf, inkOf, opacityOf, strokeOf } from './style.utils';

describe('style.utils', () => {
  it('turns runtime values into styles', () => {
    expect(fillOf('#123')).toEqual({ backgroundColor: '#123' });
    expect(strokeOf('#123')).toEqual({ borderColor: '#123' });
    expect(inkOf('#123')).toEqual({ color: '#123' });
    expect(opacityOf(0.5)).toEqual({ opacity: 0.5 });
  });
});
