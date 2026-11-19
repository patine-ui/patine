import { View } from '@/core/primitives/View';
import { ThemeScope, useComponentTheme } from '@/core/theme/ThemeProvider';
import { RatingItem } from './components/RatingItem';
import { useRating } from './hooks/useRating';
import { DEFAULT_RATING_SIZE } from './rating.constants';
import { styles } from './rating.styles';
import type { RatingProps } from './rating.types';
import { getRatingGap } from './rating.utils';

/** A row of stars to rate with: tap or drag across them, in whole or half steps, or show a score read-only. */
export const Rating = (props: RatingProps) => {
  const {
    size = DEFAULT_RATING_SIZE,
    color: colorProp,
    emptyColor,
    renderIcon,
    disabled,
    style,
    styles: slots,
    theme: themeProp,
    design,
    testID,
  } = props;
  const { theme, themeOverride } = useComponentTheme(themeProp, design);
  const color = colorProp ?? theme.colors.rating;
  const rating = useRating(props, theme);

  return (
    <ThemeScope theme={themeOverride}>
      <View
        style={[
          styles.row,
          getRatingGap(rating.gap),
          rating.interactive && styles.pointer,
          disabled && styles.disabled,
          slots?.container,
          style,
        ]}
        onLayout={rating.onLayout}
        {...rating.panHandlers}
        {...rating.hoverHandlers}
        {...rating.a11y}
        testID={testID}
      >
        {rating.items.map((item) => (
          <RatingItem
            key={item.key}
            item={item}
            size={size}
            color={color}
            emptyColor={emptyColor ?? theme.colors.border}
            renderIcon={renderIcon}
            slots={slots}
            testID={testID ? `${testID}-star-${item.index}` : undefined}
          />
        ))}
      </View>
    </ThemeScope>
  );
};
