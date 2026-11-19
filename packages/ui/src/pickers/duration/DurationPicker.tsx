import { useControllableState } from '@/core/hooks/useControllableState';
import { ThemeScope, useComponentTheme } from '@/core/theme/ThemeProvider';
import { TimePanel } from '@/pickers/time/components/TimePanel';
import { TIME_DISPLAY } from '@/pickers/time/time.constants';
import { MultiWheelPicker } from '@/pickers/wheel';
import { DurationInput } from './components/DurationInput';
import { DURATION_DISPLAY_DESIGN } from './duration.constants';
import type { DurationPickerProps } from './duration.types';
import { useDurationColumns } from './hooks/useDurationColumns';

/** A length of time (hours, minutes and seconds), with the value in seconds: wheels, boxes to type into, or columns to click. */
export const DurationPicker = ({
  value,
  defaultValue,
  onValueChange,
  display: displayProp,
  itemHeight,
  visibleItems,
  variant,
  style,
  styles,
  theme: themeProp,
  design,
  testID,
  ...options
}: DurationPickerProps) => {
  const { theme, themeOverride } = useComponentTheme(themeProp, design);
  const [seconds, setSeconds] = useControllableState(value, defaultValue ?? 0, onValueChange);
  const columns = useDurationColumns({ ...options, value: seconds, onValueChange: setSeconds, testID });
  const display = displayProp ?? DURATION_DISPLAY_DESIGN[theme.design];

  if (display === TIME_DISPLAY.input) {
    return <DurationInput columns={columns} theme={theme} style={style} testID={testID} />;
  }
  if (display === TIME_DISPLAY.list) {
    return <TimePanel columns={columns} visibleRows={visibleItems} theme={theme} style={style} testID={testID} />;
  }
  return (
    <ThemeScope theme={themeOverride}>
      <MultiWheelPicker
        columns={columns}
        itemHeight={itemHeight}
        visibleItems={visibleItems}
        variant={variant}
        style={style}
        styles={styles}
        theme={themeOverride}
        testID={testID}
      />
    </ThemeScope>
  );
};
