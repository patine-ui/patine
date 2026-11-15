import { Pressable, Text, View } from 'react-native';

import { fireEvent, render, screen } from '@testing-library/react-native';

import { Portal, PortalHost } from './Portal';
import { Slot } from './Slot';
import { VisuallyHidden } from './VisuallyHidden';

describe('VisuallyHidden', () => {
  it('stays readable while taking no space', async () => {
    await render(<VisuallyHidden>Unread messages</VisuallyHidden>);
    expect(screen.getByText('Unread messages')).toHaveStyle({ position: 'absolute', width: 1, height: 1 });
  });
});

describe('Slot', () => {
  it('passes its props to the child and runs both press handlers', async () => {
    const slotPress = jest.fn();
    const childPress = jest.fn();
    await render(
      <Slot role="link" onPress={slotPress}>
        <Pressable testID="child" onPress={childPress}>
          <Text>Open</Text>
        </Pressable>
      </Slot>
    );
    fireEvent.press(screen.getByTestId('child'));
    expect(childPress).toHaveBeenCalled();
    expect(slotPress).toHaveBeenCalled();
    expect(screen.getByRole('link')).toBeTruthy();
  });
});

const PortalApp = ({ open }: { open: boolean }) => (
  <PortalHost>
    <View testID="app">
      {open ? (
        <Portal>
          <Text>Overlay</Text>
        </Portal>
      ) : null}
    </View>
  </PortalHost>
);

describe('Portal', () => {
  it('draws its children in the host, after the app, and removes them on unmount', async () => {
    await render(<PortalApp open />);
    expect(screen.getByTestId('app').children).toHaveLength(0);
    expect(screen.getByText('Overlay')).toBeTruthy();
    await screen.rerender(<PortalApp open={false} />);
    expect(screen.queryByText('Overlay')).toBeNull();
  });

  it('draws in place without a host', async () => {
    await render(
      <Portal>
        <Text>Inline</Text>
      </Portal>
    );
    expect(screen.getByText('Inline')).toBeTruthy();
  });
});
