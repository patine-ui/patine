import { useState } from 'react';

import { useControllableState } from '@/core/hooks/useControllableState';
import { TIME_RANGE_END } from '@/pickers/time/time.constants';
import type { TimeRangeEnd, TimeRangePickerProps } from '@/pickers/time/time.types';
import { fitTimeRange, getDefaultTimeRange } from '@/pickers/time/time.utils';

/** The range, which end the picker is editing, and moving that end within the rules. */
export const useTimeRange = ({ value, defaultValue, onValueChange, minDuration, maxDuration, allowOvernight }: TimeRangePickerProps) => {
  const rules = {
    minDuration,
    maxDuration,
    allowOvernight,
  };
  const [range, setRange] = useControllableState(value, () => defaultValue ?? getDefaultTimeRange(new Date(), rules), onValueChange);
  const [active, setActive] = useState<TimeRangeEnd>(TIME_RANGE_END.start);
  const move = (end: TimeRangeEnd, time: Date) => setRange(fitTimeRange(range, end, time, rules));
  return {
    range,
    active,
    setActive,
    move,
  };
};
