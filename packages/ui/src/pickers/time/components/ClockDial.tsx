import { ARROW_FOCUS } from '@/core/a11y/keyboard.utils';
import { View } from '@/core/primitives/View';
import { useClockDial } from '@/pickers/time/hooks/useClockDial';
import { styles, themed } from '@/pickers/time/time.styles';
import type { ClockDialProps } from '@/pickers/time/time.types';
import { ClockHeader } from './ClockHeader';
import { DialFace } from './DialFace';
import { EntryToggle } from './EntryToggle';

/** Material's time picker: the time in large type above a clock dial (pick the hour, then the minutes), or typed in. */
export const ClockDial = ({ inputOnly = false, date, onValueChange, options, theme, style, testID }: ClockDialProps) => {
  const dial = useClockDial(date, onValueChange, options, theme.animation.duration, inputOnly);
  return (
    <View style={[styles.clock, themed(theme).clock, style]} {...ARROW_FOCUS} testID={testID}>
      <ClockHeader dial={dial} theme={theme} testID={testID} />
      {dial.typing ? null : <DialFace dial={dial} theme={theme} testID={testID ? `${testID}-dial` : undefined} />}
      {inputOnly ? null : <EntryToggle dial={dial} theme={theme} testID={testID} />}
    </View>
  );
};
