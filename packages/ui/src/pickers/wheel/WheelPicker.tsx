import type React from 'react';
import { useCallback, useMemo } from 'react';
import type { AccessibilityActionEvent, FlatList } from 'react-native';

import { KEY } from '@/core/a11y/a11y.constants';
import { keyboardProps } from '@/core/a11y/keyboard.utils';
import { OwnScroll } from '@/core/primitives/OwnScroll';
import { View } from '@/core/primitives/View';
import { AnimatedVirtualList } from '@/core/primitives/VirtualList';
import { ThemeScope, useComponentTheme } from '@/core/theme/ThemeProvider';
import { WheelIndicator } from './components/WheelIndicator';
import { WheelRow } from './components/WheelRow';
import { WheelTypingInput } from './components/WheelTypingInput';
import { useTypeToSelect } from './hooks/useTypeToSelect';
import { useWheelScroll } from './hooks/useWheelScroll';
import { DEFAULT_FADE_TO, DEFAULT_ITEM_HEIGHT, DEFAULT_ROTATION_DEG, DEFAULT_VISIBLE_ITEMS, WHEEL_VARIANT } from './wheel.constants';
import { styles } from './wheel.styles';
import type { WheelPickerProps } from './wheel.types';
import { getItemHeight, getListPadding, normalizeItem, toOddCount } from './wheel.utils';

const A11Y_ACTIONS = [{ name: 'increment' }, { name: 'decrement' }];

export const WheelPicker = <T,>(props: WheelPickerProps<T>) => {
  const {
    items: rawItems,
    value,
    defaultValue,
    onValueChange,
    onValueChanging,
    itemHeight = DEFAULT_ITEM_HEIGHT,
    visibleItems: requestedVisibleItems = DEFAULT_VISIBLE_ITEMS,
    loop = false,
    keyboardInput = true,
    variant = WHEEL_VARIANT.threeD,
    rotation = DEFAULT_ROTATION_DEG,
    fadeTo = DEFAULT_FADE_TO,
    renderItem,
    showIndicator = true,
    renderIndicator,
    textAlign = 'center',
    disabled = false,
    isEqual = Object.is,
    style,
    styles: slots,
    theme: themeProp,
    design,
    accessibilityLabel,
    testID,
  } = props;
  const { theme, themeOverride } = useComponentTheme(themeProp, design);
  const items = useMemo(() => rawItems.map((input) => normalizeItem<T>(input)), [rawItems]);
  const visibleItems = toOddCount(requestedVisibleItems);
  const padding = ((visibleItems - 1) / 2) * itemHeight;

  const typeToSelect = useTypeToSelect(items, (logicalIndex) => wheel.scrollToLogical(logicalIndex, true));
  const wheel = useWheelScroll({
    items,
    itemHeight,
    loop,
    value,
    defaultValue,
    isEqual,
    onValueChange,
    onValueChanging,
    onDragStart: typeToSelect.stopTyping,
  });
  const { active, move, scrollToData, scrollToLogical, toLogical, scrollY } = wheel;
  const { toggleTyping } = typeToSelect;

  const onRowPress = useCallback(
    (dataIndex: number) => {
      if (keyboardInput && dataIndex === active) toggleTyping();
      else scrollToData(dataIndex, true);
    },
    [active, keyboardInput, scrollToData, toggleTyping]
  );

  const onAccessibilityAction = useCallback(
    (e: AccessibilityActionEvent) => {
      if (e.nativeEvent.actionName === 'increment') move(1);
      if (e.nativeEvent.actionName === 'decrement') move(-1);
    },
    [move]
  );

  const renderRow = useCallback(
    ({ item: dataIndex }: { item: number }) => {
      const logicalIndex = toLogical(dataIndex);
      const item = items[logicalIndex];
      if (!item) return null;
      return (
        <WheelRow
          dataIndex={dataIndex}
          logicalIndex={logicalIndex}
          item={item}
          selected={dataIndex === active}
          itemHeight={itemHeight}
          visibleItems={visibleItems}
          scrollY={scrollY}
          variant={variant}
          rotation={rotation}
          fadeTo={fadeTo}
          theme={theme}
          textAlign={textAlign}
          slots={slots}
          renderItem={renderItem}
          onSelect={disabled ? undefined : onRowPress}
        />
      );
    },
    [
      active,
      disabled,
      fadeTo,
      itemHeight,
      items,
      onRowPress,
      renderItem,
      rotation,
      scrollY,
      slots,
      textAlign,
      theme,
      toLogical,
      variant,
      visibleItems,
    ]
  );

  return (
    <ThemeScope theme={themeOverride}>
      <View
        style={[styles.clip, getItemHeight(itemHeight * visibleItems), style, slots?.container]}
        onLayout={wheel.onLayout}
        accessible
        role="slider"
        aria-label={accessibilityLabel}
        aria-valuetext={wheel.activeItem?.label}
        accessibilityActions={A11Y_ACTIONS}
        onAccessibilityAction={onAccessibilityAction}
        {...(disabled
          ? null
          : keyboardProps({
              [KEY.up]: () => move(-1),
              [KEY.down]: () => move(1),
              [KEY.home]: () => scrollToLogical(0, true),
              [KEY.end]: () => scrollToLogical(items.length - 1, true),
            }))}
        testID={testID}
      >
        {showIndicator && (
          <WheelIndicator itemHeight={itemHeight} theme={theme} style={slots?.indicator} renderIndicator={renderIndicator} />
        )}
        <OwnScroll>
          <AnimatedVirtualList
            ref={wheel.listRef as React.Ref<FlatList<number>>}
            data={wheel.data}
            testID={testID ? `${testID}-list` : undefined}
            keyExtractor={(dataIndex: number) => String(dataIndex)}
            renderItem={renderRow}
            extraData={active}
            getItemLayout={(_: unknown, index: number) => ({
              length: itemHeight,
              offset: padding + itemHeight * index,
              index,
            })}
            contentContainerStyle={getListPadding(padding)}
            contentOffset={{ x: 0, y: wheel.initialDataIndex * itemHeight }}
            // iOS applies contentOffset without a scroll event, so the list would only render rows from 0.
            initialScrollIndex={Math.max(0, wheel.initialDataIndex - (visibleItems - 1) / 2)}
            showsVerticalScrollIndicator={false}
            snapToInterval={itemHeight}
            decelerationRate="fast"
            scrollEnabled={!disabled}
            scrollEventThrottle={16}
            {...wheel.scrollHandlers}
            initialNumToRender={visibleItems + 4}
            windowSize={5}
            maxToRenderPerBatch={visibleItems * 2}
            removeClippedSubviews={false}
            nestedScrollEnabled
          />
        </OwnScroll>
        {typeToSelect.typing && (
          <WheelTypingInput
            value={typeToSelect.typed ?? ''}
            numeric={typeToSelect.numeric}
            itemHeight={itemHeight}
            theme={theme}
            accessibilityLabel={accessibilityLabel}
            onChangeText={typeToSelect.onType}
            onDone={typeToSelect.stopTyping}
          />
        )}
      </View>
    </ThemeScope>
  );
};
