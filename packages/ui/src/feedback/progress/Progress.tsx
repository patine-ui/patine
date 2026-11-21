import { ActivityIndicator } from 'react-native';

import { AnimatedView, View } from '@/core/primitives/View';
import { useComponentTheme, useLabels } from '@/core/theme/ThemeProvider';
import { useProgress } from './hooks/useProgress';
import { PROGRESS_DESIGN } from './progress.constants';
import { styles, themed } from './progress.styles';
import type { ProgressProps, SpinnerProps } from './progress.types';
import { getBarShape } from './progress.utils';

/**
 * A bar showing how far a task has got, or a segment sweeping across while that's unknown (still when reducing motion).
 * Read by screen readers as a progress bar with its percentage.
 */
export const Progress = ({ value, max = 100, height, theme: themeProp, design, style, styles: slots, ...rest }: ProgressProps) => {
  const { theme } = useComponentTheme(themeProp, design);
  const look = PROGRESS_DESIGN[theme.design];
  const progress = useProgress(value, max);
  const size = height ?? look.height;
  const sheet = themed(theme);
  const now = progress.ratio === null ? undefined : Math.round(progress.ratio * 100);
  return (
    <View
      accessible
      role="progressbar"
      aria-busy={progress.indeterminate}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={now}
      style={[styles.track, sheet.track, getBarShape(size), style]}
      {...rest}
    >
      <AnimatedView
        style={[
          getBarShape(size),
          sheet.indicator,
          progress.indeterminate ? [styles.fill, progress.segment] : progress.fill,
          slots?.indicator,
        ]}
      />
    </View>
  );
};

/** The platform's own spinning activity indicator in a theme color, named "Loading" for screen readers. */
export const Spinner = ({
  color = 'primary',
  size = 'small',
  'aria-label': accessibilityLabelProp,
  theme: themeProp,
  design,
  ...rest
}: SpinnerProps) => {
  const words = useLabels();
  const accessibilityLabel = accessibilityLabelProp ?? words.spinner;
  const { theme } = useComponentTheme(themeProp, design);
  return (
    <ActivityIndicator role="progressbar" aria-busy aria-label={accessibilityLabel} size={size} color={theme.colors[color]} {...rest} />
  );
};
