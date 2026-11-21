import { CHECK_MARK } from '@/core/core.constants';
import { Text } from '@/core/primitives/Text';
import { Touchable } from '@/core/primitives/Touchable';
import { View } from '@/core/primitives/View';
import { ContentColor } from '@/core/theme/ContentColor';
import { CHOICE_ICON_POSITION, CHOICE_VARIANT, LIST_DESIGN } from '@/inputs/segmented/segmented.constants';
import { styles, themed } from '@/inputs/segmented/segmented.styles';
import type { ListItemProps } from '@/inputs/segmented/segmented.types';

export const ListItem = <T,>({
  item,
  selected,
  divided,
  variant,
  iconPosition,
  renderItem,
  onPress,
  onLayout,
  theme,
  slots,
  testID,
}: ListItemProps<T>) => {
  const sheet = themed(theme);
  const disabled = !!item.disabled;
  const segmented = variant === CHOICE_VARIANT.segmented;
  const { outlined } = LIST_DESIGN[theme.design];
  const label = selected ? sheet.labelOn : segmented ? sheet.segmentLabel : sheet.label;
  // An icon above or below the label makes the item taller than the fixed segment or chip height.
  const stacked = iconPosition === CHOICE_ICON_POSITION.top || iconPosition === CHOICE_ICON_POSITION.bottom;
  const icon = typeof item.icon === 'function' ? item.icon({ selected, disabled, color: label.color }) : item.icon;
  return (
    <View onLayout={(e) => onLayout(e.nativeEvent.layout)} style={segmented && styles.segmentSlot} testID={testID}>
      <Touchable
        theme={theme}
        pressScale={!segmented}
        disabled={disabled}
        onPress={onPress}
        role="radio"
        aria-checked={selected}
        aria-label={item.label}
        style={[
          styles.item,
          styles[iconPosition],
          sheet.item,
          stacked ? sheet.stacked : segmented ? styles.segment : styles.chip,
          segmented ? sheet.segment : [sheet.chip, selected && sheet.chipOn],
          disabled && styles.disabledItem,
          outlined && (selected ? sheet.outlinedOn : sheet.outlinedOff),
          outlined &&
            segmented && [styles.outlinedSegment, !stacked && styles.outlinedSegmentHeight, divided ? styles.divided : styles.undivided],
          outlined && !segmented && (selected ? sheet.outlinedChipOn : sheet.outlinedChipOff),
          slots?.item,
          selected && slots?.selectedItem,
        ]}
      >
        {renderItem ? (
          renderItem({ item, selected, disabled, theme })
        ) : (
          <>
            {outlined && selected ? (
              <Text size="sm" weight="semibold" style={label}>
                {CHECK_MARK}
              </Text>
            ) : (
              <ContentColor color={label.color}>{icon}</ContentColor>
            )}
            <Text
              size="sm"
              weight={selected && !segmented ? 'semibold' : 'medium'}
              numberOfLines={1}
              style={[label, slots?.itemLabel, selected && slots?.selectedItemLabel]}
            >
              {item.label}
            </Text>
          </>
        )}
      </Touchable>
    </View>
  );
};
