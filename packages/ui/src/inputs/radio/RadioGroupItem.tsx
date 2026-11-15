import { useLayoutEffect, useRef } from 'react';
import type { HostInstance } from 'react-native';
import { Animated, View } from 'react-native';

import { usePop } from '@/core/animation/hooks/usePop';
import { ChoiceRow } from '@/core/components/ChoiceRow';
import { CHECK_MARK, KEY } from '@/core/core.constants';
import { keyboardProps } from '@/core/utils/keyboard.utils';
import { useRadioGroup } from './RadioGroupContext';
import { RADIO_DESIGN, RADIO_INDICATOR } from './radio.constants';
import { styles } from './radio.styles';
import type { RadioGroupItemProps } from './radio.types';

/** One option of a RadioGroup. Only the selected item is in the Tab order, as the ARIA radio group pattern asks. */
export const RadioGroupItem = ({ value, disabled: disabledProp = false, ...rest }: RadioGroupItemProps) => {
  const group = useRadioGroup();
  const ref = useRef<HostInstance>(null);
  const disabled = group.disabled || disabledProp;
  const selected = group.value === value;
  const pop = usePop(selected);
  const { theme } = group;
  const look = RADIO_DESIGN[theme.design];
  const c = theme.colors;

  // biome-ignore lint/correctness/useExhaustiveDependencies: an item registers once; its disabled flag is read live below.
  useLayoutEffect(() => group.register({ value, disabled, ref }), [group.register, value]);

  const control =
    look.indicator === RADIO_INDICATOR.check ? (
      <View aria-hidden style={{ width: look.size }}>
        <Animated.Text style={[styles.check, { color: c.primary }, pop]}>{CHECK_MARK}</Animated.Text>
      </View>
    ) : (
      <View
        aria-hidden
        style={[
          styles.circle,
          {
            width: look.size,
            height: look.size,
            borderRadius: look.size / 2,
            borderWidth: look.ringWidth,
            borderColor: selected ? c.primary : c[look.offColor],
          },
        ]}
      >
        <Animated.View style={[{ width: look.dot, height: look.dot, borderRadius: look.dot / 2, backgroundColor: c.primary }, pop]} />
      </View>
    );

  return (
    <ChoiceRow
      ref={ref}
      theme={theme}
      role="radio"
      checked={selected}
      disabled={disabled}
      controlAtEnd={look.indicator === RADIO_INDICATOR.check}
      control={control}
      onPress={() => group.select(value)}
      {...keyboardProps({
        [KEY.down]: () => group.move(value, 1),
        [KEY.right]: () => group.move(value, 1),
        [KEY.up]: () => group.move(value, -1),
        [KEY.left]: () => group.move(value, -1),
      })}
      // ponytail: with nothing selected every item is in the Tab order; the pattern wants only the first. Track the first item if it matters.
      focusable={!disabled && (selected || group.value === undefined)}
      {...rest}
    />
  );
};
