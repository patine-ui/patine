import { useMemo } from 'react';

import type { TimeZoneListOptions } from '@/pickers/timezone/timezone.types';
import { buildTimeZoneOptions } from '@/pickers/timezone/timezone.utils';

/** The zone options, rebuilt only when a list option changes. */
export const useTimeZoneOptions = ({ timeZones, preferred, preferredLabel, allTimeZonesLabel, locale, date }: TimeZoneListOptions) =>
  useMemo(
    () =>
      buildTimeZoneOptions({
        timeZones,
        preferred,
        preferredLabel,
        allTimeZonesLabel,
        locale,
        date,
      }),
    [timeZones, preferred, preferredLabel, allTimeZonesLabel, locale, date]
  );
