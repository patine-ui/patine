import { renderHook } from '@testing-library/react-native';

import { useScrollLock } from './useScrollLock';

describe('useScrollLock', () => {
  const body = { style: { overflow: 'auto' } };
  beforeAll(() => Reflect.set(globalThis, 'document', { body }));
  afterAll(() => Reflect.deleteProperty(globalThis, 'document'));

  it('locks the page while any overlay is open and restores it after the last one closes', async () => {
    const outer = await renderHook(({ on }: { on: boolean }) => useScrollLock(on), { initialProps: { on: true } });
    expect(body.style.overflow).toBe('hidden');
    const inner = await renderHook(() => useScrollLock(true));
    await inner.unmount();
    expect(body.style.overflow).toBe('hidden');
    await outer.rerender({ on: false });
    expect(body.style.overflow).toBe('auto');
  });
});
