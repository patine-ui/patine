import { Text } from '@/core/primitives/Text';
import { View } from '@/core/primitives/View';
import { styles } from '@/inputs/slider/slider.styles';
import type { MarkLabelsProps } from '@/inputs/slider/slider.types';
import { getMarkLabelPlace } from '@/inputs/slider/slider.utils';

/** The marks' labels under the track, each centred on its mark; the ones in the filled part read stronger. */
export const MarkLabels = ({ labels, slots }: MarkLabelsProps) => (
  <View pointerEvents="none" style={styles.markLabels}>
    {labels.map((mark) => (
      <View key={mark.key} style={[styles.markLabelBox, getMarkLabelPlace(mark.x)]}>
        <Text size="sm" color={mark.active ? 'text' : 'textSecondary'} style={slots?.markLabel} numberOfLines={1}>
          {mark.label}
        </Text>
      </View>
    ))}
  </View>
);
