import { lightTheme } from '@/core/theme/theme.constants';
import { getBoneShape } from './skeleton.utils';

describe('getBoneShape', () => {
  it('takes a theme radius step or points', () => {
    expect(getBoneShape(lightTheme, '100%', 16, 'sm')).toEqual({ width: '100%', height: 16, borderRadius: lightTheme.radius.sm });
    expect(getBoneShape(lightTheme, 40, 40, 20)).toEqual({ width: 40, height: 40, borderRadius: 20 });
  });
});
