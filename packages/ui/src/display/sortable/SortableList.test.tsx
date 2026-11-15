import type { GestureResponderEvent, PanResponderCallbacks, PanResponderGestureState } from 'react-native';
import { PanResponder, Text } from 'react-native';

import { act, fireEvent, render, screen } from '@testing-library/react-native';

import { SortableHandle } from './components/SortableHandle';
import { SortableList } from './SortableList';

// The drop settles at once.
jest.mock('@/core/animation', () => ({
  ...jest.requireActual('@/core/animation'),
  timing: (value: { setValue: (v: number) => void }, to: number) => ({
    start: (done?: (r: { finished: boolean }) => void) => {
      value.setValue(to);
      done?.({ finished: true });
    },
  }),
}));

const ITEMS = ['Milk', 'Eggs', 'Bread'];
const EVENT = {} as GestureResponderEvent;
const gesture = (dy: number) => ({ dx: 0, dy, vx: 0, vy: 0, moveX: 0, moveY: 200 + dy }) as PanResponderGestureState;

const renderList = (onReorder = jest.fn(), activation?: 'handle') =>
  render(
    <SortableList
      data={ITEMS}
      keyExtractor={(item) => item}
      getItemLabel={(item) => item}
      activation={activation}
      onReorder={onReorder}
      renderItem={({ item }) => (
        <>
          <Text>{item}</Text>
          <SortableHandle testID={`handle-${item}`} />
        </>
      )}
    />
  );

describe('SortableList', () => {
  afterEach(() => jest.restoreAllMocks());

  it('moves rows with the screen-reader actions, offering only the moves that exist', async () => {
    const onReorder = jest.fn();
    await renderList(onReorder);
    const first = screen.getByLabelText('Milk');
    expect(first.props.accessibilityActions.map((a: { name: string }) => a.name)).toEqual(['moveDown']);
    await fireEvent(first, 'accessibilityAction', { nativeEvent: { actionName: 'moveDown' } });
    expect(onReorder).toHaveBeenCalledWith(['Eggs', 'Milk', 'Bread'], { from: 0, to: 1 });
  });

  it('drags a lifted row past its neighbours and reports the new order', async () => {
    const create = jest.spyOn(PanResponder, 'create');
    const onReorder = jest.fn();
    await renderList(onReorder);
    const responder = create.mock.calls[create.mock.calls.length - 1]?.[0] as PanResponderCallbacks;
    for (const [i, item] of ITEMS.entries())
      await fireEvent(screen.getByLabelText(item), 'layout', { nativeEvent: { layout: { x: 0, y: i * 50, width: 300, height: 50 } } });
    expect(responder.onMoveShouldSetPanResponderCapture?.(EVENT, gesture(5))).toBe(false);
    await fireEvent(screen.getByText('Milk'), 'longPress');
    expect(responder.onMoveShouldSetPanResponderCapture?.(EVENT, gesture(5))).toBe(true);
    await act(() => {
      responder.onPanResponderGrant?.(EVENT, gesture(0));
      responder.onPanResponderMove?.(EVENT, gesture(110));
    });
    await act(() => responder.onPanResponderRelease?.(EVENT, gesture(110)));
    expect(onReorder).toHaveBeenCalledWith(['Eggs', 'Bread', 'Milk'], { from: 0, to: 2 });
  });

  it('drops in place when a lifted row is let go without dragging', async () => {
    jest.useFakeTimers();
    const onReorder = jest.fn();
    await renderList(onReorder, 'handle');
    await fireEvent(screen.getByTestId('handle-Eggs', { includeHiddenElements: true }), 'pressIn');
    await fireEvent(screen.getByTestId('handle-Eggs', { includeHiddenElements: true }), 'pressOut');
    await act(() => jest.runAllTimers());
    expect(onReorder).not.toHaveBeenCalled();
    jest.useRealTimers();
  });
});
