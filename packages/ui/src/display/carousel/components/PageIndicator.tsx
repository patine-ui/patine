import { useAnimatedTo } from '@/core/animation';
import { useComponentTheme } from '@/core/theme/ThemeProvider';
import { DEFAULT_CAROUSEL_LABELS } from '@/display/carousel/carousel.constants';
import type { PageIndicatorProps } from '@/display/carousel/carousel.types';
import { Dots } from './Dots';

/** Dots for the page shown, to pair with a Pager or your own steps. Tapping a dot calls `onValueChange`. */
export const PageIndicator = ({
  count,
  value,
  onValueChange,
  label = DEFAULT_CAROUSEL_LABELS.slide,
  theme: themeProp,
  design,
  style,
  testID,
}: PageIndicatorProps) => {
  const { theme } = useComponentTheme(themeProp, design);
  const position = useAnimatedTo(value, { duration: theme.animation.duration });
  return (
    <Dots
      count={count}
      value={value}
      position={position}
      label={label}
      theme={theme}
      onValueChange={onValueChange}
      style={style}
      testID={testID}
    />
  );
};
