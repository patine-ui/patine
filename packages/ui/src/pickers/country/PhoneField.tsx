import { useFocus } from '@/core/a11y/hooks/useFocus';
import { cs } from '@/core/core.styles';
import { Input } from '@/core/primitives/Input';
import { View } from '@/core/primitives/View';
import { ThemeScope, useComponentTheme, useLabels } from '@/core/theme/ThemeProvider';
import { FieldFrame } from '@/overlays/sheet/components/FieldFrame';
import { FloatingLabel } from '@/overlays/sheet/components/FloatingLabel';
import { FIELD_DESIGN, FIELD_LABEL, FLOATING_LABEL_PADDING } from '@/overlays/sheet/sheet.constants';
import { fieldStyles, styles as sheetStyles } from '@/overlays/sheet/sheet.styles';
import { getFieldAccessibility } from '@/overlays/sheet/sheet.utils';
import { CountryPicker } from './CountryPicker';
import { CountryButton } from './components/CountryButton';
import { styles } from './country.styles';
import type { PhoneFieldProps } from './country.types';
import { getCountry, getPhonePlaceholder } from './country.utils';
import { usePhoneField } from './hooks/usePhoneField';

/** A phone number field: the country's flag and calling code to pick from, then the number, grouped as the country writes it. */
export const PhoneField = (props: PhoneFieldProps) => {
  const {
    label,
    placeholder,
    disabled = false,
    error,
    helperText,
    required,
    countries,
    exclude,
    preferred,
    locale,
    preferredLabel,
    allCountriesLabel,
    presentation,
    countrySheetTitle: countrySheetTitleProp,
    sheet,
    style,
    styles: slots,
    theme: themeProp,
    design,
    testID,
  } = props;
  const words = useLabels();
  const countrySheetTitle = countrySheetTitleProp ?? words.country.code;
  const { theme, themeOverride } = useComponentTheme(themeProp, design);
  const phone = usePhoneField(props);
  const focus = useFocus();
  const country = getCountry(phone.country);
  const look = FIELD_DESIGN[theme.design];
  const active = focus.focused || phone.picking;
  const borderWidth = active ? look.openBorderWidth : 1;
  const invalid = !!error;

  return (
    <ThemeScope theme={themeOverride}>
      <View style={style}>
        <FieldFrame label={label} error={error} helperText={helperText} required={required} theme={theme} slots={slots}>
          <View
            style={[
              sheetStyles.trigger,
              fieldStyles(theme).box,
              active && fieldStyles(theme).open,
              invalid && fieldStyles(theme).invalid,
              disabled && cs.disabled,
              slots?.field,
            ]}
          >
            {label && look.label === FIELD_LABEL.floating ? (
              // Raised for good: the calling code sits where a resting label would.
              <FloatingLabel
                label={label}
                raised
                open={active}
                invalid={invalid}
                required={required}
                borderWidth={borderWidth}
                theme={theme}
                style={[{ marginStart: theme.spacing.md - FLOATING_LABEL_PADDING - (borderWidth - 1) }, slots?.label]}
              />
            ) : null}
            <View style={styles.phoneRow}>
              <CountryPicker
                value={phone.country}
                onValueChange={phone.changeCountry}
                countries={countries}
                exclude={exclude}
                preferred={preferred}
                locale={locale}
                preferredLabel={preferredLabel}
                allCountriesLabel={allCountriesLabel ?? words.country.all}
                showDialCode
                presentation={presentation}
                sheetTitle={countrySheetTitle}
                sheet={sheet}
                onOpenChange={(open) => (open ? phone.openPicker() : phone.closePicker())}
                disabled={disabled}
                theme={themeOverride}
                renderTrigger={({ open }) =>
                  country ? (
                    <CountryButton
                      country={country}
                      open={open}
                      picking={phone.picking}
                      disabled={disabled}
                      theme={theme}
                      slots={slots}
                      testID={testID ? `${testID}-country` : undefined}
                    />
                  ) : null
                }
              />
              <Input
                theme={theme}
                value={phone.text}
                onChangeText={phone.changeText}
                onFocus={focus.onFocus}
                onBlur={focus.onBlur}
                placeholder={placeholder ?? getPhonePlaceholder(phone.country)}
                keyboardType="phone-pad"
                textContentType="telephoneNumber"
                autoComplete="tel"
                editable={!disabled}
                {...getFieldAccessibility({ name: label ?? words.country.phone, error, required }, words)}
                style={[styles.phoneInput, slots?.input]}
                testID={testID}
              />
            </View>
          </View>
        </FieldFrame>
      </View>
    </ThemeScope>
  );
};
