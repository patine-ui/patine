import { Pressable, View } from 'react-native';

import type { DeepPartial } from '@/core/core.types';
import type { Theme } from '@/core/theme/theme.types';
import { Text } from '@/foundations/text/Text';
import { STEP_STATUS, STEPS_DESIGN } from '@/navigation/steps/steps.constants';
import { styles } from '@/navigation/steps/steps.styles';
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
  themeOverride?: DeepPartial<Theme>;
  onValueChange?: (index: number) => void;
}

/** One step: its circle between connectors (across) or above one (down), and its title and description. */
export const StepRow = ({ step, index, count, current, vertical, labels, theme, themeOverride, onValueChange }: Props) => {
  const look = STEPS_DESIGN[theme.design];
  const status = stepStatus(step, index, current);
  const done = status === STEP_STATUS.complete;
  const suffix = done ? `, ${labels.completed}` : status === STEP_STATUS.error ? `, ${labels.error}` : '';
  const line = (on: boolean, hidden = false) => (
    <View
      style={[
        vertical ? styles.lineVertical : styles.line,
        vertical ? { width: look.connector, marginVertical: theme.spacing.xs } : { height: look.connector },
        { backgroundColor: on ? theme.colors.primary : theme.colors.border },
        hidden && styles.hidden,
      ]}
    />
  );
  const circle = <StepCircle index={index} status={status} look={look} theme={theme} themeOverride={themeOverride} />;
  const text = (
    <View
      style={
        vertical
          ? [styles.textVertical, { paddingStart: theme.spacing.md }]
          : [styles.text, { paddingHorizontal: theme.spacing.xs, marginTop: theme.spacing.xs }]
      }
    >
      <Text
        theme={themeOverride}
        size="sm"
        weight={status === STEP_STATUS.current ? 'bold' : 'medium'}
        color={status === STEP_STATUS.upcoming ? 'textSecondary' : status === STEP_STATUS.error ? 'danger' : 'text'}
        numberOfLines={2}
        style={!vertical && styles.center}
      >
        {step.title}
      </Text>
      {step.description ? (
        <Text theme={themeOverride} size="xs" color="textSecondary" style={!vertical && styles.center}>
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
    accessibilityLabel: `${formatStep(labels.step, index + 1, count)}: ${step.title}${suffix}`,
    accessibilityState: { selected: status === STEP_STATUS.current },
    style: vertical ? styles.itemVertical : styles.item,
  };
  return onValueChange && done ? (
    <Pressable role="button" onPress={() => onValueChange(index)} {...a11y}>
      {content}
    </Pressable>
  ) : (
    <View accessible {...a11y}>
      {content}
    </View>
  );
};
