import { StyleSheet } from 'react-native';

import { fireEvent, render, screen } from '@testing-library/react-native';

import { TextArea } from './TextArea';

const input = () => screen.getByLabelText('Bio');
const heightOf = () => StyleSheet.flatten(input().props.style).height;
const grow = async (height: number) => {
  await fireEvent(input(), 'contentSizeChange', { nativeEvent: { contentSize: { width: 200, height } } });
};

describe('TextArea', () => {
  it('is multiline, reports typing, and counts out of maxLength', async () => {
    const onValueChange = jest.fn();
    await render(<TextArea label="Bio" maxLength={160} showCount onValueChange={onValueChange} />);
    expect(input().props.multiline).toBe(true);
    await fireEvent.changeText(input(), 'Hello\nthere');
    expect(onValueChange).toHaveBeenCalledWith('Hello\nthere');
    expect(screen.getByText('11/160')).toBeTruthy();
  });

  it('grows with its text between minRows and maxRows, then scrolls', async () => {
    await render(<TextArea label="Bio" minRows={2} maxRows={4} />);
    // 16pt text on 22pt lines
    expect(heightOf()).toBe(44);
    await grow(66);
    expect(heightOf()).toBe(66);
    expect(input().props.scrollEnabled).toBe(false);
    await grow(200);
    expect(heightOf()).toBe(88);
    expect(input().props.scrollEnabled).toBe(true);
  });

  it('stays at a fixed number of rows', async () => {
    await render(<TextArea label="Bio" rows={5} />);
    await grow(10);
    expect(heightOf()).toBe(110);
  });

  it('sends on Enter with onSubmit, and keeps Shift+Enter for a new line', async () => {
    const onSubmit = jest.fn();
    const onKeyPress = jest.fn();
    await render(<TextArea label="Bio" defaultValue="Hi" onSubmit={onSubmit} onKeyPress={onKeyPress} />);
    await fireEvent(input(), 'keyPress', { nativeEvent: { key: 'Enter', shiftKey: true } });
    expect(onSubmit).not.toHaveBeenCalled();
    await fireEvent(input(), 'keyPress', { nativeEvent: { key: 'Enter' } });
    expect(onSubmit).toHaveBeenCalledWith('Hi');
    expect(onKeyPress).toHaveBeenCalledTimes(2);
  });
});
