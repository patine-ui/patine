import { Text, View } from 'react-native';

import { fireEvent, render, screen } from '@testing-library/react-native';

import { MessageBubble } from './Chat';
import { ChatComposer } from './ChatComposer';

describe('MessageBubble', () => {
  it('shows the message, sender and time', async () => {
    await render(
      <MessageBubble from="them" name="Ava" meta="9:41">
        Lunch?
      </MessageBubble>
    );
    expect(screen.getByText('Lunch?')).toBeTruthy();
    expect(screen.getByText('Ava')).toBeTruthy();
    expect(screen.getByText('9:41')).toBeTruthy();
  });

  it('draws a node meta as given, such as a status with an inline Retry', async () => {
    const retry = jest.fn();
    await render(
      <MessageBubble
        from="me"
        meta={
          <Text>
            Not delivered.{' '}
            <Text role="button" onPress={retry}>
              Retry
            </Text>
          </Text>
        }
      >
        Lunch?
      </MessageBubble>
    );
    await fireEvent.press(screen.getByRole('button', { name: 'Retry' }));
    expect(retry).toHaveBeenCalledTimes(1);
  });

  it('keeps a string meta in the caption text, and lays a node meta out as a view, not inside text', async () => {
    const { rerender } = await render(<MessageBubble meta="Read">Hi</MessageBubble>);
    expect(screen.getByText('Read').type).toBe('Text');
    await rerender(<MessageBubble meta={<View testID="status" />}>Hi</MessageBubble>);
    expect(screen.getByTestId('status').parent?.type).toBe('View');
  });
});

describe('ChatComposer', () => {
  it('sends the trimmed text and clears', async () => {
    const onSend = jest.fn();
    await render(<ChatComposer onSend={onSend} />);
    const send = screen.getByRole('button', { name: 'Send' });
    expect(send.props.accessibilityState).toMatchObject({ disabled: true });
    await fireEvent.changeText(screen.getByLabelText('Message'), '  hello ');
    await fireEvent.press(screen.getByRole('button', { name: 'Send' }));
    expect(onSend).toHaveBeenCalledWith('hello');
    expect(screen.getByLabelText('Message').props.value).toBe('');
  });

  it('sends on Enter but not Shift+Enter', async () => {
    const onSend = jest.fn();
    await render(<ChatComposer onSend={onSend} defaultValue="hi" />);
    const input = screen.getByLabelText('Message');
    await fireEvent(input, 'keyPress', { nativeEvent: { key: 'Enter', shiftKey: true } });
    expect(onSend).not.toHaveBeenCalled();
    await fireEvent(input, 'keyPress', { nativeEvent: { key: 'Enter' } });
    expect(onSend).toHaveBeenCalledWith('hi');
  });

  it('blocks sending while sending', async () => {
    const onSend = jest.fn();
    await render(<ChatComposer onSend={onSend} defaultValue="hi" sending />);
    await fireEvent(screen.getByLabelText('Message'), 'keyPress', { nativeEvent: { key: 'Enter' } });
    expect(onSend).not.toHaveBeenCalled();
  });
});

describe('ChatComposer stop', () => {
  it('turns send into stop while sending, and stops on Escape', async () => {
    const onStop = jest.fn();
    await render(<ChatComposer onSend={jest.fn()} onStop={onStop} sending />);
    await fireEvent.press(screen.getByRole('button', { name: 'Stop' }));
    await fireEvent(screen.getByLabelText('Message'), 'keyPress', { nativeEvent: { key: 'Escape' } });
    expect(onStop).toHaveBeenCalledTimes(2);
  });

  it('keeps the send button when idle', async () => {
    await render(<ChatComposer onSend={jest.fn()} onStop={jest.fn()} />);
    expect(screen.queryByRole('button', { name: 'Stop' })).toBeNull();
    expect(screen.getByRole('button', { name: 'Send' })).toBeTruthy();
  });
});
