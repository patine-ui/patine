import { useLabels } from '@/core/theme/ThemeProvider';
import { Select } from '@/inputs/select';
import { withSheetHeight } from '@/inputs/select/select.utils';
import { useLanguageOptions } from './hooks/useLanguageOptions';
import type { LanguageCode, LanguagePickerProps } from './language.types';

/** A searchable language list: each language under its own name, such as Español, with its name in `locale` below. */
export const LanguagePicker = ({
  languages,
  exclude,
  preferred,
  locale,
  showFlag,
  flags,
  preferredLabel,
  allLanguagesLabel,
  placeholder: placeholderProp,
  searchPlaceholder: searchPlaceholderProp,
  sheet,
  ...selectProps
}: LanguagePickerProps) => {
  const words = useLabels();
  const searchPlaceholder = searchPlaceholderProp ?? words.language.search;
  const placeholder = placeholderProp ?? words.language.placeholder;
  const options = useLanguageOptions({
    languages,
    exclude,
    preferred,
    locale,
    showFlag,
    flags,
    preferredLabel,
    allLanguagesLabel: allLanguagesLabel ?? words.language.all,
  });
  return (
    <Select<LanguageCode>
      {...selectProps}
      options={options}
      placeholder={placeholder}
      searchPlaceholder={searchPlaceholder}
      sheet={withSheetHeight(sheet)}
    />
  );
};
