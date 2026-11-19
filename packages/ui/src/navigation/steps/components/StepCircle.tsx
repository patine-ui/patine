import { CHECK_MARK } from '@/core/core.constants';
import { Text } from '@/core/primitives/Text';
import { View } from '@/core/primitives/View';
import { useTheme } from '@/core/theme/ThemeProvider';
import { STEP_STATUS } from '@/navigation/steps/steps.constants';
import { styles, themed } from '@/navigation/steps/steps.styles';
import type { StepStatus } from '@/navigation/steps/steps.types';

/** A step's mark: a check when done, its number otherwise, a ring or fill for the current one, ! on an error. */
export const StepCircle = ({ index, status }: { index: number; status: StepStatus }) => {
  const sheet = themed(useTheme());
  const mark = status === STEP_STATUS.complete ? CHECK_MARK : status === STEP_STATUS.error ? '!' : String(index + 1);
  return (
    <View aria-hidden style={[styles.circle, sheet[status]]}>
      <Text size="xs" weight="bold" style={sheet[`${status}Mark`]}>
        {mark}
      </Text>
    </View>
  );
};
