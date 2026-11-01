import { Select } from '@/inputs/select';
import { withSheetHeight } from '@/inputs/select/select.utils';
import { useTimeZoneOptions } from './hooks/useTimeZoneOptions';
import { DEFAULT_TIME_ZONE_PLACEHOLDER, DEFAULT_TIME_ZONE_SEARCH_PLACEHOLDER } from './timezone.constants';
import type { TimeZonePickerProps } from './timezone.types';
import { normalizeTimeZoneValue } from './timezone.utils';

export const TimeZonePicker = ({
  timeZones,
  preferred,
  preferredLabel,
  allTimeZonesLabel,
  locale,
  date,
  placeholder = DEFAULT_TIME_ZONE_PLACEHOLDER,
  searchPlaceholder = DEFAULT_TIME_ZONE_SEARCH_PLACEHOLDER,
  sheet,
  ...selectProps
}: TimeZonePickerProps) => {
  const options = useTimeZoneOptions({
    timeZones,
    preferred,
    preferredLabel,
    allTimeZonesLabel,
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
