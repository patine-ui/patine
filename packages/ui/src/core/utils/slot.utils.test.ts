import { createElement, type ReactNode } from 'react';

import { hasControl, isPressableElement, mergeSlotProps } from './slot.utils';

const Marked = Object.assign(() => null, { pressable: true });
const Plain = (_: { onPress?: () => void }) => null;
const Box = ({ children }: { children?: ReactNode; onLayout?: () => void }) => children;
const Check = (_: { onCheckedChange?: (v: boolean) => void }) => null;

describe('mergeSlotProps', () => {
  it('lets the child win, runs both handlers child first, and stacks styles', () => {
    const calls: string[] = [];
    const merged = mergeSlotProps(
      { role: 'button', testID: 'slot', style: { padding: 1 }, onPress: () => calls.push('slot') },
      { testID: 'child', style: { margin: 2 }, onPress: () => calls.push('child') }
    );
    expect(merged).toMatchObject({ role: 'button', testID: 'child', style: [{ padding: 1 }, { margin: 2 }] });
    (merged.onPress as () => void)();
    expect(calls).toEqual(['child', 'slot']);
  });

  it('keeps a handler only one side has', () => {
    const onPress = jest.fn();
    expect(mergeSlotProps({ onPress }, {}).onPress).toBe(onPress);
    expect(mergeSlotProps({}, { onPress }).onPress).toBe(onPress);
  });
});

describe('mergeSlotProps with undefined', () => {
  it("leaves out the slot's undefined props, so the child keeps its own", () => {
    const merged = mergeSlotProps({ 'aria-label': undefined, disabled: true }, { 'aria-label': 'More' });
    expect(merged).toEqual({ 'aria-label': 'More', disabled: true });
    expect('aria-label' in mergeSlotProps({ 'aria-label': undefined }, {})).toBe(false);
  });
});

describe('isPressableElement', () => {
  it('is true for a component marked pressable, or any element given onPress', () => {
    expect(isPressableElement(createElement(Marked))).toBe(true);
    expect(isPressableElement(createElement(Plain, { onPress: () => {} }))).toBe(true);
    expect(isPressableElement(createElement(Plain))).toBe(false);
    expect(isPressableElement('text')).toBe(false);
  });
});

describe('hasControl', () => {
  it('finds a handler or a pressable, however deep in plain wrappers', () => {
    const check = createElement(Check, { onCheckedChange: () => {} });
    expect(hasControl(check)).toBe(true);
    expect(hasControl(createElement(Box, null, createElement(Box, null, check)))).toBe(true);
  });

  it('ignores plain content and onLayout', () => {
    expect(hasControl('Hello')).toBe(false);
    expect(hasControl(createElement(Box, { onLayout: () => {} }, 'Hi'))).toBe(false);
    expect(hasControl(undefined)).toBe(false);
  });
});
