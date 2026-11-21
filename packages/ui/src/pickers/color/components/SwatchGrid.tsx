import { Scroll } from '@/core/primitives/Scroll';
import { Text } from '@/core/primitives/Text';
import { Touchable } from '@/core/primitives/Touchable';
import { View } from '@/core/primitives/View';
import { fillOf, inkOf } from '@/core/utils/style.utils';
import { CUSTOM_PLUS, SWATCH_CHECK } from '@/pickers/color/color.constants';
import { styles, themed } from '@/pickers/color/color.styles';
import type { SwatchGridProps } from '@/pickers/color/color.types';
import { getBox, getCheckColor, isSwatch, toSwatchCells } from '@/pickers/color/color.utils';

const CUSTOM_KEY = 'custom';

/** Your swatches at the design's size, wrapping to fill the width (or in one row to scroll); Material adds a Custom circle at the end. */
export const SwatchGrid = ({ colors, shape, size, scroll = false, selected, onSelect, custom, theme, slots, testID }: SwatchGridProps) => {
  const radius = shape === 'circle' ? size / 2 : theme.radius.sm;
  const customChosen = !!custom && !isSwatch(colors, selected);
  const cells = toSwatchCells(colors);
  const all = custom ? [...cells, { key: CUSTOM_KEY, value: selected, label: custom.label }] : cells;
  const swatches = all.map(({ key, value, label }) => {
    const isCustom = key === CUSTOM_KEY;
    const chosen = isCustom ? customChosen : value === selected;
    return (
      <Touchable
        key={key}
        theme={theme}
        onPress={isCustom ? custom?.onPress : () => onSelect(value)}
        role="button"
        aria-label={label}
        aria-expanded={isCustom ? custom?.open : undefined}
        aria-selected={chosen}
        style={[
          styles.swatch,
          getBox(size, size, radius),
          themed(theme).border,
          isCustom && !customChosen ? themed(theme).emptySwatch : fillOf(value),
          slots?.swatch,
        ]}
      >
        {chosen ? (
          <Text theme={theme} size={size < 28 ? 'xs' : 'md'} weight="semibold" style={inkOf(getCheckColor(value))}>
            {SWATCH_CHECK}
          </Text>
        ) : isCustom ? (
          <Text theme={theme} size="lg" color="textSecondary">
            {CUSTOM_PLUS}
          </Text>
        ) : null}
      </Touchable>
    );
  });
  const gap = themed(theme).swatchGap;
  return scroll ? (
    <Scroll horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={[styles.swatchRow, gap]} testID={testID}>
      {swatches}
    </Scroll>
  ) : (
    <View style={[styles.swatches, gap]} testID={testID}>
      {swatches}
    </View>
  );
};
