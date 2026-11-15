import { getDrawerWidth, resolveModalLayout } from './modal.utils';

describe('resolveModalLayout', () => {
  it('fills a phone screen, except a small modal, and centers on a wide one', () => {
    expect(resolveModalLayout('md', undefined, 390)).toBe('fullScreen');
    expect(resolveModalLayout('sm', undefined, 390)).toBe('centered');
    expect(resolveModalLayout('lg', undefined, 1024)).toBe('centered');
    expect(resolveModalLayout('full', undefined, 1024)).toBe('fullScreen');
  });

  it('follows fullScreen when given', () => {
    expect(resolveModalLayout('md', false, 390)).toBe('centered');
    expect(resolveModalLayout('sm', true, 1024)).toBe('fullScreen');
  });
});

describe('getDrawerWidth', () => {
  it('keeps its size, leaving at least 15% of the screen, or fills it', () => {
    expect(getDrawerWidth('sm', 1024)).toBe(320);
    expect(getDrawerWidth('md', 390)).toBe(332);
    expect(getDrawerWidth('full', 390)).toBe(390);
  });
});
