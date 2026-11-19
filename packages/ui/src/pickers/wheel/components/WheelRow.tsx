import { memo, useMemo } from 'react';

import { useTouchFeedback } from '@/core/hooks/useTouchFeedback';
import { Text } from '@/core/primitives/Text';
import { TouchFeedback } from '@/core/primitives/TouchFeedback';
import { AnimatedView, Pressable } from '@/core/primitives/View';
import { PERSPECTIVE } from '@/pickers/wheel/wheel.constants';
import { styles, themed } from '@/pickers/wheel/wheel.styles';
import type { WheelRowProps } from '@/pickers/wheel/wheel.types';
import { getItemHeight, getRowFrames, getTextAlign } from '@/pickers/wheel/wheel.utils';

const WheelRowImpl = <T,>({
  dataIndex,
  logicalIndex,
  item,
  selected,
  itemHeight,
  visibleItems,
  scrollY,
  variant,
  rotation,
  fadeTo,
  theme,
  textAlign,
  slots,
  renderItem,
  onSelect,
}: WheelRowProps<T>) => {
  const animatedStyle = useMemo(() => {
    const frames = getRowFrames({ dataIndex, itemHeight, visibleItems, variant, rotation, fadeTo });
    const interpolate = <V extends number | string>(outputRange: V[]) =>
      scrollY.interpolate<V>({ inputRange: frames.inputRange, outputRange, extrapolate: 'clamp' });
    const opacity = interpolate(frames.opacity);
    const scale = interpolate(frames.scale);
    if (!frames.translateY || !frames.rotateX)
      return {
        opacity,
        transform: [{ scale }],
      };
    return {
      opacity,
      transform: [
        { perspective: PERSPECTIVE },
        { translateY: interpolate(frames.translateY) },
        { rotateX: interpolate(frames.rotateX) },
        { scale },
      ],
    };
  }, [dataIndex, fadeTo, itemHeight, rotation, scrollY, variant, visibleItems]);

  const sheet = themed(theme);
  const label = item.disabled ? sheet.labelOff : selected ? sheet.labelOn : sheet.label;
  const pressable = !!onSelect && !item.disabled;
  const touch = useTouchFeedback(theme, !pressable, false);

  // ponytail: stays a Pressable, not a Touchable: its hover tint lives inside the animated row so it turns and fades with it;
  // Touchable draws feedback on its own host. The rows are pointer-only (the wheel is the screen reader's control).
  return (
    <Pressable {...touch.handlers} onPress={pressable ? () => onSelect?.(dataIndex) : undefined} accessible={false}>
      {/* Hover only, no ripple: the hover tint lives inside the animated row, so it rotates and fades with it */}
      <AnimatedView ref={touch.ref} style={[styles.row, getItemHeight(itemHeight), themed(theme).row, animatedStyle, slots?.item]}>
        <TouchFeedback {...touch.feedback} borderRadius={theme.radius.md} />
        {renderItem ? (
          renderItem({ item, index: logicalIndex, selected, theme })
        ) : (
          <Text
            theme={theme}
            size="lg"
            weight={selected ? 'semibold' : 'regular'}
            numberOfLines={1}
            style={[
              getTextAlign(textAlign),
              label,
              slots?.itemText,
              selected && slots?.selectedItemText,
              item.disabled && slots?.disabledItemText,
            ]}
          >
            {item.label}
          </Text>
        )}
      </AnimatedView>
    </Pressable>
  );
};

export const WheelRow = memo(WheelRowImpl) as typeof WheelRowImpl;
