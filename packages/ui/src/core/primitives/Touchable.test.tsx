import { Linking, StyleSheet, Text } from 'react-native';

import { fireEvent, render, screen } from '@testing-library/react-native';

import { DISABLED_OPACITY, FOCUS_RING } from '@/core/a11y/a11y.constants';
import { PatineProvider } from '@/core/theme/ThemeProvider';
import { lightTheme } from '@/core/theme/theme.constants';
import { Touchable } from './Touchable';

describe('Touchable', () => {
  it('keeps the caller’s press and hover handlers alongside its own', async () => {
    const onPress = jest.fn();
    const onPressIn = jest.fn();
    const onHoverIn = jest.fn();
    await render(
      <Touchable theme={lightTheme} onPress={onPress} onPressIn={onPressIn} onHoverIn={onHoverIn} role="button">
        <Text>Apple</Text>
      </Touchable>
    );
    const button = screen.getByRole('button');
    await fireEvent(button, 'pressIn', { nativeEvent: { pageX: 0, pageY: 0 } });
    await fireEvent(button, 'hoverIn');
    await fireEvent.press(button);
    expect(onPressIn).toHaveBeenCalled();
    expect(onHoverIn).toHaveBeenCalled();
    expect(onPress).toHaveBeenCalled();
  });

  it('renders state-driven children and ignores presses when disabled', async () => {
    const onPress = jest.fn();
    await render(
      <Touchable theme={lightTheme} disabled ripple={false} onPress={onPress} role="button">
        {({ pressed }) => <Text>{pressed ? 'down' : 'up'}</Text>}
      </Touchable>
    );
    expect(screen.getByText('up')).toBeTruthy();
    await fireEvent.press(screen.getByRole('button'));
    expect(onPress).not.toHaveBeenCalled();
  });

  it('draws the focus ring on keyboard focus, before the caller’s style', async () => {
    await render(
      <Touchable theme={lightTheme} role="button" style={{ outlineOffset: 5 }}>
        <Text>Apple</Text>
      </Touchable>
    );
    const button = screen.getByRole('button');
    expect(StyleSheet.flatten(button.props.style).outlineWidth).toBeUndefined();
    await fireEvent(button, 'focus');
    const ring = StyleSheet.flatten(screen.getByRole('button').props.style);
    expect(ring.outlineColor).toBe(lightTheme.colors.primary);
    expect(ring.outlineWidth).toBe(FOCUS_RING.width);
    expect(ring.outlineOffset).toBe(5);
    await fireEvent(button, 'blur');
    expect(StyleSheet.flatten(screen.getByRole('button').props.style).outlineWidth).toBeUndefined();
  });

  it('draws the ring inside with focusRing="inset", and none with focusRing={false}', async () => {
    await render(
      <>
        <Touchable theme={lightTheme} role="tab" focusRing="inset">
          <Text>Inset</Text>
        </Touchable>
        <Touchable theme={lightTheme} role="link" focusRing={false}>
          <Text>None</Text>
        </Touchable>
      </>
    );
    await fireEvent(screen.getByRole('tab'), 'focus');
    await fireEvent(screen.getByRole('link'), 'focus');
    expect(StyleSheet.flatten(screen.getByRole('tab').props.style).outlineOffset).toBe(-FOCUS_RING.width);
    expect(StyleSheet.flatten(screen.getByRole('link').props.style).outlineWidth).toBeUndefined();
  });

  it('announces and dims a disabled control, and the caller’s style can change the dim', async () => {
    await render(
      <>
        <Touchable theme={lightTheme} role="button" disabled>
          <Text>Off</Text>
        </Touchable>
        <Touchable theme={lightTheme} role="link" disabled style={{ opacity: 1 }}>
          <Text>Own</Text>
        </Touchable>
      </>
    );
    const button = screen.getByRole('button');
    expect(button.props.accessibilityState?.disabled).toBe(true);
    expect(StyleSheet.flatten(button.props.style).opacity).toBe(DISABLED_OPACITY);
    expect(StyleSheet.flatten(screen.getByRole('link').props.style).opacity).toBe(1);
  });

  it('grows a small control to 44pt on phones, keeps an explicit hitSlop, and adds none on the web', async () => {
    const tree = (platform: 'ios' | 'web') => (
      <PatineProvider platform={platform}>
        <Touchable theme={lightTheme} role="button" style={{ width: 28, height: 28 }}>
          <Text>Small</Text>
        </Touchable>
        <Touchable theme={lightTheme} role="link" hitSlop={3} style={{ width: 28, height: 28 }}>
          <Text>Own</Text>
        </Touchable>
      </PatineProvider>
    );
    await render(tree('ios'));
    expect(screen.getByRole('button').props.hitSlop).toEqual({ top: 8, bottom: 8, left: 8, right: 8 });
    expect(screen.getByRole('link').props.hitSlop).toBe(3);
    await render(tree('web'));
    expect(screen.getByRole('button').props.hitSlop).toBeUndefined();
  });

  it('passes focusVisible to a style function', async () => {
    const style = jest.fn(() => null);
    await render(
      <Touchable theme={lightTheme} role="button" style={style}>
        <Text>Card</Text>
      </Touchable>
    );
    await fireEvent(screen.getByRole('button'), 'focus');
    expect(style).toHaveBeenLastCalledWith(expect.objectContaining({ focusVisible: true }));
  });
});

describe('Touchable with href', () => {
  afterEach(() => jest.restoreAllMocks());

  it('is a link that opens its address after onPress on iOS and Android', async () => {
    const open = jest.spyOn(Linking, 'openURL').mockResolvedValue(undefined);
    const onPress = jest.fn();
    await render(
      <Touchable role="button" href="https://patine.dev" onPress={onPress}>
        <Text>Docs</Text>
      </Touchable>
    );
    await fireEvent.press(screen.getByRole('link', { name: 'Docs' }));
    expect(onPress).toHaveBeenCalled();
    expect(open).toHaveBeenCalledWith('https://patine.dev');
  });

  it('stays put when onPress prevents it', async () => {
    const open = jest.spyOn(Linking, 'openURL').mockResolvedValue(undefined).mockClear();
    await render(
      <Touchable role="link" href="/next" onPress={(e) => e.preventDefault()}>
        <Text>Next</Text>
      </Touchable>
    );
    let prevented = false;
    const event = {
      preventDefault: () => {
        prevented = true;
      },
      isDefaultPrevented: () => prevented,
    };
    await fireEvent.press(screen.getByRole('link'), event);
    expect(open).not.toHaveBeenCalled();
  });
});
