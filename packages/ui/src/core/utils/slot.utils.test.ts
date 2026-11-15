import { mergeSlotProps } from './slot.utils';

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
