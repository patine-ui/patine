import { ARROW_FOCUS } from '@/core/a11y/keyboard.utils';
import { OwnScroll } from '@/core/primitives/OwnScroll';
import { Text } from '@/core/primitives/Text';
import { View } from '@/core/primitives/View';
import { VirtualList } from '@/core/primitives/VirtualList';
import { ThemeScope, useComponentTheme, useLabels } from '@/core/theme/ThemeProvider';
import { CategoryBar } from './components/CategoryBar';
import { EmojiGridRow } from './components/EmojiGridRow';
import { EmojiHeader } from './components/EmojiHeader';
import { SectionHeader } from './components/SectionHeader';
import { SkinToneMenu } from './components/SkinToneMenu';
import { SkinTonePopover } from './components/SkinTonePopover';
import {
  CATEGORY_BAR_POSITION,
  DEFAULT_CATEGORY_ICONS,
  DEFAULT_COLUMNS,
  DEFAULT_HEIGHT,
  DEFAULT_MAX_RECENT,
  EMOJI_CATEGORIES,
  EMOJI_DESIGN,
  EMOJI_ROW_TYPE,
} from './emoji.constants';
import { styles, themed } from './emoji.styles';
import type { EmojiPickerProps, EmojiRow } from './emoji.types';
import { getEmojiFontSize, getInitialRowCount, getRowKey, getVisibleTabs } from './emoji.utils';
import { useEmojiGrid } from './hooks/useEmojiGrid';
import { useEmojiSelection } from './hooks/useEmojiSelection';
import { useTonePopover } from './hooks/useTonePopover';

export const EmojiPicker = (props: EmojiPickerProps) => {
  const {
    columns = DEFAULT_COLUMNS,
    emojiSize,
    height = DEFAULT_HEIGHT,
    categories = EMOJI_CATEGORIES,
    exclude,
    maxEmojiVersion,
    searchable = true,
    searchPlaceholder: searchPlaceholderProp,
    emptyText: emptyTextProp,
    showCategoryBar = true,
    categoryBarPosition: categoryBarPositionProp = CATEGORY_BAR_POSITION.auto,
    showSectionHeaders = true,
    categoryLabels,
    categoryIcons,
    showSkinTones = true,
    showRecent = true,
    maxRecent = DEFAULT_MAX_RECENT,
    renderEmoji,
    style,
    styles: slots,
    theme: themeProp,
    design,
    testID,
  } = props;
  const words = useLabels();
  const emptyText = emptyTextProp ?? words.emoji.empty;
  const searchPlaceholder = searchPlaceholderProp ?? words.emoji.search;
  const { theme, themeOverride } = useComponentTheme(themeProp, design);
  const categoryBarPosition =
    categoryBarPositionProp === CATEGORY_BAR_POSITION.auto ? EMOJI_DESIGN[theme.design].categoryBarPosition : categoryBarPositionProp;
  const selection = useEmojiSelection(props, showRecent, maxRecent);
  const grid = useEmojiGrid({
    recent: selection.recent,
    categories,
    exclude,
    maxEmojiVersion,
    showRecent,
    showSectionHeaders,
    columns,
  });
  const fontSize = getEmojiFontSize(grid.cellSize, emojiSize);
  const popover = useTonePopover(grid.cellSize, selection.select);
  const labels = { ...words.emoji.categories, ...categoryLabels };

  const renderRow = ({ item }: { item: EmojiRow }) =>
    item.type === EMOJI_ROW_TYPE.header ? (
      <SectionHeader label={labels[item.key]} theme={theme} slots={slots} />
    ) : (
      <EmojiGridRow
        items={item.items}
        chars={item.chars}
        tone={selection.tone}
        size={grid.cellSize}
        fontSize={fontSize}
        renderEmoji={renderEmoji}
        onSelect={selection.select}
        onLongPress={showSkinTones ? popover.open : undefined}
        theme={theme}
        slots={slots}
      />
    );

  const categoryBar = showCategoryBar && !grid.query && (
    <CategoryBar
      tabs={getVisibleTabs(categories, grid.headerIndex)}
      active={grid.active}
      position={categoryBarPosition}
      labels={labels}
      icons={{ ...DEFAULT_CATEGORY_ICONS, ...categoryIcons }}
      onSelect={grid.jumpTo}
      theme={theme}
      slots={slots}
    />
  );

  return (
    <ThemeScope theme={themeOverride}>
      <View
        ref={popover.rootRef}
        style={[{ height, backgroundColor: theme.colors.background }, style, slots?.container]}
        {...ARROW_FOCUS}
        testID={testID}
      >
        {(searchable || showSkinTones) && (
          <EmojiHeader
            searchable={searchable}
            showSkinTones={showSkinTones}
            query={grid.query}
            onQueryChange={grid.search}
            searchPlaceholder={searchPlaceholder}
            tone={selection.tone}
            onToneButtonPress={selection.toggleToneMenu}
            theme={theme}
            slots={slots}
          />
        )}
        {selection.toneMenuOpen && <SkinToneMenu tone={selection.tone} onSelect={selection.pickTone} theme={theme} slots={slots} />}
        {categoryBarPosition === CATEGORY_BAR_POSITION.top && categoryBar}
        <View style={[styles.flex, themed(theme).list]} onLayout={grid.onLayout} testID={testID ? `${testID}-grid` : undefined}>
          {grid.measured && (
            <OwnScroll>
              <VirtualList
                ref={grid.listRef}
                data={grid.rows}
                renderItem={renderRow}
                keyExtractor={getRowKey}
                getItemLayout={grid.getItemLayout}
                onScroll={grid.onScroll}
                scrollEventThrottle={32}
                initialNumToRender={getInitialRowCount(height, grid.cellSize)}
                maxToRenderPerBatch={8}
                windowSize={7}
                ListEmptyComponent={
                  <View style={[styles.empty, themed(theme).empty, slots?.empty]}>
                    <Text theme={theme} color="textSecondary" style={slots?.emptyText}>
                      {emptyText}
                    </Text>
                  </View>
                }
              />
            </OwnScroll>
          )}
        </View>
        {categoryBarPosition === CATEGORY_BAR_POSITION.bottom && categoryBar}
        {popover.target && (
          <SkinTonePopover
            {...popover.target}
            size={grid.cellSize}
            fontSize={fontSize}
            renderEmoji={renderEmoji}
            onSelect={popover.pick}
            onClose={popover.close}
            theme={theme}
            slots={slots}
          />
        )}
      </View>
    </ThemeScope>
  );
};
