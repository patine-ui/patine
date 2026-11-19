import { Pressable, Text, View } from 'react-native';

import { fireEvent, render, screen } from '@testing-library/react-native';

import * as core from '@/core';
import { MAX_FONT_SCALE } from '@/core/a11y/a11y.constants';
import { SHOWS_SCROLL_INDICATOR } from '@/core/core.constants';
import { lightTheme } from '@/core/theme/theme.constants';
import { Input } from './Input';
import { Portal, PortalHost } from './Portal';
import { Scroll } from './Scroll';
import { Slot } from './Slot';
import { Touchable } from './Touchable';
import { VirtualList } from './VirtualList';
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

describe('Input', () => {
  it('draws in the theme, with a secondary placeholder, a primary caret and capped font scaling', async () => {
    await render(<Input placeholder="Name" style={{ letterSpacing: 1 }} />);
    const input = screen.getByPlaceholderText('Name');
    expect(input.props.placeholderTextColor).toBe(lightTheme.colors.textSecondary);
    expect(input.props.selectionColor).toBe(lightTheme.colors.primary);
    expect(input.props.cursorColor).toBe(lightTheme.colors.primary);
    expect(input.props.maxFontSizeMultiplier).toBe(MAX_FONT_SCALE);
    expect(input).toHaveStyle({ fontSize: lightTheme.typography.sizes.md, color: lightTheme.colors.text, letterSpacing: 1 });
  });

  it('lets the caller change any default', async () => {
    await render(<Input placeholder="Code" size="xl" placeholderTextColor="#123" />);
    const input = screen.getByPlaceholderText('Code');
    expect(input.props.placeholderTextColor).toBe('#123');
    expect(input).toHaveStyle({ fontSize: lightTheme.typography.sizes.xl });
  });
});

describe('Scroll', () => {
  it('keeps taps while the keyboard is up and hides the track where the platform says', async () => {
    await render(<Scroll testID="scroll" />);
    const scroll = screen.getByTestId('scroll');
    expect(scroll.props.keyboardShouldPersistTaps).toBe('handled');
    expect(scroll.props.showsVerticalScrollIndicator).toBe(SHOWS_SCROLL_INDICATOR);
  });
});

describe('VirtualList', () => {
  it('renders its rows with the same defaults as Scroll', async () => {
    await render(
      <VirtualList testID="list" data={['a', 'b']} keyExtractor={(item) => item} renderItem={({ item }) => <Text>{item}</Text>} />
    );
    expect(screen.getByText('b')).toBeTruthy();
    const list = screen.getByTestId('list');
    expect(list.props.keyboardShouldPersistTaps).toBe('handled');
    expect(list.props.showsVerticalScrollIndicator).toBe(SHOWS_SCROLL_INDICATOR);
  });
});

describe('patine-ui/core exports', () => {
  it('offers Touchable and createStyles to apps and Pro', () => {
    expect(core.Touchable).toBe(Touchable);
    expect(typeof core.createStyles).toBe('function');
  });
});
