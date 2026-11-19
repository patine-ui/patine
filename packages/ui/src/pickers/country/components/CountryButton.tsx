import { Text } from '@/core/primitives/Text';
import { Touchable } from '@/core/primitives/Touchable';
import { useLabels } from '@/core/theme/ThemeProvider';
import { Chevron } from '@/overlays/sheet/components/Chevron';
import { styles, themed } from '@/pickers/country/country.styles';
import type { CountryButtonProps } from '@/pickers/country/country.types';
import { getCallingCode } from '@/pickers/country/country.utils';
import { CountryFlag } from './CountryFlag';

/** The flag and calling code at the start of a phone field; it opens the country list. */
export const CountryButton = ({ country, open, picking, disabled, theme, slots, testID }: CountryButtonProps) => {
  const words = useLabels();
  const callingCode = `+${getCallingCode(country.code)}`;
  return (
    <Touchable
      theme={theme}
      ripple={false}
      onPress={open}
      disabled={disabled}
      role="button"
      aria-label={`${words.country.code}: ${country.name} ${callingCode}`}
      aria-disabled={disabled}
      aria-expanded={picking}
      style={[styles.countryButton, themed(theme).countryButton, slots?.countryButton]}
      testID={testID}
    >
      <CountryFlag code={country.code} />
      <Text theme={theme} style={slots?.dialCode}>
        {callingCode}
      </Text>
      <Chevron open={picking} theme={theme} style={slots?.chevron} />
    </Touchable>
  );
};
