import { CHECK_MARK } from '@/core/core.constants';
import { Text } from '@/core/primitives/Text';
import { View } from '@/core/primitives/View';
import { styles, themed } from '@/inputs/select/select.styles';
import type { CheckProps } from '@/inputs/select/select.types';

/** A checkbox for multiple select; for single select, a radio or a tick. */
export const Check = ({ selected, multiple, radio, theme, style }: CheckProps) => {
  const sheet = themed(theme);
  if (!multiple && radio) {
    return (
      <View style={[styles.radio, sheet.trailing, selected ? sheet.radioOn : sheet.radioOff, style]}>
        {selected ? <View style={[styles.radioDot, sheet.dot]} /> : null}
      </View>
    );
  }
  if (!multiple) {
    return (
      <Text weight="bold" color="primary" style={[sheet.trailing, style]}>
        {CHECK_MARK}
      </Text>
    );
  }
  return (
    <View style={[styles.checkBox, sheet.box, sheet.trailing, selected ? sheet.boxOn : sheet.boxOff, style]}>
      {selected ? <Text style={[styles.checkBoxMark, sheet.mark]}>{CHECK_MARK}</Text> : null}
    </View>
  );
};
