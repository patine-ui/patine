import type { GestureResponderEvent, PanResponderCallbacks, PanResponderGestureState } from 'react-native';
import { PanResponder } from 'react-native';

import { act, fireEvent, render, screen } from '@testing-library/react-native';

import { ImageViewer } from './ImageViewer';

jest.mock('@/core/animation', () => ({
  ...jest.requireActual('@/core/animation'),
  timing: (value: { setValue: (v: number) => void }, to: number) => ({
    start: (done?: (r: { finished: boolean }) => void) => {
      value.setValue(to);
      done?.({ finished: true });
    },
  }),
}));

const IMAGES = [
  { source: { uri: 'https://example.com/1.jpg' }, alt: 'Beach' },
  { source: { uri: 'https://example.com/2.jpg' }, alt: 'Forest' },
];
const touch = (x: number, y: number) => ({
  locationX: x,
  locationY: y,
});
const event = (...touches: ReturnType<typeof touch>[]) => ({ nativeEvent: { touches } }) as unknown as GestureResponderEvent;
const gesture = (dx: number, dy: number, vy = 0) =>
  ({
    dx,
    dy,
    vx: 0,
    vy,
  }) as PanResponderGestureState;

describe('ImageViewer', () => {
  afterEach(() => jest.restoreAllMocks());

  it('shows the images named for screen readers, and closes from its button', async () => {
    const onOpenChange = jest.fn();
    await render(<ImageViewer images={IMAGES} open onOpenChange={onOpenChange} />);
    expect(screen.getByLabelText('Beach')).toBeTruthy();
    expect(screen.getByText('1 / 2')).toBeTruthy();
    await fireEvent.press(screen.getByRole('button', { name: 'Close' }));
    expect(onOpenChange).toHaveBeenCalledWith(false);
  });

  it('stops paging while an image is zoomed by a double tap', async () => {
    await render(<ImageViewer images={IMAGES} open onOpenChange={jest.fn()} testID="viewer" />);
    const scroll = screen.getByTestId('viewer-pager-scroll');
    expect(scroll.props.scrollEnabled).toBe(true);
    const image = screen.getByLabelText('Beach');
    await fireEvent.press(image, { nativeEvent: { locationX: 200, locationY: 400 } });
    await fireEvent.press(image, { nativeEvent: { locationX: 200, locationY: 400 } });
    expect(screen.getByTestId('viewer-pager-scroll').props.scrollEnabled).toBe(false);
  });

  it('pinches to zoom and closes on a drag down', async () => {
    const create = jest.spyOn(PanResponder, 'create');
    const onOpenChange = jest.fn();
    await render(<ImageViewer images={IMAGES} open onOpenChange={onOpenChange} testID="viewer" />);
    const responders = create.mock.calls.map((call) => call[0] as PanResponderCallbacks);
    const first = responders.find((r) => r.onStartShouldSetPanResponder?.(event(touch(0, 0), touch(10, 10)), gesture(0, 0)));
    if (!first) throw new Error('no zoom responder');
    // Sideways at rest belongs to the pager; down belongs to the dismiss drag.
    expect(first.onMoveShouldSetPanResponder?.(event(touch(0, 0)), gesture(40, 2))).toBe(false);
    expect(first.onMoveShouldSetPanResponder?.(event(touch(0, 0)), gesture(2, 40))).toBe(true);
    await act(() => {
      first.onPanResponderGrant?.(event(touch(150, 400), touch(250, 400)), gesture(0, 0));
      first.onPanResponderMove?.(event(touch(100, 400), touch(300, 400)), gesture(0, 0));
      first.onPanResponderRelease?.(event(), gesture(0, 0));
    });
    expect(screen.getByTestId('viewer-pager-scroll').props.scrollEnabled).toBe(false);

    const second = responders.filter((r) => r !== first).find((r) => r.onMoveShouldSetPanResponder);
    if (!second) throw new Error('no second responder');
    await act(() => {
      second.onPanResponderGrant?.(event(touch(200, 400)), gesture(0, 0));
      second.onPanResponderMove?.(event(touch(200, 600)), gesture(0, 200));
      second.onPanResponderRelease?.(event(), gesture(0, 200, 0.5));
    });
    expect(onOpenChange).toHaveBeenCalledWith(false);
  });
});
