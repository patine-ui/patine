import { useMemo } from 'react';

import type { DurationColumnsOptions } from '@/pickers/duration/duration.types';
import {
  clampDuration,
  getDurationColumnSpecs,
  getDurationParts,
  resolveDurationOptions,
  toSeconds,
} from '@/pickers/duration/duration.utils';

/** The hours / minutes / seconds wheel columns for `value`, in seconds. */
export const useDurationColumns = ({
  value,
  onValueChange,
  onValueChanging,
  showHours,
  showSeconds,
  min,
  max,
  minuteInterval,
  secondInterval,
  labels,
  loop = true,
  testID,
}: DurationColumnsOptions) => {
  const hoursLabel = labels?.hours;
  const minutesLabel = labels?.minutes;
  const secondsLabel = labels?.seconds;

  return useMemo(() => {
    const options = resolveDurationOptions({
      showHours,
      showSeconds,
      min,
      max,
      minuteInterval,
      secondInterval,
      labels: { hours: hoursLabel, minutes: minutesLabel, seconds: secondsLabel },
    });
    const parts = getDurationParts(value, options);
    return getDurationColumnSpecs(parts, options, loop).map(({ toPatch, ...column }) => {
      const durationFor = (v: number) => toSeconds({ ...parts, ...toPatch(v) });
      return {
        ...column,
        testID: testID ? `${testID}-${column.key}` : undefined,
        onValueChange: (v: number) => onValueChange(clampDuration(durationFor(v), options.bounds)),
        onValueChanging: onValueChanging ? (v: number) => onValueChanging(durationFor(v)) : undefined,
      };
    });
  }, [
    hoursLabel,
    loop,
    max,
    min,
    minuteInterval,
    minutesLabel,
    onValueChange,
    onValueChanging,
    secondInterval,
    secondsLabel,
    showHours,
    showSeconds,
    testID,
    value,
  ]);
};
