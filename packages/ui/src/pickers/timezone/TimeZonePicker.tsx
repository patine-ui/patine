import { useLabels } from '@/core/theme/ThemeProvider';
import { Select } from '@/inputs/select';
import { withSheetHeight } from '@/inputs/select/select.utils';
import { useTimeZoneOptions } from './hooks/useTimeZoneOptions';
import type { TimeZonePickerProps } from './timezone.types';
import { normalizeTimeZoneValue } from './timezone.utils';

export const TimeZonePicker = ({
  timeZones,
  preferred,
  preferredLabel,
  allTimeZonesLabel,
  locale,
  date,
  placeholder: placeholderProp,
  searchPlaceholder: searchPlaceholderProp,
  sheet,
  ...selectProps
}: TimeZonePickerProps) => {
  const words = useLabels();
  const searchPlaceholder = searchPlaceholderProp ?? words.timeZone.search;
  const placeholder = placeholderProp ?? words.timeZone.placeholder;
  const options = useTimeZoneOptions({
    timeZones,
    preferred,
    preferredLabel: preferredLabel ?? words.timeZone.current,
    allTimeZonesLabel: allTimeZonesLabel ?? words.timeZone.all,
    locale,
    date,
  });
  return (
    <Select<string>
      {...normalizeTimeZoneValue(selectProps)}
      options={options}
      placeholder={placeholder}
      searchPlaceholder={searchPlaceholder}
      sheet={withSheetHeight(sheet)}
    />
  );
};
