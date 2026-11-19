import { View } from '@/core/primitives/View';
import { fillOf, strokeOf } from '@/core/utils/style.utils';
import { styles } from '@/pickers/color/color.styles';

/** Two overlapping squares, drawn with views so they need no icon font. */
export const CopyIcon = ({ color }: { color: string }) => (
  <View style={styles.copyIcon}>
    <View style={[styles.copyBack, strokeOf(color)]} />
    <View style={[styles.copyFront, strokeOf(color)]} />
  </View>
);

/** A pipette: bulb, glass and tip, tilted. */
export const EyedropperIcon = ({ color }: { color: string }) => (
  <View style={styles.dropperIcon}>
    <View style={[styles.dropperBulb, fillOf(color)]} />
    <View style={[styles.dropperBody, strokeOf(color)]} />
    <View style={[styles.dropperTip, fillOf(color)]} />
  </View>
);
