import { startAlign } from '@/core/core.styles';
import { Text } from '@/core/primitives/Text';
import { Touchable } from '@/core/primitives/Touchable';
import { useDirection } from '@/core/theme/ThemeProvider';
import { CREATE_ICON } from '@/inputs/select/select.constants';
import { styles, themed } from '@/inputs/select/select.styles';
import type { CreateRowProps } from '@/inputs/select/select.types';

/** The last row while the search matches no option's label: offers the typed text as a new option. */
export const CreateRow = ({ text, label, onCreate, theme, slots }: CreateRowProps) => {
  const dir = useDirection();
  return (
    <Touchable
      theme={theme}
      onPress={() => onCreate(text)}
      role="button"
      aria-label={label}
      style={[styles.option, themed(theme).row, slots?.createOption]}
    >
      <Text size="lg" weight="medium" color="primary" style={themed(theme).leading}>
        {CREATE_ICON}
      </Text>
      <Text
        theme={theme}
        weight="medium"
        color="primary"
        numberOfLines={1}
        style={[startAlign[dir], styles.flex, slots?.createOptionLabel]}
      >
        {label}
      </Text>
    </Touchable>
  );
};
