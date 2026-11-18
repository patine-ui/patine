import { act, renderHook } from '@testing-library/react-native';

import { useImageStatus } from './useImageStatus';

describe('useImageStatus', () => {
  it('settles, and starts over for a new source', async () => {
    const onLoad = jest.fn();
    const { result, rerender } = await renderHook(({ uri }: { uri: string }) => useImageStatus({ uri }, onLoad), {
      initialProps: { uri: 'a' },
    });
    expect(result.current.status).toBe('loading');
    await act(() => result.current.handleLoad());
    expect(result.current.status).toBe('loaded');
    expect(onLoad).toHaveBeenCalledTimes(1);
    await rerender({ uri: 'b' });
    expect(result.current.status).toBe('loading');
    await act(() => result.current.handleError());
    expect(result.current.status).toBe('error');
  });

  it('is an error without a source', async () => {
    const { result } = await renderHook(() => useImageStatus(undefined));
    expect(result.current.status).toBe('error');
  });
});
