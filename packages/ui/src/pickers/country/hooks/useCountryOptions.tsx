import { useMemo } from 'react';

import { CountryFlag } from '@/pickers/country/components/CountryFlag';
import type { CountryListOptions } from '@/pickers/country/country.types';
import { buildCountryOptions } from '@/pickers/country/country.utils';

/** The country options with their flags, rebuilt only when a list option changes. */
export const useCountryOptions = ({
  countries,
  exclude,
  preferred,
  locale,
  showDialCode,
  preferredLabel,
  allCountriesLabel,
}: CountryListOptions) =>
  useMemo(
    () =>
      buildCountryOptions({
        countries,
        exclude,
        preferred,
        locale,
        showDialCode,
        preferredLabel,
        allCountriesLabel,
      }).map((option) => ({
        ...option,
        icon: <CountryFlag code={option.value} />,
      })),
    [countries, exclude, preferred, locale, showDialCode, preferredLabel, allCountriesLabel]
  );
