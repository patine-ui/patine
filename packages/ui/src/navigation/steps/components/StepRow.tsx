import { Text } from '@/core/primitives/Text';
import { Touchable } from '@/core/primitives/Touchable';
import { View } from '@/core/primitives/View';
import type { Theme } from '@/core/theme/theme.types';
import { STEP_STATUS } from '@/navigation/steps/steps.constants';
import { lineStyles, styles } from '@/navigation/steps/steps.styles';
import type { StepItem, StepsLabels } from '@/navigation/steps/steps.types';
import { formatStep, stepStatus } from '@/navigation/steps/steps.utils';
import { StepCircle } from './StepCircle';

interface Props {
  step: StepItem;
  index: number;
  count: number;
  current: number;
  vertical: boolean;
  labels: StepsLabels;
  theme: Theme;
  onValueChange?: (index: number) => void;
}

/** One step: its circle between connectors (across) or above one (down), and its title and description. */
export const StepRow = ({ step, index, count, current, vertical, labels, theme, onValueChange }: Props) => {
  const lines = lineStyles(theme);
  const status = stepStatus(step, index, current);
  const done = status === STEP_STATUS.complete;
  const suffix = done ? `, ${labels.completed}` : status === STEP_STATUS.error ? `, ${labels.error}` : '';
  const line = (on: boolean, hidden = false) => (
    <View
      style={[
        vertical ? [styles.lineVertical, lines.down] : [styles.line, lines.across],
        on ? lines.on : lines.off,
        hidden && styles.hidden,
      ]}
    />
  );
  const circle = <StepCircle index={index} status={status} />;
  const text = (
    <View style={vertical ? [styles.textVertical, lines.textDown] : [styles.text, lines.textAcross]}>
      <Text
        size="sm"
        weight={status === STEP_STATUS.current ? 'semibold' : 'medium'}
        color={status === STEP_STATUS.upcoming ? 'textSecondary' : status === STEP_STATUS.error ? 'danger' : 'text'}
        numberOfLines={2}
        style={!vertical && styles.center}
      >
        {step.title}
      </Text>
      {step.description ? (
        <Text size="xs" color="textSecondary" style={!vertical && styles.center}>
          {step.description}
        </Text>
      ) : null}
    </View>
  );
  const content = vertical ? (
    <>
      <View style={styles.rail}>
        {circle}
        {index < count - 1 ? line(index < current) : null}
      </View>
      {text}
    </>
  ) : (
    <>
      <View style={styles.track}>
        {line(index <= current, index === 0)}
        {circle}
        {line(index < current, index === count - 1)}
      </View>
      {text}
    </>
  );
  const a11y = {
    'aria-label': `${formatStep(labels.step, index + 1, count)}: ${step.title}${suffix}`,
    'aria-selected': status === STEP_STATUS.current,
    style: vertical ? styles.itemVertical : styles.item,
  };
  return onValueChange && done ? (
    <Touchable theme={theme} role="button" onPress={() => onValueChange(index)} {...a11y}>
      {content}
    </Touchable>
  ) : (
    <View accessible {...a11y}>
      {content}
    </View>
  );
};
