import { lightTheme } from '@/core/theme/theme.constants';
import { getDialogButton, getFooterDirection, resolveDialogRadius } from './dialog.utils';

describe('resolveDialogRadius', () => {
  it('reads a theme step, or keeps points', () => {
    expect(resolveDialogRadius('lg', lightTheme)).toBe(lightTheme.radius.lg);
    expect(resolveDialogRadius(28, lightTheme)).toBe(28);
  });
});

describe('getDialogButton', () => {
  it('keeps the variant in filled designs', () => {
    expect(getDialogButton('filled', 'destructive')).toEqual({ variant: 'destructive' });
    expect(getDialogButton('filled', 'outline')).toEqual({ variant: 'outline' });
  });

  it('draws text buttons in primary, or danger when destructive', () => {
    expect(getDialogButton('text', 'default')).toEqual({ variant: 'ghost', color: 'primary' });
    expect(getDialogButton('text', 'destructive')).toEqual({ variant: 'ghost', color: 'danger' });
  });
});

describe('getFooterDirection', () => {
  it('stacks iOS cells past two buttons', () => {
    expect(getFooterDirection('cells', 2)).toBe('row');
    expect(getFooterDirection('cells', 3)).toBe('column');
  });

  it('keeps a row in the other designs', () => {
    expect(getFooterDirection('row', 4)).toBe('row');
  });
});
