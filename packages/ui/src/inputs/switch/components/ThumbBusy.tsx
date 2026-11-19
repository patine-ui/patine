import { useCycle } from '@/core/animation/hooks/useCycle';
import { useReducedMotion } from '@/core/animation/hooks/useReducedMotion';
import { AnimatedView, View } from '@/core/primitives/View';
import { SWITCH_SPIN_MS } from '@/inputs/switch/switch.constants';
import { styles, type themed } from '@/inputs/switch/switch.styles';

const DOTS = [0, 1, 2];

/** What a loading switch draws in its thumb: a turning ring, or three still dots when reducing motion. */
export const ThumbBusy = ({ checked, sheet }: { checked: boolean; sheet: ReturnType<typeof themed> }) => {
  const reduced = useReducedMotion();
  const turn = useCycle(!reduced, SWITCH_SPIN_MS);
  const spin = { transform: [{ rotate: turn.interpolate({ inputRange: [0, 1], outputRange: ['0deg', '360deg'] }) }] };

  return (
    <View style={styles.busy}>
      {reduced ? (
        <View style={[styles.dots, sheet.dots]}>
          {DOTS.map((dot) => (
            <View key={dot} style={[sheet.dot, checked ? sheet.dotOn : sheet.dotOff]} />
          ))}
        </View>
      ) : (
        <AnimatedView style={[sheet.spinner, checked ? sheet.spinnerOn : sheet.spinnerOff, spin]} />
      )}
    </View>
  );
};
