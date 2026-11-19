import { ARROW_FOCUS } from '@/core/a11y/keyboard.utils';
import { View } from '@/core/primitives/View';
import { DEFAULT_PANEL_ROWS } from '@/pickers/time/time.constants';
import { styles, themed } from '@/pickers/time/time.styles';
import type { TimePanelProps } from '@/pickers/time/time.types';
import { TimePanelColumn } from './TimePanelColumn';

/** The web's time picker: hours, minutes (and seconds) and AM/PM side by side, each a column of cells to click, the chosen one filled. */
export const TimePanel = ({ columns, visibleRows = DEFAULT_PANEL_ROWS, theme, style, testID }: TimePanelProps) => (
  <View style={[styles.panel, themed(theme).panel, style]} {...ARROW_FOCUS} testID={testID}>
    {columns.map((column) => (
      <TimePanelColumn key={column.key} column={column} visibleRows={visibleRows} theme={theme} />
    ))}
  </View>
);
