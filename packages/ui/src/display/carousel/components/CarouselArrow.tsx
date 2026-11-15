import type { StyleProp, TextStyle } from 'react-native';
import { StyleSheet, View } from 'react-native';

import { ChevronMark } from '@/core/components/ChevronMark';
import { Touchable } from '@/core/components/Touchable';
import { DISABLED_OPACITY, MIN_TOUCH_TARGET } from '@/core/core.constants';
import type { Theme } from '@/core/theme/theme.types';
import { CAROUSEL_DESIGN } from '@/display/carousel/carousel.constants';
import { styles } from '@/display/carousel/carousel.styles';

interface Props {
  forward: boolean;
  vertical: boolean;
  label: string;
  disabled: boolean;
  onPress: () => void;
  theme: Theme;
  style?: StyleProp<TextStyle>;
}

/** A round previous or next button over the carousel's edge, at least 44pt to touch. */
export const CarouselArrow = ({ forward, vertical, label, disabled, onPress, theme, style }: Props) => {
  const look = CAROUSEL_DESIGN[theme.design].arrow;
  const slop = Math.max(0, (MIN_TOUCH_TARGET - look.size) / 2);
  const edge = theme.spacing.sm;
  const place = vertical
    ? { left: '50%' as const, marginLeft: -look.size / 2, ...(forward ? { bottom: edge } : { top: edge }) }
    : { top: '50%' as const, marginTop: -look.size / 2, ...(forward ? { right: edge } : { left: edge }) };
  return (
    <Touchable
      theme={theme}
      role="button"
      accessibilityLabel={label}
      aria-disabled={disabled}
      disabled={disabled}
      onPress={onPress}
      hitSlop={slop}
      style={[
        styles.arrow,
        place,
        {
          width: look.size,
          height: look.size,
          borderRadius: theme.radius[look.radius],
          backgroundColor: theme.colors[look.fill],
          borderWidth: look.border ? StyleSheet.hairlineWidth : 0,
          borderColor: theme.colors.border,
        },
        disabled && { opacity: DISABLED_OPACITY },
        style as object,
      ]}
    >
      <View style={vertical && styles.vertical}>
        <ChevronMark color={theme.colors.text} direction={forward ? 'forward' : 'back'} />
      </View>
    </Touchable>
  );
};
