import { act, renderHook } from '@testing-library/react-native';

import { useTabsIndicator } from './useTabsIndicator';

const box = (x: number) => ({
  x,
  y: 0,
  width: 80,
  height: 36,
});

describe('useTabsIndicator', () => {
  it('jumps under the active tab once it is laid out, and hides while the active tab has no layout', async () => {
    const { result, rerender } = await renderHook(({ selected }: { selected: string }) => useTabsIndicator(selected, false, 200), {
      initialProps: { selected: 'a' },
    });
    expect(result.current.placed).toBe(false);
    await act(() => {
      result.current.onTabLayout('b', box(80));
      result.current.onTabLayout('a', box(0));
    });
    expect(result.current.placed).toBe(true);
    expect(result.current.style).toEqual({ left: expect.anything(), width: expect.anything() });
    expect(JSON.stringify((result.current.style as { width: unknown }).width)).toBe('80');

    await rerender({ selected: 'missing' });
    expect(result.current.placed).toBe(false);
  });

  it('runs along the column when vertical', async () => {
    const { result } = await renderHook(() => useTabsIndicator('a', true, 200));
    await act(() => result.current.onTabLayout('a', { x: 0, y: 40, width: 120, height: 44 }));
    expect(JSON.stringify((result.current.style as { top: unknown }).top)).toBe('40');
    expect(JSON.stringify((result.current.style as { height: unknown }).height)).toBe('44');
  });
});
