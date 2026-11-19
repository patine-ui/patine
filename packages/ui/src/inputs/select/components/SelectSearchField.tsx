import { SEARCH_FIELD_ARROWS } from '@/core/a11y/keyboard.utils';
import { Input } from '@/core/primitives/Input';
import { View } from '@/core/primitives/View';
import { styles, themed } from '@/inputs/select/select.styles';
import type { SelectSearchFieldProps } from '@/inputs/select/select.types';
import { Chevron } from '@/overlays/sheet/components/Chevron';
import { styles as sheetStyles } from '@/overlays/sheet/sheet.styles';

/** Stands in for the field while its dropdown is open, so typing filters the options right where the value shows. */
export const SelectSearchField = ({ query, onChangeQuery, placeholder, renderChevron, theme, slots }: SelectSearchFieldProps) => (
  <View style={[sheetStyles.trigger, styles.searchField, themed(theme).searchField, slots?.trigger]}>
    <Input
      theme={theme}
      value={query}
      onChangeText={onChangeQuery}
      placeholder={placeholder}
      autoFocus
      autoCorrect={false}
      autoCapitalize="none"
      aria-label={placeholder}
      {...SEARCH_FIELD_ARROWS}
      style={[styles.flex, slots?.triggerText]}
    />
    <Chevron open renderChevron={renderChevron} theme={theme} style={slots?.chevron} />
  </View>
);
