import { AccessibilityInfo } from 'react-native';

import { act, renderHook } from '@testing-library/react-native';

import { useReducedMotion } from './useReducedMotion';

describe('useReducedMotion', () => {
  it('follows the OS setting as it changes', async () => {
    const add = jest.spyOn(AccessibilityInfo, 'addEventListener');
    const { result } = await renderHook(() => useReducedMotion());
    expect(result.current).toBe(false);
    const onValueChange = add.mock.calls.find(([event]) => event === 'reduceMotionChanged')?.[1] as (on: boolean) => void;
    await act(() => onValueChange(true));
    expect(result.current).toBe(true);
    await act(() => onValueChange(false));
    expect(result.current).toBe(false);
  });
});
