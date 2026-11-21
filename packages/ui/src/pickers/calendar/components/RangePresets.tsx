import { useLabels } from '@/core/theme/ThemeProvider';
import { ChoiceList } from '@/inputs/segmented/ChoiceList';
import { CHOICE_VARIANT } from '@/inputs/segmented/segmented.constants';
import { styles } from '@/pickers/calendar/calendar.styles';
import type { RangePresetsProps } from '@/pickers/calendar/calendar.types';
import { getPresetItems, isSameRange } from '@/pickers/calendar/calendar.utils';

/** Chips that pick a whole range in one tap; the one matching the range shows selected. */
export const RangePresets = ({ presets, range, rules, isDisabled, onSelect, theme, listProps }: RangePresetsProps) => {
  const words = useLabels();
  return (
    <ChoiceList
      variant={CHOICE_VARIANT.chips}
      aria-label={words.calendar.presets}
      theme={theme}
      {...listProps}
      items={getPresetItems(presets, rules, isDisabled)}
      value={range}
      isEqual={isSameRange}
      onValueChange={onSelect}
      style={[styles.presets, listProps?.style]}
    />
  );
};
