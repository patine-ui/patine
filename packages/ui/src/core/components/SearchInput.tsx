import { useState } from 'react';

import { useFocus } from '@/core/a11y/hooks/useFocus';
import { SEARCH_FIELD_ARROWS } from '@/core/a11y/keyboard.utils';
import { PLATFORM, SEARCH_DESIGN } from '@/core/core.constants';
import type { SearchInputProps } from '@/core/core.types';
import { Input } from '@/core/primitives/Input';
import { View } from '@/core/primitives/View';
import { usePlatform } from '@/core/theme/ThemeProvider';
import { styles as shared, themed } from './components.styles';
import { SearchIcon } from './SearchIcon';

/** A search field drawn as the design's own: the iOS search bar, Material's pill, or an outlined web input. */
export const SearchInput = ({
  value,
  onChangeText,
  placeholder,
  autoFocus,
  theme,
  style,
  containerStyle,
  inputProps,
  children,
}: SearchInputProps) => {
  const { focused, onFocus, onBlur } = useFocus();
  const [hovered, setHovered] = useState(false);
  const platform = usePlatform();
  const design = SEARCH_DESIGN[theme.design];
  const ring = focused && (design.focusRing || platform === PLATFORM.web);
  const sheet = themed(theme);
  return (
    <View style={[shared.searchContainer, containerStyle]}>
      <Input
        theme={theme}
        onPointerEnter={() => setHovered(true)}
        onPointerLeave={() => setHovered(false)}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        autoFocus={autoFocus}
        autoCorrect={false}
        autoCapitalize="none"
        clearButtonMode="while-editing"
        aria-label={placeholder}
        {...SEARCH_FIELD_ARROWS}
        {...inputProps}
        onFocus={(e) => {
          onFocus();
          inputProps?.onFocus?.(e);
        }}
        onBlur={(e) => {
          onBlur();
          inputProps?.onBlur?.(e);
        }}
        style={[shared.searchInput, sheet.search, ring ? sheet.searchRing : hovered && !focused && sheet.searchHover, style]}
      />
      <View pointerEvents="none" style={[shared.searchIconBox, sheet.searchIcon]}>
        <SearchIcon color={theme.colors.textSecondary} />
      </View>
      {children}
    </View>
  );
};
