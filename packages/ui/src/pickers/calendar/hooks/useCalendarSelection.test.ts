import { act, renderHook } from '@testing-library/react-native';

import type { DateRange } from '@/pickers/calendar/calendar.types';
import { useCalendarSelection } from './useCalendarSelection';

const day = (d: number) => new Date(2026, 9, d);
const none = () => false;

describe('useCalendarSelection', () => {
  it('builds ranges when uncontrolled and leaves the other modes empty', async () => {
    const onValueChange = jest.fn();
    const { result } = await renderHook(() => useCalendarSelection({ mode: 'ranges', onValueChange }, none));
    await act(() => result.current.select(day(3)));
    await act(() => result.current.select(day(5)));
    expect(result.current.selection).toEqual({
      mode: 'ranges',
      single: null,
      range: { start: null, end: null },
      multiple: [],
      ranges: [{ start: day(3), end: day(5) }],
    });
    expect(onValueChange).toHaveBeenLastCalledWith([{ start: day(3), end: day(5) }]);
  });

  it('follows the value prop when controlled', async () => {
    const onValueChange = jest.fn();
    const { result, rerender } = await renderHook(
      ({ value }: { value: DateRange[] }) => useCalendarSelection({ mode: 'ranges', value, onValueChange }, none),
      { initialProps: { value: [{ start: day(3), end: day(5) }] } }
    );
    await act(() => result.current.select(day(4)));
    expect(onValueChange).toHaveBeenCalledWith([]);
    expect(result.current.selection.ranges).toEqual([{ start: day(3), end: day(5) }]);
    await rerender({ value: [] });
    expect(result.current.selection.ranges).toEqual([]);
  });

  it('skips onValueChange when a tap is ignored', async () => {
    const onValueChange = jest.fn();
    const { result } = await renderHook(() =>
      useCalendarSelection({ mode: 'ranges', defaultValue: [{ start: day(3), end: day(5) }], maxRanges: 1, onValueChange }, none)
    );
    await act(() => result.current.select(day(10)));
    expect(onValueChange).not.toHaveBeenCalled();
  });
});
