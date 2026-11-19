import { ARROW_FOCUS } from '@/core/a11y/keyboard.utils';
import { SearchInput } from '@/core/components/SearchInput';
import { Text } from '@/core/primitives/Text';
import { View } from '@/core/primitives/View';
import { VirtualList } from '@/core/primitives/VirtualList';
import { ThemeScope, useComponentTheme, useLabels } from '@/core/theme/ThemeProvider';
import { CreateRow } from './components/CreateRow';
import { GroupHeader } from './components/GroupHeader';
import { LoadingState } from './components/LoadingState';
import { OptionRow } from './components/OptionRow';
import { useSelectList } from './hooks/useSelectList';
import { useSelectValue } from './hooks/useSelectValue';
import { DEFAULT_SEARCH_PROMPT, NO_OPTIONS, SELECT_ROW_TYPE } from './select.constants';
import { styles, themed } from './select.styles';
import type { SelectListProps, SelectRow } from './select.types';
import { defaultFilter, getEmptyMessage, getListHeight, getRowKey, isOptionDisabled, keepAll, shouldShowSearch } from './select.utils';

export const SelectList = <T,>(listProps: SelectListProps<T>) => {
  const { props } = useSelectValue<T, SelectListProps<T>>(listProps);
  const {
    options = NO_OPTIONS,
    searchable,
    searchPlaceholder: searchPlaceholderProp,
    filterOption = props.loadOptions || props.onSearchChange ? keepAll : defaultFilter,
    renderOption,
    renderGroupHeader,
    createLabel: createLabelProp,
    emptyText: emptyTextProp,
    searchPrompt = DEFAULT_SEARCH_PROMPT,
    loading = false,
    loadingText: loadingTextProp,
    renderLoading,
    onEndReached,
    showCheckmarks = true,
    isEqual = Object.is,
    listHeight,
    autoFocusSearch,
    style,
    styles: slots,
    theme: themeProp,
    design,
    testID,
  } = props;
  const words = useLabels();
  const createLabel = createLabelProp ?? words.create;
  const loadingText = loadingTextProp ?? words.loading;
  const emptyText = emptyTextProp ?? words.noResults;
  const searchPlaceholder = searchPlaceholderProp ?? words.search;
  const { theme, themeOverride } = useComponentTheme(themeProp, design);
  const { query, setQuery, rows, pending, atMax, isSelected, toggle, create } = useSelectList(props, filterOption, isEqual);
  const showLoader = loading || pending;
  const remote = !!(props.loadOptions || props.onSearchChange);

  const loader = <LoadingState text={loadingText} renderLoading={renderLoading} theme={theme} slots={slots} />;

  const renderRow = ({ item }: { item: SelectRow<T> }) => {
    if (item.type === SELECT_ROW_TYPE.header) {
      return <GroupHeader group={item.group} renderGroupHeader={renderGroupHeader} theme={theme} slots={slots} />;
    }
    if (item.type === SELECT_ROW_TYPE.create) {
      return <CreateRow text={item.text} label={createLabel(item.text)} onCreate={create} theme={theme} slots={slots} />;
    }
    const selected = isSelected(item.option.value);
    return (
      <OptionRow
        option={item.option}
        selected={selected}
        disabled={isOptionDisabled(item.option, selected, atMax)}
        multiple={!!props.multiple}
        showCheckmarks={showCheckmarks}
        renderOption={renderOption}
        onToggle={toggle}
        theme={theme}
        slots={slots}
      />
    );
  };

  return (
    <ThemeScope theme={themeOverride}>
      <View style={[style, slots?.container]} {...ARROW_FOCUS} testID={testID}>
        {props.query === undefined && shouldShowSearch(searchable, options.length, remote) && (
          <View style={[themed(theme).search, slots?.search]}>
            <SearchInput
              value={query}
              onChangeText={setQuery}
              placeholder={searchPlaceholder}
              autoFocus={autoFocusSearch}
              theme={theme}
              style={slots?.searchInput}
            />
          </View>
        )}
        <VirtualList
          data={rows}
          keyExtractor={getRowKey}
          renderItem={renderRow}
          onEndReached={onEndReached}
          ListFooterComponent={showLoader && rows.length > 0 ? loader : undefined}
          style={[getListHeight(listHeight), slots?.list]}
          ListEmptyComponent={
            showLoader ? (
              loader
            ) : (
              <View style={[styles.empty, themed(theme).empty, slots?.empty]}>
                <Text color="textSecondary" style={slots?.emptyText}>
                  {getEmptyMessage(remote, query, searchPrompt, emptyText)}
                </Text>
              </View>
            )
          }
        />
      </View>
    </ThemeScope>
  );
};
