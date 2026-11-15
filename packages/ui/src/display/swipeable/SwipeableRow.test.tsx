import type { GestureResponderEvent, PanResponderCallbacks, PanResponderGestureState } from 'react-native';
import { PanResponder, Text } from 'react-native';

import { act, fireEvent, render, screen } from '@testing-library/react-native';

import { SwipeableRow } from './SwipeableRow';

// Settle at once.
jest.mock('@/core/animation', () => ({
  ...jest.requireActual('@/core/animation'),
  timing: (value: { setValue: (v: number) => void }, to: number) => ({
    start: (done?: (r: { finished: boolean }) => void) => {
      value.setValue(to);
      done?.({ finished: true });
    },
  }),
}));

const EVENT = {} as GestureResponderEvent;
const gesture = (dx: number, vx = 0) => ({ dx, dy: 0, vx, vy: 0 }) as PanResponderGestureState;

const swipe = async (responder: PanResponderCallbacks, dx: number) => {
  await act(() => {
    responder.onPanResponderGrant?.(EVENT, gesture(0));
    responder.onPanResponderMove?.(EVENT, gesture(dx));
    responder.onPanResponderRelease?.(EVENT, gesture(dx));
  });
};

describe('SwipeableRow', () => {
  afterEach(() => jest.restoreAllMocks());

  it('opens on a swipe, runs an action and closes', async () => {
    const create = jest.spyOn(PanResponder, 'create');
    const onDelete = jest.fn();
    const onOpenChange = jest.fn();
    await render(
      <SwipeableRow
        testID="row"
        trailingActions={[{ label: 'Delete', variant: 'destructive', onPress: onDelete }]}
        onOpenChange={onOpenChange}
      >
        <Text>Message</Text>
      </SwipeableRow>
    );
    const responder = create.mock.calls[0]?.[0] as PanResponderCallbacks;
    await swipe(responder, -60);
    expect(onOpenChange).toHaveBeenLastCalledWith('trailing');
    await fireEvent.press(screen.getByRole('button', { name: 'Delete' }));
    expect(onDelete).toHaveBeenCalled();
    expect(onOpenChange).toHaveBeenLastCalledWith(null);
  });

  it('runs the outermost action on a full swipe', async () => {
    const create = jest.spyOn(PanResponder, 'create');
    const onArchive = jest.fn();
    await render(
      <SwipeableRow
        testID="row"
        fullSwipe
        trailingActions={[
          { label: 'Archive', onPress: onArchive },
          { label: 'More', onPress: jest.fn() },
        ]}
      >
        <Text>Message</Text>
      </SwipeableRow>
    );
    await fireEvent(screen.getByTestId('row'), 'layout', { nativeEvent: { layout: { x: 0, y: 0, width: 400, height: 60 } } });
    await swipe(create.mock.calls[0]?.[0] as PanResponderCallbacks, -300);
    expect(onArchive).toHaveBeenCalledTimes(1);
  });

  it('closes an open row when another opens, and when its content is tapped', async () => {
    const create = jest.spyOn(PanResponder, 'create');
    const first = jest.fn();
    const second = jest.fn();
    const actions = [{ label: 'Pin', onPress: jest.fn() }];
    await render(
      <>
        <SwipeableRow testID="a" leadingActions={actions} onOpenChange={first}>
          <Text>A</Text>
        </SwipeableRow>
        <SwipeableRow testID="b" leadingActions={actions} onOpenChange={second}>
          <Text>B</Text>
        </SwipeableRow>
      </>
    );
    await swipe(create.mock.calls[0]?.[0] as PanResponderCallbacks, 60);
    expect(first).toHaveBeenLastCalledWith('leading');
    await swipe(create.mock.calls[1]?.[0] as PanResponderCallbacks, 60);
    expect(first).toHaveBeenLastCalledWith(null);
    expect(second).toHaveBeenLastCalledWith('leading');
    await fireEvent.press(screen.getByTestId('b-close'));
    expect(second).toHaveBeenLastCalledWith(null);
  });

  it('keeps every action within reach of screen readers', async () => {
    await render(
      <SwipeableRow leadingActions={[{ label: 'Pin', onPress: jest.fn() }]} trailingActions={[{ label: 'Delete', onPress: jest.fn() }]}>
        <Text>Message</Text>
      </SwipeableRow>
    );
    expect(screen.getByRole('button', { name: 'Pin' })).toBeTruthy();
    expect(screen.getByRole('button', { name: 'Delete' })).toBeTruthy();
  });
});
