import { useAnimatedTo } from '@/core/animation';
import { useComponentTheme, useLabels } from '@/core/theme/ThemeProvider';
import type { PageIndicatorProps } from '@/display/carousel/carousel.types';
import { Dots } from './Dots';

/** Dots for the page shown, to pair with a Pager or your own steps. Tapping a dot calls `onValueChange`. */
export const PageIndicator = ({
  count,
  value,
  onValueChange,
  label: labelProp,
  theme: themeProp,
  design,
  style,
  testID,
}: PageIndicatorProps) => {
  const words = useLabels();
  const label = labelProp ?? words.carousel.slide;
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
