import { View } from '@/core/primitives/View';
import { ThemeScope, useComponentTheme, useLabels } from '@/core/theme/ThemeProvider';
import { formatDuration } from '@/pickers/duration/duration.utils';
import { RangeEnds } from './components/RangeEnds';
import { useTimeRange } from './hooks/useTimeRange';
import { TimePicker } from './TimePicker';
import type { TimeRangePickerProps } from './time.types';
import { getTimeRangeEndItems, getTimeRangeSeconds } from './time.utils';

/** A start and an end time: both ends, as each design shows them, and a TimePicker that edits the end that's chosen. */
export const TimeRangePicker = (props: TimeRangePickerProps) => {
  const {
    value: _value,
    defaultValue: _defaultValue,
    onValueChange: _onChange,
    minDuration: _minDuration,
    maxDuration: _maxDuration,
    allowOvernight: _allowOvernight,
    startLabel: startLabelProp,
    endLabel: endLabelProp,
    style,
    testID,
    ...pickerProps
  } = props;
  const words = useLabels();
  const endLabel = endLabelProp ?? words.time.end;
  const startLabel = startLabelProp ?? words.time.start;
  const { theme, themeOverride } = useComponentTheme(pickerProps.theme, pickerProps.design);
  const { range, active, setActive, move } = useTimeRange(props);
  return (
    <ThemeScope theme={themeOverride}>
      <View style={style} testID={testID}>
        <RangeEnds
          items={getTimeRangeEndItems(range, { start: startLabel, end: endLabel }, pickerProps)}
          active={active}
          onSelect={setActive}
          duration={formatDuration(getTimeRangeSeconds(range))}
          theme={theme}
          testID={testID && `${testID}-ends`}
          renderPicker={(end) => (
            // A fresh picker per end, so a list or wheel opens at that end's time and a dial starts again on the hours.
            <TimePicker
              key={end}
              {...pickerProps}
              value={range[end]}
              onValueChange={(time) => move(end, time)}
              testID={testID && `${testID}-${end}`}
            />
          )}
        />
      </View>
    </ThemeScope>
  );
};
