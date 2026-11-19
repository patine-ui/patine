import { KEY } from '@/core/a11y/a11y.constants';
import { keyboardProps } from '@/core/a11y/keyboard.utils';
import { Text } from '@/core/primitives/Text';
import { AnimatedView, View } from '@/core/primitives/View';
import { useLabels } from '@/core/theme/ThemeProvider';
import { styles, themed } from '@/pickers/time/time.styles';
import type { ClockPartProps } from '@/pickers/time/time.types';
import { getHandBox, getNumberPlace, getSelectorPlace, getTurn } from '@/pickers/time/time.utils';

/** The round face: numbers around it, a hand from the centre to the chosen one. Drag or tap to choose. */
export const DialFace = ({ dial, theme, testID }: ClockPartProps) => {
  const words = useLabels();
  const radius = dial.handRadius;
  return (
    <View
      {...dial.panHandlers}
      accessible
      role="slider"
      aria-label={words.time[dial.mode]}
      aria-valuetext={dial.valueText}
      accessibilityActions={[{ name: 'increment' }, { name: 'decrement' }]}
      onAccessibilityAction={(e) => dial.step(e.nativeEvent.actionName === 'increment' ? 1 : -1)}
      {...keyboardProps({
        [KEY.up]: () => dial.step(1),
        [KEY.right]: () => dial.step(1),
        [KEY.down]: () => dial.step(-1),
        [KEY.left]: () => dial.step(-1),
      })}
      style={[styles.dial, themed(theme).dial]}
      testID={testID}
    >
      <AnimatedView pointerEvents="none" style={[styles.fillArea, getTurn(dial.rotation)]}>
        <View style={[styles.hand, getHandBox(radius), themed(theme).accent]} />
        <View style={[styles.selector, getSelectorPlace(radius), themed(theme).accent]} />
      </AnimatedView>
      <View pointerEvents="none" style={[styles.center, themed(theme).accent]} />
      {dial.numbers.map((n) => (
        <View key={`${n.inner ? 'inner' : 'outer'}-${n.value}`} pointerEvents="none" style={[styles.number, getNumberPlace(n.x, n.y)]}>
          <Text
            theme={theme}
            size={n.inner ? 'sm' : 'md'}
            color={n.value === dial.selected ? 'onPrimary' : n.disabled ? 'textDisabled' : 'text'}
          >
            {n.label}
          </Text>
        </View>
      ))}
    </View>
  );
};
