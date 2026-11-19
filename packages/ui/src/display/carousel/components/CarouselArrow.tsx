import type { StyleProp, TextStyle } from 'react-native';

import { ChevronMark } from '@/core/components/ChevronMark';
import { Touchable } from '@/core/primitives/Touchable';
import { View } from '@/core/primitives/View';
import type { Theme } from '@/core/theme/theme.types';
import { CAROUSEL_DESIGN } from '@/display/carousel/carousel.constants';
import { styles, themed } from '@/display/carousel/carousel.styles';
import { getArrowPlace } from '@/display/carousel/carousel.utils';

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
  return (
    <Touchable
      theme={theme}
      role="button"
      aria-label={label}
      disabled={disabled}
      onPress={onPress}
      style={[styles.arrow, getArrowPlace(vertical, forward, look.size, theme.spacing.sm), themed(theme).arrow, style as object]}
    >
      <View style={vertical && styles.vertical}>
        <ChevronMark color={theme.colors.text} direction={forward ? 'forward' : 'back'} />
      </View>
    </Touchable>
  );
};
