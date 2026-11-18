import { ActivityIndicator, Animated, View } from 'react-native';

import { useComponentTheme } from '@/core/theme/ThemeProvider';
import { useProgress } from './hooks/useProgress';
import { PROGRESS_DESIGN } from './progress.constants';
import { styles } from './progress.styles';
import type { ProgressProps, SpinnerProps } from './progress.types';

/**
 * A bar showing how far a task has got, or a segment sweeping across while that's unknown (still when reducing motion).
 * Read by screen readers as a progress bar with its percentage.
 */
export const Progress = ({ value, max = 100, height, theme: themeProp, design, style, indicatorStyle, ...rest }: ProgressProps) => {
  const { theme } = useComponentTheme(themeProp, design);
  const look = PROGRESS_DESIGN[theme.design];
  const progress = useProgress(value, max);
  const size = height ?? look.height;
  const now = progress.ratio === null ? undefined : Math.round(progress.ratio * 100);
  return (
    <View
      accessible
      role="progressbar"
      aria-busy={progress.indeterminate}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={now}
      accessibilityValue={now === undefined ? undefined : { min: 0, max: 100, now }}
      style={[
        styles.track,
        { flexDirection: 'row', height: size, borderRadius: size / 2, backgroundColor: theme.colors[look.track] },
        style,
      ]}
      {...rest}
    >
      <Animated.View
        style={[
          { borderRadius: size / 2, backgroundColor: theme.colors.primary },
          progress.indeterminate ? [styles.fill, progress.segment] : { width: progress.width },
          indicatorStyle,
        ]}
      />
    </View>
  );
};

/** The platform's own spinning activity indicator in a theme color, named "Loading" for screen readers. */
export const Spinner = ({
  color = 'primary',
  size = 'small',
  accessibilityLabel = 'Loading',
  theme: themeProp,
  design,
  ...rest
}: SpinnerProps) => {
  const { theme } = useComponentTheme(themeProp, design);
  return (
    <ActivityIndicator
      role="progressbar"
      aria-busy
      accessibilityLabel={accessibilityLabel}
      size={size}
      color={theme.colors[color]}
      {...rest}
    />
  );
};
