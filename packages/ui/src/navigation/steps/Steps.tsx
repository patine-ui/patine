import { Text } from '@/core/primitives/Text';
import { View } from '@/core/primitives/View';
import { ThemeScope, useComponentTheme, useLabels } from '@/core/theme/ThemeProvider';
import { Progress } from '@/feedback/progress/Progress';
import { StepRow } from './components/StepRow';
import { STEPS_VARIANT } from './steps.constants';
import { layoutStyles, styles } from './steps.styles';
import type { StepsProps } from './steps.types';
import { clampStep, formatStep } from './steps.utils';

/**
 * Where the user is in a flow of steps, such as checkout: numbered circles with connectors (a check on each done step),
 * across or down, or a Progress bar with "Step 2 of 4" for narrow screens. With `onValueChange`, done steps go back, except those marked `disabled`.
 */
export const Steps = ({
  steps,
  value,
  onValueChange,
  variant = STEPS_VARIANT.steps,
  orientation = 'horizontal',
  labels: labelsProp,
  theme: themeProp,
  design,
  style,
  testID,
}: StepsProps) => {
  const { theme, themeOverride } = useComponentTheme(themeProp, design);
  const words = useLabels();
  const labels = { ...words.steps, ...labelsProp };
  const count = steps.length;
  const current = clampStep(value, count);

  if (variant === STEPS_VARIANT.progress) {
    const caption = formatStep(labels.step, Math.min(current + 1, count), count);
    return (
      <ThemeScope theme={themeOverride}>
        <View style={[layoutStyles(theme).progress, style]} testID={testID}>
          <Text size="sm" color="textSecondary">
            {steps[current] ? `${caption} · ${steps[current].title}` : caption}
          </Text>
          <Progress value={current + (current < count ? 1 : 0)} max={count} aria-label={caption} />
        </View>
      </ThemeScope>
    );
  }

  return (
    <ThemeScope theme={themeOverride}>
      <View style={[orientation === 'vertical' ? styles.column : styles.row, style]} testID={testID}>
        {steps.map((step, i) => (
          <StepRow
            key={step.title}
            step={step}
            index={i}
            count={count}
            current={current}
            vertical={orientation === 'vertical'}
            labels={labels}
            theme={theme}
            onValueChange={onValueChange}
          />
        ))}
      </View>
    </ThemeScope>
  );
};
