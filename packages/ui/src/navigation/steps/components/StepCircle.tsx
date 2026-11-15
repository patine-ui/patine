import { View } from 'react-native';

import { CHECK_MARK } from '@/core/core.constants';
import type { DeepPartial } from '@/core/core.types';
import type { Theme } from '@/core/theme/theme.types';
import { Text } from '@/foundations/text/Text';
import { STEP_STATUS } from '@/navigation/steps/steps.constants';
import { styles } from '@/navigation/steps/steps.styles';
import type { StepStatus, StepsDesign } from '@/navigation/steps/steps.types';

interface Props {
  index: number;
  status: StepStatus;
  look: StepsDesign;
  theme: Theme;
  themeOverride?: DeepPartial<Theme>;
}

/** A step's mark: a check when done, its number otherwise, a ring or fill for the current one, ! on an error. */
export const StepCircle = ({ index, status, look, theme, themeOverride }: Props) => {
  const { colors } = theme;
  const filled = status === STEP_STATUS.complete || status === STEP_STATUS.error || (status === STEP_STATUS.current && look.currentFilled);
  const fill =
    status === STEP_STATUS.error
      ? colors.danger
      : filled
        ? colors.primary
        : status === STEP_STATUS.current
          ? colors.background
          : colors[look.upcomingFill];
  const border = status === STEP_STATUS.current ? colors.primary : status === STEP_STATUS.upcoming ? colors.outline : fill;
  const ink =
    status === STEP_STATUS.error
      ? colors.onDanger
      : filled
        ? colors.onPrimary
        : status === STEP_STATUS.current
          ? colors.primary
          : colors.textSecondary;
  const mark = status === STEP_STATUS.complete ? CHECK_MARK : status === STEP_STATUS.error ? '!' : String(index + 1);
  return (
    <View
      aria-hidden
      style={[
        styles.circle,
        {
          width: look.size,
          height: look.size,
          borderRadius: look.size / 2,
          backgroundColor: fill,
          borderWidth: status === STEP_STATUS.current && !look.currentFilled ? 2 : 1,
          borderColor: border,
        },
      ]}
    >
      <Text theme={themeOverride} size="xs" weight="bold" style={{ color: ink }}>
        {mark}
      </Text>
    </View>
  );
};
