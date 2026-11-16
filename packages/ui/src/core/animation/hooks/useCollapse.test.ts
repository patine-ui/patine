import type { LayoutChangeEvent } from 'react-native';

import { act, renderHook, waitFor } from '@testing-library/react-native';

import * as utils from '@/core/animation/animation.utils';
import { useCollapse } from './useCollapse';

const layout = (height: number) => ({ nativeEvent: { layout: { height } } }) as LayoutChangeEvent;

describe('useCollapse', () => {
  afterEach(() => jest.restoreAllMocks());

  it('mounts on open but grows only once the content is measured, then unmounts after closing', async () => {
    const timing = jest.spyOn(utils, 'timing');
    const { result, rerender } = await renderHook(({ open }: { open: boolean }) => useCollapse(open, 20), {
      initialProps: { open: false },
    });
    expect(result.current.mounted).toBe(false);
    await rerender({ open: true });
    expect(result.current.mounted).toBe(true);
    expect(timing).not.toHaveBeenCalled();
    await act(() => result.current.onContentLayout(layout(80)));
    await waitFor(() => expect(timing).toHaveBeenLastCalledWith(expect.anything(), 1, expect.objectContaining({ native: false })));
    await rerender({ open: false });
    expect(timing).toHaveBeenLastCalledWith(expect.anything(), 0, expect.anything());
    await waitFor(() => expect(result.current.mounted).toBe(false));
  });
});
