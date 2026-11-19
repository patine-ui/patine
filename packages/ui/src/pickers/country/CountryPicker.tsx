import { useLabels } from '@/core/theme/ThemeProvider';
import { Select } from '@/inputs/select';
import { withSheetHeight } from '@/inputs/select/select.utils';
import type { CountryCode, CountryPickerProps } from './country.types';
import { useCountryOptions } from './hooks/useCountryOptions';

export const CountryPicker = ({
  countries,
  exclude,
  preferred,
  locale,
  showDialCode,
  preferredLabel,
  allCountriesLabel,
  placeholder: placeholderProp,
  searchPlaceholder: searchPlaceholderProp,
  sheet,
  ...selectProps
}: CountryPickerProps) => {
  const words = useLabels();
  const searchPlaceholder = searchPlaceholderProp ?? words.country.search;
  const placeholder = placeholderProp ?? words.country.placeholder;
  const options = useCountryOptions({
    countries,
    exclude,
    preferred,
    locale,
    showDialCode,
    preferredLabel,
    allCountriesLabel: allCountriesLabel ?? words.country.all,
  });
  return (
    <Select<CountryCode>
      {...selectProps}
      options={options}
      placeholder={placeholder}
      searchPlaceholder={searchPlaceholder}
      sheet={withSheetHeight(sheet)}
    />
  );
};
